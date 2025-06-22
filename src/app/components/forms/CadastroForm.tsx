// src/components/forms/CadastroForm.tsx
"use client";

import React, { useState } from 'react';
import {Card, Form, Input, Button, Typography, Space, message } from 'antd';
import {ArrowUpOutlined, MailOutlined, LockOutlined, UserOutlined} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const { Title, Text } = Typography;

const CadastroForm: React.FC = () => {
    // Hook de roteamento do Next.js para navegar após o cadastro
    const router = useRouter();
    const auth = useAuth();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    // Função chamada quando o formulário é enviado com sucesso
    const onFinish = async (values: any) => {
        if (values.password !== values.password_confirmacao) {
            messageApi.error('As senhas não coincidem');
            return;
        }

        setLoading(true);
        try {
            await auth.signUp(values.email, values.password);
            messageApi.success('Conta criada com sucesso!');
            router.push('/');
        } catch (error: any) {
            let errorMessage = 'Erro ao criar conta. Tente novamente.';

            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Este email já está em uso';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Email inválido';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'A senha é muito fraca';
                    break;
                default:
                    console.error('Erro ao criar conta:', error);
            }

            messageApi.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{ width: 400, borderRadius: '16px', padding: '16px' }}>
            {contextHolder}
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
                    Criar conta
                </Title>
                <Text type="secondary">Junte-se ao Water Manager</Text>
            </Space>

            <Form
                name="cadastro"
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
            >
                <Form.Item
                    name="nome_completo"
                    label="Nome Completo"
                    rules={[
                        { required: true, message: 'Por favor, insira seu nome completo!' },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Seu nome completo" size="large" />
                </Form.Item>
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
                    name="password"
                    label="Senha"
                    labelCol={{ span: 24 }}
                    rules={[
                        { required: true, message: 'Por favor, insira sua senha!' },
                        { min: 8, message: "A senha deve conter no mínimo 8 caracteres" }
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Mínimo 8 caracteres" size="large" />
                </Form.Item>
                <Form.Item
                    name="password_confirmacao"
                    label="Confirmar Senha"
                    labelCol={{ span: 24 }}
                    rules={[
                        { required: true, message: 'Por favor, insira sua senha novamente!' },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirme sua senha" size="large" />
                </Form.Item>

                <Form.Item style={{ marginBottom: '8px' }}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        block 
                        size="large"
                        loading={loading}
                    >
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </Button>
                </Form.Item>

                <div style={{ textAlign: 'center' }}>
                    <Text type="secondary">
                        Já tem uma conta?{' '}
                        <Link href="/login" passHref>
                            Faça login
                        </Link>
                    </Text>
                </div>
            </Form>
        </Card>
    );
};

export default CadastroForm;