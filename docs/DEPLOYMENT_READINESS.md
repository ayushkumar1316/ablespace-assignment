# Deployment Readiness Report

**Status: Deployment not started.**

This document records what is required to deploy AbleSpace to production.
No code changes or deployments have been made yet.

---

## Current Architecture

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Frontend   │ ───► │   Backend    │ ───► │   MongoDB    │
│  Next.js 16  │      │  NestJS 11   │      │   (local)    │
│  port 3000   │      │  port 4000   │      │  port 27017  │
└──────────────┘      └──────────────┘      └──────────────┘
```

Local development uses all three services on localhost.
Production requires replacing localhost addresses with cloud-hosted URLs.

---

## 1. Frontend

| Aspect | Current state |
|--------|---------------|
| Framework | Next.js 16.3.0, React 19, App Router |
| Build | `npm run build` → `next build` |
| Start | `npm start` → `next start` |
| Runtime deps | `next`, `react`, `react-dom` only |
| Environment variables | `NEXT_PUBLIC_API_URL` — backend URL (defaults to `http://localhost:4000`) |
| Backend URL | Configurable via `NEXT_PUBLIC_API_URL`, defaults to `http://localhost:4000` (`frontend/src/lib/api.ts:5-6`) |
| Server features | None (no Server Actions, no middleware, no API routes) |
| Client components | All 21 components are `"use client"` with static imports |

### Vercel compatibility

Structurally compatible. No Node.js-only APIs, no dynamic imports, no
middleware. `next/font/google` and `reactCompiler: true` both work on
Vercel. The only blocker is the hardcoded backend URL.

---

## 2. Backend

| Aspect | Current state |
|--------|---------------|
| Framework | NestJS 11, Mongoose 9, Passport + JWT |
| Build | `npm run build` → `nest build` |
| Start (production) | `npm run start:prod` → `node dist/main` |
| Port | `PORT` env var, default `4000` |
| Global prefix | None (routes at root, e.g. `/auth/guest`, `/tasks`) |

### Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `4000` | HTTP listen port |
| `MONGODB_URI` | Yes | Mongoose default (`mongodb://localhost:27017/test`) | MongoDB connection string |
| `JWT_SECRET` | Yes | None — throws Error at startup | Secret for JWT signing/verification |
| `JWT_EXPIRES_IN` | No | `7d` | Token expiry duration |
| `CORS_ORIGIN` | No | `http://localhost:3000` | Comma-separated allowed origins |

`JWT_SECRET` causes a hard crash if missing — this is intentional fail-fast
behaviour added during Phase 9 hardening.

### CORS configuration

```ts
app.enableCors({
  origin: process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) ?? [
    'http://localhost:3000',
  ],
  credentials: true,
});
```

- `credentials: true` — allows `Authorization` headers cross-origin.
- No method or header restrictions — all HTTP methods allowed.
- For production, `CORS_ORIGIN` must be set to the deployed frontend URL.

### Node-compatible cloud hosts

The backend is pure Node.js with no native addons. It will run on:
Render, Railway, Fly.io, Koyeb, or any Node.js hosting platform.

---

## 3. Database

| Aspect | Current state |
|--------|---------------|
| Local | `mongodb://127.0.0.1:27017/ablespace` |
| Production | **MongoDB Atlas required** |
| Connection code | Single `uri` from `MONGODB_URI` — no local/Atlas branching |
| Seed service | Runs on every boot; skips if tasks collection is non-empty |

### Why Atlas is required for production

Local MongoDB (`127.0.0.1:27017`) is only reachable from the machine
running `mongod`. A cloud-hosted backend (Render, Railway, etc.) cannot
reach it. MongoDB Atlas provides a managed cloud database with a
connection string that works from any host.

### Atlas network access

Atlas requires IP whitelisting. For a free M0 cluster:
- Add the hosting platform's outbound IP range, OR
- Set to `0.0.0.0/0` (allows all IPs — acceptable for a free-tier
  assignment project, not recommended for production with real data).

This does **not** affect local development — local uses `127.0.0.1`,
which never touches Atlas.

---

## 4. Deployment Blockers

| # | Severity | Blocker | File | Status |
|---|----------|---------|------|--------|
| 1 | ~~CRITICAL~~ | Backend URL hardcoded to `http://localhost:4000` — all API calls fail when frontend is deployed separately | `frontend/src/lib/api.ts:5-6` | **Fixed** — now reads `NEXT_PUBLIC_API_URL` |
| 2 | ~~CRITICAL~~ | No `NEXT_PUBLIC_API_URL` env var — no way to configure the backend URL per-environment | `frontend/src/lib/api.ts` | **Fixed** — same change as #1 |
| 3 | **HIGH** | CORS defaults to `http://localhost:3000` — deployed frontend will be blocked unless `CORS_ORIGIN` is set | `backend/src/main.ts:9` | Deployment-time config only |
| 4 | **HIGH** | `JWT_SECRET` is a dev placeholder (`ablespace-dev-secret-change-in-production`) — must be replaced | `backend/.env` | Deployment-time config only |
| 5 | **HIGH** | No Atlas connection string configured — backend cannot connect to a cloud database | `backend/.env` | Deployment-time config only |
| 6 | **MEDIUM** | Seed service runs unconditionally — will seed a fresh production database on first boot | `backend/src/database/seed.service.ts` | Optional hardening |
| 7 | ~~MEDIUM~~ | No `app.enableShutdownHooks()` — graceful MongoDB disconnection not guaranteed on SIGTERM | `backend/src/main.ts` | **Fixed** |
| 8 | **LOW** | No Dockerfile, no deployment config, no CI/CD pipeline | Repository-wide | Optional |

---

## 5. Recommended Hosting

| Layer | Platform | Tier | Cost |
|-------|----------|------|------|
| Frontend | **Vercel** | Hobby (free) | $0 |
| Backend | **Render** | Free tier | $0 |
| Database | **MongoDB Atlas** | M0 (free) | $0 |

**Total: $0** for an assignment-scale deployment.

### Why this combination

- **Vercel** — zero-config Next.js deploys, automatic GitHub integration,
  free custom domain, edge network.
- **Render** — supports Node.js web services, auto-deploys from GitHub,
  free tier includes 750 hours/month.
- **MongoDB Atlas M0** — 512 MB free cluster, sufficient for seed data
  and assignment use.

### Alternative: Railway

Railway ($5 credit/month) can replace Render for the backend. It has
better logging and a simpler dashboard but is not free indefinitely.

---

## 6. Local Development vs Production

| Aspect | Local | Production |
|--------|-------|------------|
| Frontend URL | `http://localhost:3000` | `https://<vercel-app>.vercel.app` |
| Backend URL | `http://localhost:4000` | `https://<render-app>.onrender.com` |
| MongoDB | `mongodb://127.0.0.1:27017/ablespace` | `mongodb+srv://<user>:<pass>@<cluster>/ablespace` |
| JWT_SECRET | Dev placeholder in `backend/.env` | Strong random string in Render env vars |
| CORS_ORIGIN | `http://localhost:3000` | `https://<vercel-app>.vercel.app` |
| Backend PORT | `4000` (default) | Set by host or `PORT` env var |

---

## 7. Required Pre-Deployment Changes

These changes must be made before any deployment. They have not been
implemented yet.

### Frontend

1. ~~**Make backend URL configurable**~~ — **Done.** `API_BASE_URL` in
   `frontend/src/lib/api.ts:5-6` now reads `process.env.NEXT_PUBLIC_API_URL`
   with localhost fallback.

2. **Set `NEXT_PUBLIC_API_URL` in Vercel** — pointing to the deployed
   Render backend URL (e.g. `https://ablespace-api.onrender.com`).

### Backend

3. ~~**Add `app.enableShutdownHooks()`**~~ — **Done.** Added to
   `backend/src/main.ts` for graceful MongoDB disconnection on SIGTERM.

4. **Set production environment variables in Render:**

   | Variable | Value |
   |----------|-------|
   | `MONGODB_URI` | Atlas connection string (`mongodb+srv://...`) |
   | `JWT_SECRET` | Generated random string (e.g. `openssl rand -hex 32`) |
   | `CORS_ORIGIN` | Vercel frontend URL (e.g. `https://ablespace.vercel.app`) |
   | `PORT` | `4000` (or leave unset — Render assigns one) |

4. **Whelist Render IPs in Atlas** — add the outbound IP range or
   `0.0.0.0/0` for the free tier.

### Optional hardening (not blocking)

5. ~~Add `app.enableShutdownHooks()` in `backend/src/main.ts` for graceful
   shutdown.~~ **Done.**
6. Make seed service conditional via a `SEED_ON_START` env var to prevent
   unwanted data in production.
7. Add `helmet` for HTTP security headers.

---

## 8. Current Status

| Item | Status |
|------|--------|
| Frontend API base URL configurable | **Done** — reads `NEXT_PUBLIC_API_URL` |
| Backend graceful shutdown hooks | **Done** — `enableShutdownHooks()` added |
| Backend `.env.example` updated | **Done** — production instructions added |
| Deployment not started | Confirmed |
| MongoDB Atlas cluster created | Not yet created |
| Vercel project linked | Not yet linked |
| Render service created | Not yet created |
| First production deploy | Pending Atlas + hosting setup |
