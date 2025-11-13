import { User, UserRole } from '../types';

export const mockUsers: User[] = [
    { id: '1', name: 'Admin', email: 'admin@manut.app', role: 'ADMIN' },
    { id: '2', name: 'Gestor de Área', email: 'gestor@manut.app', role: 'GESTOR' },
    { id: '3', name: 'Planejador', email: 'planejador@manut.app', role: 'PLANEJADOR' },
    { id: '4', name: 'Executor', email: 'executor@manut.app', role: 'EXECUTOR' },
    { id: '5', name: 'Solicitante', email: 'solicitante@manut.app', role: 'SOLICITANTE' },
];

export const userRoles: UserRole[] = ['SOLICITANTE', 'EXECUTOR', 'PLANEJADOR', 'GESTOR', 'ADMIN'];
