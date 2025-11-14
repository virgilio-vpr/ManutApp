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
    { id: "EMERGENCIA", name: "Emergência (Atendimento Imediato)" },
    { id: "URGENCIA", name: "Urgência (Atendimento em até 2 horas)" },
    { id: "ALTA", name: "Alta (Atendimento em até 24 horas)" },
    { id: "MEDIA", name: "Média (Atendimento em até 3 dias)" },
    { id: "BAIXA", name: "Baixa (Atendimento em até 7 dias)" },
];
