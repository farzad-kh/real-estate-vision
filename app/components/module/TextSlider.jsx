// "use client";
// import { AnimatePresence, motion } from "framer-motion";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { useRef } from "react";

// const TextSlider = () => {
//   const sliderContent = [
//     {
//       id: 1,
//       title: "Only the best vacation homes",
//       content:
//         "We offer a curated portfolio featuring the finest vacation homes and villas in the world's top destinations. Recognized as the “World's Leading Villa Collection” by the prestigious World Travel Awards, our properties set the standard for luxury and comfort.",
//     },
//     {
//       id: 2,
//       title: "Dedicated travel planners",
//       content:
//         "Our team of experienced vacation rental and villa experts is dedicated to assisting you in finding the perfect accommodation for your needs. With their expertise and personalized service, we strive to ensure that you and your group are matched with the ideal vacation home. Alternatively, you have the option to browse through our portfolio, receive an instant quote and book online.",
//     },
//   ];

//   const sliderImage = [
//     { id: 1, image: "https://res.cloudinary.com/dedxdelvr/image/upload/v1742119607/xlhz2pjdqbfaydcp711s.jpg" },
//     { id: 2, image: "https://res.cloudinary.com/dedxdelvr/image/upload/v1742119575/oqqnskngkzl5bgbndmdh.jpg" },
//   ];

// // State to track the currently open slide
// const [slideOpen, setSlideOpen] = useState(1);
// // State to track progress percentage
// const [progress, setProgress] = useState(0);
// // Ref to store animation frame ID
// const animationFrame = useRef(null);
// // Ref to store animation start time
// const startTime = useRef(null);

// // Function to manually change slides
// const changeSlide = (newSlide) => {
//     setSlideOpen(newSlide); // Update slide state
//     setProgress(0); // Reset progress
//     startTime.current = null; // Reset start time
//     startProgressAnimation(); // Restart progress animation
// };

// // Function to start the progress animation
// const startProgressAnimation = () => {
//     // Cancel any existing animation frame
//     if (animationFrame.current) cancelAnimationFrame(animationFrame.current);

//     // Set the start time to the current performance timestamp
//     startTime.current = performance.now();

//     // Animation function
//     const animate = (currentTime) => {
//         // If startTime is not set (edge case), initialize it
//         if (!startTime.current) startTime.current = currentTime;

//         // Calculate elapsed time
//         const elapsedTime = currentTime - startTime.current;
//         // Calculate progress percentage (caps at 100%)
//         const percentage = Math.min((elapsedTime / 10000) * 100, 100);

//         // Update progress state
//         setProgress(percentage);

//         // Continue animation until progress reaches 100%
//         if (percentage < 100) {
//             animationFrame.current = requestAnimationFrame(animate);
//         } else {
//             // After progress reaches 100%, wait 350ms and move to the next slide
//             setTimeout(() => {
//                 setSlideOpen((prevSlide) => (prevSlide % sliderContent.length) + 1);
//                 startProgressAnimation(); // Restart progress animation for the new slide
//             }, 350);
//         }
//     };

//     // Start the animation
//     animationFrame.current = requestAnimationFrame(animate);
// };

// // Effect to start animation when slideOpen changes
// useEffect(() => {
//     startProgressAnimation();

//     // Cleanup function to cancel animation on component unmount or slide change
//     return () => cancelAnimationFrame(animationFrame.current);
// }, [slideOpen]);
// ;
//   return (
//     <div className="w-full mt-10">
//       <div className="w-full flex gap-4 p-5">
//         <div className="flex-[0.5]">
//           <div>
//             {sliderImage.map((item) => (
//               <AnimatePresence mode="popLayout" key={item.id}>
//                 {item.id === slideOpen && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="rounded-lg overflow-hidden"
//                   >
//                     <Image
//                       width={600}
//                       height={500}
//                       className="w-full"
//                       alt="sa"
//                       src={item.image}
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             ))}
//           </div>
//         </div>
//         <div className="flex-[0.5] flex-col">
//           <div>slide-title</div>
//           <div>
//             {sliderContent.map((item) => (
//               <div
//                 className={`border-b flex flex-col overflow-hidden transition-all duration-500 ${
//                   slideOpen === item.id ? "h-48 " : "h-16 "
//                 }`}
//                 key={item.id}
//               >
//                  <div className="text-xl py-4 font-semibold cursor-pointer" onClick={() => changeSlide(item.id)}>
//                 {item.title}
//               </div>
//                 <AnimatePresence mode="popLayout">
//                   {slideOpen === item.id && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
//                       exit={{ opacity: 0, y: 30, filter: "blur(6px)" }}
//                       animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//                       transition={{ duration: 0.4 }}
//                       className="mb-2"
//                     >
//                       {/* Progress Bar */}
//                       <div className="w-[100px] h-[2px] bg-gray-200 rounded-full overflow-hidden mt-2">
//                         <motion.div
//                           style={{
//                             width: `${progress}%`,
//                             backgroundColor: `rgb(${100 - progress}, ${
//                               100 - progress
//                             }, ${100 - progress})`,
//                           }}
//                           transition={{ duration: 0.4, ease: "linear" }}
//                           className="h-full"
//                         />
//                       </div>
//                       <p className="mt-2">{item.content}</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TextSlider;

"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { Collapse } from "antd";
import ProgressBar from "./ProgressBar";

 

const TextSlider = () => {
  const sliderImage = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dedxdelvr/image/upload/v1742119607/xlhz2pjdqbfaydcp711s.jpg",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dedxdelvr/image/upload/v1742147099/nabv0jcepd7drsl1h9ev.jpg",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/dedxdelvr/image/upload/v1742119568/h96emu6cyngbyikz5kkc.jpg",
    },
  ];

  const sliderContent = [
    {
      id: 1,
      title: "Only the best vacation homes",
      content:
        "We offer a curated portfolio featuring the finest vacation homes and villas in the world's top destinations. Recognized as the “World's Leading Villa Collection” by the prestigious World Travel Awards, our properties set the standard for luxury and comfort.",
    },
    {
      id: 2,
      title: "Dedicated travel planners",
      content:
        "Our team of experienced vacation rental and villa experts is dedicated to assisting you in finding the perfect accommodation for your needs. With their expertise and personalized service, we strive to ensure that you and your group are matched with the ideal vacation home. Alternatively, you have the option to browse through our portfolio, receive an instant quote and book online.",
    },
    {
      id: 3,
      title: "Concierge services and local support",
      content:
        "Experience 5-star hotel-style concierge services and dedicated local support throughout your stay with Top Villas. We ensure that every aspect of your trip is truly memorable.",
    },
  ];

  const [slideOpen, setSlideOpen] = useState(1);
  const [progress, setProgress] = useState(0);
  const animationFrame = useRef(null);
  const startTime = useRef(null);

  const startProgressAnimation = () => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    startTime.current = performance.now();

    const animate = (currentTime) => {
      if (!startTime.current) startTime.current = currentTime;
      const elapsedTime = currentTime - startTime.current;
      const percentage = Math.min((elapsedTime / 10000) * 100, 100);
      setProgress(percentage);

      if (percentage < 100) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
        setSlideOpen((prevSlide) => (prevSlide % sliderContent.length) + 1);
        }, 350);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    startProgressAnimation();
    return () => cancelAnimationFrame(animationFrame.current);
  }, [slideOpen]);
  const CollapseActiveHandler = (key) => {
    console.log(key);

    if (key.length === 0) {
      return;
    }
    setSlideOpen(Number(key));
  };
  return (
    <div className="w-full mt-15 ">

      <div className="w-full flex gap-4   max-lg:h-[540px] max-md:h-full">
        <div className="flex-[0.5] max-md:hidden ">
          {sliderImage.map((item) => (
            <AnimatePresence mode="popLayout" key={item.id}>
              {item.id === slideOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg overflow-hidden h-[700px]"
                >
                  <Image
                    width={600}
                    height={500}
                    className="w-full overflow-hidden rounded-lg"
                    alt="slider"
                    src={item.image}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
        <div className=" max-md:flex-1 flex-[0.5] flex-col h-[700px]">
        <h2 className="max-md:mb-2 mb-4 mt-1 font-bold px-4 max-md:p-0 text-2xl max-md:text-xl text-slate-800">Experience Luxury Living, One Stay at a Time</h2>
          <Collapse  
            ghost
            accordion
            activeKey={String(slideOpen)}
            onChange={CollapseActiveHandler}
            className="max-md:!px-0"
            items={sliderContent.map((item) => ({
              key: String(item.id),
              label: (
                <div className="text-2xl max-md:p-0 max-lg:text-xl max-md:text-lg font-semibold">
                  {item.id} {item.title}
                </div>
              ),
              children: (
                <motion.div
                  style={{ borderBottom: "1px solid #ddd" }}
                  initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                  exit={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.4 }}
                  className="mb-2 pb-4"
                >
                  <div className="max-md:flex hidden w-full mb-3">
                    {sliderImage
                      .filter((img) => img.id === slideOpen)
                      .map((img) => (
                        <div className="w-full" key={img.id}>
                          <AnimatePresence mode="popLayout">
                            {img.id === slideOpen && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="rounded-lg overflow-hidden max-h-[300px] w-full"
                              >
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{
                                    opacity: 1,
                                    transition: { delay: 0.2 },
                                  }}
                                  className="w-full"
                                >
                                  <Image
                                    width={600}
                                    height={500}
                                    className="w-full object-cover aspect-[16/10]"
                                    alt="slider"
                                    src={img.image}
                                  />
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                  </div>
                  <p>{item.content}</p>
                  <ProgressBar progress={progress} />
                </motion.div>
              ),
              showArrow: false,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default TextSlider;
