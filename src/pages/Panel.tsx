import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { navItems } from '../lib/nav-items';
import PanelCard from '../components/panel/PanelCard';

const Panel: React.FC = () => {
  const { user } = useAuth();

  const accessibleModules = user
    ? navItems.filter(item => {
        if (!item.roles) return true;
        return item.roles.includes(user.role);
      })
    : [];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Bem-vindo, {user?.name}!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Selecione um módulo para começar.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {accessibleModules.map((item) => {
          const href = item.isChidren && item.children && item.children.length > 0
            ? item.children[0].href
            : item.href;

          return (
            <PanelCard
              key={item.title}
              title={item.title}
              icon={item.icon}
              href={href}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Panel;
