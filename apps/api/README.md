# AI Career Consultant — Backend

LangChain + Express + TypeScript backend for an AI-powered career consultant.

## Phase 1 — Foundation (current)
Full Express + TypeScript setup with JWT auth, Prisma, Zod validation, and structured error handling.
LangChain features begin in Phase 2.

---

## Quick start

### 1. Install dependencies
```bash
npm install
```

### 2. Start infrastructure (Postgres + Redis)
```bash
docker compose up -d
```

### 3. Configure environment
```bash
cp .env.example .env
# Edit .env — set GOOGLE_API_KEY for Gemini and any other app secrets you need
```

### 4. Run database migrations
```bash
npm run db:migrate
# (name the migration "init" when prompted)
```

### 5. Generate Prisma client
```bash
npm run db:generate
```

### 6. Seed test data (optional)
```bash
npm run db:seed
# Creates: test@example.com / Password123  and  admin@example.com / Password123
```

### 7. Start the dev server
```bash
npm run dev
```

Server runs at `http://localhost:3000`
API docs at `http://localhost:3000/api/docs`
Health check at `http://localhost:3000/api/v1/health`

---

## Available scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to dist/ |
| `npm start` | Run compiled production build |
| `npm test` | Run all tests |
| `npm run test:watch` | Watch mode |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:seed` | Seed dev data |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |

---

## API endpoints (Phase 1)

### Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/v1/auth/register` | No | Create account |
| POST | `/api/v1/auth/login` | No | Login, receive tokens |
| POST | `/api/v1/auth/refresh` | No | Rotate tokens |
| POST | `/api/v1/auth/logout` | No | Invalidate refresh token |
| GET | `/api/v1/auth/me` | Yes | Get current user |

### Career Profile
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/career/profile` | Yes | Get career profile |
| POST | `/api/v1/career/profile` | Yes | Create/update profile |
| DELETE | `/api/v1/career/profile` | Yes | Delete profile |

### System
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/v1/health` | No | Server + DB health |

---

## Project structure
```
src/
├── index.ts          # Entry point, graceful shutdown
├── app.ts            # Express app configuration
├── server.ts         # HTTP server binding
├── config/           # env, logger, constants, swagger
├── routes/           # URL definitions (thin)
├── controllers/      # Request/response handlers (thin)
├── services/         # Business logic
├── middleware/        # Auth, errors, rate limit, validation
├── validators/       # Zod schemas
├── types/            # Shared TypeScript types
├── utils/            # asyncHandler, AppError, apiResponse
└── db/               # Prisma client, schema, seed
```

## Coming in Phase 2
- LangChain.js integration
- Career advice chain (LCEL)
- Resume PDF analyzer
- Job matcher with structured output
