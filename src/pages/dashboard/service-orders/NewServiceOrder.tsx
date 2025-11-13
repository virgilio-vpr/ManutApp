import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/ui/Card';
import { Label } from '../../../components/ui/Label';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Textarea } from '../../../components/ui/Textarea';
import { locations, specialties, priorities } from '../../../lib/mock-data';
import { Save, Ban } from 'lucide-react';

const NewServiceOrder: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    solicitante: user?.name || '',
    ramal: '',
    localizacao: '',
    especialidade: '',
    equipamento: '',
    descricao: '',
    prioridade: 'MEDIA',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui virá a lógica para enviar os dados para a API
    console.log("Dados do formulário:", formData);
    alert("Ordem de serviço enviada para simulação! Verifique o console.");
    navigate('/service-orders');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Abrir Nova Ordem de Serviço</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>Número da OS</Label>
            <Input value="Automático" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="solicitante">Nome do Solicitante</Label>
            <Input id="solicitante" name="solicitante" value={formData.solicitante} onChange={handleChange} required disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ramal">Ramal</Label>
            <Input id="ramal" name="ramal" value={formData.ramal} onChange={handleChange} placeholder="Ex: 1234" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="localizacao">Localização</Label>
            <Select id="localizacao" name="localizacao" value={formData.localizacao} onChange={handleChange} required>
              <option value="" disabled className="bg-popover text-muted-foreground">Selecione a localização</option>
              {locations.map(loc => <option key={loc} value={loc} className="bg-popover text-popover-foreground">{loc}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="especialidade">Especialidade</Label>
            <Select id="especialidade" name="especialidade" value={formData.especialidade} onChange={handleChange} required>
              <option value="" disabled className="bg-popover text-muted-foreground">Selecione a especialidade</option>
              {specialties.map(spec => <option key={spec} value={spec} className="bg-popover text-popover-foreground">{spec}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="equipamento">Equipamento</Label>
            <Input id="equipamento" name="equipamento" value={formData.equipamento} onChange={handleChange} placeholder="Ex: Monitor Cardíaco Mod. XYZ" />
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <Label htmlFor="descricao">Descrição da Falha</Label>
            <Textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required placeholder="Descreva o problema em detalhes..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prioridade">Prioridade</Label>
            <Select id="prioridade" name="prioridade" value={formData.prioridade} onChange={handleChange} required>
              {priorities.map(p => <option key={p.id} value={p.id} className="bg-popover text-popover-foreground">{p.name}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Data da Ordem</Label>
            <Input value={new Date().toLocaleDateString('pt-BR')} disabled />
          </div>
          <div className="space-y-2">
            <Label>Data/Hora 1º Atendimento</Label>
            <Input value="Aguardando atendimento" disabled />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/service-orders')}
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
            Salvar
          </button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default NewServiceOrder;
