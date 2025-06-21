// Função chamada quando o formulário é enviado com sucesso
    const onFinish = async (values: any) => {
        try {
            // Importar dinâmicamente para evitar problemas com SSR
            const { loginWithEmail, auth } = await import('@/lib/firebase-client');
            const { getIdToken } = await import('firebase/auth');

            // Realizar login com Firebase
            const userCredential = await loginWithEmail(values.email, values.password);

            // Obter token do usuário autenticado
            const idToken = await getIdToken(userCredential.user);

            // Enviar token para o backend e criar cookie de sessão
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken }),
            });

            if (response.ok) {
                // Redirecionar para a página principal após login bem-sucedido
                router.push('/');
            } else {
                throw new Error('Falha ao autenticar com o servidor');
            }
        } catch (error: any) {
            console.error('Erro ao fazer login:', error);
            // Exibir mensagem de erro adequada baseada no tipo de erro
            let errorMessage = 'Falha ao fazer login. Tente novamente.';

            if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Email ou senha incorretos';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'Usuário não encontrado';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Senha incorreta';
            }

            alert(errorMessage);
        }
    };
