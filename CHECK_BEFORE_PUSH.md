# Pre-Push Checks Guide

This project has automated checks to catch errors before pushing to GitHub. This prevents broken builds on Vercel.

## Quick Check (Recommended)

Before pushing, run this command to catch all errors:

```bash
npm run check
```

This runs:
- TypeScript type checking (`tsc --noEmit`)
- ESLint linting

## Full Build Check

For a complete check (slower but more thorough):

```bash
npm run build
```

This will catch:
- TypeScript errors
- ESLint errors
- Build/compilation errors
- Missing dependencies

## Automated Options

### Option 1: Manual Pre-Push Script (Windows)

Before pushing, run:

```powershell
.\scripts\pre-push-check.ps1
```

If it passes, proceed with your push. If it fails, fix the errors and try again.

### Option 2: Git Pre-Push Hook (Automatic)

The pre-push hook is already set up. It will automatically run checks when you push.

**To skip the hook** (if needed in emergency):
```bash
git push --no-verify
```

**Note:** The hook may not work perfectly on Windows. Use the manual script instead.

### Option 3: GitHub Actions CI

GitHub Actions will automatically run checks on every push and pull request. Check the "Actions" tab in GitHub to see results.

## Workflow Recommendation

1. **Make your changes**
2. **Run checks locally:**
   ```bash
   npm run check
   ```
3. **Fix any errors that appear**
4. **Push when checks pass:**
   ```bash
   git add .
   git commit -m "Your message"
   git push
   ```
5. **Vercel will auto-deploy** (should succeed since checks passed)

## Available Scripts

- `npm run type-check` - Check TypeScript types only
- `npm run lint` - Run ESLint only
- `npm run check` - Run both type-check and lint
- `npm run build` - Full build (includes all checks)

## Troubleshooting

### Prisma file lock error
If you see `EPERM: operation not permitted`:
- Close Prisma Studio if it's running
- Stop the dev server (`npm run dev`)
- Try again

### Hook not running on Windows
Use the manual PowerShell script instead:
```powershell
.\scripts\pre-push-check.ps1
```

### Need to push urgently
Skip checks (not recommended):
```bash
git push --no-verify
```

