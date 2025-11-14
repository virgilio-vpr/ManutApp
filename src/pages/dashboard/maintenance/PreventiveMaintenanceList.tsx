import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const PreventiveMaintenanceList: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Manutenção Preventiva</h1>
        <Link
          to="/maintenance/preventive/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Criar Plano de Preventiva
        </Link>
      </div>
      <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
        <p className="text-muted-foreground">A lista de planos de manutenção preventiva será exibida aqui.</p>
      </div>
    </div>
  );
};

export default PreventiveMaintenanceList;
