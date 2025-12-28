import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MenuToggler = ({
  isOpen,
  onChange,
  backgroundColor,
  iconColor,
  togglerSize,
}) => {
  return (
    <>
      <input
        id="menu-toggler"
        type="checkbox"
        checked={isOpen}
        onChange={onChange}
        className="absolute inset-0 z-10 m-auto cursor-pointer opacity-0"
        style={{ width: togglerSize, height: togglerSize }}
      />
      <label
        htmlFor="menu-toggler"
        className="absolute inset-0 z-20 m-auto flex cursor-pointer items-center justify-center"
        style={{
          backgroundColor,
          color: iconColor,
          width: togglerSize,
          height: togglerSize,
          borderRadius: '50%',
          border: '2px solid rgba(113, 113, 122, 0.8)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        <svg 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          style={{
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          ) : (
            <>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 12h16" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 18h16" />
            </>
          )}
        </svg>
      </label>
    </>
  );
};

const MenuItem = ({
  item,
  index,
  isOpen,
  iconColor,
  backgroundColor,
  itemCount,
  itemSize,
  iconSize,
  onItemClick,
}) => {
  const Icon = item.icon;
  const angle = (360 / itemCount) * index;
  const radius = itemSize + 35;
  
  return (
    <li
      className="absolute inset-0 m-auto"
      style={{
        width: itemSize,
        height: itemSize,
        opacity: isOpen ? 1 : 0,
        transform: isOpen
          ? `rotate(${angle}deg) translateX(-${radius}px)`
          : 'rotate(0deg) translateX(0px)',
        transition: 'all 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        transitionDelay: isOpen ? `${index * 0.05}s` : '0s',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <Link
        to={item.href}
        className="flex h-full w-full items-center justify-center"
        style={{
          backgroundColor,
          color: iconColor,
          transform: `rotate(-${angle}deg)`,
          borderRadius: '50%',
          border: '2px solid rgba(113, 113, 122, 0.8)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.2s ease',
        }}
        onClick={onItemClick}
      >
        <Icon style={{ width: iconSize, height: iconSize }} />
      </Link>
    </li>
  );
};

export default function FlowerMenu({
  menuItems,
  iconColor = '#fafafa',
  backgroundColor = 'rgba(39, 39, 42, 0.95)',
  togglerSize = 56,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: -1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(true);
  const navRef = useRef(null);

  const itemCount = menuItems.length;
  const itemSize = 48;
  const iconSize = 22;
  const containerSize = togglerSize;

  // Initialize position on mount
  useEffect(() => {
    const savedPosition = localStorage.getItem('flowerMenuPosition');
    if (savedPosition) {
      try {
        const parsed = JSON.parse(savedPosition);
        const maxX = window.innerWidth - containerSize - 10;
        const maxY = window.innerHeight - containerSize - 10;
        setPosition({
          x: Math.min(Math.max(10, parsed.x), maxX),
          y: Math.min(Math.max(10, parsed.y), maxY)
        });
      } catch (e) {
        setPosition({ x: 20, y: window.innerHeight - 120 });
      }
    } else {
      setPosition({ x: 20, y: window.innerHeight - 120 });
    }
    
    // Hide hint after 5 seconds
    const hintTimer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(hintTimer);
  }, [containerSize]);

  // Save position to localStorage
  useEffect(() => {
    if (position.y !== -1) {
      localStorage.setItem('flowerMenuPosition', JSON.stringify(position));
    }
  }, [position]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const maxX = window.innerWidth - containerSize - 10;
      const maxY = window.innerHeight - containerSize - 10;
      setPosition(prev => ({
        x: Math.min(prev.x, maxX),
        y: Math.min(prev.y, maxY)
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerSize]);

  // Touch handlers
  const handleTouchStart = (e) => {
    if (isOpen) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setShowHint(false);
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    
    let newX = touch.clientX - dragOffset.x;
    let newY = touch.clientY - dragOffset.y;

    const maxX = window.innerWidth - containerSize - 10;
    const maxY = window.innerHeight - containerSize - 10;

    setPosition({
      x: Math.max(10, Math.min(newX, maxX)),
      y: Math.max(10, Math.min(newY, maxY))
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mouse handlers
  const handleMouseDown = (e) => {
    if (isOpen) return;
    setIsDragging(true);
    setShowHint(false);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      const maxX = window.innerWidth - containerSize - 10;
      const maxY = window.innerHeight - containerSize - 10;

      setPosition({
        x: Math.max(10, Math.min(newX, maxX)),
        y: Math.max(10, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, containerSize]);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  // Don't render until position is initialized
  if (position.y === -1) return null;

  return (
    <nav
      ref={navRef}
      className="fixed md:hidden"
      style={{
        width: containerSize,
        height: containerSize,
        left: position.x,
        top: position.y,
        zIndex: 9999,
        touchAction: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Menu items container - positioned relative to the button */}
      <div 
        className="absolute"
        style={{
          width: containerSize,
          height: containerSize,
          left: 0,
          top: 0,
        }}
      >
        <MenuToggler
          isOpen={isOpen}
          onChange={() => setIsOpen(!isOpen)}
          backgroundColor={backgroundColor}
          iconColor={iconColor}
          togglerSize={togglerSize}
        />
        <ul className="absolute inset-0 m-0 h-full w-full list-none p-0">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              index={index}
              isOpen={isOpen}
              iconColor={iconColor}
              backgroundColor={backgroundColor}
              itemCount={itemCount}
              itemSize={itemSize}
              iconSize={iconSize}
              onItemClick={handleItemClick}
            />
          ))}
        </ul>
      </div>
      
      {/* Drag hint - fixed position relative to button */}
      {!isOpen && showHint && !isDragging && (
        <div 
          style={{
            position: 'absolute',
            left: '50%',
            top: '100%',
            transform: 'translateX(-50%)',
            marginTop: '8px',
            fontSize: '10px',
            color: 'rgba(161, 161, 170, 0.8)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          drag to move
        </div>
      )}
    </nav>
  );
}
