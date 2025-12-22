import * as React from "react";

// Icône + stylisée pour les coins
export function Icon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2v2M12 20v2M2 12h2M20 12h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Carte placeholder stylisée (EvervaultCard)
export function EvervaultCard({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 text-2xl font-bold rounded-none">
      {text}
    </div>
  );
}
