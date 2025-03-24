import HomeContainer from "./components/template/HomeContainer";

export default async function Home({}) {
  return (
    <div className="overflow-hidden">
      <HomeContainer />
    </div>
  );
}
export const revalidate = 60;

// export const metadata = {
//   title: "Find Your Dream Home with Home Vision",
//   description: "Discover the best properties for sale and rent with Home Vision. Your dream home is just a search away.",
//   keywords: "home vision, real estate, buy house, rent apartment, property listings, dream home, real estate agency",
//   openGraph: {
//     title: "Find Your Dream Home with Home Vision",
//     description: "Discover the best properties for sale and rent with Home Vision. Your dream home is just a search away.",
//     type: "website",
//     url: "https://homevisions.vercel.app",
    
//   },
//   viewport: "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no",
//   charset: "UTF-8",
// };