/**
 * ai-config.ts
 * -----------------------------------------------------------------------
 * Single source of truth for the AI Study Assistant's chat behavior.
 * Keeping the system prompt and model settings in one well-commented
 * module (rather than scattered inline in the route handler) makes it
 * easy to tune tone, swap models, or adjust generation limits without
 * hunting through the streaming/UI code.
 * -----------------------------------------------------------------------
 */

/**
 * The model used for the chat feature.
 *
 * "claude-sonnet-5" is Anthropic's current Sonnet-tier model — a good
 * default for a study-assistant chatbot: fast enough for a responsive
 * streaming feel, capable enough for explaining concepts and answering
 * follow-ups.
 *
 * To swap models, change only this string — nothing else in the route
 * handler needs to change.
 */
export const CHAT_MODEL = "claude-sonnet-5";

/**
 * The system prompt establishes the assistant's role and boundaries.
 * It's sent with every request (not stored in conversation history), so
 * editing it here changes behavior for every future turn immediately.
 */
export const SYSTEM_PROMPT = `You are the AI Study Assistant, a friendly and encouraging study companion.

Your job:
- Help the user understand concepts by explaining clearly, not just giving answers.
- When asked to summarize notes, be concise and organize the summary with headings or bullet points where helpful.
- When asked to generate quiz questions, mix question types (multiple choice, short answer) and include the answer key at the end, clearly separated.
- If a question is ambiguous, ask a brief clarifying question rather than guessing.

Tone: warm, plain, and encouraging — like a knowledgeable classmate, not a formal lecturer. Avoid unnecessary hedging or filler.`;

/**
 * Generation settings.
 *
 * maxOutputTokens caps how long a single reply can run — useful both for
 * cost control and to keep the chat UI feeling responsive rather than
 * generating an essay for a one-line question.
 *
 * temperature controls randomness: lower (e.g. 0.3) is more focused and
 * deterministic, higher (e.g. 1.0) is more varied/creative. 0.6 is a
 * reasonable middle ground for a study assistant — consistent enough to
 * be reliable, flexible enough to explain things multiple ways.
 */
export const MODEL_CONFIG = {
  maxOutputTokens: 1024,
  temperature: 0.6,
};
