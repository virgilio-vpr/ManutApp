import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-background px-4 py-3 text-center text-xs text-muted-foreground sm:px-6">
      <p>&copy; {currentYear} ManutApp. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
