import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import type { Post } from "../types/posts";
import UserAvatar from "./user-avatar";
import { useState } from "react";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="border-b border-gray-200">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserAvatar
            src={post.profile_pic}
            alt={post.username}
            size="sm"
            borderColor="border-gray-300"
          />
          <div>
            <p className="font-semibold text-sm text-gray-900">
              {post.username}
            </p>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>
      </div>
      <img
        src={post.image_url}
        alt={post.caption}
        className="w-full object-cover"
      />
      <div className="px-4 py-3">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={handleLike}
            className="transition-transform active:scale-95"
          >
            <Heart
              size={24}
              className={
                isLiked ? "fill-red-500 text-red-500" : "text-gray-900"
              }
            />
          </button>
          <MessageCircle size={24} className="text-gray-900" />
          <Share2 size={24} className="text-gray-900" />
          <div className="flex-1" />
          <Bookmark size={24} className="text-gray-900" />
        </div>
        <p className="font-semibold text-sm text-gray-900 mb-1">
          {likes.toLocaleString()} likes
        </p>
        <p className="text-sm text-gray-900 mb-1">
          <span className="font-semibold">{post.username}</span> {post.caption}
        </p>
        <button className="text-sm text-gray-500 mb-1">
          View all {post.comments} comments
        </button>
        <p className="text-xs text-gray-500 uppercase">{post.timestamp}</p>
      </div>
    </div>
  );
}
