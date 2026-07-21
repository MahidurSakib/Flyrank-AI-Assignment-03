import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to your AI Study Assistant</h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
        Summarize notes, generate quiz questions, and review your study
        history — all in one place. This app is in early development; more
        features are on the way.
      </p>
      <div className="flex gap-4 flex-wrap">
        <Link
          href="/chat"
          className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Start a chat
        </Link>
        <Link
          href="/health"
          className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          style={{ borderColor: "var(--border)" }}
        >
          Check system health
        </Link>
      </div>
    </div>
  );
}
