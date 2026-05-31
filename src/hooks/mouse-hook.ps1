Add-Type -TypeDefinition @"
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Windows.Forms;

public class InputHook {
  private const int WH_MOUSE_LL = 14;
  private const int WH_KEYBOARD_LL = 13;
  private const int WM_MOUSEMOVE = 0x0200;
  private const int WM_LBUTTONDOWN = 0x0201;
  private const int WM_LBUTTONUP = 0x0202;
  private const int WM_RBUTTONDOWN = 0x0204;
  private const int WM_RBUTTONUP = 0x0205;
  private const int WM_MBUTTONDOWN = 0x0207;
  private const int WM_MBUTTONUP = 0x0208;
  private const int WM_MOUSEWHEEL = 0x020A;
  private const int WM_KEYDOWN = 0x0100;
  private const int WM_SYSKEYDOWN = 0x0104;

  private static bool _isLButtonDown = false;
  private static bool _isRButtonDown = false;
  private static bool _isMButtonDown = false;
  private static DateTime _lastMoveTime = DateTime.MinValue;

  private static LowLevelMouseProc _mouseProc = MouseCallback;
  private static LowLevelKeyboardProc _keyboardProc = KeyboardCallback;
  private static IntPtr _mouseHookID = IntPtr.Zero;
  private static IntPtr _keyboardHookID = IntPtr.Zero;

  public static void Main() {
    _mouseHookID = SetMouseHook(_mouseProc);
    _keyboardHookID = SetKeyboardHook(_keyboardProc);
    Application.Run();
    UnhookWindowsHookEx(_mouseHookID);
    UnhookWindowsHookEx(_keyboardHookID);
  }

  private static IntPtr SetMouseHook(LowLevelMouseProc proc) {
    using (Process curProcess = Process.GetCurrentProcess())
    using (ProcessModule curModule = curProcess.MainModule) {
      return SetWindowsHookEx(WH_MOUSE_LL, proc, GetModuleHandle(curModule.ModuleName), 0);
    }
  }

  private static IntPtr SetKeyboardHook(LowLevelKeyboardProc proc) {
    using (Process curProcess = Process.GetCurrentProcess())
    using (ProcessModule curModule = curProcess.MainModule) {
      return SetWindowsHookEx(WH_KEYBOARD_LL, proc, GetModuleHandle(curModule.ModuleName), 0);
    }
  }

  private delegate IntPtr LowLevelMouseProc(int nCode, IntPtr wParam, IntPtr lParam);
  private delegate IntPtr LowLevelKeyboardProc(int nCode, IntPtr wParam, IntPtr lParam);

  private static string GetActiveApp() {
    IntPtr hwnd = GetForegroundWindow();
    if (hwnd != IntPtr.Zero) {
      uint pid = 0;
      GetWindowThreadProcessId(hwnd, out pid);
      if (pid != 0) {
        try {
          using (Process p = Process.GetProcessById((int)pid)) {
            return p.ProcessName;
          }
        } catch {}
      }
    }
    return "unknown";
  }

  private static IntPtr MouseCallback(int nCode, IntPtr wParam, IntPtr lParam) {
    if (nCode >= 0) {
      int message = wParam.ToInt32();
      string button = null;
      bool isDown = false;
      bool isUp = false;

      if (message == WM_LBUTTONDOWN) { button = "left"; isDown = true; _isLButtonDown = true; }
      if (message == WM_LBUTTONUP) { button = "left"; isUp = true; _isLButtonDown = false; }
      if (message == WM_RBUTTONDOWN) { button = "right"; isDown = true; _isRButtonDown = true; }
      if (message == WM_RBUTTONUP) { button = "right"; isUp = true; _isRButtonDown = false; }
      if (message == WM_MBUTTONDOWN) { button = "middle"; isDown = true; _isMButtonDown = true; }
      if (message == WM_MBUTTONUP) { button = "middle"; isUp = true; _isMButtonDown = false; }

      if (isDown) {
        string appName = GetActiveApp();
        MSLLHOOKSTRUCT hookStruct = (MSLLHOOKSTRUCT)Marshal.PtrToStructure(lParam, typeof(MSLLHOOKSTRUCT));
        Console.WriteLine("{\"type\":\"dragStart\",\"button\":\"" + button + "\",\"x\":" + hookStruct.pt.x + ",\"y\":" + hookStruct.pt.y + ",\"app\":\"" + JsonEscape(appName) + "\"}");
        Console.WriteLine("{\"type\":\"click\",\"button\":\"" + button + "\",\"x\":" + hookStruct.pt.x + ",\"y\":" + hookStruct.pt.y + ",\"app\":\"" + JsonEscape(appName) + "\"}");
        Console.Out.Flush();
      }
      else if (isUp) {
        MSLLHOOKSTRUCT hookStruct = (MSLLHOOKSTRUCT)Marshal.PtrToStructure(lParam, typeof(MSLLHOOKSTRUCT));
        Console.WriteLine("{\"type\":\"dragEnd\",\"button\":\"" + button + "\",\"x\":" + hookStruct.pt.x + ",\"y\":" + hookStruct.pt.y + "}");
        Console.Out.Flush();
      }
      else if (message == WM_MOUSEMOVE) {
        if (_isLButtonDown || _isRButtonDown || _isMButtonDown) {
          if ((DateTime.Now - _lastMoveTime).TotalMilliseconds >= 16) {
            _lastMoveTime = DateTime.Now;
            MSLLHOOKSTRUCT hookStruct = (MSLLHOOKSTRUCT)Marshal.PtrToStructure(lParam, typeof(MSLLHOOKSTRUCT));
            Console.WriteLine("{\"type\":\"dragMove\",\"x\":" + hookStruct.pt.x + ",\"y\":" + hookStruct.pt.y + "}");
            Console.Out.Flush();
          }
        }
      }
      else if (message == WM_MOUSEWHEEL) {
        string appName = GetActiveApp();
        MSLLHOOKSTRUCT hookStruct = (MSLLHOOKSTRUCT)Marshal.PtrToStructure(lParam, typeof(MSLLHOOKSTRUCT));
        short scrollDelta = (short)(hookStruct.mouseData >> 16);
        string direction = scrollDelta > 0 ? "up" : "down";
        Console.WriteLine("{\"type\":\"scroll\",\"direction\":\"" + direction + "\",\"x\":" + hookStruct.pt.x + ",\"y\":" + hookStruct.pt.y + ",\"app\":\"" + JsonEscape(appName) + "\"}");
        Console.Out.Flush();
      }
    }

    return CallNextHookEx(_mouseHookID, nCode, wParam, lParam);
  }

  private static IntPtr KeyboardCallback(int nCode, IntPtr wParam, IntPtr lParam) {
    if (nCode >= 0) {
      int message = wParam.ToInt32();
      if (message == WM_KEYDOWN || message == WM_SYSKEYDOWN) {
        KBDLLHOOKSTRUCT hookStruct = (KBDLLHOOKSTRUCT)Marshal.PtrToStructure(lParam, typeof(KBDLLHOOKSTRUCT));
        Keys key = (Keys)hookStruct.vkCode;
        string displayKey = FormatKey(key);

        if (!IsModifier(key) && displayKey.Length > 0) {
          string appName = GetActiveApp();
          string combo = BuildCombo(displayKey);
          Console.WriteLine("{\"type\":\"shortcut\",\"keys\":\"" + JsonEscape(combo) + "\",\"app\":\"" + JsonEscape(appName) + "\"}");
          Console.Out.Flush();
        }
      }
    }

    return CallNextHookEx(_keyboardHookID, nCode, wParam, lParam);
  }

  private static string BuildCombo(string key) {
    string combo = "";
    if (IsDown(Keys.ControlKey)) combo += "Ctrl + ";
    if (IsDown(Keys.Menu)) combo += "Alt + ";
    if (IsDown(Keys.ShiftKey)) combo += "Shift + ";
    if (IsDown(Keys.LWin) || IsDown(Keys.RWin)) combo += "Win + ";
    return combo + key;
  }

  private static bool IsModifier(Keys key) {
    return key == Keys.ControlKey || key == Keys.LControlKey || key == Keys.RControlKey ||
      key == Keys.Menu || key == Keys.LMenu || key == Keys.RMenu ||
      key == Keys.ShiftKey || key == Keys.LShiftKey || key == Keys.RShiftKey ||
      key == Keys.LWin || key == Keys.RWin;
  }

  private static bool IsDown(Keys key) {
    return (GetKeyState((int)key) & 0x8000) != 0;
  }

  private static string FormatKey(Keys key) {
    if (key >= Keys.A && key <= Keys.Z) return key.ToString();
    if (key >= Keys.D0 && key <= Keys.D9) return key.ToString().Substring(1);
    if (key >= Keys.NumPad0 && key <= Keys.NumPad9) return "Num " + key.ToString().Substring(6);
    if (key >= Keys.F1 && key <= Keys.F24) return key.ToString();
    if (key == Keys.Space) return "Space";
    if (key == Keys.Return) return "Enter";
    if (key == Keys.Escape) return "Esc";
    if (key == Keys.Back) return "Backspace";
    if (key == Keys.Delete) return "Delete";
    if (key == Keys.Insert) return "Insert";
    if (key == Keys.Tab) return "Tab";
    if (key == Keys.Home) return "Home";
    if (key == Keys.End) return "End";
    if (key == Keys.PageUp) return "Page Up";
    if (key == Keys.PageDown) return "Page Down";
    if (key == Keys.Left) return "Left";
    if (key == Keys.Right) return "Right";
    if (key == Keys.Up) return "Up";
    if (key == Keys.Down) return "Down";
    if (key == Keys.Oemcomma) return ",";
    if (key == Keys.OemPeriod) return ".";
    if (key == Keys.OemQuestion) return "/";
    if (key == Keys.OemSemicolon) return ";";
    if (key == Keys.OemQuotes) return "'";
    if (key == Keys.OemOpenBrackets) return "[";
    if (key == Keys.OemCloseBrackets) return "]";
    if (key == Keys.OemPipe) return "\\";
    if (key == Keys.OemMinus) return "-";
    if (key == Keys.Oemplus) return "=";
    return key.ToString();
  }

  private static string JsonEscape(string value) {
    return value.Replace("\\", "\\\\").Replace("\"", "\\\"");
  }

  [StructLayout(LayoutKind.Sequential)]
  private struct POINT {
    public int x;
    public int y;
  }

  [StructLayout(LayoutKind.Sequential)]
  private struct MSLLHOOKSTRUCT {
    public POINT pt;
    public uint mouseData;
    public uint flags;
    public uint time;
    public IntPtr dwExtraInfo;
  }

  [StructLayout(LayoutKind.Sequential)]
  private struct KBDLLHOOKSTRUCT {
    public uint vkCode;
    public uint scanCode;
    public uint flags;
    public uint time;
    public IntPtr dwExtraInfo;
  }

  [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
  private static extern IntPtr SetWindowsHookEx(int idHook, LowLevelMouseProc lpfn, IntPtr hMod, uint dwThreadId);

  [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
  private static extern IntPtr SetWindowsHookEx(int idHook, LowLevelKeyboardProc lpfn, IntPtr hMod, uint dwThreadId);

  [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
  [return: MarshalAs(UnmanagedType.Bool)]
  private static extern bool UnhookWindowsHookEx(IntPtr hhk);

  [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
  private static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode, IntPtr wParam, IntPtr lParam);

  [DllImport("user32.dll")]
  private static extern IntPtr GetForegroundWindow();

  [DllImport("user32.dll")]
  private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

  [DllImport("user32.dll")]
  private static extern short GetKeyState(int nVirtKey);

  [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
  private static extern IntPtr GetModuleHandle(string lpModuleName);
}
"@ -ReferencedAssemblies System.Windows.Forms

[InputHook]::Main()
