// src/components/MainHeader.tsx
'use client';

import React from 'react';
import { Layout, Menu, Button, Flex, Typography } from 'antd';
import { LogoutOutlined, DashboardOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const { Header } = Layout;
const { Title } = Typography;

const MainHeader: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      // Importar dinamicamente para evitar problemas com SSR
      const { logoutUser } = await import('@/lib/firebase-client');

      // Fazer logout no Firebase
      await logoutUser();

      // Limpar o cookie de sessão no servidor
      await fetch('/api/logout', {
        method: 'POST',
      });

      // Redirecionar para a página de login
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <Header style={{ 
      background: 'white', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', 
      padding: '0 24px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between' 
    }}>
      <Flex align="center">
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
          Water Manager
        </Title>

        <Menu 
          mode="horizontal" 
          style={{ border: 'none', marginLeft: 40 }}
          defaultSelectedKeys={['dashboard']}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
          <Menu.Item key="alerts" icon={<BellOutlined />}>Alertas</Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>Configurações</Menu.Item>
        </Menu>
      </Flex>

      <Flex align="center">
        {user && (
          <span style={{ marginRight: 16 }}>
            {user.email}
          </span>
        )}
        <Button 
          icon={<LogoutOutlined />} 
          onClick={handleLogout}
        >
          Sair
        </Button>
      </Flex>
    </Header>
  );
};

export default MainHeader;
