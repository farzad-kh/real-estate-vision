 
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";  
 

export default function NprogressProvider({ children }) {
  const pathname = usePathname();
  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 500); 

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]);  

  return <>{children}</>;
}
