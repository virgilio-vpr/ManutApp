import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge, BadgeProps } from '../../../components/ui/Badge';
import { ServiceOrder, ServiceOrderStatus, Priority } from '../../../types';
import { mockServiceOrders } from '../../../lib/mock-data';

const statusMap: Record<ServiceOrderStatus, { text: string; variant: BadgeProps['variant'] }> = {
  ABERTA: { text: 'Aberta', variant: 'info' },
  EM_ANDAMENTO: { text: 'Em Andamento', variant: 'warning' },
  AGUARDANDO_LIBERACAO: { text: 'Aguard. Liberação', variant: 'info' },
  AGUARDANDO_MATERIAL: { text: 'Aguard. Material', variant: 'info' },
  AGUARDANDO_PECA: { text: 'Aguard. Peça', variant: 'info' },
  ANALISE_ORCAMENTO: { text: 'Análise Orçamento', variant: 'info' },
  CONSERTO_EXTERNO: { text: 'Conserto Externo', variant: 'info' },
  ENCERRADA: { text: 'Encerrada', variant: 'success' },
  CANCELADA: { text: 'Cancelada', variant: 'destructive' },
};

const priorityMap: Record<Priority, { text: string; variant: BadgeProps['variant'] }> = {
  EMERGENCIA: { text: 'Emergência', variant: 'destructive' },
  URGENCIA: { text: 'Urgência', variant: 'destructive' },
  ALTA: { text: 'Alta', variant: 'warning' },
  MEDIA: { text: 'Média', variant: 'info' },
  BAIXA: { text: 'Baixa', variant: 'secondary' },
};

const CorrectiveMaintenanceList: React.FC = () => {
  const navigate = useNavigate();
  const [ordersToPlan, setOrdersToPlan] = useState<ServiceOrder[]>([]);

  useEffect(() => {
    // Filtra ordens que precisam de planejamento (status 'Aberta')
    const data = mockServiceOrders.filter(order => order.status === 'ABERTA');
    setOrdersToPlan(data);
  }, []);

  const handleRowClick = (id: string) => {
    navigate(`/maintenance/corrective/edit/${id}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Planejamento de Corretivas</h1>
      </div>
      <p className="mb-6 text-muted-foreground">
        Abaixo estão as ordens de serviço abertas aguardando planejamento. Clique em uma OS para editar, atribuir um executor e alterar o status.
      </p>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-muted-foreground">
              <thead className="text-xs uppercase bg-secondary">
                <tr>
                  <th scope="col" className="px-6 py-3">OS</th>
                  <th scope="col" className="px-6 py-3">Prioridade</th>
                  <th scope="col" className="px-6 py-3">Descrição</th>
                  <th scope="col" className="px-6 py-3">Localização</th>
                  <th scope="col" className="px-6 py-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {ordersToPlan.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => handleRowClick(order.id)}
                    className="border-b bg-card hover:bg-muted cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4">
                      <Badge variant={priorityMap[order.priority].variant}>
                        {priorityMap[order.priority].text}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 max-w-sm truncate">{order.description}</td>
                    <td className="px-6 py-4">{order.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      {ordersToPlan.length === 0 && (
         <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card mt-6">
            <p className="text-muted-foreground">Nenhuma ordem de serviço para planejar no momento.</p>
         </div>
      )}
    </div>
  );
};

export default CorrectiveMaintenanceList;
