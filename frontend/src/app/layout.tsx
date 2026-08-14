import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "../components/app-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management System",
  description: "Full-stack Task Management System",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full flex bg-background flex-col">
        <Script id="ablespace-pre-paint" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("ablespace:theme");var a=localStorage.getItem("ablespace:color-mode");var d=document.documentElement;if(t==="dark"||t==="light")d.dataset.theme=t;if(a)d.dataset.accent=a;}catch(e){}})();`}
        </Script>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
