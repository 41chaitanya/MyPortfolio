"use client";
import { motion } from "framer-motion";
import React from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const STAGGER = 0.035;

const TextRoll = React.forwardRef(({ children, className, center = false }, ref) => {
  return (
    <motion.span
      ref={ref}
      initial="initial"
      whileHover="hovered"
      className={cn("relative inline-block overflow-hidden", className)}
      style={{
        lineHeight: 1,
        display: "inline-block",
      }}
    >
      <div style={{ overflow: "hidden" }}>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;
          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;
          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
});

TextRoll.displayName = "TextRoll";

export { TextRoll };
