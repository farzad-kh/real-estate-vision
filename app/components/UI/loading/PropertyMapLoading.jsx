
import animationData from "@/public/google-anime.json";
import Lottie from "lottie-react";
const PropertyMapLoading = () => {
    return (
        <div className="flex justify-start w-full bg-[#f5f5f5] h-[380px] rounded overflow-hidden ">
        <div className=" self-center flex justify-center w-full ">
          <Lottie
            className="max-md:w-[50%] w-[20%] max-md:h-[50%] h-[20%] "
            animationData={animationData}
            loop={true}
          />
        </div>
      </div>
    );
};

export default PropertyMapLoading;