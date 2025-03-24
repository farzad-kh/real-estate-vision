
import { motion } from "motion/react";
import Link from "next/link";
const DropdownMenu = ({headerLinks,closeHandler,pathName}) => {
  return (
    <>
      <motion.section
      onClick={closeHandler}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className=" mt-5 p-4 scroll-hidden w-full fixed overflow-y-auto h-full top-0 right-0  bg-transparent backdrop-blur-sm  max-md:block hidden   "
      >
        <div onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-3 overflow-hidden justify-center px-4 py-6 text-center z-30">
          {headerLinks.map(item=> 
            <Link className={`p-1 rounded text-sm ${pathName===item.href ?"bg-purple-500 text-white":"bg-transparent"}`} onClick={closeHandler}  href={item.href}>{item.title}</Link>
          )}
        </div>
      </motion.section>
    </>
  );
};

export default DropdownMenu;
