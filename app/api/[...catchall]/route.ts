import { NextResponse } from "next/server";
import {
  extractCommentSummary,
  extractPostSummary,
} from "../../../lib/extractors";

export const runtime = "edge";
export const revalidate = 10;

export async function GET(request: Request) {
  const urlObj = new URL(request.url);
  const path = urlObj.pathname.replace("/api/", "");
  const queryParams = urlObj.search;

  try {
    const redditResponse = await fetch(
      `https://api.reddit.com/${path}${queryParams}`
    );
    const redditData = await redditResponse.json();

    if (isPostListingResponse(redditData)) {
      // Handle posts
      const summaries = redditData.data.children.map(extractPostSummary);
      return NextResponse.json(summaries);
    } else if (isCommentsResponse(redditData)) {
      if (path.startsWith("r/") && path.includes("/comments/")) {
        // Handle comments
        const comments = redditData[1].data.children.map(extractCommentSummary);
        return NextResponse.json(comments);
      }
    } else {
      return new Response(null, {
        status: 400,
        statusText: "Invalid Reddit API response",
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 500,
      statusText: "Failed to fetch data from Reddit",
    });
  }
}

const isPostListingResponse = (data: any) => {
  return data && data.data && Array.isArray(data.data.children);
};

const isCommentsResponse = (data: any) => {
  return (
    data &&
    Array.isArray(data) &&
    data[0].kind === "Listing" &&
    data[1].kind === "Listing"
  );
};
