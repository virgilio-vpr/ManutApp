import React from 'react';
import { Outlet } from 'react-router-dom';
import PanelHeader from '../components/layout/PanelHeader';
import Footer from '../components/layout/Footer';

const PanelLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <PanelHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PanelLayout;
