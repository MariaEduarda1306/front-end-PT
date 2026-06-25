// js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // 1. VERIFICAÇÃO DE SEGURANÇA
    // =======================================================
    // A função verificarAutenticacao() já roda automaticamente via utils.js.
    // Se por algum motivo o objeto do usuário não estiver carregado, voltamos ao login.
    if (!loggedInUser || !loggedInUser.nome) {
        window.location.href = 'index.html';
        return;
    }

    // =======================================================
    // 2. PERSONALIZAÇÃO DA INTERFACE
    // =======================================================
    const titleElement = document.querySelector('.dashboard-title');
    
    // Atualiza o título de boas-vindas com o nome vindo do utils.js
    if (titleElement) {
        titleElement.innerHTML = `Bem-vindo(a), <span style="color: var(--primary-glow);">${loggedInUser.nome}</span>`;
    }

    // =======================================================
    // 3. LÓGICA DE LOGOUT (PADRONIZADA)
    // =======================================================
    // O sistema pode usar 'logout-btn' (local) ou 'global-logout-btn' (do header injetado)
    const logoutBtn = document.getElementById('logout-btn') || document.getElementById('global-logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (event) => {
            event.preventDefault();

            // Tenta avisar o servidor sobre o encerramento da sessão
            try {
                if (authToken) {
                    await fetch(`${API_BASE_URL}/api/auth/logout`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'Accept': 'application/json'
                        }
                    });
                }
            } catch (error) {
                // Silenciamos o erro caso o servidor esteja offline, 
                // pois o logout local deve acontecer de qualquer forma.
                console.warn('Logout remoto falhou, procedendo com limpeza local.');
            } finally {
                // Limpeza obrigatória dos dados locais
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');

                // Redireciona para a tela inicial (login)
                window.location.href = 'index.html';
            }
        });
    }
});