import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const DashboardHome: React.FC = () => {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-foreground">Visão Geral</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Ordens Abertas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">+2% desde ontem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preventivas Atrasadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-destructive">3</p>
            <p className="text-sm text-muted-foreground">Verificar urgência</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>MTBF</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1.200h</p>
            <p className="text-sm text-muted-foreground">Média do mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Disponibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">98.7%</p>
            <p className="text-sm text-muted-foreground">Acima da meta</p>
          </CardContent>
        </Card>
      </div>
      {/* Aqui você pode adicionar mais componentes, como gráficos */}
    </div>
  );
};

export default DashboardHome;
