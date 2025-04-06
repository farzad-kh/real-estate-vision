"use client";
import React, { useState, useEffect, useRef } from "react";

const ObserverWrapper = ({ children, onVisible ,location}) => {
 
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [onVisible]);

  return <div className={ location ?"min-h-[409px]":"min-h-[324px]"} ref={ref}>{isVisible ? children : null}</div>;
};

export default ObserverWrapper;
