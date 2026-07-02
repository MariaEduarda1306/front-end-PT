// js/components.js

document.addEventListener('DOMContentLoaded', () => {
    // Injeção automática dos componentes globais
    injectHeader();
    injectPasswordModal();
});

// =======================================================
// 1. COMPONENTE: HEADER GLOBAL
// =======================================================
/**
 * Injeta o cabeçalho dinâmico baseado em atributos do elemento #app-header.
 * Atributos suportados:
 * - data-back-url: URL para o botão de voltar.
 * - data-back-history: Se presente, o botão volta para o histórico do navegador.
 * - data-hide-logout: Se presente, esconde o botão de sair.
 */
function injectHeader() {
    const header = document.getElementById('app-header');
    if (!header) return;

    // 1. Captura configurações passadas via HTML
    const backUrl = header.getAttribute('data-back-url');
    const backHistory = header.hasAttribute('data-back-history');
    const manualBack = header.hasAttribute('data-manual-back');
    const hideLogout = header.hasAttribute('data-hide-logout');

    // 2. Define o conteúdo do lado esquerdo (Voltar)
    let leftContent = '<div class="header-spacer"></div>'; 

    if (manualBack) {
        leftContent = `<a href="#" id="manual-back-btn" class="logout-btn"><i class="fas fa-chevron-circle-left"></i> Voltar</a>`;
    } else if (backUrl) {
        leftContent = `<a href="${backUrl}" class="logout-btn"><i class="fas fa-chevron-circle-left"></i> Voltar</a>`;
    } else if (backHistory) {
        leftContent = `<a href="javascript:history.back()" class="logout-btn"><i class="fas fa-arrow-left"></i> Voltar</a>`;
    }

    // 3. Define o conteúdo do lado direito (Logout)
    let rightContent = '<div class="header-spacer"></div>';
    if (!hideLogout) {
        rightContent = `<a href="#" id="global-logout-btn" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Sair</a>`;
    }

    // 4. Injeta a estrutura visual
    header.className = 'header';
    header.innerHTML = `
        ${leftContent}
        <div class="logo">
            <img src="logo.png" alt="Logo SHC" class="header-logo">
        </div>
        ${rightContent}
    `;

    // 5. LÓGICA GLOBAL DE LOGOUT
    const logoutBtn = document.getElementById('global-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
                // Tenta invalidar o token no servidor via API (Definida no utils.js)
                if (authToken) {
                    await fetch(`${API_BASE_URL}/api/auth/logout`, {
                        method: 'POST',
                        headers: { 
                            'Authorization': `Bearer ${authToken}`, 
                            'Accept': 'application/json' 
                        }
                    });
                }
            } catch (err) { 
                console.warn('Logout remoto indisponível, limpando dados locais...'); 
            } finally {
                // Limpeza obrigatória dos dados de sessão
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                window.location.href = 'index.html';
            }
        });
    }
}

// =======================================================
// 2. COMPONENTE: MODAL DE ALTERAÇÃO DE SENHA
// =======================================================
/**
 * Injeta o HTML do modal de troca de senha no placeholder indicado.
 * A lógica de submissão do formulário é tratada nos scripts específicos (ex: perfil.js).
 */
function injectPasswordModal() {
    const placeholder = document.getElementById('password-modal-placeholder');
    if (!placeholder) return;

    // Substitui o placeholder pelo componente real
    placeholder.outerHTML = `
    <dialog id="password-modal" class="password-modal">
        <div class="modal-header">
            <h2 class="modal-title">Alterar Senha</h2>
            <button id="close-modal-btn" class="close-btn" title="Fechar">&times;</button>
        </div>
        <form id="password-form" novalidate>
            <p class="modal-instruction">Para sua segurança, escolha uma senha forte com no mínimo 8 caracteres.</p>
            
            <div class="form-group">
                <label for="current-password">Senha Atual</label>
                <input type="password" id="current-password" placeholder="Digite sua senha atual">
            </div>
            
            <div class="form-group">
                <label for="new-password">Nova Senha</label>
                <input type="password" id="new-password" required placeholder="Mínimo 8 caracteres">
            </div>
            
            <div class="form-group">
                <label for="confirm-password">Confirmar Nova Senha</label>
                <input type="password" id="confirm-password" required placeholder="Repita a nova senha">
            </div>
            
            <div class="modal-footer">
                <button type="button" id="cancel-btn" class="btn btn-secondary">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar Alterações</button>
            </div>
        </form>
    </dialog>
    `;
}