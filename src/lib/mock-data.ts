import { User, UserRole, ServiceOrder, ServiceOrderStatus, Frequency, PreventiveOrderPlan } from '../types';

export const mockUsers: User[] = [
    { id: '1', name: 'Admin', email: 'admin@manut.app', role: 'ADMIN' },
    { id: '2', name: 'Gestor de Área', email: 'gestor@manut.app', role: 'GESTOR' },
    { id: '3', name: 'Planejador', email: 'planejador@manut.app', role: 'PLANEJADOR' },
    { id: '4', name: 'Executor 1 (Elétrica)', email: 'executor@manut.app', role: 'EXECUTOR' },
    { id: '5', name: 'Solicitante', email: 'solicitante@manut.app', role: 'SOLICITANTE' },
    { id: '6', name: 'Executor 2 (Climatização)', email: 'executor2@manut.app', role: 'EXECUTOR' },
];

export const userRoles: UserRole[] = ['SOLICITANTE', 'EXECUTOR', 'PLANEJADOR', 'GESTOR', 'ADMIN'];

export const locations = [
    "Ala Norte - 1º Andar",
    "Ala Sul - Térreo",
    "Centro Cirúrgico",
    "UTI Adulto",
    "Laboratório Central",
    "Almoxarifado",
];

export const specialties = [
    "Elétrica",
    "Hidráulica",
    "Gasoterapia",
    "Predial",
    "Ar Condicionado",
    "Marcenaria",
    "Equipamento Médico",
];

export const priorities = [
    { id: "EMERGENCIA", name: "Emergência" },
    { id: "URGENCIA", name: "Urgência" },
    { id: "ALTA", name: "Alta" },
    { id: "MEDIA", name: "Média" },
    { id: "BAIXA", name: "Baixa" },
];

export const detailedStatuses: { id: ServiceOrderStatus, name: string }[] = [
    { id: 'ABERTA', name: 'Aberta' },
    { id: 'EM_ANDAMENTO', name: 'Em Andamento' },
    { id: 'AGUARDANDO_LIBERACAO', name: 'Aguardando Liberação do Setor' },
    { id: 'AGUARDANDO_MATERIAL', name: 'Aguardando Material' },
    { id: 'AGUARDANDO_PECA', name: 'Aguardando Peça' },
    { id: 'ANALISE_ORCAMENTO', name: 'Análise de Orçamento' },
    { id: 'CONSERTO_EXTERNO', name: 'Conserto Externo' },
    { id: 'ENCERRADA', name: 'Encerrada' },
    { id: 'CANCELADA', name: 'Cancelada' },
];

export const frequencies: { id: Frequency, name: string }[] = [
    { id: 'AVULSA', name: 'Avulsa (Execução Única)' },
    { id: 'DIARIA', name: 'Diária' },
    { id: 'SEMANAL', name: 'Semanal' },
    { id: 'QUINZENAL', name: 'Quinzenal' },
    { id: 'MENSAL', name: 'Mensal' },
    { id: 'BIMESTRAL', name: 'Bimestral' },
    { id: 'TRIMESTRAL', name: 'Trimestral' },
    { id: 'SEMESTRAL', name: 'Semestral' },
    { id: 'ANUAL', name: 'Anual' },
];

export const mockServiceOrders: ServiceOrder[] = [
    {
        id: 'OS-2025-001',
        requester: 'Solicitante',
        location: 'Ala Norte - 1º Andar',
        specialty: 'Elétrica',
        equipment: 'Luminária Quarto 102',
        description: 'Lâmpada do quarto 102 queimada. Paciente no leito.',
        priority: 'URGENCIA',
        status: 'ABERTA',
        createdAt: '2025-07-28T10:30:00Z',
    },
    {
        id: 'OS-2025-002',
        requester: 'Solicitante',
        executorId: '4',
        location: 'Centro Cirúrgico',
        specialty: 'Equipamento Médico',
        equipment: 'Bisturi Elétrico Mod. ABC',
        description: 'Bisturi elétrico não está ligando. Cirurgia agendada para as 14h.',
        priority: 'EMERGENCIA',
        status: 'EM_ANDAMENTO',
        createdAt: '2025-07-28T09:00:00Z',
        firstAttendanceAt: '2025-07-28T09:05:00Z',
    },
    {
        id: 'OS-2025-003',
        requester: 'Solicitante',
        executorId: '6',
        location: 'UTI Adulto',
        specialty: 'Ar Condicionado',
        description: 'Ar condicionado do leito 5 não está gelando o suficiente.',
        priority: 'ALTA',
        status: 'AGUARDANDO_PECA',
        createdAt: '2025-07-27T15:00:00Z',
    },
    {
        id: 'OS-2025-004',
        requester: 'Solicitante',
        executorId: '4',
        location: 'Ala Sul - Térreo',
        specialty: 'Hidráulica',
        equipment: 'Torneira Banheiro Social',
        description: 'Torneira do banheiro social próximo à recepção está com vazamento contínuo.',
        priority: 'MEDIA',
        status: 'ENCERRADA',
        createdAt: '2025-07-25T11:00:00Z',
        firstAttendanceAt: '2025-07-25T14:20:00Z',
        completedAt: '2025-07-25T15:00:00Z',
    },
    {
        id: 'OS-2025-005',
        requester: 'Solicitante',
        location: 'Almoxarifado',
        specialty: 'Predial',
        description: 'Prateleira da seção de medicamentos está solta, risco de queda.',
        priority: 'MEDIA',
        status: 'CANCELADA',
        createdAt: '2025-07-26T18:00:00Z',
    },
    {
        id: 'OS-2025-006',
        requester: 'Gestor de Área',
        location: 'Laboratório Central',
        specialty: 'Elétrica',
        equipment: 'Tomada 220V',
        description: 'Tomada da bancada 3 está sem energia.',
        priority: 'ALTA',
        status: 'ABERTA',
        createdAt: '2025-07-29T08:00:00Z',
    },
];

export const mockPreventiveOrders: PreventiveOrderPlan[] = [
    {
        id: 'PREV-001',
        location: 'UTI Adulto',
        equipment: 'Sistema de Climatização Central',
        specialty: 'Ar Condicionado',
        frequency: 'MENSAL',
        createdAt: '2025-07-01T09:00:00Z'
    },
    {
        id: 'PREV-002',
        location: 'Centro Cirúrgico',
        equipment: 'Gerador de Energia',
        specialty: 'Elétrica',
        frequency: 'TRIMESTRAL',
        createdAt: '2025-07-15T09:00:00Z'
    }
];
