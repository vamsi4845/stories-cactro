import type { Post } from "../types/posts";
import PostItem from "./post-item";

interface PostsFeedProps {
  posts: Post[];
}

export default function PostsFeed({ posts }: PostsFeedProps) {
  return (
    <div className="divide-y divide-gray-200">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
