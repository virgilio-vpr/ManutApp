import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ServiceOrder, ServiceOrderStatus, Priority } from '../../../types';
import { mockServiceOrders, mockUsers } from '../../../lib/mock-data';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge, BadgeProps } from '../../../components/ui/Badge';

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

const DetailItem: React.FC<{ label: string; value?: string | React.ReactNode }> = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className="text-base text-foreground">{value || 'Não informado'}</p>
  </div>
);

const calculatePredictedAttendance = (createdAt: string, priority: Priority): string => {
  const startDate = new Date(createdAt);
  switch (priority) {
    case 'EMERGENCIA':
      startDate.setMinutes(startDate.getMinutes() + 15);
      break;
    case 'URGENCIA':
      startDate.setMinutes(startDate.getMinutes() + 45);
      break;
    case 'ALTA':
      startDate.setDate(startDate.getDate() + 3);
      break;
    case 'MEDIA':
      startDate.setDate(startDate.getDate() + 10);
      break;
    case 'BAIXA':
      startDate.setDate(startDate.getDate() + 30);
      break;
  }
  return startDate.toLocaleString('pt-BR');
};


export default function ServiceOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<ServiceOrder | null>(null);

  useEffect(() => {
    // Simula a busca de dados de uma API
    const foundOrder = mockServiceOrders.find(o => o.id === id);
    setOrder(foundOrder || null);
  }, [id]);

  if (!order) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Ordem de serviço não encontrada.</p>
      </div>
    );
  }
  
  const getExecutorName = (executorId?: string) => {
    if (!executorId) return undefined;
    const executor = mockUsers.find(u => u.id === executorId);
    return executor?.name;
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-bold text-foreground">Detalhes da OS: {order.id}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Informações Gerais</span>
            <Badge variant={priorityMap[order.priority].variant} className="text-sm">
              {priorityMap[order.priority].text}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetailItem label="Solicitante" value={order.requester} />
          <DetailItem label="Executor Designado" value={getExecutorName(order.executorId)} />
          <DetailItem label="Localização" value={order.location} />
          <DetailItem label="Especialidade" value={order.specialty} />
          <DetailItem label="Equipamento" value={order.equipment} />
          <div className="md:col-span-2 lg:col-span-3">
            <DetailItem label="Descrição da Falha" value={order.description} />
          </div>
          <DetailItem 
            label="Data de Abertura" 
            value={new Date(order.createdAt).toLocaleString('pt-BR')} 
          />
           <DetailItem
            label="Previsão de Atendimento"
            value={calculatePredictedAttendance(order.createdAt, order.priority)}
          />
          <DetailItem 
            label="Início do Atendimento" 
            value={order.firstAttendanceAt ? new Date(order.firstAttendanceAt).toLocaleString('pt-BR') : 'Aguardando'} 
          />
          <DetailItem 
            label="Data de Conclusão" 
            value={order.completedAt ? new Date(order.completedAt).toLocaleString('pt-BR') : 'Pendente'}
          />
          <DetailItem
            label="Status da OS"
            value={
                <Badge variant={statusMap[order.status]?.variant || 'default'}>
                    {statusMap[order.status]?.text || order.status}
                </Badge>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
