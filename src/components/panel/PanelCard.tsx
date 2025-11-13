import React from 'react';
import { Link } from 'react-router-dom';

interface PanelCardProps {
  title: string;
  icon: React.ElementType;
  href: string;
}

const PanelCard: React.FC<PanelCardProps> = ({ title, icon: Icon, href }) => {
  return (
    <Link
      to={href}
      className="group flex flex-col items-center justify-center gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <Icon className="h-12 w-12 text-primary transition-colors sm:h-16 sm:w-16" />
      <h3 className="text-center text-base font-semibold sm:text-lg">{title}</h3>
    </Link>
  );
};

export default PanelCard;
