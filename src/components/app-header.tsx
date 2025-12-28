import { Heart, MessageCircle } from "lucide-react";
import InstagramLogo from "./instagram-logo";

export default function AppHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <InstagramLogo className="text-gray-900" />
      <div className="flex items-center gap-4">
        <Heart size={24} />
        <MessageCircle size={24} className="text-gray-900" />
      </div>
    </div>
  );
}
