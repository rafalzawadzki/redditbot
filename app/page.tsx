import Link from "next/link";
import { ReactNode } from "react";

const CHATWITH_CHATBOT_URL =
  "https://chatwith.tools/embed/abb26b1f-bd88-4b4b-9087-6b43749d61a3?theme=dark";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex flex-col">
        <div className="border border-1 border-zinc-800 rounded-md h-[700px] w-full overflow-hidden isolate">
          <iframe
            id="chat-widget"
            src={CHATWITH_CHATBOT_URL}
            width="100%"
            height="100%"
          ></iframe>
        </div>
        <h1 className="text-sm mt-10 mb-20 text-zinc-500">
          You can ask this custom ChatGPT chatbot to search and summarize the
          newest, hot, top etc posts anywhere on Reddit. This app is{" "}
          <CustomLink url="https://github.com/rafalzawadzki/redditbot">
            open sourced
          </CustomLink>{" "}
          and was built using the free{" "}
          <CustomLink url="https://www.reddit.com/dev/api/">
            Reddit API
          </CustomLink>{" "}
          and <CustomLink url="https://chatwith.tools">Chatwith</CustomLink>, a
          custom ChatGPT chatbot builder. Disclaimer: This app is not affiliated
          with or endorsed by Reddit, Inc. All trademarks are property of their
          respective owners.
        </h1>
      </div>
    </main>
  );
}

const CustomLink = ({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) => (
  <Link
    href={url}
    passHref
    target="_blank"
    rel="noopener noreferrer"
    className="transition-colors duration-200 text-orange-800 hover:text-orange-500"
  >
    {children}
  </Link>
);
