'use client';

import {createContext, useContext, useEffect, useState} from 'react';
import {
    getAuth,
    onAuthStateChanged,
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    getIdToken
} from 'firebase/auth';
import {initializeApp} from 'firebase/app';

export const firebaseConfig = {
    apiKey: "AIzaSyASmu_gTNRivhbXjllHCsDoIu7soKe49EQ",
    authDomain: "watermanager-763a0.firebaseapp.com",
    databaseURL: "https://watermanager-763a0-default-rtdb.firebaseio.com",
    projectId: "watermanager-763a0",
    storageBucket: "watermanager-763a0.firebasestorage.app",
    messagingSenderId: "633366113229",
    appId: "1:633366113229:web:254e1211ca4cb241cff284",
    measurementId: "G-9B8GHKR17N"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setLoading(false);

            // Se o usuário estiver logado, atualizar o token
            if (user) {
                try {
                    const idToken = await getIdToken(user, true);
                    document.cookie = `auth_token=${idToken}; path=/; max-age=${60 * 60 * 24 * 14}; SameSite=Lax`;
                } catch (error) {
                    console.error('Erro ao atualizar token:', error);
                }
            }
        });

        // Configurar um intervalo para atualizar o token regularmente (a cada 55 minutos)
        // Os tokens do Firebase expiram após 1 hora
        const tokenRefreshInterval = setInterval(async () => {
            if (auth.currentUser) {
                try {
                    const idToken = await getIdToken(auth.currentUser, true);
                    document.cookie = `auth_token=${idToken}; path=/; max-age=${60 * 60 * 24 * 14}; SameSite=Lax`;
                } catch (error) {
                    console.error('Erro ao atualizar token:', error);
                }
            }
        }, 55 * 60 * 1000); // 55 minutos

        return () => {
            unsubscribe();
            clearInterval(tokenRefreshInterval);
        };
    }, []);

    const signIn = async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Após login bem-sucedido, obter token ID
        const idToken = await getIdToken(userCredential.user);

        // Salvar token no cookie (implementação client-side)
        document.cookie = `auth_token=${idToken}; path=/; max-age=${60 * 60 * 24 * 14}; SameSite=Lax`;
    };

    const signUp = async (email: string, password: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Após registro bem-sucedido, obter token ID
        const idToken = await getIdToken(userCredential.user);

        // Salvar token no cookie
        document.cookie = `auth_token=${idToken}; path=/; max-age=${60 * 60 * 24 * 14}; SameSite=Lax`;
    };

    const logout = async () => {
        // Remover o cookie de autenticação
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';

        // Fazer logout no Firebase
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{user, loading, signIn, signUp, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};