import { motion } from "motion/react";
const ProgressBar = ({ progress }) => {
   
  return (
    <div className="w-[100px] h-[2px] bg-gray-200 rounded-full overflow-hidden mt-7">
      <motion.div
        style={{
          width: `${progress}%`,
          backgroundColor: `rgb(${100 - progress}, ${100 - progress}, ${100 - progress})`,
        }}
        transition={{ duration: 0.4, ease: "linear" }}
        className="h-full"
      />
    </div>
  );
};

export default ProgressBar;
