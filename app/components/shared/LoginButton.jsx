"use client";

import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "antd";

const LoginButton = ({ children, googleBtn,callbackUrlParam }) => {
  
  const pathname = usePathname(); 
 

  const callbackUrl = callbackUrlParam || pathname || "/";   // for callback url


  const handleSignIn = (provider) => {
    signIn(provider, { callbackUrl });
  };
 

  return googleBtn ? (
    <button
      onClick={() => handleSignIn("google")}
      className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition w-full text-center"
    >
      {children}
    </button>
  ) : (
    <Button
      className="hover:!border-[#d1cece]"
      size="middle"
      type="primary"
      onClick={() => handleSignIn(undefined)}
    >
      {children}
    </Button>
  );
};

export default LoginButton;
