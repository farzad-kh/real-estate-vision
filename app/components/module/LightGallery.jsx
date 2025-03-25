// "use client";
// import React from "react";
// import LightGallery from "lightgallery/react";

// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lg-zoom.css";
// import "lightgallery/css/lg-thumbnail.css";
// import lgThumbnail from "lightgallery/plugins/thumbnail";
// import lgZoom from "lightgallery/plugins/zoom";
// import Image from "next/image";

// const Gallery = ({ propertyImg }) => {
//   const thumbnails = propertyImg?.slice(0, 5);

//   return (
//     <LightGallery
//       className="animated-thumbnails"
//       speed={350}
//       plugins={[lgThumbnail, lgZoom]}
//       mode="lg-fade"
//       closable={true}
//     >
//       {thumbnails?.map((item, i) => (
//         <a
//           // data-lg-size="1340-838"
//           href={`${item}`}
//           key={item}
//           data-src={`${item}`}
//           className={`block relative overflow-hidden rounded-md   ${
//             i === 0 ? "thumbnails col-span-2" : ""
//           } ${i > 0 && "max-sm:hidden"} ${
//             thumbnails.length === 4 && i === 3 && "col-span-2"
//           }`}
//         >
//           {i === 0 && (
//             <button className="absolute bottom-2 z-40 p-2 bg-slate-200 right-2 rounded text-slate-800 hover:bg-slate-100  font-semibold ">
//               <div href={`/${i === 0 && item}`}>Show all photos </div>
//             </button>
//           )}

//           <Image
//             priority={i === 0}
//             width={0}
//             height={0}
//             sizes="100vw"
//             alt={`IMG_${i + 1}`}
//             src={`${item}`}
//             className={`w-full h-auto object-cover rounded-md hover:scale-105 inline-block overflow-hidden transition-all bg-loader ${
//               i === 0 ? "aspect-[16/9]" : "aspect-[16/10]"
//             } `}
//           />
//         </a>
//       ))}

//       {propertyImg?.slice(5).map((item, i) => (
//         <a
//           // data-lg-size="1920-1080"
//           className="hidden"
//           key={i + 6}
//           href={`${item}`}
//           data-src={`${item}`}
//         >
//           <Image
//             width={0}
//             height={0}
//             sizes="100vw"
//             alt={`IMG_${i + 6}`}
//             src={`${item}`}
//             className="w-full h-auto object-cover rounded-md"
//           />
//         </a>
//       ))}
//     </LightGallery>
//   );
// };

// export default Gallery;
"use client";
 
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
 
import { useState } from "react";
 

 
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import ImageGallery from "./ImageGallery";
import Counter from "yet-another-react-lightbox/plugins/counter";
 
import "yet-another-react-lightbox/plugins/counter.css";

const Gallery = ({ propertyImg }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = propertyImg.map((src) => ({ src }));
  const onImageClick = (i) => {
    setOpen(true);
    setIndex(i);
  };
  return (
    <div className="w-full">
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={window.innerWidth < 786 ? [Zoom, Counter] : [Thumbnails, Zoom, Counter]}
        counter={{ container: { style: { top: 0 } } }}
         
    
      />
      <ImageGallery propertyImg={propertyImg} onImageClick={onImageClick} />
    </div>
  );
};

export default Gallery;

// "use client";
// import React, { useEffect } from "react";
// import PhotoSwipeLightbox from "photoswipe/lightbox";
// import "photoswipe/style.css";
// import Image from "next/image";

// const Gallery = ({ propertyImg }) => {
//   useEffect(() => {
//     // مقداردهی اولیه PhotoSwipeLightbox
//     const lightbox = new PhotoSwipeLightbox({
//       gallery: "#gallery", // آیدی گالری
//       children: "a", // تگ‌های فرزند گالری که لایت‌باکس برایشان فعال می‌شود
//       pswpModule: () => import("photoswipe"), // بارگذاری ماژول photoswipe
//     });

//     lightbox.init();

//     // تخریب Lightbox در زمان پاک شدن کامپوننت
//     return () => {
//       lightbox.destroy();
//     };
//   }, []);

//   // محاسبه نمایش تعداد عکس‌های فرد یا زوج
//   const thumbnails = propertyImg.slice(0, 5);

//   return (
//     <div className="pswp-gallery grid  gap-4 thumbnails " id="gallery">
//       {thumbnails.map((item, i) => (
//         <a
//           href={`${item}`} // لینک تصویر اصلی
//           data-pswp-width="1340"
//           data-pswp-height="895"
//           key={item}
//           className={`block relative overflow-hidden rounded-md   ${
//             i === 0 ? "thumbnails col-span-2" : ""
//           } ${i > 0 && "max-sm:hidden"} ${thumbnails.length===4 && i===3 && "col-span-2"}`}
//         >
//           {i === 0 && (
//             <button className="absolute bottom-2 z-40 p-2 bg-slate-200 right-2 rounded text-slate-800 hover:bg-slate-100 font-semibold">
//               Show all photos
//             </button>
//           )}
//           <Image
//             src={`${item}`} // لینک تصویر کوچک
//             alt={`IMG_${i + 1}`}
//             width={0}
//             height={0}
//             sizes="100vw"
//             className="w-full h-auto object-cover rounded-md hover:scale-105 transition-all"
//           />
//         </a>
//       ))}

//       {propertyImg.slice(5).map((item, i) => (
//         <a
//           href={`${item}`} // لینک تصویر اصلی
//           data-pswp-width="1340"
//           data-pswp-height="895"
//           key={i + 6}
//           className="hidden"
//         >
//           <Image
//             src={`${item}`}
//             alt={`IMG_${i + 6}`}
//             width={0}
//             height={0}
//             sizes="100vw"
//             className="w-full h-auto object-cover rounded-md"
//           />
//         </a>
//       ))}
//     </div>
//   );
// };

// export default Gallery;
