export type RedditPostSummary = {
  title: string;
  subreddit: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: string;
  permalink: string;
  thumbnail: string | null;
  content: string;
}

export type RedditCommentSummary = {
  author: string;
  body: string;
  score: number;
  created_utc: string;
}