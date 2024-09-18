import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
const cairo = Cairo({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Journals App",
  description: "journals App by Nextjs and tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.className} h-screen`}>
        {children}
        
      </body>
    </html>
  );
}
