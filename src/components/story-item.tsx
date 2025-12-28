import { X } from "lucide-react";
import type { UserStory } from "../types/stories";
import { useState, useEffect, useRef, useCallback } from "react";
import UserAvatar from "./user-avatar";

interface StoryItemProps {
  userStory: UserStory;
  setUserStory: (userStory: UserStory | null) => void;
  allStories: UserStory[];
  currentUserIndex: number;
  setCurrentUserIndex: (index: number) => void;
}

const STORY_DURATION = 5000;

export default function StoryItem({
  userStory,
  setUserStory,
  allStories,
  currentUserIndex,
  setCurrentUserIndex,
}: StoryItemProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const currentStory = userStory.stories[currentStoryIndex];
  const totalStories = userStory.stories.length;

  const handleNextUser = useCallback(() => {
    if (currentUserIndex < allStories.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      setUserStory(null);
    }
  }, [currentUserIndex, allStories.length, setCurrentUserIndex, setUserStory]);

  const handlePreviousUser = useCallback(() => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
    } else {
      setUserStory(null);
    }
  }, [currentUserIndex, setCurrentUserIndex, setUserStory]);

  const handleNext = useCallback(() => {
    setCurrentStoryIndex((prevIndex) => {
      if (prevIndex < totalStories - 1) {
        return prevIndex + 1;
      } else {
        handleNextUser();
        return prevIndex;
      }
    });
    setProgress(0);
  }, [totalStories, handleNextUser]);

  const handlePrevious = useCallback(() => {
    setCurrentStoryIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        handlePreviousUser();
        return prevIndex;
      }
    });
    setProgress(0);
  }, [handlePreviousUser]);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
      return;
    }

    const progressStep = 100 / (STORY_DURATION / 50);
    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + progressStep;
      });
    }, 50);

    intervalRef.current = window.setTimeout(() => {
      handleNext();
    }, STORY_DURATION);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
    };
  }, [currentStoryIndex, isPaused, userStory, handleNext]);

  const handleResetUserStory = () => setUserStory(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width / 2) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-black cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="flex gap-1 mb-4">
          {userStory.stories.map((_, index) => (
            <div
              key={index}
              className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-75 ease-linear"
                style={{
                  width:
                    index < currentStoryIndex
                      ? "100%"
                      : index === currentStoryIndex
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar
              src={userStory.profile_pic}
              alt={userStory.username}
              size="sm"
              borderColor="border-white"
              fetchPriority="high"
            />
            <p className="text-white text-lg font-medium">
              {userStory.username}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleResetUserStory();
            }}
            className="cursor-pointer text-white hover:text-white/70 transition-colors"
          >
            <X size={24} />
          </button>
        </header>
      </div>
      <img
        src={currentStory.url}
        alt={`Story ${currentStoryIndex + 1}`}
        className="w-full h-full object-contain"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-auto" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-auto" />
      </div>
    </div>
  );
}
