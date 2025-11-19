# Supabase PostgreSQL Setup

Your project is configured to use Supabase PostgreSQL. Follow these steps to connect:

## Getting Your Supabase Connection String

1. **Go to your Supabase project**: https://app.supabase.com
2. **Navigate to Settings** → **Database**
3. **Find the "Connection string" section**
4. **Select "URI"** or **"Connection pooling"** tab
5. **Copy the connection string**

The connection string will look like one of these:

### Direct Connection (Transaction mode):
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```

### Connection Pooling (Session mode - Recommended):
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Note**: Replace `[password]` with your actual database password.

## Update Your .env File

Once you have your connection string, update the `DATABASE_URL` in your `.env` file:

```env
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&schema=public"
```

**Important**: Add `&schema=public` at the end if it's not already there.

## Run Migration

After updating the `.env` file, run the migration:

```bash
npx prisma migrate dev --name init_postgresql
```

Or if you want to push the schema directly (without migrations):

```bash
npx prisma db push
```

## Verify Connection

Test your connection:

```bash
npx prisma studio
```

This will open Prisma Studio where you can view your database tables.

## Troubleshooting

- **Connection timeout**: Make sure your IP is allowed in Supabase settings (Settings → Database → Connection Pooling)
- **Authentication failed**: Double-check your password in the connection string
- **Schema not found**: Make sure `schema=public` is in your connection string
- **SSL required**: Supabase requires SSL. Prisma handles this automatically, but if you get SSL errors, add `?sslmode=require` to your connection string

## Supabase Dashboard

You can also manage your database through the Supabase dashboard:
- View tables: **Table Editor**
- Run SQL: **SQL Editor**
- View connection info: **Settings** → **Database**

