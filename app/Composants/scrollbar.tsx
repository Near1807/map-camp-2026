// components/ScrollableNoBar.tsx
"use client";
import { ReactNode } from "react";

export function ScrollableNoBar({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-y-auto overscroll-contain scrollbar-hidden ${className}`}>
      {children}
      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}