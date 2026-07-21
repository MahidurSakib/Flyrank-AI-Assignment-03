import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Study Assistant",
  description: "An AI-powered study companion built with Next.js.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Chat" },
  { href: "/history", label: "History" },
  { href: "/settings", label: "Settings" },
  { href: "/health", label: "Health" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b" style={{ borderColor: "var(--border)" }}>
          <nav className="max-w-4xl mx-auto flex flex-wrap items-center gap-x-6 gap-y-2 px-4 sm:px-6 py-4">
            <span className="font-semibold text-lg mr-2">AI Study Assistant</span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
        <footer className="border-t text-center text-xs text-gray-500 py-4" style={{ borderColor: "var(--border)" }}>
          Built with Next.js &amp; Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
