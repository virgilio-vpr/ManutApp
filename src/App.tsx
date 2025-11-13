import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import PanelLayout from './layouts/PanelLayout';
import Panel from './pages/Panel';
import DashboardHome from './pages/dashboard/Home';
import PlaceholderPage from './pages/dashboard/PlaceholderPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        
        <Route element={<PanelLayout />}>
          <Route path="/panel" element={<Panel />} />
        </Route>

        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/panel" replace />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="maintenance/corrective" element={<PlaceholderPage title="Manutenção Corretiva" />} />
          <Route path="maintenance/preventive" element={<PlaceholderPage title="Manutenção Preventiva" />} />
          <Route path="kpi" element={<PlaceholderPage title="Indicadores de Desempenho (KPI)" />} />
          <Route path="service-orders" element={<PlaceholderPage title="Ordens de Serviço" />} />
          <Route path="registration/assets" element={<PlaceholderPage title="Cadastro de Ativos" />} />
          <Route path="registration/equipments" element={<PlaceholderPage title="Cadastro de Equipamentos" />} />
          <Route path="registration/cost-center" element={<PlaceholderPage title="Cadastro de Centro de Custo" />} />
          <Route path="registration/location" element={<PlaceholderPage title="Cadastro de Localização" />} />
          <Route path="admin/user-management" element={<PlaceholderPage title="Gestão de Usuários" />} />
          <Route path="admin/form-builder" element={<PlaceholderPage title="Criação de Formulário de OS" />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/panel" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
