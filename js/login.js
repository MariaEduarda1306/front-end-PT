// js/login.js

document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // 1. MÁSCARA DE CPF (Utilizando Utils)
    // =======================================================
    const cpfInput = document.getElementById('cpf');

    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            // Chama a função centralizada no utils.js
            e.target.value = applyCpfMask(e.target.value);
        });
    }

    // =======================================================
    // 2. LÓGICA DE LOGIN (CONEXÃO COM A API)
    // =======================================================
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        // Listener para limpar o erro visual assim que o usuário digita
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(input => {
            // Usa o toggleError global para limpar estados de erro
            input.addEventListener('input', () => toggleError(input, false));
        });

        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const userField = document.getElementById('cpf');
            const passwordField = document.getElementById('password');
            let hasError = false;

            // --- VALIDAÇÃO VISUAL UTILIZANDO UTILS ---
            if (!userField.value.trim()) {
                toggleError(userField, true); // Função global do utils.js
                hasError = true;
            }

            if (!passwordField.value.trim()) {
                toggleError(passwordField, true); // Função global do utils.js
                hasError = true;
            }

            if (hasError) {
                showToast('Por favor, preencha os campos destacados.', 'error'); //
                return;
            }
            // -----------------------------------------

            const data = {
                cpf: userField.value,
                password: passwordField.value
            };

            // Feedback visual no botão (Loading)
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
            submitBtn.disabled = true;

            try {
                if (!API_BASE_URL) {
                    throw new Error(API_CONFIG_HELP);
                }

                const response = await fetch(`${API_BASE_URL}/api/auth/login`, { //
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(result.message || 'Usuário ou senha inválidos.');
                }

                // Salva as credenciais recebidas da API
                localStorage.setItem('authToken', result.access_token);
                localStorage.setItem('userData', JSON.stringify(result.usuario));

                const userType = result.usuario.tipo;

                // Redirecionamento baseado no papel (role) do usuário
                switch (userType) {
                    case 'ALUNO':
                        window.location.href = 'dashboard-alunos.html';
                        break;
                    case 'COORDENADOR':
                        window.location.href = 'dashboard-coordenador.html';
                        break;
                    case 'SECRETARIA':
                        window.location.href = 'dashboard-secretaria.html';
                        break;
                    case 'ADMINISTRADOR':
                        window.location.href = 'dashboard-administrador.html';
                        break;
                    default:
                        throw new Error('Tipo de usuário desconhecido.');
                }

            } catch (error) {
                const message = error instanceof TypeError
                    ? `${API_CONFIG_HELP} Se a URL ja estiver correta, confira se a API esta online e se o CORS permite o dominio do GitHub Pages.`
                    : error.message;

                showToast(message, 'error');
                console.error('Falha no login:', error);
                
                // Restaura o estado do botão em caso de falha
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Destaca os campos como erro para feedback imediato
                toggleError(userField, true);
                toggleError(passwordField, true);
            }
        });
    }

    // =======================================================
    // 3. LÓGICA DA INTERFACE (Troca de formulário)
    // =======================================================
    const loginWrapper = document.getElementById('login-form-wrapper');
    const recoveryWrapper = document.getElementById('recovery-form-wrapper');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const backToLoginLink1 = document.getElementById('back-to-login-link1');

    if (forgotPasswordLink && loginWrapper && recoveryWrapper) {
        forgotPasswordLink.addEventListener('click', () => {
            loginWrapper.classList.add('hidden');
            recoveryWrapper.classList.remove('hidden');
        });
    }

    if (backToLoginLink1) {
        backToLoginLink1.addEventListener('click', () => {
            if (recoveryWrapper) recoveryWrapper.classList.add('hidden');
            if (loginWrapper) loginWrapper.classList.remove('hidden');
        });
    }

    // =======================================================
    // 4. TOGGLE DE SENHA (Mostrar/Ocultar)
    // =======================================================
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('password-toggle');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            passwordToggle.classList.toggle('fa-eye-slash', !isPassword);
            passwordToggle.classList.toggle('fa-eye', isPassword);
        });
    }

    // =======================================================
    // 5. MODAL DE PRIMEIRO ACESSO
    // =======================================================
    const firstAccessLink = document.getElementById('first-access-link');
    const firstAccessModal = document.getElementById('first-access-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const confirmCloseBtn = document.getElementById('confirm-close-btn');

    if (firstAccessLink && firstAccessModal) {
        firstAccessLink.addEventListener('click', (e) => {
            e.preventDefault();
            firstAccessModal.showModal();
        });

        [closeModalBtn, confirmCloseBtn].forEach(btn => {
            if (btn) btn.addEventListener('click', () => firstAccessModal.close());
        });
    }
});
