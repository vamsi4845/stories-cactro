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
  const handleUserStory = (user_story: UserStory) => {
    setUserStory(user_story);
  };
  return (
    <div className="relative w-full">
      <div className="flex items-center gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth px-4 py-6">
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
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-white via-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-white via-white to-transparent pointer-events-none" />
    </div>
  );
}
