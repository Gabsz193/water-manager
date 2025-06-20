// src/components/WaterConsumptionChart.tsx
"use client"; // Gráficos são renderizados no lado do cliente

import React from 'react';
import { Card } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// O restante do código é exatamente o mesmo...
const data = [
    { name: 'Seg', consumo: 2300 },
    { name: 'Ter', consumo: 2100 },
    { name: 'Qua', consumo: 2500 },
    // ... resto dos dados
    { name: 'Dom', consumo: 2450 },
];

const WaterConsumptionChart: React.FC = () => {
    return (
        <Card title="Consumo de Água (Últimos 7 dias)" style={{ height: '100%' }}>
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="consumo" stroke="#8884d8" fillOpacity={1} fill="url(#colorConsumo)" />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default WaterConsumptionChart;