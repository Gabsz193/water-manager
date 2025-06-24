// src/app/page.tsx
"use client";
import { Row, Col, Typography, Layout } from 'antd';
import {
  CloudOutlined,
  DashboardOutlined,
  DollarCircleOutlined,
  FireOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import MainHeader from "@/app/components/MainHeader";
import WaterConsumptionChart from "@/app/components/WaterConsumptionChart";
import QuickActions from "@/app/components/QuickActions";
import AlertsList from "@/app/components/AlertsList";
import StatCard from "@/app/components/StatCard";
import FirebaseStatCard from "@/app/components/FirebaseStatCard";
import {IoWater} from "react-icons/io5";
import {WiThermometer} from "react-icons/wi";

// Importando os componentes (Next.js entende o alias @/ que aponta para src/)

export default function Home() {
  return (
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
                <FirebaseStatCard
                    title="Ph"
                    icon={<IoWater />}
                    keyName="ph"
                    changeText="No change"
                    changeType="up"
                    color="#fa541c"
                />
              </Col>
              <Col xs={24} sm={24} md={8}>
                <FirebaseStatCard
                    title="Temperatura"
                    icon={<WiThermometer />}
                    keyName="valortemperatura"
                    changeText="No change"
                    changeType="up"
                    color="#fa541c"
                />
              </Col>
              <Col xs={24} sm={24} md={8}>
                <FirebaseStatCard
                    title="Bomba"
                    icon={<FireOutlined />}
                    keyName="bomba"
                    changeText="No change"
                    changeType="up"
                    color="#fa541c"
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
  );
}