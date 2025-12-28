import { useCallback, useEffect, useState } from 'react';

// -----------------------------------------------------------
// THEME TOGGLE HOOK
// -----------------------------------------------------------

export const useThemeToggle = ({
  variant = 'circle',
  start = 'center',
  blur = false,
  gifUrl = '',
} = {}) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if dark theme is already applied
    const isDarkTheme =
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkTheme);
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const styleId = 'theme-transition-styles';

  const updateStyles = useCallback((css) => {
    if (typeof window === 'undefined') return;

    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    const animation = createAnimation(variant, start, blur, gifUrl);
    updateStyles(animation.css);

    if (typeof window === 'undefined') return;

    const switchTheme = () => {
      if (newIsDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [isDark, variant, start, blur, gifUrl, updateStyles]);

  return {
    isDark: mounted ? isDark : false,
    toggleTheme,
    mounted,
  };
};

// -----------------------------------------------------------
// ANIMATION ENGINE
// -----------------------------------------------------------

export const createAnimation = (variant, start, blur, gifUrl) => {
  const animName = 'theme-anim-' + Math.random().toString(36).slice(2);

  let clipPath = '';

  // Generate clip-path based on variant and start position
  switch (variant) {
    case 'circle':
      clipPath = generateCircleClipPath(start);
      break;
    case 'rectangle':
      clipPath = generateRectangleClipPath(start);
      break;
    case 'polygon':
      clipPath = generatePolygonClipPath(start);
      break;
    case 'circle-blur':
      clipPath = generateCircleBlurClipPath(start);
      break;
    case 'gif':
      clipPath = generateGifClipPath(start);
      break;
    default:
      clipPath = generateCircleClipPath('center');
  }

  const blurEffect = blur ? 'filter: blur(2px);' : '';
  const blurStart = blur ? 'filter: blur(8px);' : '';
  const blurMid = blur ? '50% { filter: blur(4px); }' : '';
  const blurEnd = blur ? 'filter: blur(0px);' : '';

  const css = `
    ::view-transition-group(root) {
      animation-duration: 0.7s;
      animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    ::view-transition-new(root) {
      animation-name: ${animName};
      ${blurEffect}
    }

    ::view-transition-old(root),
    .dark::view-transition-old(root) {
      animation: none;
      z-index: -1;
    }

    .dark::view-transition-new(root) {
      animation-name: ${animName};
      ${blurEffect}
    }

    @keyframes ${animName} {
      from {
        clip-path: ${clipPath.start};
        ${blurStart}
      }
      ${blurMid}
      to {
        clip-path: ${clipPath.end};
        ${blurEnd}
      }
    }
  `;

  return { name: animName, css };
};

// -----------------------------------------------------------
// CLIP PATH GENERATORS
// -----------------------------------------------------------

const generateCircleClipPath = (start) => {
  const positions = {
    'top-left': { x: '0%', y: '0%' },
    'top-right': { x: '100%', y: '0%' },
    'bottom-left': { x: '0%', y: '100%' },
    'bottom-right': { x: '100%', y: '100%' },
    'top-center': { x: '50%', y: '0%' },
    'bottom-center': { x: '50%', y: '100%' },
    'center': { x: '50%', y: '50%' },
  };

  const pos = positions[start] || positions['center'];

  return {
    start: `circle(0% at ${pos.x} ${pos.y})`,
    end: `circle(100% at ${pos.x} ${pos.y})`,
  };
};

const generateRectangleClipPath = (start) => {
  const rects = {
    'bottom-up': {
      start: 'inset(100% 0% 0% 0%)',
      end: 'inset(0% 0% 0% 0%)',
    },
    'top-down': {
      start: 'inset(0% 0% 100% 0%)',
      end: 'inset(0% 0% 0% 0%)',
    },
    'left-right': {
      start: 'inset(0% 100% 0% 0%)',
      end: 'inset(0% 0% 0% 0%)',
    },
    'right-left': {
      start: 'inset(0% 0% 0% 100%)',
      end: 'inset(0% 0% 0% 0%)',
    },
  };

  return rects[start] || rects['bottom-up'];
};

const generatePolygonClipPath = (start) => {
  const polygons = {
    'top-left': {
      start: 'polygon(0% 0%, 0% 0%, 0% 0%)',
      end: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
    'top-right': {
      start: 'polygon(100% 0%, 100% 0%, 100% 0%)',
      end: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
    'bottom-left': {
      start: 'polygon(0% 100%, 0% 100%, 0% 100%)',
      end: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
    'bottom-right': {
      start: 'polygon(100% 100%, 100% 100%, 100% 100%)',
      end: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
  };

  return polygons[start] || polygons['bottom-right'];
};

const generateCircleBlurClipPath = (start) => {
  const positions = {
    'top-left': { x: '0%', y: '0%' },
    'top-right': { x: '100%', y: '0%' },
    'bottom-left': { x: '0%', y: '100%' },
    'bottom-right': { x: '100%', y: '100%' },
    'top-center': { x: '50%', y: '0%' },
    'bottom-center': { x: '50%', y: '100%' },
    'center': { x: '50%', y: '50%' },
  };

  const pos = positions[start] || positions['center'];

  return {
    start: `circle(0% at ${pos.x} ${pos.y})`,
    end: `circle(150% at ${pos.x} ${pos.y})`,
  };
};

const generateGifClipPath = (start) => {
  // For GIF variant, use a similar approach but with different animation
  return {
    start: 'circle(0% at center)',
    end: 'circle(100% at center)',
  };
};
