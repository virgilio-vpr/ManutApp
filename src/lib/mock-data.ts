import { User, UserRole } from '../types';

export const mockUsers: User[] = [
    { id: '1', name: 'Admin', email: 'admin@manut.app', role: 'ADMIN' },
    { id: '2', name: 'Gestor de Área', email: 'gestor@manut.app', role: 'GESTOR' },
    { id: '3', name: 'Planejador', email: 'planejador@manut.app', role: 'PLANEJADOR' },
    { id: '4', name: 'Executor', email: 'executor@manut.app', role: 'EXECUTOR' },
    { id: '5', name: 'Solicitante', email: 'solicitante@manut.app', role: 'SOLICITANTE' },
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
    { id: "EMERGENCIA", name: "Emergência (Atendimento em15 minutos)" },
    { id: "URGENCIA", name: "Urgência (Atendimento em 45 minutos)" },
    { id: "ALTA", name: "Alta (Atendimento em 3 dias)" },
    { id: "MEDIA", name: "Média (Atendimento em até 10 dias)" },
    { id: "BAIXA", name: "Baixa (Atendimento em até 30 dias)" },
];
