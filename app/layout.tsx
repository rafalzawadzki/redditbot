import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Custom ChatGPT chatbot for Reddit API",
  description:
    "Ask this custom ChatGPT chatbot to search and summarize the newest, hot, top etc posts anywhere on Reddit. Made with Reddit API, NextJS and Chatwith.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
