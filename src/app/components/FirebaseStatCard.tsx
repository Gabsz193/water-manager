import React from 'react';
import StatCard from './StatCard'; // Your existing StatCard component
import { useMonitoramentoValue } from '../hooks/useMonitoramentoValue';

interface FirebaseStatCardProps {
    title: string;
    icon: React.ReactNode;
    keyName: string; // Key from "monitoramento" (e.g., "bomba", "ph", etc.)
    precision?: number;
    suffix?: string;
    changeText: string;
    changeType: 'up' | 'down';
    color: string;
}

const FirebaseStatCard: React.FC<FirebaseStatCardProps> = ({ title, icon, keyName, precision, suffix, changeText, changeType, color }) => {
    const databaseValue = useMonitoramentoValue(keyName);

    return (
        <StatCard
            title={title}
            icon={icon}
            value={typeof databaseValue === 'number' ? databaseValue.toFixed(precision || 0) : `${databaseValue}`}
            precision={precision}
            suffix={suffix}
            changeText={changeText}
            changeType={changeType}
            color={color}
        />
    );
};

export default FirebaseStatCard;