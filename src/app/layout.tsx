// src/app/layout.tsx
import '@ant-design/v5-patch-for-react-19';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/AntdRegistry"; // Importe o Registry
import 'antd/dist/reset.css'; // Importa o CSS reset do antd
import "./globals.css";
import {AuthProvider} from "@/context/AuthContext";
// import { initializeApp } from "firebase/app"; // Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Water Manager",
    description: "Dashboard de Gestão Hídrica",
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyASmu_gTNRivhbXjllHCsDoIu7soKe49EQ",
//     authDomain: "watermanager-763a0.firebaseapp.com",
//     databaseURL: "https://watermanager-763a0-default-rtdb.firebaseio.com",
//     projectId: "watermanager-763a0",
//     storageBucket: "watermanager-763a0.firebasestorage.app",
//     messagingSenderId: "633366113229",
//     appId: "1:633366113229:web:254e1211ca4cb241cff284",
//     measurementId: "G-9B8GHKR17N"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
// const analytics = getAnalytics(app);

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
        <body className={inter.className}>
            <AuthProvider>
                {/* Envolva o conteúdo com o Registry */}
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </AuthProvider>
        </body>
        </html>
    );
}