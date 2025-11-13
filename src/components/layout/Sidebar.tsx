import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import { navItems } from '../../lib/nav-items';
import SidebarItems from './SidebarItems';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();

  const sidebarVariants = {
    open: { width: '256px' },
    closed: { width: '64px' },
  };

  const filteredNavItems = user
    ? navItems.filter(item => {
        if (!item.roles) return true; // Itens sem 'roles' são públicos para usuários logados
        return item.roles.includes(user.role);
      })
    : [];

  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden h-screen flex-col border-r bg-background sm:flex"
    >
      <div className="flex h-16 items-center justify-center border-b">
        <Bot className="h-8 w-8 text-primary" />
        <AnimatePresence>
        {isOpen && (
            <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="ml-2 text-xl font-bold text-foreground whitespace-nowrap"
            >
                ManutApp
            </motion.h1>
        )}
        </AnimatePresence>
      </div>
      <nav className="flex-1 space-y-2 overflow-y-auto p-2 custom-scrollbar">
        {filteredNavItems.map((item, index) => (
          <SidebarItems key={index} item={item} isOpen={isOpen} />
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
