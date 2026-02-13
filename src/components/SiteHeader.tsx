"use client";

import { Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { useLocale } from "@/lib/locale-context";

export function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40 print:hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo / Brand */}
        <a
          href="https://cushlabs.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="font-display font-semibold text-base text-muted-foreground hover:text-[#FF6A3D] transition-colors"
        >
          CushLabs<span className="text-[#FF6A3D]">.ai</span>
        </a>

        {/* Toggles */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer"
            aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
          >
            <Globe className="w-4 h-4" />
            <span className="font-mono uppercase">{locale === "en" ? "ES" : "EN"}</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
