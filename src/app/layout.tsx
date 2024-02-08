import type { Metadata } from "next";
import { Inter, Redacted_Script } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./styles.css";

type CustomCSSVariables = {
  "--font-family-primary": string;
  "--font-family-loading": string;
};

const primaryFont = Inter({ subsets: ["latin"] });

const loadingFont = Redacted_Script({
  weight: ["400"],
  subsets: ["latin"],
  display: "block",
});

export const metadata: Metadata = {
  title: "What2Wearther",
  description: "Weather clothing recommendation app",
};

export interface CustomBodyStyle
  extends React.CSSProperties,
    CustomCSSVariables {}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customStyles: CustomBodyStyle = {
    "--font-family-primary": primaryFont.style.fontFamily,
    "--font-family-loading": loadingFont.style.fontFamily,
  };

  return (
    <html lang="en">
      <body className="body" style={customStyles}>
        <div className="web-base">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
