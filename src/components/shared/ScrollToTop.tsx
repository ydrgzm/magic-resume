import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide button when sentinel is visible (near top), show when scrolled down
        setIsVisible(!entry.isIntersecting);
      },
      {
        // Trigger at 30% from top (fires after scrolling ~70% down)
        rootMargin: "60% 0px -40% 0px",
        threshold: 0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Sentinel element anchored at page top */}
      <div
        ref={sentinelRef}
        className="absolute top-0 h-[1px] w-full pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* Scroll-to-top button */}
      <div
        className={`fixed bottom-8 right-8 transition-all duration-500 z-50
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <Button
          size="icon"
          onClick={scrollToTop}
          className="rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 border-0
            shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110
            group relative overflow-hidden"
        >
          <ArrowUp className="h-6 w-6 text-white relative z-10" />
          {/* Hover overlay */}
          <div
            className="absolute inset-0 bg-blue-600 transition-transform duration-300
              translate-y-full group-hover:translate-y-0"
          />
        </Button>
      </div>
    </>
  );
};

export default ScrollToTop;
