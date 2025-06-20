// src/components/AlertsList.tsx
import React from 'react';
import { Card, List, Typography, Space } from 'antd';
import { WarningFilled, CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons';

const { Text } = Typography;

interface AlertItem {
    id: number;
    type: 'warning' | 'success' | 'info';
    message: string;
}

const alertData: AlertItem[] = [
    { id: 1, type: 'warning', message: 'Consumo acima do normal detectado no 7º andar.' },
    { id: 2, type: 'success', message: 'Manutenção preventiva concluída com sucesso.' },
    { id: 3, type: 'info', message: 'Novo relatório mensal disponível para download.' },
];

const getIcon = (type: AlertItem['type']) => {
    switch (type) {
        case 'warning':
            return <WarningFilled style={{ color: '#faad14', fontSize: '20px' }} />;
        case 'success':
            return <CheckCircleFilled style={{ color: '#52c41a', fontSize: '20px' }} />;
        case 'info':
            return <InfoCircleFilled style={{ color: '#1890ff', fontSize: '20px' }} />;
    }
};

const AlertsList: React.FC = () => (
    <Card title="Alertas & Notificações" style={{ height: '100%' }}>
        <List
            itemLayout="horizontal"
            dataSource={alertData}
            renderItem={(item) => (
                <List.Item>
                    <Space align="start">
                        {getIcon(item.type)}
                        <Text>{item.message}</Text>
                    </Space>
                </List.Item>
            )}
        />
    </Card>
);

export default AlertsList;