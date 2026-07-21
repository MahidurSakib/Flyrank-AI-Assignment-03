# AI Study Assistant

A Next.js app that helps students summarize notes, generate quiz questions,
and review study history with the help of AI.

## Status
🚧 Foundations phase — routes and layout are scaffolded; AI integration comes
in a later phase.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Deployed on Vercel

## Routes
- `/` — Home
- `/chat` — AI chat interface (placeholder responses for now)
- `/history` — Past study sessions (placeholder)
- `/settings` — User preferences (placeholder)
- `/health` — Health-check page, renders live data from `/api/health`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values as needed:

```bash
cp .env.example .env.local
```

No secrets are committed to this repo.

## Deployment

This project is connected to Vercel for automatic preview deployments on
every push.

## License
MIT
