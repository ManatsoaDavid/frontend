import React, { ReactNode } from 'react';

interface TooltipProps {
  content?: string;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  if (!content) return <>{children}</>;

  return (
    <div className="group relative">
      {children}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1
                    bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100
                    transition-opacity duration-200 whitespace-nowrap">
        {content}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2
                     border-4 border-transparent border-b-gray-800" />
      </div>
    </div>
  );
};
