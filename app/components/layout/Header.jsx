"use client";
import React, { Suspense, useEffect, useState } from "react";

import DropdownMenu from "../module/DropdownMenu";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthStatus from "../module/AuthStatus";
import SearchDropdown from "../module/SearchDropdown";
import Image from "next/image";
import homeVisionLogo from "@/public/header-logo.png";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deactivateNav, setDeactivate] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname();

  const closeHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("activeNav");
      const rect = element && element.getBoundingClientRect();

      if (rect && rect.top <= 80 && rect.bottom >= 80) {
        setDeactivate(true);
      } else {
        setDeactivate(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };




    
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 

  return (
    <header
      className={`sticky transition-all duration-300 bg-white top-0 h-[70px]  z-50 content-center ${
        deactivateNav ? "-translate-y-20" : "translate-y-0"
      } ${isScrolled ? "shadow-nav" : ""}`}
    >
      <div className="px-4 flex justify-between gap-4 m-auto max-w-screen-2xl">
     
          <Link className="items-center min-w-[30px] min-h-[30px]  flex" href={"/"}>
            <Image alt="home Vision Logo" className="items-center" width={30} height={30} src={homeVisionLogo} />
          </Link>
 
        <AnimatePresence>
          {isOpen && (
            <DropdownMenu
              pathName={pathName}
              closeHandler={closeHandler}
              headerLinks={headerLinks}
            />
          )}
        </AnimatePresence>

        <Suspense fallback={<div>Loading...</div>}>
          <SearchDropdown />
        </Suspense>
        <div>
          <AuthStatus />
        </div>
      </div>
    </header>
  );
};

export default Header;
