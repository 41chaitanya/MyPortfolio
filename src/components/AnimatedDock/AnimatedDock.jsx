import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const AnimatedDock = ({ items, className = '' }) => {
  return (
    <>
      <LargeDock items={items} className={className} />
      <SmallDock items={items} className={className} />
    </>
  );
};

const LargeDock = ({ items, className }) => {
  const mouseXPosition = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseXPosition.set(e.pageX)}
      onMouseLeave={() => mouseXPosition.set(Infinity)}
      className={`mx-auto hidden h-24 items-end justify-center gap-6 md:flex overflow-visible ${className}`}
    >
      {items.map((item) => (
        <DockIcon mouseX={mouseXPosition} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function DockIcon({ mouseX, title, icon }) {
  const ref = useRef(null);

  const distanceFromMouse = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distanceFromMouse, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distanceFromMouse, [-150, 0, 150], [40, 80, 40]);

  const iconWidthTransform = useTransform(distanceFromMouse, [-150, 0, 150], [20, 40, 20]);
  const iconHeightTransform = useTransform(distanceFromMouse, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, { mass: 0.05, stiffness: 300, damping: 20 });
  const height = useSpring(heightTransform, { mass: 0.05, stiffness: 300, damping: 20 });
  const iconWidth = useSpring(iconWidthTransform, { mass: 0.05, stiffness: 300, damping: 20 });
  const iconHeight = useSpring(iconHeightTransform, { mass: 0.05, stiffness: 300, damping: 20 });

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full bg-gradient-to-br from-[#27272a] to-[#18181b] text-[#fafafa] shadow-lg backdrop-blur-md border border-[#3f3f46] hover:border-[#52525b] transition-all"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 2, x: '-50%' }}
            className="absolute -top-10 left-1/2 w-fit -translate-x-1/2 whitespace-nowrap rounded-md border border-[#3f3f46] bg-[#18181b] px-3 py-1.5 text-xs text-[#fafafa] shadow-lg"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: iconWidth, height: iconHeight }}
        className="flex items-center justify-center text-[#fafafa]"
      >
        {icon}
      </motion.div>
    </motion.div>
  );
};

const SmallDock = ({ items, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative block md:hidden ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: index * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - index) * 0.05 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#27272a] to-[#18181b] text-[#fafafa] shadow-md backdrop-blur-md border border-[#3f3f46]">
                  <div className="h-6 w-6">{item.icon}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#27272a] to-[#18181b] text-[#fafafa] shadow-md backdrop-blur-md border border-[#3f3f46] hover:border-[#52525b] transition-all"
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>
  );
};

export { AnimatedDock };
