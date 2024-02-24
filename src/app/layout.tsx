import type { Metadata } from "next";
import { Inter, Redacted_Script, Pacifico } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./styles.css";

type CustomCSSVariables = {
  "--font-family-primary": string;
  "--font-family-loading": string;
  "--font-family-header": string;
};

const primaryFont = Inter({ subsets: ["latin"] });

const loadingFont = Redacted_Script({
  weight: ["400"],
  subsets: ["latin"],
  display: "block",
});

const pacificoFont = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "What2Weather",
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
    "--font-family-header": pacificoFont.style.fontFamily,
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
