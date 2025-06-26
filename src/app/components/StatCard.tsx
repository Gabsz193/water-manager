// src/components/StatCard.tsx
import React from 'react';
import {Card, Col, Row, Skeleton, Statistic, Typography} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    precision?: number;
    suffix?: string;
    changeText?: string;
    changeType?: 'up' | 'down';
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, changeText, changeType, color }) => {
    const changeIcon = changeType === 'up' ? <ArrowUpOutlined /> : changeType === 'down' ? <ArrowDownOutlined /> : undefined;
    const changeColor = changeType === 'up' ? '#3f8600' : changeType === 'down' ? '#cf1322' : "#000";

    return (
        <Card style={{ height: '100%' }}>
            { value !== "Null" ? <Row align="middle" gutter={16}>
                <Col>
                    <div style={{
                        backgroundColor: `${color}20`, // Light background color
                        color: color,
                        padding: '12px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px'
                    }}>
                        {icon}
                    </div>
                </Col>
                <Col>
                    <Statistic title={title} value={value} valueStyle={{ fontSize: '22px' }}/>
                    {changeText ? <Text style={{ color: changeColor, fontSize: '12px' }}>
                        {changeIcon} {changeText}
                    </Text> : undefined }
                </Col>
            </Row> : <Skeleton /> }
        </Card>
    );
};

export default StatCard;