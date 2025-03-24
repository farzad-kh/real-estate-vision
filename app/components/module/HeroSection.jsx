import SerachHeroInput from "./SerachHeroInput";
import TextSlider from "./TextSlider";
import PerPageSlider from "./PerPageSlider";

import RecentlyContainer from "./RecentlyContainer";

const HeroSection = () => {
  return (
    <>
  
      <SerachHeroInput />
      <div className="min-h-screen container max-w-screen-2xl  m-auto max-md:p-4 p-7">
        <div className="space-y-14 flex flex-col">
          <div></div>
          <PerPageSlider />
          <RecentlyContainer />
          <br className="mt-4"></br>
          <TextSlider />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
