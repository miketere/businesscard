# PostgreSQL Setup Instructions

Your project has been converted to use PostgreSQL. Follow these steps to complete the setup:

## Quick Setup (One Command)

Run this PowerShell command, replacing `YOUR_PASSWORD` with your actual PostgreSQL password:

```powershell
$password = "YOUR_PASSWORD"; (Get-Content .env) -replace 'DATABASE_URL="[^"]*"', "DATABASE_URL=`"postgresql://postgres:$password@localhost:5432/business_card?schema=public`"" | Set-Content .env; $env:PGPASSWORD=$password; & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -h localhost -c "CREATE DATABASE business_card;" 2>&1; npx prisma migrate dev --name init_postgresql
```

## Manual Setup Steps

### 1. Update .env file

Edit your `.env` file and update the `DATABASE_URL` line:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/business_card?schema=public"
```

Replace:
- `postgres` with your PostgreSQL username (if different)
- `YOUR_PASSWORD` with your PostgreSQL password
- `business_card` with your desired database name (if different)
- `localhost:5432` if your PostgreSQL is on a different host/port

### 2. Create the Database

Open PowerShell and run:

```powershell
$env:PGPASSWORD = "YOUR_PASSWORD"
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -h localhost -c "CREATE DATABASE business_card;"
```

Or use psql directly:
```bash
psql -U postgres
CREATE DATABASE business_card;
\q
```

### 3. Run Migration

```bash
npx prisma migrate dev --name init_postgresql
```

### 4. (Optional) Seed Database

```bash
npm run prisma:seed
```

## Verify Setup

To verify everything is working:

```bash
npx prisma studio
```

This will open Prisma Studio where you can view your database tables.

## Troubleshooting

- **Authentication failed**: Make sure your PostgreSQL password is correct
- **Database already exists**: The migration will still work, or you can drop and recreate: `DROP DATABASE business_card;`
- **Connection refused**: Make sure PostgreSQL service is running: `Get-Service postgresql*`

