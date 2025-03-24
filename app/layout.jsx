import { Work_Sans } from "next/font/google";
import "./globals.css";
 
import Layout from "./components/layout/Layout";
 

const inter = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata = {
  title: "Find Your Dream Home with Home Vision",
  description: "Discover the best properties for sale and rent with Home Vision. Your dream home is just a search away.",
  keywords: "home vision, real estate, buy house, rent apartment, property listings, dream home, real estate agency",
  openGraph: {
    title: "Find Your Dream Home with Home Vision",
    description: "Discover the best properties for sale and rent with Home Vision. Your dream home is just a search away.",
    type: "website",
    url: "https://homevisions.vercel.app",
    
  },
  viewport: "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no",
  charset: "UTF-8",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

