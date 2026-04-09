# AI Career Consultant - Web Frontend

A production-ready React frontend for the AI Career Consultant platform.

## Tech Stack

- React 19 + TypeScript
- Vite (build tool)
- React Router 7 (routing)
- Axios + TanStack Query (data fetching)
- Tailwind CSS (styling)

## Installation

```bash
pnpm install
```

## Environment Setup

Create `.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
pnpm build
```

## Project Structure

```
src/
├── api/              # Axios instance with JWT interceptor
├── services/         # API service layer
├── hooks/            # TanStack Query hooks
├── pages/            # Route pages
├── layouts/          # Common layouts
├── components/       # Reusable components
├── context/          # React Context (auth)
├── types/            # TypeScript types
├── utils/            # Utility functions
└── routes/           # Route definitions
```

## Features Implemented

✅ Authentication (Register/Login)
✅ Dashboard with stats
✅ Resume upload & analysis
✅ Skill gap analysis
✅ Career paths generation
✅ Roadmap creation & tracking
✅ AI mentor chat
✅ Profile management
✅ Settings & preferences
✅ Protected routes
✅ JWT auth with auto-injection
✅ Responsive design
✅ Dark mode support

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
