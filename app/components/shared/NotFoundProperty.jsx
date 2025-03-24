"use client"
 

import notFoundIcon from "@/public/svg-not-found.svg";
import Image from "next/image";
import { ArrowLeftOutlined} from "@ant-design/icons";
import { useRouter } from "next/navigation";
const NotFoundProperty = ({label}) => {
    const router=useRouter()
    return (
        <div className="w-full max-w-5xl m-auto">
      <div className="flex  max-md:flex-col-reverse justify-between items-center">
        <div className="flex flex-col gap-x-5 gap-y-2 font-semibold">
          <h1 className="max-md:text-center">404 page not found</h1>
          <p className="text-base">{label}</p>
        
        </div>
        <div>
            <Image
              width={340}
              height={340}
              className=""
              alt="not-found"
              src={notFoundIcon.src}
            />
          </div>
         
      </div>
      <div className="mt-10"><button onClick={()=>router.back()} className="border  rounded border-stone-400 p-3 text-bluePrimery font-semibold"><ArrowLeftOutlined className="items-center self-center" /> Go back</button></div>
    </div>
    );
};

export default NotFoundProperty;