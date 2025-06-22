// src/components/forms/RecuperaSenhaForm.tsx
"use client";

import React, { useState } from 'react';
import {Card, Form, Input, Button, Typography, Space, message } from 'antd';
import { ArrowUpOutlined, MailOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const { Title, Text } = Typography;

const RecuperaSenhaForm: React.FC = () => {
    // Hook de roteamento do Next.js para navegar após o login
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const auth = getAuth();

    // Função chamada quando o formulário é enviado com sucesso
    const onFinish = async (values: { email: string }) => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, values.email);
            messageApi.success('Email de recuperação enviado com sucesso!');
            // Dar um tempo para o usuário ler a mensagem antes de redirecionar
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error: unknown) {
            const error1 = error as { code: string };
            let errorMessage = 'Erro ao enviar email de recuperação';

            switch (error1.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Email inválido';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'Não existe conta com este email';
                    break;
                default:
                    console.error('Erro ao recuperar senha:', error);
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
                    Recuperar Senha
                </Title>
                <Text type="secondary">Enviaremos um link para redefinir sua senha</Text>
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

                <Form.Item style={{ marginBottom: '8px' }}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        block 
                        size="large"
                        loading={loading}
                    >
                        {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
                    </Button>
                </Form.Item>

                <div style={{ textAlign: 'center' }}>
                    <Text type="secondary">
                        Lembrou sua senha?{' '}
                        <Link href="/login" passHref>
                            Voltar ao login
                        </Link>
                    </Text>
                </div>
            </Form>
        </Card>
    );
};

export default RecuperaSenhaForm;