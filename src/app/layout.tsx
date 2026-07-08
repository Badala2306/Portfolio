import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains"
});

export const metadata: Metadata = {
  title: "Manan Badala — Data Analyst | SQL, Excel, Power BI, Python",
  description:
    "Portfolio of Manan Badala, an Electronics & Computer Engineering student specializing in Data Analytics — SQL, Excel, Power BI, and Python. Explore projects in dashboarding, business analysis, and database design.",
  keywords: [
    "Manan Badala",
    "Data Analyst",
    "SQL",
    "Power BI",
    "Excel Dashboard",
    "Data Analytics Portfolio",
    "Business Intelligence"
  ],
  openGraph: {
    title: "Manan Badala — Data Analyst Portfolio",
    description:
      "SQL • Excel • Power BI • Python — Data analytics projects and case studies.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body bg-base text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
