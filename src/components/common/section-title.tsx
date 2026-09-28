import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  text1: string;
  text2: string;
  description?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  text1,
  text2,
  description,
  className,
}) => {
  return (
    <div className={cn("text-center py-8 text-3xl", className)}>
      <div className="inline-flex gap-2 items-center mb-3">
        <p className="text-gray-500 font-medium tracking-wide">
          {text1} <span className="text-gray-700 font-semibold">{text2}</span>
        </p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
      </div>
      {description && (
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
};
