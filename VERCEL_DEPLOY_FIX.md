# Fixing Vercel Deployment Error

## Error: "The name contains invalid characters"

This error typically occurs when:
1. **Project name** has invalid characters
2. **Environment variable name** has invalid characters (though DATABASE_URL and NEXT_PUBLIC_URL look fine)

## Solution

### Check 1: Project Name
- Make sure your project name only contains:
  - Letters (a-z, A-Z)
  - Numbers (0-9)
  - Hyphens (-)
  - Underscores (_)
- **Cannot start with a number**
- **Cannot contain spaces or special characters**

**Good examples:**
- `business-card-app`
- `businesscard`
- `my_business_card`

**Bad examples:**
- `business card app` (has spaces)
- `business-card.app` (has a dot)
- `123businesscard` (starts with number)

### Check 2: Environment Variables
Your environment variables look correct:
- ✅ `DATABASE_URL` - Valid
- ✅ `NEXT_PUBLIC_URL` - Valid

Make sure:
- No spaces in variable names
- No special characters except underscores
- Variable names are uppercase

### Steps to Fix

1. **If it's the project name:**
   - Go back to the project import screen
   - Change the project name to something like: `business-card-app`
   - Make sure it only has letters, numbers, hyphens, or underscores

2. **If it's an environment variable:**
   - Check all environment variable names
   - Make sure they follow the naming rules above
   - Remove any variables with invalid names

3. **Try again:**
   - Once fixed, click "Deploy" again

## Your Environment Variables Should Be:

```
DATABASE_URL=postgresql://postgres.khjajmdnzbwmlxthpany:Akopogi123@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres?schema=public
```

```
NEXT_PUBLIC_URL=https://your-app-name.vercel.app
```

(Update NEXT_PUBLIC_URL after first deployment with your actual Vercel URL)

## Still Having Issues?

If the error persists:
1. Try creating a new project with a simpler name
2. Make sure you're not adding any custom environment variable names with invalid characters
3. Check if there are any hidden characters in the project name field

