"use client";

import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border/40 mt-12 py-8 print:mt-4 print:py-4">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm text-muted-foreground">
          {t.builtBy}{" "}
          <a
            href="https://cushlabs.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display font-semibold hover:text-[#FF6A3D] transition-colors"
          >
            CushLabs<span className="text-[#FF6A3D]">.ai</span>
          </a>
        </p>
        <p className="text-xs text-muted-foreground mt-1">{t.tagline}</p>
      </div>
    </footer>
  );
}
