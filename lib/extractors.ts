import { RedditCommentSummary, RedditPostSummary } from "./types";

export const extractPostSummary = (post: any): RedditPostSummary => {
  const { title, subreddit, author, score, num_comments, created_utc, permalink, thumbnail, selftext, url } = post.data;

  return {
    title,
    subreddit,
    author,
    score,
    num_comments,
    created_utc: new Date(created_utc * 1000).toLocaleString(),
    permalink: `https://reddit.com${permalink}`,
    thumbnail: thumbnail.startsWith('http') ? thumbnail : null,
    content: selftext || url,
  };
};

export const extractCommentSummary = (comment: any): RedditCommentSummary => {
  const { author, body, score, created_utc } = comment.data;

  return {
    author,
    body,
    score,
    created_utc: new Date(created_utc * 1000).toLocaleString(),
  };
};