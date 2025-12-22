"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import { SiteCard } from "@/components/ui/site-card";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  searchSection?: ReactNode; // Add optional search section
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export function PageHeader({
  title,
  subtitle,
  backgroundImage,
  backgroundAlt,
  searchSection,
}: PageHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const signRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-[200px] flex items-center bg-white">
      {/* Plus d'icônes d'angle absolues sur la grille, seulement sur la carte du titre */}
      <div className="container mx-auto py-6 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-black/[0.2] dark:border-white/[0.2]">
          {/* Ligne 1 : titre/sous-titre (2 colonnes), image (1 colonne) */}
          <div className="md:col-span-2 col-span-1 border-r border-b border-black/[0.2] dark:border-white/[0.2]">
            <SiteCard
              title={decodeHtmlEntities(title)}
              description={subtitle ? decodeHtmlEntities(subtitle) : undefined}
              hideImage
              className="h-full mb-0 border-none"
              hideCorners={false}
              showTopLeftCorner={true}
              showTopRightCorner={true}
              showBottomLeftCorner={true}
              showBottomRightCorner={true}
            />
          </div>
          <div className="md:col-span-1 col-span-1 border-b border-r border-black/[0.2] dark:border-white/[0.2] p-0 m-0 align-bottom">
            {backgroundImage && (
              <SiteCard
                image={backgroundImage}
                imageAlt={backgroundAlt || title}
                title=""
                description=""
                className="h-full min-h-full max-h-full border-none p-0 m-0 bg-cover"
                hideCorners={false}
                showTopLeftCorner={false}
                showTopRightCorner={true}
                showBottomLeftCorner={false}
                showBottomRightCorner={true}
              />
            )}
          </div>
          {/* Ligne 2 : moteur de recherche sur 3 colonnes */}
          {searchSection && (
            <div className="md:col-span-3 col-span-1 border-b border-r border-black/[0.2] dark:border-white/[0.2]">
              <SiteCard 
                hideImage 
                className="p-0 border-none"
                hideCorners={false}
                showTopLeftCorner={false}
                showTopRightCorner={true}
                showBottomLeftCorner={true}
                showBottomRightCorner={true}
              >
                <div className="p-6">
                  <div className="w-full flex flex-col gap-4 [&_input]:rounded-none [&_input]:shadow-none [&_input]:border-0 [&_input]:border-b-2 [&_input]:border-black/60 [&_input]:focus:ring-0 [&_input]:focus:border-b-1 [&_input]:focus:border-black/80 [&_select]:rounded-none [&_select]:shadow-none [&_select]:border-0 [&_select]:border-b-4 [&_select]:border-primary [&_select]:focus:ring-0 [&_select]:focus:border-b-4 [&_select]:focus:border-primary">
                    {searchSection}
                  </div>
                </div>
              </SiteCard>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
