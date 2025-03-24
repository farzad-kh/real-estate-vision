import { Work_Sans } from "next/font/google";
import "./globals.css";

import Layout from "./components/layout/Layout";
import Head from "next/head";

const inter = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Find Your Dream Home with Home Vision",
  description:
    "Discover the best properties for sale and rent with Home Vision. Your dream home is just a search away.",
  keywords:
    "home vision, real estate, buy house, rent apartment, property listings, dream home, real estate agency",
  openGraph: {
    title: "Find Your Dream Home with Home Vision",
    description:
      "Discover the best properties for sale and rent with Home Vision. Your dream home is just a search away.",
    type: "website",
    url: "https://homevisions.vercel.app",
  },
};

export const viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: "no",
};
