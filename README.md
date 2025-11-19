# Digital Business Card Application

A modern, full-featured digital business card platform similar to Blinq. Create, customize, and share your digital business cards with QR codes, links, email, and more.

## Features

- ✨ **Create Digital Business Cards** - Customize with colors, templates, logos, and profile images
- 📱 **Multiple Sharing Options** - QR codes, links, email, and more
- 📊 **Analytics Dashboard** - Track views and shares
- 👥 **Contact Management** - Keep track of people you meet
- 🎨 **Multiple Templates** - Choose from Default, Modern, or Minimal designs
- 🔗 **Social Links** - Add LinkedIn, Twitter, GitHub, and more
- 📧 **Email Integration** - Share cards via email
- 💾 **vCard Export** - Download contacts as vCard files

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (via Prisma)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `DATABASE_URL` - Database connection string (default: `file:./dev.db`)
   - `NEXT_PUBLIC_URL` - Your app URL (default: `http://localhost:3000`)
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Email configuration (optional)

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Create upload directories**
   ```bash
   mkdir -p public/uploads public/profiles public/logos
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
digital-business-card/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── card/              # Public card view pages
│   ├── create/            # Card creation page
│   ├── dashboard/         # User dashboard
│   ├── contacts/          # Contact management
│   └── analytics/         # Analytics dashboard
├── components/            # React components
│   ├── CardTemplates/     # Card design templates
│   └── ...                # Other components
├── lib/                   # Utility libraries
│   ├── prisma.ts          # Prisma client
│   ├── utils.ts           # Helper functions
│   ├── email.ts           # Email utilities
│   └── analytics.ts       # Analytics tracking
└── prisma/                # Database schema
    └── schema.prisma      # Prisma schema
```

## Usage

### Creating a Card

1. Click "Create my card" on the homepage
2. Fill in your information (name, email, title, etc.)
3. Customize colors, template, and add images
4. Add social media links
5. Click "Create Card"

### Sharing Your Card

- **QR Code**: Click "QR Code" button to display QR code
- **Copy Link**: Click "Copy Link" to copy the card URL
- **Email**: Click "Email" to share via email
- **Direct Link**: Share the `/card/[id]` URL

### Managing Contacts

1. Navigate to the Contacts page
2. Add new contacts manually
3. View all your contacts with details
4. Track where and when you met people

### Viewing Analytics

1. Navigate to the Analytics page
2. View total views and shares
3. See views over time
4. Check shares by method
5. Compare card performance

## API Routes

- `POST /api/cards` - Create a new card
- `GET /api/cards` - Get all cards
- `GET /api/cards/[id]` - Get a specific card
- `PUT /api/cards/[id]` - Update a card
- `DELETE /api/cards/[id]` - Delete a card
- `POST /api/contacts` - Add a contact
- `GET /api/contacts` - Get all contacts
- `POST /api/upload` - Upload an image
- `POST /api/email` - Send card via email
- `POST /api/share` - Track a share

## Database Schema

The application uses Prisma with SQLite. Key models:

- **User** - User accounts
- **Card** - Digital business cards
- **Contact** - Contact information
- **CardView** - Analytics for card views
- **Share** - Analytics for card shares
- **Team** - Team/organization management
- **TeamMember** - Team membership

## Development

### Running Prisma Studio

View and edit your database:
```bash
npm run prisma:studio
```

### Building for Production

```bash
npm run build
npm start
```

## Notes

- **Authentication**: Currently uses a temporary user ID. In production, implement proper authentication (NextAuth.js recommended).
- **Email**: Email functionality requires SMTP configuration. Without it, email sharing will fail gracefully.
- **File Uploads**: Images are stored in the `public` directory. In production, consider using cloud storage (AWS S3, Cloudinary, etc.).

## License

This project is open source and available for use.

## Contributing

Feel free to submit issues and enhancement requests!

