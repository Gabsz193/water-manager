// src/app/page.tsx
"use client";
import { Row, Col, Typography, Layout } from 'antd';
import { DashboardOutlined, DollarCircleOutlined, ThunderboltOutlined } from '@ant-design/icons';
import MainHeader from "@/app/components/MainHeader";
import WaterConsumptionChart from "@/app/components/WaterConsumptionChart";
import QuickActions from "@/app/components/QuickActions";
import AlertsList from "@/app/components/AlertsList";
import StatCard from "@/app/components/StatCard";
import Protected from "@/components/Protected";

// Importando os componentes (Next.js entende o alias @/ que aponta para src/)

export default function Home() {
  return (
      <Protected>
      <Layout style={{ minHeight: '100vh' }}>
        <MainHeader />
        <Layout.Content style={{ padding: '24px', backgroundColor: '#f0f5ff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            <Typography.Title level={2}>Dashboard de Gestão Hídrica</Typography.Title>
            <Typography.Paragraph type="secondary">
              Monitore e gerencie o consumo de água da sua edificação
            </Typography.Paragraph>

            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
              <Col xs={24} sm={24} md={8}>
                <StatCard
                    icon={<DashboardOutlined />}
                    title="Consumo Atual"
                    value="2.450 litros"
                    changeText="3% menor que ontem"
                    changeType="down"
                    color="#1890ff"
                />
              </Col>
              <Col xs={24} sm={24} md={8}>
                <StatCard
                    icon={<DollarCircleOutlined />}
                    title="Economia Mensal"
                    value="15.320 litros"
                    changeText="12% acima da meta"
                    changeType="up"
                    color="#52c41a"
                />
              </Col>
              <Col xs={24} sm={24} md={8}>
                <StatCard
                    icon={<ThunderboltOutlined />}
                    title="Eficiência do Sistema"
                    value="92%"
                    changeText="2% melhor que o mês anterior"
                    changeType="up"
                    color="#722ed1"
                />
              </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
              <Col xs={24} lg={16}>
                <WaterConsumptionChart />
              </Col>
              <Col xs={24} lg={8}>
                <AlertsList />
              </Col>
            </Row>

            <QuickActions />

          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center', backgroundColor: '#f0f5ff' }}>
          ©2023 Water Manager. Todos os direitos reservados.
        </Layout.Footer>
      </Layout>
    </Protected>
  );
}