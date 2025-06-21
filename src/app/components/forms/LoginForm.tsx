// src/components/forms/LoginForm.tsx
"use client";

import React from 'react';
import {Card, Form, Input, Button, Typography, Space } from 'antd';
import { ArrowUpOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Title, Text } = Typography;

const LoginForm: React.FC = () => {
    // Hook de roteamento do Next.js para navegar após o login
    const router = useRouter();

    // Função chamada quando o formulário é enviado com sucesso
    const onFinish = (values: unknown) => {
        console.log('Dados recebidos do formulário:', values);
        // Aqui você faria a chamada para a sua API de autenticação.
        // Se a autenticação for bem-sucedida, redirecione o usuário.
        alert('Login simulado com sucesso! Redirecionando...');
        router.push('/'); // Redireciona para a página do dashboard
    };

    return (
        <Card style={{ width: 400, borderRadius: '16px', padding: '16px' }}>
            <Space direction="vertical" align="center" style={{ width: '100%', marginBottom: '24px' }}>
                <div style={{
                    backgroundColor: '#1890ff',
                    borderRadius: '50%',
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ArrowUpOutlined style={{ fontSize: '24px', color: 'white' }} />
                </div>
                <Title level={2} style={{ color: '#1890ff', marginBottom: 0 }}>
                    Water Manager
                </Title>
                <Text type="secondary">Gestão Hídrica Inteligente para Edificações</Text>
            </Space>

            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Por favor, insira seu email!' },
                        { type: 'email', message: 'O email inserido não é válido!' }
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="seu@email.com" size="large" />
                </Form.Item>
                <Form.Item
                    label="Senha"
                    extra={
                        <Link href={"/recuperar-senha"}>Esqueceu a senha?</Link>
                    }
                    name="password"
                    rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="********" size="large" />
                </Form.Item>

                <Form.Item style={{ marginBottom: '8px' }}>
                    <Button type="primary" htmlType="submit" block size="large">
                        Entrar
                    </Button>
                </Form.Item>

                <div style={{ textAlign: 'center' }}>
                    <Text type="secondary">
                        Não tem uma conta?{' '}
                        <Link href="/cadastro" passHref>
                            Cadastre-se
                        </Link>
                    </Text>
                </div>
            </Form>
        </Card>
    );
};

export default LoginForm;