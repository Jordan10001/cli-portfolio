import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { TerminalPreloader } from "@/components/terminal/TerminalPreloader";
import { SITE } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE.name} — Terminal Portfolio`,
  description: SITE.description,
  keywords: [
    "Portfolio",
    "Terminal Portfolio",
    "CLI Portfolio",
    "Aaron Jordan",
    "Data Science",
    "Data Analytics",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${SITE.name} — Terminal Portfolio`,
    description: SITE.description,
    url: SITE.url,
    siteName: `${SITE.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("portfolio-theme");if(s&&["green","purple","blue","red","yellow"].indexOf(s)!==-1){document.documentElement.setAttribute("data-theme",s);}else{document.documentElement.setAttribute("data-theme","green");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-mono bg-[var(--color-background)] text-[var(--color-text)]">
        <ThemeProvider>
          <SmoothScrollProvider>
            <TerminalPreloader />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
