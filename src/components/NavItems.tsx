"use client"

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export default function NavItems() {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  // Close NavItems if user presses ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      e.key === 'Escape' && setActiveIndex(null);

    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  });

  // Close NavItems when user clicks outside of the NavItems
  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {

        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        }

        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={activeIndex === i}
            key={category.value}
            isAnyOpen={activeIndex !== null} />);
      })}

    </div>
  );
}
