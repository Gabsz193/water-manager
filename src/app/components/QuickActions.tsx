// src/components/QuickActions.tsx
"use client"; // Marcamos como client por causa do Card hoverable e potencialmente clicável

import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { FileTextOutlined, SettingOutlined, HistoryOutlined, FlagOutlined } from '@ant-design/icons';

// O restante do código é o mesmo da resposta anterior...

interface ActionProps {
    icon: React.ReactNode;
    label: string;
    color: string;
}

const actions: ActionProps[] = [
    { icon: <FileTextOutlined />, label: 'Gerar Relatório', color: '#1890ff' },
    { icon: <SettingOutlined />, label: 'Configurações', color: '#52c41a' },
    { icon: <HistoryOutlined />, label: 'Ver Histórico', color: '#722ed1' },
    { icon: <FlagOutlined />, label: 'Reportar Problema', color: '#f5222d' },
];

const QuickActionCard: React.FC<ActionProps> = ({ icon, label, color }) => (
    <Card hoverable style={{ textAlign: 'center' }} onClick={() => alert(`Ação: ${label}`)}>
        <div style={{ fontSize: '24px', color: color, marginBottom: '10px' }}>
            {icon}
        </div>
        <Typography.Text strong>{label}</Typography.Text>
    </Card>
);

const QuickActions: React.FC = () => (
    <>
        <Typography.Title level={4}>Ações Rápidas</Typography.Title>
        <Row gutter={[16, 16]}>
            {actions.map((action) => (
                <Col xs={24} sm={12} md={6} key={action.label}>
                    <QuickActionCard {...action} />
                </Col>
            ))}
        </Row>
    </>
);

export default QuickActions;