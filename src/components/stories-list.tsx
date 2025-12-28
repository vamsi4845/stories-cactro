import { Plus } from "lucide-react";
import { useRef, useEffect } from "react";
import type { UserStory } from "../types/stories";
import UserAvatar from "./user-avatar";

interface StoriesListProps {
  stories: UserStory[];
  setUserStory: (user_story: UserStory) => void;
}

export default function StoriesList({
  stories,
  setUserStory,
}: StoriesListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleUserStory = (user_story: UserStory) => {
    setUserStory(user_story);
  };
  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth p-3 flex-nowrap"
      >
        <div className="flex flex-col items-center gap-2 shrink-0 px-2">
          <button className="w-16 h-16 rounded-full border-2 border-orange-500 bg-gray-100 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 hover:bg-gray-200">
            <Plus size={24} className="text-gray-600" />
          </button>
          <span className="text-xs text-gray-600 max-w-[64px] truncate">
            Your story
          </span>
        </div>
        {stories.map((user_story: UserStory) => (
          <div
            key={user_story.username}
            className="flex flex-col items-center gap-2 flex-shrink-0"
            onClick={() => handleUserStory(user_story)}
          >
            <UserAvatar
              src={user_story.profile_pic}
              alt={user_story.username}
              size="md"
              borderColor="border-orange-500"
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
            />
            <span className="text-xs text-gray-600 max-w-[64px] truncate">
              {user_story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
