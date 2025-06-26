// src/components/forms/LoginForm.tsx
"use client";

import React, {useState} from 'react';
import {Card, Form, Input, Button, Typography, Space, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {useAuth} from "@/context/AuthContext";
import {LoginFormInput} from "@/types/auth";
import Image from "next/image";

const { Text } = Typography;

const LoginForm: React.FC = () => {
    // Hook de roteamento do Next.js para navegar após o login
    const router = useRouter();
    const auth = useAuth();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: LoginFormInput) => {
        setLoading(true);
        try {
            await auth.signIn(values.email, values.password);
            messageApi.success('Login realizado com sucesso');

            // Verificar se há um parâmetro redirectTo na URL
            const params = new URLSearchParams(window.location.search);
            const redirectTo = params.get('redirectTo') || '/';

            router.push(redirectTo);
        } catch (error: unknown) {
            const error1 = error as { code: string };
            let errorMessage = 'Erro ao fazer login. Tente novamente.';

            switch (error1.code) {
                case 'auth/invalid-credential':
                    errorMessage = 'Email ou senha incorretos';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'Usuário não encontrado';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Senha incorreta';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'Esta conta foi desativada';
                    break;
                default:
                    console.error('Erro de autenticação:', error);
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
                    borderRadius: '50%',
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image width={122} height={112
                    } src={"/images/water-manager-logo.svg"} alt={"Water Manager"} />
                </div>
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
                    validateDebounce={1000}
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
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        loading={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
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