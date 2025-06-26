// src/components/AlertsList.tsx
import React from 'react';
import {Card, List, Typography, Space, Skeleton} from 'antd';
import { WarningFilled, CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import {useMonitoramentoValue} from "@/app/hooks/useMonitoramentoValue";

const { Text } = Typography;

interface AlertItem {
    id: number;
    type: iconStatus;
    message: string;
}

const getIcon = (type: AlertItem['type']) => {
    switch (type) {
        case 'warning':
            return <WarningFilled style={{ color: '#faad14', fontSize: '20px' }} />;
        case 'success':
            return <CheckCircleFilled style={{ color: '#52c41a', fontSize: '20px' }} />;
        case "info":
            return <InfoCircleFilled style={{ color: '#1890ff', fontSize: '20px' }} />;
        case 'danger':
            return <WarningFilled style={{ color: '#f5222d', fontSize: '20px' }} />;
    }
};

type iconStatus = "warning" | "success" | "info" | 'danger'

const AlertsList: React.FC = () => {
    const nivelMessage : string = useMonitoramentoValue("nivel") as string;
    const phMessage : string = useMonitoramentoValue("ph")  as string;
    const nivelIcon: iconStatus = useMonitoramentoValue("nivelIcon") as iconStatus;
    const phIcon: iconStatus = useMonitoramentoValue("phIcon") as iconStatus;

    const alertData: AlertItem[] = [
        { id: 1, type: nivelIcon, message: nivelMessage?.toString() },
        { id: 2, type: phIcon, message: phMessage?.toString() },
    ];

    return (
        <Card title="Alertas & Notificações" style={{ height: '100%' }}>
            { nivelMessage && phMessage && nivelIcon && phIcon ? <List
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
            /> : <Skeleton />}
        </Card>
    )
};

export default AlertsList;