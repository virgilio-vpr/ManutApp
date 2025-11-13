export type UserRole = 'ADMIN' | 'GESTOR' | 'PLANEJADOR' | 'EXECUTOR' | 'SOLICITANTE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
