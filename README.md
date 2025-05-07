# AnyCV Frontend

AnyCV is a Next.js-based web application that allows users to create and manage professional CVs and personal websites by making use of their linkedin profile. With a LinkedIn link, you can create your new stunning CV in 30 seconds.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/docs) (with App Router)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) for global state and [TanStack Query](https://tanstack.com/query/latest) for server state
- **Authentication / Session Management**: [Auth.js v5 / next-auth](https://authjs.dev/getting-started/installation?framework=Next.js) with JWT
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind CSS)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Validation**: [zod](https://zod.dev/)
- **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org/)
- **PDF Viewing**: [@react-pdf-viewer/core](https://react-pdf-viewer.dev/) leveraging [@pdfjs-dist](https://www.npmjs.com/package/pdfjs-dist)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Key Features

- User authentication and profile management
- CV generation from LinkedIn profiles via the API
- Choose between multiple CV & website templates (Classic, Modern)
- CV editing and customization
- PDF export of generated CVs
- Publishing personal website under a unique https://buildanycv.com/ username
- Dark/light mode support

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- Install & run the [AnyCV API backend](https://github.com/ZinoM21/any-cv-api)
- Create a [Cloudflare Account](https://www.cloudflare.com/) and a Turnstile Application to get a **site key** (you'll need the secret key in the backend). When creating a new turnstile application / site, put your localhost as domain (and other domains if you want to deploy this app, too), choose the **managed** option and select **no** on **pre-clearance**.

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/ZinoM21/any-cv-app
   cd any-cv-app
   ```

2. Install dependencies

   ```bash
   # Using npm
   npm install

   # Using Bun (recommended for faster installs)
   bun install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8000/api              # The URL of a AnyCV Backend instance (dont forget the /api!)

   # NextAuth Configuration
   AUTH_TRUST_HOST=http://localhost:3000                      # Needed if deployed behind a reverse proxy like vercel or cloudflare pages
   AUTH_SECRET=your-nextauth-secret                           # After installing dependencies, you can generate a secret with bunx auth secret

   # Cloudflare Turnstile for Bot Protection
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-turnstile-site-key     # Cloudflare Turnstile site key for bot protection
   ```

4. Run the development server

   ```bash
   # Using npm
   npm run dev

   # Using Bun
   bun dev
   ```

5. Access the application at `http://localhost:3000`

## Project Structure

```
frontend/
├── app/                          # Next.js app directory (App Router)
│   ├── (application)/
│   │   ├── dashboard/            # Protected Dashboard pages
│   │   └── generate/             # CV generation pages
│   ├── (auth)/                   # Auth-related pages
│   │   ├── signin/               # Sign in page
│   │   └── signup/               # Sign up page
│   ├── (marketing)/              # Public/marketing pages
│   ├── api/                      # API route for NextAuth
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── auth/                     # Authentication components
│   ├── editor-form/              # CV editor form components
│   ├── templates/
│   │   ├── cv/                   # PDF CV templates
│   │   └── website/              # Website templates
│   └── ui/                       # UI components from (shadcn/ui)
├── lib/                          # Utilities and helpers
│   ├── api/                      # API client functions
│   ├── schemas/                  # Zod validation schemas
│   └── utils.ts                  # Utility functions
├── config/                       # Static configuration like auth config, routes, templates, etc.
├── hooks/                        # Custom React hooks
├── public/                       # Static assets
├── styles/                       # Global styles like fonts
├── auth.ts                       # NextAuth import
└── next.config.ts                # Next.js configuration

```

## Development

### Code Style

The project uses ESLint and Prettier for code formatting and linting. Run linting with:

```bash
bun run lint
```

### Building for Production

```bash
bun run build
```

### Running in Production Mode

```bash
bun run start
```

## Deployment

The application is configured for deployment on Vercel. Connect your GitHub repository to Vercel for automatic deployments.

## API Integration

The frontend communicates with the AnyCV API backend. All API calls are centralized in the `lib/api` directory:

- `api.ts` - Contains all the API endpoint functions
- `api-client.ts` - Configures the API client with authentication and error handling
- `server-api.ts` - Server-side API client for Next.js server components

## Features in Detail

### Authentication

- JWT-based authentication with refresh tokens
- Protected routes for authenticated users
- Email verification process
- Password reset functionality

### CV Generation

1. Enter your LinkedIn username to get your profile data
2. Choose from multiple CV templates
3. Edit and customize the CV content
4. Preview the CV in real-time
5. Export as PDF
6. Publish under unique slug

### Profile Management

- View and manage all created CVs
- Upload custom profile photos
- Update personal information
- Delete CVs or account

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
