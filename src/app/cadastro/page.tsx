// src/app/login/page.tsx
import React from 'react';
import { Row, Col } from 'antd';
import CadastroForm from "@/app/components/forms/CadastroForm";

const LoginPage: React.FC = () => {
    return (
        <Row justify="center" align="middle" style={{ height: '100%', backgroundColor: '#f0f5ff' }}>
            <Col>
                <CadastroForm />
            </Col>
        </Row>
    );
};

export default LoginPage;