export type UserRole = 'ADMIN' | 'GESTOR' | 'PLANEJADOR' | 'EXECUTOR' | 'SOLICITANTE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type ServiceOrderStatus =
  | 'ABERTA'
  | 'EM_ANDAMENTO'
  | 'AGUARDANDO_LIBERACAO'
  | 'AGUARDANDO_MATERIAL'
  | 'AGUARDANDO_PECA'
  | 'ANALISE_ORCAMENTO'
  | 'CONSERTO_EXTERNO'
  | 'ENCERRADA'
  | 'CANCELADA';
  
export type Priority = 'EMERGENCIA' | 'URGENCIA' | 'ALTA' | 'MEDIA' | 'BAIXA';

export interface ServiceOrder {
  id: string;
  requester: string;
  executorId?: string;
  location: string;
  specialty: string;
  equipment?: string;
  description: string;
  priority: Priority;
  status: ServiceOrderStatus;
  createdAt: string;
  firstAttendanceAt?: string;
  completedAt?: string;
}

export type Frequency = 'DIARIA' | 'SEMANAL' | 'QUINZENAL' | 'MENSAL' | 'BIMESTRAL' | 'TRIMESTRAL' | 'SEMESTRAL' | 'ANUAL' | 'AVULSA';

export interface PreventiveOrderPlan {
  id: string;
  location: string;
  equipment: string;
  specialty: string;
  frequency: Frequency;
  createdAt: string;
}
