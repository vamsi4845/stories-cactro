interface UserAvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  borderColor?: string;
  hoverBorderColor?: string;
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

export default function UserAvatar({
  src,
  alt,
  size = "md",
  borderColor = "border-gray-300",
  hoverBorderColor,
  className = "",
  fetchPriority = "auto",
}: UserAvatarProps) {
  const sizeClass = sizeClasses[size];
  const hoverClass = hoverBorderColor
    ? `hover:${hoverBorderColor} transition-colors`
    : "";

  return (
    <img
      src={src}
      alt={alt}
      fetchPriority={fetchPriority}
      className={`${sizeClass} object-cover rounded-full border-2 ${borderColor} ${hoverClass} ${className}`}
    />
  );
}
