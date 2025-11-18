import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineInfo, MdEmojiEvents, MdOutlineWorkspaces, MdOutlineMailOutline } from 'react-icons/md';

const MenuToggler = ({
  isOpen,
  onChange,
  backgroundColor,
  iconColor,
  animationDuration,
  togglerSize,
  iconSize,
}) => {
  const lineHeight = iconSize * 0.1;
  const lineWidth = iconSize * 0.8;
  const lineSpacing = iconSize * 0.25;

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
        className="absolute inset-0 z-20 m-auto flex cursor-pointer items-center justify-center rounded-full transition-all"
        style={{
          backgroundColor,
          color: iconColor,
          transitionDuration: `${animationDuration}ms`,
          width: togglerSize,
          height: togglerSize,
        }}
      >
        <span
          className="relative flex flex-col items-center justify-center"
          style={{ width: iconSize, height: iconSize }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`absolute bg-current transition-all ${
                isOpen && i === 0
                  ? 'opacity-0'
                  : isOpen
                    ? `${i === 1 ? 'rotate-45' : '-rotate-45'}`
                    : ''
              }`}
              style={{
                transitionDuration: `${animationDuration}ms`,
                width: lineWidth,
                height: lineHeight,
                top: isOpen
                  ? `calc(50% - ${lineHeight / 2}px)`
                  : `calc(50% + ${(i - 1) * lineSpacing}px - ${lineHeight / 2}px)`,
              }}
            />
          ))}
        </span>
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
  animationDuration,
  itemCount,
  itemSize,
  iconSize,
}) => {
  const Icon = item.icon;
  return (
    <li
      className={`absolute inset-0 m-auto transition-all ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      style={{
        width: itemSize,
        height: itemSize,
        transform: isOpen
          ? `rotate(${(360 / itemCount) * index}deg) translateX(-${itemSize + 30}px)`
          : 'none',
        transitionDuration: `${animationDuration}ms`,
      }}
    >
      <Link
        to={item.href}
        className={`flex h-full w-full items-center justify-center rounded-full opacity-60 transition-all duration-100 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        } group hover:scale-125 hover:opacity-100`}
        style={{
          backgroundColor,
          color: iconColor,
          transform: `rotate(-${(360 / itemCount) * index}deg)`,
          transitionDuration: `${animationDuration}ms`,
        }}
        onClick={() => {
          // Close menu after clicking
          setTimeout(() => {
            document.getElementById('menu-toggler').checked = false;
          }, 100);
        }}
      >
        <Icon
          className="transition-transform duration-200 group-hover:scale-125"
          style={{ width: iconSize, height: iconSize }}
        />
      </Link>
    </li>
  );
};

export default function FlowerMenu({
  menuItems,
  iconColor = '#fafafa',
  backgroundColor = 'rgba(39, 39, 42, 0.95)',
  animationDuration = 500,
  togglerSize = 50,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);

  const itemCount = menuItems.length;
  const itemSize = togglerSize * 1.8;
  const iconSize = Math.max(24, Math.floor(togglerSize * 0.6));

  const handleMouseDown = (e) => {
    if (isOpen) return; // Don't drag when menu is open
    setIsDragging(true);
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

      // Keep within screen bounds
      const maxX = window.innerWidth - togglerSize * 3;
      const maxY = window.innerHeight - togglerSize * 3;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      setPosition({ x: newX, y: newY });
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
  }, [isDragging, dragOffset, togglerSize]);

  return (
    <nav
      ref={navRef}
      className="fixed md:hidden z-50 cursor-grab active:cursor-grabbing"
      style={{
        width: togglerSize * 3,
        height: togglerSize * 3,
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDragging ? 'none' : 'all 0.3s ease',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="relative w-full h-full">
        <MenuToggler
          isOpen={isOpen}
          onChange={() => setIsOpen(!isOpen)}
          backgroundColor={backgroundColor}
          iconColor={iconColor}
          animationDuration={animationDuration}
          togglerSize={togglerSize}
          iconSize={iconSize}
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
              animationDuration={animationDuration}
              itemCount={itemCount}
              itemSize={itemSize}
              iconSize={iconSize}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}
