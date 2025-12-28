import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const AnimatedDock = ({ items, className = '', showMobile = false }) => {
  return (
    <>
      <LargeDock items={items} className={className} />
      {showMobile && <SmallDock items={items} className={className} />}
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
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const containerRef = useRef(null);

  // Load saved position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem('dockPosition');
    if (savedPosition) {
      try {
        const parsed = JSON.parse(savedPosition);
        // Validate position is within viewport
        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;
        setPosition({
          x: Math.min(Math.max(10, parsed.x), maxX),
          y: Math.min(Math.max(10, parsed.y), maxY)
        });
      } catch (e) {
        // Use default position
      }
    }
  }, []);

  // Save position to localStorage
  useEffect(() => {
    localStorage.setItem('dockPosition', JSON.stringify(position));
  }, [position]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 60),
        y: Math.min(prev.y, window.innerHeight - 60)
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    setIsDragging(true);
    setHasMoved(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;
    
    // Check if moved significantly
    if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
      setHasMoved(true);
    }

    // Constrain to viewport
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    
    setPosition({
      x: Math.min(Math.max(10, newX), maxX),
      y: Math.min(Math.max(10, newY), maxY)
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Only toggle if didn't move (was a tap, not a drag)
    if (!hasMoved) {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseDown = (e) => {
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    setIsDragging(true);
    setHasMoved(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
      setHasMoved(true);
    }

    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    
    setPosition({
      x: Math.min(Math.max(10, newX), maxX),
      y: Math.min(Math.max(10, newY), maxY)
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!hasMoved) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, hasMoved]);

  // Calculate menu position based on dock position
  const getMenuPosition = () => {
    const isNearBottom = position.y > window.innerHeight / 2;
    const isNearRight = position.x > window.innerWidth / 2;
    return { isNearBottom, isNearRight };
  };

  const { isNearBottom, isNearRight } = getMenuPosition();

  return (
    <div 
      ref={containerRef}
      className={`fixed block md:hidden ${className}`}
      style={{
        left: position.x,
        top: position.y,
        zIndex: 9999,
        touchAction: 'none'
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute flex gap-2"
            style={{
              // Position menu based on dock location
              ...(isNearBottom 
                ? { bottom: '100%', marginBottom: '12px' } 
                : { top: '100%', marginTop: '12px' }),
              ...(isNearRight 
                ? { right: 0 } 
                : { left: 0 }),
              flexDirection: isNearBottom ? 'column-reverse' : 'column'
            }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  transition: { delay: index * 0.03 },
                }}
                transition={{ 
                  delay: (items.length - 1 - index) * 0.03,
                  type: 'spring',
                  stiffness: 400,
                  damping: 25
                }}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#27272a] to-[#18181b] text-[#fafafa] shadow-lg backdrop-blur-md border-2 border-[#52525b] hover:border-[#71717a] transition-all active:scale-95"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <div className="h-5 w-5">{item.icon}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main circular toggle button */}
      <motion.button
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        animate={{ 
          rotate: isOpen ? 45 : 0,
          scale: isDragging ? 1.1 : 1
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#3f3f46] to-[#18181b] text-[#fafafa] shadow-xl backdrop-blur-md border-2 border-[#52525b] transition-all select-none"
        style={{
          boxShadow: isDragging 
            ? '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.1)' 
            : '0 4px 20px rgba(0, 0, 0, 0.4)',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2.5} 
            d={isOpen ? "M12 4v16m8-8H4" : "M4 6h16M4 12h16M4 18h16"} 
          />
        </svg>
      </motion.button>

      {/* Drag hint indicator */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-[#71717a] whitespace-nowrap pointer-events-none"
        >
          drag me
        </motion.div>
      )}
    </div>
  );
};

export { AnimatedDock };
