import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Ban, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/ui/Card';
import { Label } from '../../../components/ui/Label';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Textarea } from '../../../components/ui/Textarea';
import { ServiceOrder, User } from '../../../types';
import { mockServiceOrders, mockUsers, locations, priorities, detailedStatuses } from '../../../lib/mock-data';

const EditServiceOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<ServiceOrder | null>(null);
  const [executors, setExecutors] = useState<User[]>([]);

  useEffect(() => {
    const foundOrder = mockServiceOrders.find(o => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
    const executorUsers = mockUsers.filter(u => u.role === 'EXECUTOR');
    setExecutors(executorUsers);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (order) {
      setOrder({ ...order, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui viria a lógica para enviar os dados para a API
    console.log("Ordem de serviço atualizada (simulação):", order);
    alert("Alterações salvas com sucesso (simulação)!");
    navigate('/maintenance/corrective');
  };

  if (!order) {
    return <div className="text-center p-8">Carregando ordem de serviço...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
       <div className="flex items-center gap-4 mb-6">
        <button 
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-bold text-foreground">Planejar OS: {order.id}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Editar Ordem de Serviço</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Campos não editáveis */}
          <div className="space-y-2">
            <Label>Solicitante</Label>
            <Input value={order.requester} disabled />
          </div>
          <div className="space-y-2">
            <Label>Especialidade</Label>
            <Input value={order.specialty} disabled />
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <Label>Descrição da Falha</Label>
            <Textarea value={order.description} disabled />
          </div>

          {/* Campos editáveis */}
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Select id="location" name="location" value={order.location} onChange={handleChange} required>
              {locations.map(loc => <option key={loc} value={loc} className="bg-popover text-popover-foreground">{loc}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Prioridade</Label>
            <Select id="priority" name="priority" value={order.priority} onChange={handleChange} required>
              {priorities.map(p => <option key={p.id} value={p.id} className="bg-popover text-popover-foreground">{p.name}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status da OS</Label>
            <Select id="status" name="status" value={order.status} onChange={handleChange} required>
              {detailedStatuses.map(s => <option key={s.id} value={s.id} className="bg-popover text-popover-foreground">{s.name}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="executorId">Atribuir Executor</Label>
            <Select id="executorId" name="executorId" value={order.executorId || ''} onChange={handleChange} required>
              <option value="" disabled className="bg-popover text-muted-foreground">Selecione um executor</option>
              {executors.map(exec => <option key={exec.id} value={exec.id} className="bg-popover text-popover-foreground">{exec.name}</option>)}
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/maintenance/corrective')}
            className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            <Ban className="mr-2 h-4 w-4" />
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default EditServiceOrder;
