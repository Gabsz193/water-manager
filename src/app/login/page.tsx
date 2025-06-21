// src/app/login/page.tsx
import React from 'react';
import { Row, Col } from 'antd';
import LoginForm from "@/app/components/forms/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <Row justify="center" align="middle" style={{ height: '100%', backgroundColor: '#f0f5ff' }}>
            <Col>
                <LoginForm />
            </Col>
        </Row>
    );
};

export default LoginPage;