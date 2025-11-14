import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Ban } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/ui/Card';
import { Label } from '../../../components/ui/Label';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { locations, specialties, frequencies } from '../../../lib/mock-data';
import { Frequency } from '../../../types';

const NewPreventiveOrder: React.FC = () => {
  const navigate = useNavigate();
  const [isOneTime, setIsOneTime] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    equipment: '',
    specialty: '',
    frequency: 'MENSAL' as Frequency,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOneTime(e.target.checked);
    setFormData(prev => ({ ...prev, frequency: e.target.checked ? 'AVULSA' : 'MENSAL' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Novo plano de preventiva:", formData);
    alert("Plano de manutenção preventiva criado com sucesso (simulação)!");
    navigate('/maintenance/preventive');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Criar Plano de Manutenção Preventiva</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Select id="location" name="location" value={formData.location} onChange={handleChange} required>
              <option value="" disabled className="bg-popover text-muted-foreground">Selecione a localização</option>
              {locations.map(loc => <option key={loc} value={loc} className="bg-popover text-popover-foreground">{loc}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialty">Especialidade</Label>
            <Select id="specialty" name="specialty" value={formData.specialty} onChange={handleChange} required>
              <option value="" disabled className="bg-popover text-muted-foreground">Selecione a especialidade</option>
              {specialties.map(spec => <option key={spec} value={spec} className="bg-popover text-popover-foreground">{spec}</option>)}
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="equipment">Equipamento</Label>
            <Input id="equipment" name="equipment" value={formData.equipment} onChange={handleChange} placeholder="Ex: Gerador de Energia, Sistema de Climatização" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequência</Label>
            <Select id="frequency" name="frequency" value={formData.frequency} onChange={handleChange} disabled={isOneTime}>
              {frequencies.filter(f => f.id !== 'AVULSA').map(f => <option key={f.id} value={f.id} className="bg-popover text-popover-foreground">{f.name}</option>)}
            </Select>
          </div>
          <div className="flex items-end pb-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isOneTime"
                checked={isOneTime}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="isOneTime" className="mb-0">Manutenção Avulsa (única)</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/maintenance/preventive')}
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
            Salvar Plano
          </button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default NewPreventiveOrder;
