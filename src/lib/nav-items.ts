import {
  LayoutDashboard,
  Wrench,
  Settings,
  ClipboardList,
  Factory,
  Users,
  BarChart3,
  FilePlus2,
  CalendarDays
} from 'lucide-react';
import { UserRole } from '../types';

export interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  isChidren?: boolean;
  children?: NavItem[];
  roles?: UserRole[];
}

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    isChidren: false,
  },
  {
    title: 'Manutenção',
    icon: Wrench,
    href: '/maintenance',
    isChidren: true,
    roles: ['ADMIN', 'GESTOR', 'PLANEJADOR', 'EXECUTOR'],
    children: [
      {
        title: 'Corretiva',
        icon: Settings,
        href: '/maintenance/corrective',
      },
      {
        title: 'Preventiva',
        icon: Settings,
        href: '/maintenance/preventive',
      },
      {
        title: 'Cronograma',
        icon: CalendarDays,
        href: '/maintenance/schedule',
        roles: ['ADMIN', 'GESTOR', 'PLANEJADOR'],
      },
    ],
  },
  {
    title: 'Indicadores',
    icon: BarChart3,
    href: '/kpi',
    isChidren: false,
    roles: ['ADMIN', 'GESTOR', 'PLANEJADOR'],
  },
  {
    title: 'Ordens de Serviço',
    icon: ClipboardList,
    href: '/service-orders',
    isChidren: false,
    roles: ['ADMIN', 'GESTOR', 'PLANEJADOR', 'EXECUTOR', 'SOLICITANTE'],
  },
  {
    title: 'Cadastros',
    icon: Factory,
    href: '/registration',
    isChidren: true,
    roles: ['ADMIN', 'GESTOR', 'PLANEJADOR'],
    children: [
        { title: 'Ativos', icon: Settings, href: '/registration/assets' },
        { title: 'Equipamentos', icon: Settings, href: '/registration/equipments' },
        { title: 'Centro de Custo', icon: Settings, href: '/registration/cost-center' },
        { title: 'Localização', icon: Settings, href: '/registration/location' },
    ]
  },
  {
    title: 'Admin',
    icon: Users,
    href: '/admin',
    isChidren: true,
    roles: ['ADMIN'],
    children: [
        { title: 'Gestão de Usuários', icon: Users, href: '/admin/user-management' },
        { title: 'Criar Formulário OS', icon: FilePlus2, href: '/admin/form-builder' },
    ]
  },
];
