import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import { Toaster } from "sonner";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Background } from "@/components/server-components";
import { ThemeProvider } from "@/hooks/themeProvider";

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  fallback: ['Inter', 'Aptos', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: "Centeno Advisory",
  description: "Created by Emmanuel",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className="box-border flex flex-col mx-auto my-0 min-h-full font-sans antialiased text-main relative bg-transparent">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={true}
        >
          <Background />
          {children}
          <Toaster richColors position="top-center" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
