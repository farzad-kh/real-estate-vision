"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
const ActiveScroll = ({ children }) => {
  const [activeSection, setActiveSection] = useState("");
  const [activeNav, setActiveNav] = useState(false);

  const sections = ["Description","Quick-facts", "Amenities", "Location","Rental-policies"];

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("property-header");

      if (el) {
        const navRect = el.getBoundingClientRect();
        setActiveNav(navRect.top <= 0);
      }

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
console.log(activeNav);

  return (
    <div>
  
       
          <motion.nav
            initial={{ opacity: 0,y: activeNav ? 30 :0 ,height: activeNav ? 0 :60}}
            animate={{ opacity: activeNav ? 1 :0 ,y: activeNav ? 0 :30, height: activeNav ? 60 :0 }}
          
           
            className={`sticky top-0 z-10 w-full bg-white origin-bottom  flex  h-0  justify-start space-x-4  max-md:hidden  ${
              activeNav ? "border-b h-auto " : "pointer-events-none"
            }`}
          >
       <div className="py-2  relative">
       {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative px-4 py-2 text-gray-500 transition-all duration-300  font-semibold${
                  activeSection === section ? " text-slate-800 after:content-[''] after:absolute after:left-0 after:bottom-[-15px] after:w-full after:h-[2px] after:bg-blue-500" : ""
                }`}
              >
              {section.split("-")[0]} {section.split("-")[1] || ""}
            
              </button>
            ))}
       </div>
          </motion.nav>
  
 

      {/* Sections */}
      <div className=" transition-all">{children}</div>
    </div>
  );
};

export default ActiveScroll;
