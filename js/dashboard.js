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
});