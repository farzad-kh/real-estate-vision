import React from "react";

import { motion } from "motion/react";
import ContactBtn from "./ContactBtn";

const BottomBar = ({ rates, id, hasSentMessage, userId, owner }) => {
  // const [height, setHeight] = useState(window.innerHeight);

  // useEffect(() => {
  //   const handleResize = () => setHeight(window.innerHeight);

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [height]);
  // style={{ bottom: height - window.innerHeight }}

  return (
    <>
      <div className="max-lg:block hidden">
        <motion.div
          whileInView={{ y: 0, opacity: 1, transition: { opacity: 0.4 } }}
          initial={{ y: 30, opacity: 0 }}
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          className="w-full h-full max-h-20 fixed origin-bottom left-0 bottom-0 right-0 z-20 p-4 border-t brightness-95 bg-white/5 backdrop-blur-[4px]"
        >
          <ContactBtn
            bottomBar={true}
            rates={rates}
            id={id}
            owner={owner}
            hasSentMessage={hasSentMessage}
            userId={userId}
          />
        </motion.div>
      </div>
    </>
  );
};

export default BottomBar;
