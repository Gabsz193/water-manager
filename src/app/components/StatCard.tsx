// src/components/StatCard.tsx
import React from 'react';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    precision?: number;
    suffix?: string;
    changeText: string;
    changeType: 'up' | 'down';
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, changeText, changeType, color }) => {
    const isUp = changeType === 'up';
    const changeIcon = isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
    const changeColor = isUp ? '#3f8600' : '#cf1322';

    return (
        <Card style={{ height: '100%' }}>
            <Row align="middle" gutter={16}>
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
                    <Text style={{ color: changeColor, fontSize: '12px' }}>
                        {changeIcon} {changeText}
                    </Text>
                </Col>
            </Row>
        </Card>
    );
};

export default StatCard;