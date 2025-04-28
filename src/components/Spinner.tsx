import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "white";
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "primary",
  className = "",
}) => {
  // Size classes
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  // Color classes
  const colorClasses = {
    primary:
      "border-t-pink-500 border-r-pink-500 border-b-transparent border-l-transparent",
    secondary:
      "border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent",
    accent:
      "border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent",
    white:
      "border-t-white border-r-white border-b-transparent border-l-transparent",
  };

  return (
    <div
      className={`flex items-center justify-center w-full h-full ${className}`}
    >
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
