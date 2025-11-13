import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined);

const useDropdownMenu = () => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error('useDropdownMenu must be used within a DropdownMenu');
  }
  return context;
};

const DropdownMenu = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={menuRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = ({ children }: { children: ReactNode }) => {
  const { setIsOpen } = useDropdownMenu();
  return (
    <div onClick={() => setIsOpen(o => !o)} className="cursor-pointer">
      {children}
    </div>
  );
};

const DropdownMenuContent = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useDropdownMenu();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
          className="absolute right-0 z-40 mt-2 w-56 origin-top-right rounded-md bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DropdownMenuItem = ({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) => {
  const { setIsOpen } = useDropdownMenu();
  const handleClick = () => {
    if (onClick) onClick();
    setIsOpen(false);
  };
  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

const DropdownMenuSeparator = () => {
  return <div className="-mx-1 my-1 h-px bg-border" />;
};

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator };
