// src/components/MainHeader.tsx
"use client";

import React from 'react';
import {Layout, Avatar, Typography, Space, Dropdown, Flex} from 'antd';
import type { MenuProps } from 'antd'; // Importar o tipo MenuProps
import { UserOutlined, SettingOutlined, LogoutOutlined, CloudServerOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// MUDANÇA 1: Definir os itens do menu como um array de objetos
const items: MenuProps['items'] = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: 'Meu Perfil',
    },
    {
        key: '2',
        icon: <SettingOutlined />,
        label: 'Configurações',
    },
    {
        type: 'divider', // A linha divisória é definida assim
    },
    {
        key: '3',
        icon: <LogoutOutlined />,
        label: 'Sair',
        danger: true, // A propriedade danger vai aqui
    },
];

const MainHeader: React.FC = () => {
    return (
        <Layout.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', borderBottom: '1px solid #f0f0f0' }}>
            <Space align="center">
                <CloudServerOutlined style={{ fontSize: '28px', color: '#1890ff' }} />
                <Title level={4} style={{ marginBottom: 0, marginLeft: 8 }}>
                    Water Manager
                </Title>
            </Space>

            {/* MUDANÇA 2: Trocar 'overlay' por 'menu' e passar o array de itens */}
            <Dropdown menu={{ items }} trigger={['click']}>
                <Space style={{ cursor: 'pointer' }}>
                    <Avatar icon={<UserOutlined />} />
                    <Flex vertical>
                        <Text strong>Usuário Demo</Text>
                        <Text type="secondary" style={{fontSize: '12px'}}>usuario@demo.com</Text>
                    </Flex>
                </Space>
            </Dropdown>
        </Layout.Header>
    );
}

export default MainHeader;