// src/components/WaterConsumptionChart.tsx
"use client"; // Gráficos são renderizados no lado do cliente

import React, {useEffect} from 'react';
import {Card, Skeleton} from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {useFirestoreCollection} from "@/app/hooks/useFirestoreCollection";
import {Timestamp} from "@firebase/firestore";

interface MeasuredData {
    id: string;
    ph: number;
    temperatura: number;
    date_created: Timestamp;
}

const WaterConsumptionChart: React.FC = () => {

    const { data } = useFirestoreCollection<MeasuredData>("medidas");

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Card title="Consumo de Água (Últimos 7 dias)" style={{ height: '100%' }}>
            { data !== null ? <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data.sort((a, b) => a.date_created.toMillis() - b.date_created.toMillis())} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <YAxis dataKey="ph" tickFormatter={(value) => `${value} pH`} />
                    <XAxis dataKey="date_created" tickFormatter={(date, i) => {
                        const date_get = data[i].date_created.toDate();
                        return `${date_get.getDate()}/${date_get.getMonth() + 1}`;
                    }} />
                    <Tooltip formatter={(value : number) => value.toFixed(2) + 'pH'} />
                    <Area type="monotone" dataKey="ph" stroke="#8884d8" fillOpacity={1} fill="url(#colorConsumo)" />
                </AreaChart>
            </ResponsiveContainer> : <Skeleton /> }
        </Card>
    );
};

export default WaterConsumptionChart;