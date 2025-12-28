import { useState } from "react";
import StoriesList from "../components/stories-list";
import { STORIES } from "../lib/constants";
import { POSTS } from "../lib/posts-data";
import type { UserStory } from "../types/stories";
import StoryItem from "../components/story-item";
import PostsFeed from "../components/posts-feed";
import AppHeader from "../components/app-header";

export default function Home() {
  const [userStory, setUserStory] = useState<UserStory | null>(null);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const handleSetUserStory = (story: UserStory) => {
    const index = STORIES.findIndex((s) => s.username === story.username);
    setCurrentUserIndex(index);
    setUserStory(story);
  };

  const handleSetUserStoryNull = (story: UserStory | null) => {
    setUserStory(story);
  };

  const handleSetCurrentUserIndex = (index: number) => {
    setCurrentUserIndex(index);
    setUserStory(STORIES[index]);
  };

  return (
    <div className="max-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {userStory ? (
          <StoryItem
            key={userStory.username}
            userStory={userStory}
            setUserStory={handleSetUserStoryNull}
            allStories={STORIES}
            currentUserIndex={currentUserIndex}
            setCurrentUserIndex={handleSetCurrentUserIndex}
          />
        ) : (
          <div className="bg-white max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white z-10">
              <AppHeader />
            </div>
            <StoriesList stories={STORIES} setUserStory={handleSetUserStory} />
            <div className="border-t border-gray-200">
              <PostsFeed posts={POSTS} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
