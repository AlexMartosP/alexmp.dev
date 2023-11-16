"use client";
import { cn } from "@/lib/cn";
import { PropsWithChildren, ReactNode } from "react";

export function Tabs({ children }: PropsWithChildren) {
  return (
    <div className="flex p-1 bg-gray-100 rounded-xl w-full">{children}</div>
  );
}

export function Tab({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 py-2 text-sm font-medium rounded-[11px]",
        active && "bg-gray-800 text-white"
      )}
    >
      {children}
    </button>
  );
}
