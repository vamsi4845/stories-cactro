import type { UserStory } from "../types/stories";

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
    <div className="flex items-center justify-evenly gap-4 max-w-xl overflow-auto p-4">
      {stories.map((user_story: UserStory) => (
        <div
          key={user_story.username}
          className=" min-w-15 min-h-15"
          onClick={() => handleUserStory(user_story)}
        >
          <img
            src={user_story.profile_pic}
            alt={user_story.username}
            className="object-contain rounded-full"
          />
        </div>
      ))}
    </div>
  );
}
