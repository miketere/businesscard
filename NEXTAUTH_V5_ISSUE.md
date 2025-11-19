# NextAuth v5 Beta.30 Constructor Error

## Issue
Getting `TypeError: tB is not a constructor` error in Vercel production, specifically in `reqWithEnvURL` function.

## Error Details
```
⨯ TypeError: tB is not a constructor
    at reqWithEnvURL (/var/task/.next/server/chunks/2632.js:419:66586)
    at httpHandler (/var/task/.next/server/chunks/2632.js:419:72160)
```

## Attempted Fixes
1. ✅ Fixed handler export pattern
2. ✅ Added `trustHost: true` option
3. ✅ Removed multiple NextAuth instances
4. ✅ Made NEXTAUTH_URL optional
5. ✅ Updated to support both AUTH_SECRET and NEXTAUTH_SECRET

## Current Configuration
- NextAuth: `5.0.0-beta.30`
- Next.js: `14.0.0`
- Session Strategy: `database`
- Adapter: `@auth/prisma-adapter`

## Potential Solutions

### Option 1: Remove NEXTAUTH_URL from Vercel Environment Variables
NextAuth v5 can auto-detect the URL from request headers. Try removing `NEXTAUTH_URL` from Vercel environment variables entirely.

### Option 2: Use AUTH_SECRET instead of NEXTAUTH_SECRET
In Vercel, rename `NEXTAUTH_SECRET` to `AUTH_SECRET` (the code now supports both).

### Option 3: Downgrade to NextAuth v4
If the beta version is too unstable, consider using NextAuth v4 which is stable:
```bash
npm install next-auth@4
```

### Option 4: Wait for NextAuth v5 Stable Release
This appears to be a known issue with beta.30. Monitor the NextAuth GitHub for updates.

## Next Steps
1. Try removing `NEXTAUTH_URL` from Vercel environment variables
2. If that doesn't work, try renaming `NEXTAUTH_SECRET` to `AUTH_SECRET` in Vercel
3. If still failing, consider downgrading to NextAuth v4

