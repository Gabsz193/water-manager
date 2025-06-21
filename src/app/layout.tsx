// src/app/layout.tsx
import '@ant-design/v5-patch-for-react-19';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/AntdRegistry"; // Importe o Registry
import 'antd/dist/reset.css'; // Importa o CSS reset do antd
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Water Manager",
    description: "Dashboard de Gestão Hídrica",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
        <body className={inter.className}>
        {/* Envolva o conteúdo com o Registry */}
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
        </html>
    );
}