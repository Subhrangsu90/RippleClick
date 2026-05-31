# Contributing to RippleClick

Thanks for helping improve RippleClick. Small fixes, bug reports, design polish, documentation, and Windows compatibility notes are all welcome.

## Development Setup

```powershell
npm install
npm start
```

For automatic restart while editing:

```powershell
npm run dev
```

Before opening a pull request, run:

```powershell
npm run check
```

## Pull Requests

- Keep changes focused on one feature or fix.
- Include screenshots or short screen recordings for UI changes.
- Update `README.md` when behavior, setup, shortcuts, or packaging changes.
- Mention any Windows version or permission behavior that affected testing.

## Issues

When reporting bugs, include:

- Windows version
- RippleClick version or commit
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots or logs, if useful

## Code Style

- Match the existing plain JavaScript style.
- Use `npm run lint:fix` and `npm run format` before submitting larger changes.
- Prefer small, readable functions over broad rewrites.
- Keep UI changes accessible and test them at common desktop resolutions.
