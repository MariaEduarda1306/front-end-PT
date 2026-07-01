// js/perfil.js

document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // 1. SEGURANÇA E CARREGAMENTO DE DADOS
    // =======================================================
    
    // Utilizamos as constantes globais authToken e loggedInUser definidas no utils.js
    if (!authToken || !loggedInUser.id) {
        window.location.href = 'login.html';
        return;
    }

    // Elementos Globais do Avatar e UI
    const avatarWrapper = document.querySelector('.profile-avatar-wrapper');
    const profileAvatarImg = document.getElementById('profile-avatar');
    const avatarInput = document.getElementById('avatar-input');
    const avatarMenu = document.getElementById('avatar-menu');
    const uploadBtn = document.getElementById('upload-btn');
    const removeBtn = document.getElementById('remove-btn');

    let currentAvatarObjectUrl = null;

    // =======================================================
    // FUNÇÃO DE CONFIRMAÇÃO PERSONALIZADA (Modal do Sistema)
    // =======================================================
    async function showConfirmModal(title, message, confirmText = 'Confirmar', type = 'danger') {
        return new Promise((resolve) => {
            let modal = document.getElementById('custom-confirm-modal');
            
            if (!modal) {
                modal = document.createElement('dialog');
                modal.id = 'custom-confirm-modal';
                modal.className = 'password-modal'; // reutiliza os estilos existentes
                modal.innerHTML = `
                    <div class="modal-header">
                        <h3 class="modal-title" id="confirm-title"></h3>
                        <button class="close-btn" id="confirm-close">×</button>
                    </div>
                    <div class="modal-content-body" style="padding: 2.5rem 1rem; text-align: center;">
                        <p id="confirm-message" style="font-size: 1.6rem; line-height: 1.6; color: var(--text-primary);"></p>
                    </div>
                    <div class="modal-footer" style="justify-content: flex-end; gap: 1rem; padding-top: 1rem;">
                        <button id="confirm-cancel" class="btn btn-secondary">Cancelar</button>
                        <button id="confirm-action" class="btn"></button>
                    </div>
                `;
                document.body.appendChild(modal);
            }

            document.getElementById('confirm-title').textContent = title;
            document.getElementById('confirm-message').textContent = message;

            const actionBtn = document.getElementById('confirm-action');
            actionBtn.textContent = confirmText;
            actionBtn.className = `btn btn-${type}`;

            const closeModal = () => {
                modal.close();
                resolve(false);
            };

            // Remove listeners antigos para evitar duplicatas
            actionBtn.replaceWith(actionBtn.cloneNode(true));
            const newActionBtn = document.getElementById('confirm-action');
            newActionBtn.addEventListener('click', () => {
                modal.close();
                resolve(true);
            });

            document.getElementById('confirm-cancel').addEventListener('click', closeModal);
            document.getElementById('confirm-close').addEventListener('click', closeModal);

            modal.addEventListener('close', () => resolve(false), { once: true });
            modal.showModal();
        });
    }
    // =======================================================
    // 2. FUNÇÕES AUXILIARES DE INTERFACE
    // =======================================================

    function setAvatarState(hasPhoto, url = '') {
        if (!avatarWrapper || !profileAvatarImg) return;
        
        avatarWrapper.classList.toggle('has-photo', hasPhoto);

        if (removeBtn) {
            // Só esconde se não tiver foto. Se tiver, ele aparece.
            removeBtn.classList.toggle('hidden', !hasPhoto);
        }
        
        if (hasPhoto && url) {
            profileAvatarImg.src = url;
        } else {
            profileAvatarImg.removeAttribute('src');
        }
    }

    function getAvatarDisplayUrl(user = loggedInUser) {
        if (user.avatar_preview) {
            return user.avatar_preview;
        }

        if (!user.avatar_url) {
            return '';
        }

        if (
            user.avatar_url.startsWith('data:') ||
            user.avatar_url.startsWith('blob:')
        ) {
            return user.avatar_url;
        }

        return formatFileUrl(user.avatar_url);
    }

    function isProtectedAvatarUrl(url) {
        try {
            const parsedUrl = new URL(url, window.location.href);
            return parsedUrl.pathname.startsWith('/api/usuarios/avatars/');
        } catch (error) {
            return String(url).includes('/api/usuarios/avatars/');
        }
    }

    async function resolveAvatarDisplayUrl(user = loggedInUser) {
        const avatarUrl = getAvatarDisplayUrl(user);

        if (!avatarUrl) {
            return '';
        }

        if (
            avatarUrl.startsWith('data:') ||
            avatarUrl.startsWith('blob:') ||
            !isProtectedAvatarUrl(avatarUrl)
        ) {
            return avatarUrl;
        }

        const response = await fetch(avatarUrl, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'image/*,*/*',
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!response.ok) {
            throw new Error('Não foi possível carregar a foto de perfil.');
        }

        const blob = await response.blob();

        if (currentAvatarObjectUrl) {
            URL.revokeObjectURL(currentAvatarObjectUrl);
        }

        currentAvatarObjectUrl = URL.createObjectURL(blob);
        return currentAvatarObjectUrl;
    }

    window.addEventListener('beforeunload', () => {
        if (currentAvatarObjectUrl) {
            URL.revokeObjectURL(currentAvatarObjectUrl);
        }
    });

    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Erro ao ler imagem selecionada.'));

            reader.readAsDataURL(file);
        });
    }

    // Trava contra imagens quebradas
    if (profileAvatarImg) {
        profileAvatarImg.onerror = () => {
            const currentSrc = profileAvatarImg.getAttribute('src');

            if (loggedInUser.avatar_preview && currentSrc !== loggedInUser.avatar_preview) {
                setAvatarState(true, loggedInUser.avatar_preview);
                return;
            }

            profileAvatarImg.removeAttribute('src');
            setAvatarState(false);
        };
    }

    function formatUserTypeLabel(type) {
        const map = {
            'ALUNO': 'Aluno',
            'COORDENADOR': 'Coordenador',
            'SECRETARIA': 'Secretaria',
            'ADMINISTRADOR': 'Administrador'
        };

        return map[type] || type;
    }

    async function buscarUsuarioLogado() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/usuarios/me`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (!response.ok) {
                throw new Error('Não foi possível carregar os dados atualizados do usuário.');
            }

            const data = await response.json();

            // Compatível com:
            // { data: usuario }
            // { usuario: usuario }
            // usuario direto
            const usuarioAtualizado = data.data || data.usuario || data;

            const avatarPreviewAtual = loggedInUser.avatar_preview;

            Object.assign(loggedInUser, usuarioAtualizado);

            // Mantém a prévia local apenas se o backend ainda não tiver avatar salvo
            if (!loggedInUser.avatar_url && avatarPreviewAtual) {
                loggedInUser.avatar_preview = avatarPreviewAtual;
            } else {
                delete loggedInUser.avatar_preview;
            }

            localStorage.setItem('userData', JSON.stringify(loggedInUser));
           
            return loggedInUser;
        } catch (error) {
            console.warn('Usando dados locais do usuário:', error);
            return loggedInUser;
        }
    }

    // =======================================================
    // 3. PREENCHIMENTO DOS DADOS DO PERFIL
    // =======================================================

    function populateUserData() {
        const nameElement = document.getElementById('profile-name');
        const emailElement = document.getElementById('profile-email');
        const typeElement = document.getElementById('profile-type');
        const dobElement = document.getElementById('profile-dob');

        if (nameElement) nameElement.textContent = loggedInUser.nome || 'Usuário';
        if (emailElement) emailElement.textContent = loggedInUser.email || '';
        if (typeElement) typeElement.textContent = formatUserTypeLabel(loggedInUser.tipo);

        if (dobElement && loggedInUser.data_nascimento) {
            const [y, m, d] = loggedInUser.data_nascimento.split('-');
            dobElement.textContent = `${d}/${m}/${y}`;
        }

        // Carregamento de Avatar
        (async () => {
            try {
                const avatarDisplayUrl = await resolveAvatarDisplayUrl();

                if (avatarDisplayUrl) {
                    setAvatarState(true, avatarDisplayUrl);
                } else {
                    setAvatarState(false);
                }
            } catch (error) {
                if (loggedInUser.avatar_preview) {
                    setAvatarState(true, loggedInUser.avatar_preview);
                } else {
                    setAvatarState(false);
                }
            }
        })();

        // Dados específicos por papel
        const userType = loggedInUser.tipo;
        const displayId = loggedInUser.cpf || '--';

        if (userType === 'ALUNO') {
            const elCpf = document.getElementById('aluno-cpf');
            const elMat = document.getElementById('aluno-matricula');
            const elCur = document.getElementById('aluno-curso');
            const elFas = document.getElementById('aluno-fase');

            if (elCpf) elCpf.textContent = displayId;
            if (elMat) elMat.textContent = loggedInUser.matricula || '--';
            if (elCur) elCur.textContent = loggedInUser.curso?.nome || '--';
            if (elFas) elFas.textContent = loggedInUser.fase ? `${loggedInUser.fase}ª` : '--';
            
            fetchProgress();
        } 
        else if (userType === 'COORDENADOR') {
            const elCoordCurso = document.getElementById('coord-curso');
            const elCoordId = document.getElementById('coord-id');

            if (elCoordCurso) {
                elCoordCurso.textContent =
                    loggedInUser.curso_coordenado?.nome ||
                    loggedInUser.curso?.nome ||
                    '--';
            }

            if (elCoordId) elCoordId.textContent = displayId;
        } 
        else if (userType === 'SECRETARIA') {
            const elSecId = document.getElementById('secretaria-id');
            if (elSecId) elSecId.textContent = displayId;
        } 
        else if (userType === 'ADMINISTRADOR') {
            const elAdminId = document.getElementById('admin-id');
            if (elAdminId) elAdminId.textContent = displayId;
        }
    }

    // =======================================================
    // 4. LÓGICA DE PROGRESSO (APENAS ALUNO)
    // =======================================================

    async function fetchProgress() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/usuarios/${loggedInUser.id}/progresso`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (!response.ok) return;

            const data = await response.json();

            const totalReq = data.horas_necessarias || 200;
            const totalApp = data.total_horas_aprovadas || 0;
            const percentage = Math.min((totalApp / totalReq) * 100, 100);

            const progressBar = document.querySelector('.progress-bar-fill');
            const progressLabel = document.querySelector('.progress-label');
            const breakdown = document.getElementById('progress-breakdown');

            if (progressBar) progressBar.style.width = `${percentage}%`;
            if (progressLabel) progressLabel.textContent = `${totalApp} / ${totalReq} Horas`;

            if (breakdown && data.horas_por_categoria) {
                breakdown.innerHTML = '';

                Object.entries(data.horas_por_categoria).forEach(([categoria, horas]) => {
                    const catPerc = Math.min((horas / totalReq) * 100, 100);

                    breakdown.insertAdjacentHTML('beforeend', `
                        <div class="area-progress">
                            <div class="area-label">
                                <span>${categoria}</span>
                                <span>${horas}h (${catPerc.toFixed(1)}%)</span>
                            </div>
                            <div class="mini-progress-bar">
                                <div class="mini-progress-bar-fill" style="width: ${catPerc}%;"></div>
                            </div>
                        </div>
                    `);
                });
            }
        } catch (e) {
            console.error('Erro ao carregar progresso:', e);
        }
    }

    // =======================================================
    // 5. LÓGICA DO AVATAR (UPLOAD E REMOÇÃO)
    // =======================================================
    
    if (avatarWrapper) {
        // Abre/Fecha o menu de ações do avatar
        avatarWrapper.addEventListener('click', (e) => {
            if (
                avatarMenu &&
                !e.target.closest('#avatar-menu') &&
                !e.target.closest('#avatar-input')
            ) {
                avatarMenu.style.display = avatarMenu.style.display === 'block' ? 'none' : 'block';
            }
        });

        document.addEventListener('click', (e) => {
            if (avatarMenu && !avatarWrapper.contains(e.target)) {
                avatarMenu.style.display = 'none';
            }
        });

        if (uploadBtn && avatarInput) {
            uploadBtn.addEventListener('click', () => avatarInput.click());
        }

        // Upload da Imagem
        if (avatarInput) {
            avatarInput.addEventListener('change', async (event) => {
                const file = event.target.files[0];

                if (!file) return;

                if (!file.type.startsWith('image/')) {
                    showToast('Selecione um arquivo de imagem.', 'error');
                    avatarInput.value = '';
                    return;
                }

                const maxAvatarSize = 2 * 1024 * 1024; // 2 MB

                if (file.size > maxAvatarSize) {
                    showToast('A foto de perfil deve ter no máximo 2 MB.', 'error');
                    avatarInput.value = '';
                    return;
                }

                if (avatarMenu) {
                    avatarMenu.style.display = 'none';
                }

                const previousUserData = { ...loggedInUser };
                const originalBtn = uploadBtn ? uploadBtn.innerHTML : '';

                try {
                    const localPreview = await readFileAsDataURL(file);

                    loggedInUser.avatar_preview = localPreview;
                    localStorage.setItem('userData', JSON.stringify(loggedInUser));
                    setAvatarState(true, localPreview);

                    if (uploadBtn) {
                        uploadBtn.disabled = true;
                        uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
                    }

                    const formData = new FormData();
                    formData.append('avatar', file);

                    const response = await fetch(`${API_BASE_URL}/api/usuarios/avatar`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'Accept': 'application/json',
                            'ngrok-skip-browser-warning': 'true'
                        },
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao salvar foto.');
                    }

                    const result = await response.json();

                    const avatarUrlRetornada =
                        result.avatar_url ||
                        result.data?.avatar_url ||
                        result.usuario?.avatar_url ||
                        result.data?.usuario?.avatar_url;

                    if (avatarUrlRetornada) {
                        loggedInUser.avatar_url = avatarUrlRetornada;
                    }

                    // Guarda a pré-visualização local no cache do navegador
                    // Isto impede que a imagem fique em branco nas próximas navegações rápidas
                    loggedInUser.avatar_preview = localPreview;
                    localStorage.setItem('userData', JSON.stringify(loggedInUser));

                    // Mantém a imagem que o utilizador escolheu visível na tela
                    // sem forçar uma nova requisição ao servidor
                    setAvatarState(true, localPreview);

                    showToast('Foto de perfil atualizada!');

                } catch (error) {
                    Object.keys(loggedInUser).forEach(key => delete loggedInUser[key]);
                    Object.assign(loggedInUser, previousUserData);

                    localStorage.setItem('userData', JSON.stringify(loggedInUser));

                    const fallbackAvatar = getAvatarDisplayUrl();

                    if (fallbackAvatar) {
                        setAvatarState(true, fallbackAvatar);
                    } else {
                        setAvatarState(false);
                    }

                    showToast(error.message || 'Erro ao salvar foto.', 'error');
                } finally {
                    if (uploadBtn) {
                        uploadBtn.disabled = false;
                        uploadBtn.innerHTML = originalBtn;
                    }

                    avatarInput.value = '';
                }
            });
        }

        // === LÓGICA DO BOTÃO REMOVER ===
        if (removeBtn) {
            removeBtn.addEventListener('click', async () => {
                const confirmed = await showConfirmModal(
                    'Remover Foto de Perfil',
                    'Tem certeza que deseja remover sua foto de perfil? Esta ação não pode ser desfeita.',
                    'Sim, remover',
                    'danger'
                );
                if (!confirmed) return;

                const originalBtnText = removeBtn.innerHTML;
                removeBtn.disabled = true;
                removeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Removendo...';

                try {
                    const formData = new FormData();
                    formData.append('_method', 'DELETE');

                    const response = await fetch(`${API_BASE_URL}/api/usuarios/avatar`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'Accept': 'application/json',
                            'ngrok-skip-browser-warning': 'true'
                        },
                        body: formData
                    });

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));
                        throw new Error(errorData.message || 'Erro ao remover a foto.');
                    }

                    loggedInUser.avatar_url = null;
                    delete loggedInUser.avatar_preview;
                    localStorage.setItem('userData', JSON.stringify(loggedInUser));

                    setAvatarState(false);
                    showToast('Foto de perfil removida com sucesso!', 'success');

                } catch (error) {
                    showToast(error.message || 'Não foi possível remover a foto.', 'error');
                } finally {
                    removeBtn.disabled = false;
                    removeBtn.innerHTML = originalBtnText;
                }
            });
        }
    }

    // =======================================================
    // 6. ALTERAÇÃO DE SENHA
    // =======================================================

    const passwordModal = document.getElementById('password-modal');

    if (passwordModal) {
        const changePasswordBtn = document.getElementById('change-password-btn');
        const passwordForm = document.getElementById('password-form');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const cancelBtn = document.getElementById('cancel-btn');

        const current = document.getElementById('current-password');
        const newVal = document.getElementById('new-password');
        const confirm = document.getElementById('confirm-password');

        function criarErroSenha() {
            let errorBox = document.getElementById('password-modal-error');

            if (!errorBox && passwordForm) {
                errorBox = document.createElement('div');
                errorBox.id = 'password-modal-error';
                errorBox.className = 'password-modal-error';
                errorBox.style.display = 'none';

                const footer = passwordForm.querySelector('.modal-footer');

                if (footer) {
                    passwordForm.insertBefore(errorBox, footer);
                } else {
                    passwordForm.appendChild(errorBox);
                }
            }

            return errorBox;
        }

        function mostrarErroSenha(mensagem) {
            const errorBox = criarErroSenha();

            if (!errorBox) return;

            errorBox.textContent = mensagem;
            errorBox.style.display = 'block';
        }

        function limparErroSenha() {
            const errorBox = criarErroSenha();

            if (errorBox) {
                errorBox.textContent = '';
                errorBox.style.display = 'none';
            }

            [current, newVal, confirm].forEach(input => {
                if (input) {
                    toggleError(input, false);
                }
            });
        }

        function fecharModalSenha() {
            limparErroSenha();

            if (passwordForm) {
                passwordForm.reset();
            }

            passwordModal.close();
        }

        function validarFormularioSenha() {
            limparErroSenha();

            const senhaAtual = current?.value.trim() || '';
            const novaSenha = newVal?.value.trim() || '';
            const confirmarSenha = confirm?.value.trim() || '';

            if (!senhaAtual) {
                toggleError(current, true);
                mostrarErroSenha('Informe sua senha atual.');
                current.focus();
                return false;
            }

            if (!novaSenha) {
                toggleError(newVal, true);
                mostrarErroSenha('Informe a nova senha.');
                newVal.focus();
                return false;
            }

            if (novaSenha.length < 8) {
                toggleError(newVal, true);
                mostrarErroSenha('A nova senha deve ter no mínimo 8 caracteres.');
                newVal.focus();
                return false;
            }

            if (!confirmarSenha) {
                toggleError(confirm, true);
                mostrarErroSenha('Confirme a nova senha.');
                confirm.focus();
                return false;
            }

            if (novaSenha !== confirmarSenha) {
                toggleError(newVal, true);
                toggleError(confirm, true);
                mostrarErroSenha('A nova senha e a confirmação devem ser iguais.');
                confirm.focus();
                return false;
            }

            return true;
        }

        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', () => {
                limparErroSenha();

                if (passwordForm) {
                    passwordForm.reset();
                }

                passwordModal.showModal();
            });
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', fecharModalSenha);
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', fecharModalSenha);
        }

        [current, newVal, confirm].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    toggleError(input, false);

                    const errorBox = document.getElementById('password-modal-error');
                    if (errorBox) {
                        errorBox.textContent = '';
                        errorBox.style.display = 'none';
                    }
                });
            }
        });

        passwordModal.addEventListener('click', (e) => {
            if (e.target === passwordModal) {
                fecharModalSenha();
            }
        });

        passwordModal.addEventListener('cancel', () => {
            limparErroSenha();

            if (passwordForm) {
                passwordForm.reset();
            }
        });

        if (passwordForm) {
            passwordForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (!validarFormularioSenha()) {
                    return;
                }

                const submitBtn = passwordForm.querySelector('button[type="submit"]');
                const originalSubmitText = submitBtn ? submitBtn.innerHTML : '';

                try {
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
                    }

                    const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
                        method: 'POST',
                        headers: { 
                            'Authorization': `Bearer ${authToken}`, 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'ngrok-skip-browser-warning': 'true'
                        },
                        body: JSON.stringify({
                            current_password: current.value,
                            password: newVal.value,
                            password_confirmation: confirm.value
                        })
                    });

                    if (response.ok || response.status === 204) {
                        fecharModalSenha();
                        showToast('Senha alterada com sucesso!');
                        return;
                    }

                    let res = {};

                    try {
                        res = await response.json();
                    } catch (error) {}

                    mostrarErroSenha(res.message || 'Não foi possível alterar a senha. Verifique a senha atual e tente novamente.');
                } catch (err) {
                    mostrarErroSenha(err.message || 'Erro ao alterar senha.');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalSubmitText;
                    }
                }
            });
        }
    }

    // =======================================================
    // 7. SUMÁRIOS DE CARGO (ESTATÍSTICAS)
    // =======================================================

    async function loadSummaries() {
        const userType = loggedInUser.tipo;

        if (userType === 'COORDENADOR') {
            try {
                const [p, a] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/certificados?status=ENTREGUE`, {
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'ngrok-skip-browser-warning': 'true'
                        }
                    }),
                    fetch(`${API_BASE_URL}/api/certificados?status=APROVADO`, {
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'ngrok-skip-browser-warning': 'true'
                        }
                    })
                ]);

                const dp = await p.json();
                const da = await a.json();

                const lp = Array.isArray(dp) ? dp : (dp.data || []);
                const la = Array.isArray(da) ? da : (da.data || []);
                
                if (document.getElementById('summary-pendencias')) {
                    document.getElementById('summary-pendencias').textContent = lp.length;
                }

                if (document.getElementById('summary-horas')) {
                    document.getElementById('summary-horas').textContent =
                        la.reduce((s, c) => s + (Number(c.horas_validadas) || 0), 0);
                }
            } catch (error) {
                console.warn('Erro ao carregar resumo do coordenador:', error);
            }
        } 
        else if (userType === 'SECRETARIA') {
            try {
                const r = await fetch(`${API_BASE_URL}/api/usuarios`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                const d = await r.json();
                const l = Array.isArray(d) ? d : (d.data || []);

                if (document.getElementById('summary-alunos')) {
                    document.getElementById('summary-alunos').textContent =
                        l.filter(u => u.tipo === 'ALUNO').length;
                }

                if (document.getElementById('summary-coords')) {
                    document.getElementById('summary-coords').textContent =
                        l.filter(u => u.tipo === 'COORDENADOR').length;
                }
            } catch (error) {
                console.warn('Erro ao carregar resumo da secretaria:', error);
            }
        }
    }

    // =======================================================
    // 8. INICIALIZAÇÃO DA PÁGINA
    // =======================================================

    buscarUsuarioLogado().then(() => {
        populateUserData();
        loadSummaries();
    });
});