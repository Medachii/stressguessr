import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StressGuessr",
  description: "Learn how to stress words in English !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
