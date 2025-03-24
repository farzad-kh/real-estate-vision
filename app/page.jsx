import HomeContainer from "./components/template/HomeContainer";

 

export default async function Home({}) {
  return (
    <div className="overflow-hidden">
      <HomeContainer />
    </div>
  );
}
export const revalidate = 60;

export const metadata = {
  title: 'Home - Home Vision',
  description: 'Discover the best real estate listings on Home Vision. Find your dream home and connect with property owners effortlessly.',
  keywords: 'buy home, sell home, rent apartment, real estate, property listings, housing market',
  openGraph: {
    title: 'Home - Home Vision',
    description: 'Discover the best real estate listings on Home Vision. Find your dream home and connect with property owners effortlessly.',
    type: 'website',
    // url: '',
  },
};