import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4, DM_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-context";
import { LocaleProvider } from "@/lib/locale-context";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Compensation Plan Simulator | CushLabs",
  description:
    "Interactive compensation plan simulator for direct-selling companies. Model commission structures, override percentages, and network parameters with real-time financial impact analysis.",
  metadataBase: new URL("https://comp-plan-simulator.vercel.app"),
  openGraph: {
    title: "Compensation Plan Simulator",
    description:
      "Model commission structures and see financial impact in real time. Built by CushLabs.ai.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${sourceSerif.variable} ${dmMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LocaleProvider>
            <TooltipProvider>
              <SiteHeader />
              {children}
            </TooltipProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
