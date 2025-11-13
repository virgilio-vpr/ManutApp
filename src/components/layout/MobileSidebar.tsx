import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X } from 'lucide-react';
import { navItems } from '../../lib/nav-items';
import SidebarItems from './SidebarItems';
import { useAuth } from '../../hooks/useAuth';

interface MobileSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();

  const filteredNavItems = user
    ? navItems.filter(item => {
        if (!item.roles) return true;
        return item.roles.includes(user.role);
      })
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r bg-background sm:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b px-4">
              <div className="flex items-center">
                <Bot className="h-8 w-8 text-primary" />
                <h1 className="ml-2 text-xl font-bold text-foreground">ManutApp</h1>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Fechar menu</span>
              </button>
            </div>
            <nav className="flex-1 space-y-2 overflow-y-auto p-2 custom-scrollbar">
              {filteredNavItems.map((item, index) => (
                <SidebarItems key={index} item={item} isOpen={true} />
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
