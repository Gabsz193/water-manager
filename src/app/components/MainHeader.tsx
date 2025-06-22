// src/components/MainHeader.tsx
"use client";

import React, {useState} from 'react';
import {Layout, Avatar, Typography, Space, Dropdown, Flex, message} from 'antd';
import type { MenuProps } from 'antd'; // Importar o tipo MenuProps
import { UserOutlined, SettingOutlined, LogoutOutlined, CloudServerOutlined } from '@ant-design/icons';
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

const { Title, Text } = Typography;

const MainHeader: React.FC = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const handleMenuClick: MenuProps['onClick'] = async ({ key }) => {
        if (key === '3') { // Logout
            setLoading(true);
            try {
                await logout();
                messageApi.success('Logout realizado com sucesso');
                router.push('/login');
            } catch (error) {
                console.error('Erro ao fazer logout:', error);
                messageApi.error('Erro ao fazer logout. Tente novamente.');
            } finally {
                setLoading(false);
            }
        }
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'Meu Perfil',
            disabled: loading
        },
        {
            key: '2',
            icon: <SettingOutlined />,
            label: 'Configurações',
            disabled: loading
        },
        {
            type: 'divider',
        },
        {
            key: '3',
            icon: <LogoutOutlined />,
            label: loading ? 'Saindo...' : 'Sair',
            danger: true,
            disabled: loading
        },
    ];



    return (
        <Layout.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', borderBottom: '1px solid #f0f0f0' }}>
            <Space align="center">
                <CloudServerOutlined style={{ fontSize: '28px', color: '#1890ff' }} />
                <Title level={4} style={{ marginBottom: 0, marginLeft: 8 }}>
                    Water Manager
                </Title>
            </Space>
            {contextHolder}
            {/* MUDANÇA 2: Trocar 'overlay' por 'menu' e passar o array de itens */}
            <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
                <Space style={{ cursor: loading ? 'wait' : 'pointer' }}>
                    <Avatar icon={<UserOutlined />} />
                    <Flex vertical>
                        <Text strong>{user?.displayName || 'Usuário'}</Text>
                        <Text type="secondary" style={{fontSize: '12px'}}>
                            {user?.email || 'usuario@demo.com'}
                        </Text>
                    </Flex>
                </Space>
            </Dropdown>
        </Layout.Header>
    );
}

export default MainHeader;