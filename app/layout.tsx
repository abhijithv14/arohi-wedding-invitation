import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import { weddingConfig } from "@/config/wedding";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: `${weddingConfig.bride.name} & ${weddingConfig.groom.name} | Wedding Invitation`,
  description: `Join ${weddingConfig.bride.name} and ${weddingConfig.groom.name} as they celebrate their wedding on ${weddingConfig.mainWeddingDate} in Trivandrum, Kerala.`,
  openGraph: {
    title: `${weddingConfig.bride.name} & ${weddingConfig.groom.name} Wedding Invitation`,
    description: `We invite you to celebrate our special wedding day on ${weddingConfig.mainWeddingDate}.`,
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <body className="font-sans bg-[#FAF7F2] text-[#2C2723] antialiased selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
