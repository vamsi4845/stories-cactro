import { useState } from "react";
import StoriesList from "../components/stories-list";
import { STORIES } from "../lib/constants";
import type { UserStory } from "../types/stories";
import StoryItem from "../components/story-item";
export default function Home() {
  const [userStory, setUserStory] = useState<UserStory | null>(null);
  return (
    <div className="max-w-xl border mx-auto w-full h-screen rounded-xl flex flex-col">
      {userStory ? (
        <StoryItem userStory={userStory} setUserStory={setUserStory} />
      ) : (
        <StoriesList stories={STORIES} setUserStory={setUserStory} />
      )}
    </div>
  );
}
