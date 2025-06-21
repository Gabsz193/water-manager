// src/app/recuperar-senha/page.tsx
import React from 'react';
import { Row, Col } from 'antd';
import RecuperaSenhaForm from "@/app/components/forms/RecuperaSenhaForm";

const RecuperarSenhaPage: React.FC = () => {
    return (
        <Row justify="center" align="middle" style={{ height: '100%', backgroundColor: '#f0f5ff' }}>
            <Col>
                <RecuperaSenhaForm />
            </Col>
        </Row>
    );
};

export default RecuperarSenhaPage;