import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Demart — Premium Digital Marketplace",
  description:
    "Browse exclusive themes, packages, and resources crafted by Demart. Find the perfect solution for your next project.",
  keywords: ["demart", "themes", "packages", "digital marketplace"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
