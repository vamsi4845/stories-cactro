import { X } from "lucide-react";
import type { UserStory } from "../types/stories";
import { useState } from "react";

interface StoryItemProps {
  userStory: UserStory;
  setUserStory: (userStory: UserStory | null) => void;
}

export default function StoryItem({ userStory, setUserStory }: StoryItemProps) {
  const [storyId, setStoryId] = useState(userStory.stories[0].id);

  const handleResetUserStory = () => setUserStory(null);

  return (
    <div className="flex flex-col p-4 relative">
      <header className="absolute top-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={userStory.profile_pic}
              alt={userStory.username}
              fetchPriority="high"
              className="w-15 h-15 object-contain rounded-full"
            />
            <p className="text-2xl">{userStory.username}</p>
          </div>
          <button onClick={handleResetUserStory} className="cursor-pointer">
            <X />
          </button>
        </div>
      </header>
      <img src={userStory.stories[0].url} className="h-[95vh]" />
    </div>
  );
}
