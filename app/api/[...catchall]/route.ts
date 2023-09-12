import { NextResponse } from "next/server";
import { extractCommentSummary, extractPostSummary } from "../../../lib/extractors";

export const runtime = "edge";
export const revalidate = 10;

export async function GET(request: Request) {
  const urlObj = new URL(request.url);
  const path = urlObj.pathname.replace("/api/", "");

  try {
    const redditResponse = await fetch(`https://api.reddit.com/${path}`);
    const redditData = await redditResponse.json();

    if (redditData && redditData.data && Array.isArray(redditData.data.children)) {
      if (path.startsWith('r/') && path.includes('/comments/')) {
        // Handle comments
        const comments = redditData.data.children.map(extractCommentSummary);
        return NextResponse.json(comments);
      } else {
        // Handle posts
        const summaries = redditData.data.children.map(extractPostSummary);
        return NextResponse.json(summaries);
      }
    } else {
      return new Response(null, {
        status: 400,
        statusText: 'Invalid Reddit API response',
      });
    }
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: 'Failed to fetch data from Reddit',
    });
  }
}