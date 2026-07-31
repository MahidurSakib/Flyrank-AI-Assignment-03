import { google } from "@ai-sdk/google"; 
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { CHAT_MODEL, MODEL_CONFIG, SYSTEM_PROMPT } from "@/lib/ai-config";

// Allow streaming responses up to 30 seconds before Vercel times out the
// function. Chat replies for a study assistant should finish well within
// this window; raise it only if you expect long-running generations.
export const maxDuration = 30;

/**
 * POST /api/chat
 *
 * Receives the full conversation history from the client (sent by the
 * `useChat` hook on every turn), calls Claude with streaming enabled, and
 * pipes the response back as a UI message stream that `useChat` knows how
 * to consume token-by-token.
 *
 * The Anthropic API key is read server-side only, from
 * process.env.ANTHROPIC_API_KEY (set in `.env.local`, never committed).
 * It never reaches the browser — the client only ever talks to this route.
 */
export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-3.6-flash"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    ...MODEL_CONFIG,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
