// import Image from "next/image";
// import React from "react";

// const ImageGallery = ({ propertyImg, onImageClick }) => {
//   console.log(propertyImg.length);

//   return (
//     <div className="grid   gap-2 image-gallery-container">
//       <div
//         className={`max-md:w-full  cursor-pointer ${
//           propertyImg.length === 1 ? "w-full" : "w-full"
//         }`}
//         onClick={() => onImageClick(0)}
//       >
//         <Image
//           className="w-full h-full object-cover rounded-md"
//           src={propertyImg[0]}
//           alt="Main Property"
//           width={600}
//           height={600}
//         />
//       </div>
//       {propertyImg.length > 1 && (
//         <div className="grid grid-cols-2 gap-2 max-md:hidden ">
//           {propertyImg.slice(1, 5).map((item, i) => (
//             <div
//               key={i}
//               className="cursor-pointer"
//               onClick={() => onImageClick(i + 1)}
//             >
//               <Image
//                 className="w-full h-full object-cover rounded-md"
//                 src={item}
//                 alt={`Thumbnail ${i}`}
//                 width={300}
//                 height={300}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageGallery;

import Image from "next/image";
import React from "react";
import { SlPicture } from "react-icons/sl";
const ImageGallery = ({ propertyImg, onImageClick }) => {
  return (
    <div className="flex gap-2 mb-6">
      <div
        className={`max-md:w-full w-1/2  cursor-pointer relative `}
        onClick={() => onImageClick(0)}
      >
        <Image
          className="w-full h-full object-cover max-md:rounded-none rounded-md bg-loader aspect-[16/10]"
          src={propertyImg[0]}
          alt="Main Property"
          width={600}
          height={600}
        />
        {propertyImg.length > 1 && (
          <div className="absolute bottom-4 right-4 py-[6px] px-2 rounded bg-white text-sm inline-flex gap-2 items-center font-semibold">
            <SlPicture />
            show more
          </div>
        )}
      </div>
      {propertyImg.length > 1 && (
        <div className="grid grid-cols-2 gap-2 w-1/2 max-md:hidden ">
          {propertyImg.slice(1, 5).map((item, i) => (
            <div
              key={i}
              className="cursor-pointer"
              onClick={() => onImageClick(i + 1)}
            >
              <Image
                className="w-full h-full object-cover rounded-md bg-loader aspect-[16/10]"
                src={item}
                alt={`Thumbnail ${i}`}
                width={300}
                height={300}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
