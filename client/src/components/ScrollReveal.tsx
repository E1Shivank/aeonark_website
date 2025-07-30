import { useEffect, useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 20,
  once = true
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Define variants based on direction
  const getVariants = () => {
    const variants = {
      hidden: {},
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          delay: delay * 0.1
        }
      }
    };
    
    switch (direction) {
      case "up":
        variants.hidden = { opacity: 0, y: distance };
        break;
      case "down":
        variants.hidden = { opacity: 0, y: -distance };
        break;
      case "left":
        variants.hidden = { opacity: 0, x: distance };
        break;
      case "right":
        variants.hidden = { opacity: 0, x: -distance };
        break;
      case "none":
        variants.hidden = { opacity: 0 };
        break;
    }
    
    return variants;
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
}
