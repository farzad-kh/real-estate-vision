 
import Image from "next/image";
 
const ImageCardUI = ({ imgUrl }) => {


 
  return (
    <Image
    width={400} 
    height={300} 
    quality={75} 
    loading="lazy"
    className={`w-full overflow-hidden rounded-md aspect-[16/10] bg-loader swiper-lazy`}
    alt="property image"
    data-src={imgUrl}  
 
     src={imgUrl}
    />
 
  );
};

export default ImageCardUI;
