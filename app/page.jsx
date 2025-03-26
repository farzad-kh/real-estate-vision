import HomeContainer from "./components/template/HomeContainer";

export default async function Home() {
  return (
    <div className="overflow-hidden">
      <HomeContainer />
    </div>
  );
}
export const revalidate = 30;

 