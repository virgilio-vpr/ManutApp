import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-foreground">{title}</h1>
      <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
        <p className="text-muted-foreground">Conteúdo da página de {title} virá aqui.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
