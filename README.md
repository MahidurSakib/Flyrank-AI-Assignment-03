# AI Study Assistant

A Next.js app that helps students summarize notes, generate quiz questions,
and review study history with the help of AI.

## Status
✅ Core chat feature is live — real streaming conversations with Claude via
the Vercel AI SDK. Other routes (history, settings) are still placeholders.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Vercel AI SDK (`ai`, `@ai-sdk/anthropic`, `@ai-sdk/react`) + Claude
- Deployed on Vercel

## Routes
- `/` — Home
- `/chat` — **Real streaming AI chat**, backed by `/api/chat`
- `/history` — Past study sessions (placeholder)
- `/settings` — User preferences (placeholder)
- `/health` — Health-check page, renders live data from `/api/health`

## The chat feature

- **`src/app/api/chat/route.ts`** — server route handler. Calls Claude via
  the AI SDK's `streamText`, returns a streamed UI message response. The
  Anthropic API key is read here, server-side only, and never sent to the
  browser.
- **`src/app/chat/page.tsx`** — client component using the `useChat` hook.
  Handles the thinking indicator, token-by-token rendering, a working
  Stop button, and auto-scroll that releases its pin the moment the user
  scrolls up (with a "Jump to latest" button to re-pin).
- **`src/lib/ai-config.ts`** — single well-commented module holding the
  system prompt, model choice, and generation settings (temperature,
  max tokens). Change the assistant's behavior here.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

You'll need an Anthropic API key (`ANTHROPIC_API_KEY`) for the chat feature
to work — get one at [console.anthropic.com](https://console.anthropic.com).
No secrets are committed to this repo.

## Deployment

This project is connected to Vercel for automatic preview deployments on
every push. **Remember to add `ANTHROPIC_API_KEY` as an environment
variable in the Vercel project settings** — it won't be picked up from
`.env.local`, which isn't committed.

## License
MIT
