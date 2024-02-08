import type { Metadata } from "next";
import { Inter, Redacted_Script } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./styles.css";

const inter = Inter({ subsets: ["latin"] });

const loadingFont = Redacted_Script({
  weight: ["400"],
  subsets: ["latin"],
  display: "block",
});

export const metadata: Metadata = {
  title: "What2Wearther",
  description: "Weather clothing recommendation app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="web-base">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
