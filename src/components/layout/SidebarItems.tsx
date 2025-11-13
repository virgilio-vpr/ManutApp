import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { NavItem } from '../../lib/nav-items';

interface SidebarItemsProps {
  item: NavItem;
  isOpen: boolean;
}

const SidebarItems: React.FC<SidebarItemsProps> = ({ item, isOpen }) => {
  const [isChildrenVisible, setIsChildrenVisible] = useState(false);

  const toggleChildren = () => {
    if (item.isChidren) {
      setIsChildrenVisible(!isChildrenVisible);
    }
  };

  const baseClasses = "flex items-center p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors";
  const activeClasses = "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground";

  if (!item.isChidren) {
    return (
      <NavLink
        to={item.href}
        className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ''}`}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="ml-3 overflow-hidden whitespace-nowrap"
            >
              {item.title}
            </motion.span>
          )}
        </AnimatePresence>
      </NavLink>
    );
  }

  return (
    <div>
      <button onClick={toggleChildren} className={`w-full ${baseClasses}`}>
        <item.icon className="h-5 w-5 flex-shrink-0" />
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="ml-3 flex-1 overflow-hidden whitespace-nowrap text-left"
            >
              {item.title}
            </motion.span>
          )}
        </AnimatePresence>
        {isOpen && (
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isChildrenVisible ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      <AnimatePresence>
        {isChildrenVisible && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={`mt-2 space-y-2 ${isOpen ? 'pl-7' : 'pl-0'}`}>
              {item.children.map((child, index) => (
                 <NavLink
                    key={index}
                    to={child.href}
                    className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ''}`}
                  >
                    {!isOpen && <child.icon className="h-5 w-5 flex-shrink-0" />}
                    <AnimatePresence>
                    {isOpen && (
                        <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden whitespace-nowrap"
                        >
                        {child.title}
                        </motion.span>
                    )}
                    </AnimatePresence>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarItems;
