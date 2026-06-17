// js/perfil.js

document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // 1. SEGURANÇA E CARREGAMENTO DE DADOS
    // =======================================================
    
    // Utilizamos as constantes globais authToken e loggedInUser definidas no utils.js
    if (!authToken || !loggedInUser.id) {
        window.location.href = 'index.html';
        return;
    }

    // Elementos Globais do Avatar e UI
    const avatarWrapper = document.querySelector('.profile-avatar-wrapper');
    const profileAvatarImg = document.getElementById('profile-avatar');
    const avatarInput = document.getElementById('avatar-input');
    const avatarMenu = document.getElementById('avatar-menu');
    const uploadBtn = document.getElementById('upload-btn');
    const removeBtn = document.getElementById('remove-btn');

    // =======================================================
    // 2. FUNÇÕES AUXILIARES DE INTERFACE
    // =======================================================

    function setAvatarState(hasPhoto, url = "") {
        if (!avatarWrapper) return;
        
        avatarWrapper.classList.toggle('has-photo', hasPhoto);
        if (removeBtn) removeBtn.classList.toggle('hidden', !hasPhoto);
        
        if (hasPhoto && url) {
            profileAvatarImg.src = url;
        } else if (profileAvatarImg) {
            // Garante que o atributo src seja removido para evitar loops de erro do navegador
            profileAvatarImg.removeAttribute('src'); 
        }
    }

    // Trava contra imagens quebradas
    if (profileAvatarImg) {
        profileAvatarImg.onerror = () => {
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

        // Carregamento de Avatar usando formatFileUrl() do utils.js
        if (loggedInUser.avatar_url) {
            const finalUrl = formatFileUrl(loggedInUser.avatar_url);
            const imgPreload = new Image();
            imgPreload.onload = () => setAvatarState(true, finalUrl);
            imgPreload.onerror = () => setAvatarState(false);
            imgPreload.src = finalUrl;
        } else {
            setAvatarState(false);
        }

        // Dados específicos por papel (Role)
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
            if (elCoordCurso) elCoordCurso.textContent = loggedInUser.curso_coordenado?.nome || loggedInUser.curso?.nome || '--';
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
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (!response.ok) return;

            const data = await response.json();
            const totalReq = data.horas_necessarias || 200;
            const totalApp = data.total_horas_aprovadas || 0;
            let percentage = Math.min((totalApp / totalReq) * 100, 100);

            const progressBar = document.querySelector('.progress-bar-fill');
            const progressLabel = document.querySelector('.progress-label');
            const breakdown = document.getElementById('progress-breakdown');

            if (progressBar) progressBar.style.width = `${percentage}%`;
            if (progressLabel) progressLabel.textContent = `${totalApp} / ${totalReq} Horas`;

            if (breakdown && data.horas_por_categoria) {
                breakdown.innerHTML = '';
                Object.entries(data.horas_por_categoria).forEach(([categoria, horas]) => {
                    let catPerc = Math.min((horas / totalReq) * 100, 100);
                    breakdown.insertAdjacentHTML('beforeend', `
                        <div class="area-progress">
                            <div class="area-label">
                                <span>${categoria}</span>
                                <span>${horas}h (${catPerc.toFixed(1)}%)</span>
                            </div>
                            <div class="mini-progress-bar">
                                <div class="mini-progress-bar-fill" style="width: ${catPerc}%;"></div>
                            </div>
                        </div>`);
                });
            }
        } catch (e) { console.error("Erro ao carregar progresso:", e); }
    }

    // =======================================================
    // 5. LÓGICA DO AVATAR (UPLOAD E REMOÇÃO)
    // =======================================================
    
    if (avatarWrapper) {
        // Abre/Fecha o menu de ações do avatar
        avatarWrapper.addEventListener('click', (e) => {
            if (!e.target.closest('#avatar-menu') && !e.target.closest('#avatar-input')) {
                avatarMenu.style.display = avatarMenu.style.display === 'block' ? 'none' : 'block';
            }
        });

        document.addEventListener('click', (e) => {
            if (!avatarWrapper.contains(e.target)) avatarMenu.style.display = 'none';
        });

        if (uploadBtn) uploadBtn.addEventListener('click', () => avatarInput.click());

        // Upload da Imagem
        avatarInput.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (!file) return;

            avatarMenu.style.display = 'none';
            const instantUrl = URL.createObjectURL(file);
            setAvatarState(true, instantUrl);

            const originalBtn = uploadBtn.innerHTML;
            uploadBtn.disabled = true;
            uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';

            const formData = new FormData();
            formData.append('avatar', file);

            try {
                const response = await fetch(`${API_BASE_URL}/api/usuarios/avatar`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                    body: formData
                });

                if (!response.ok) throw new Error();
                const result = await response.json();
                
                // Atualiza o objeto do usuário no localStorage
                loggedInUser.avatar_url = result.avatar_url;
                localStorage.setItem('userData', JSON.stringify(loggedInUser));
                
                setAvatarState(true, formatFileUrl(result.avatar_url));
                showToast('Foto de perfil atualizada!');

            } catch (error) {
                showToast('Erro ao salvar foto.', 'error');
                setAvatarState(loggedInUser.avatar_url ? true : false, formatFileUrl(loggedInUser.avatar_url));
            } finally {
                uploadBtn.disabled = false;
                uploadBtn.innerHTML = originalBtn;
                URL.revokeObjectURL(instantUrl);
            }
        });

        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                setAvatarState(false);
                showToast('Foto removida visualmente.', 'info');
                avatarMenu.style.display = 'none';
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

        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', () => {
                passwordForm.reset();
                passwordModal.showModal();
            });
        }

        passwordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const current = document.getElementById('current-password');
            const newVal = document.getElementById('new-password');
            const confirm = document.getElementById('confirm-password');

            let hasError = false;
            [current, newVal, confirm].forEach(el => toggleError(el, false));

            if (!current.value) { toggleError(current, true); hasError = true; }
            if (!newVal.value || newVal.value.length < 8) { toggleError(newVal, true); hasError = true; }
            if (newVal.value !== confirm.value) { toggleError(confirm, true); hasError = true; }

            if (hasError) return showToast('Verifique os campos e a senha (mínimo 8 caracteres).', 'error');

            try {
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
                    showToast('Senha alterada com sucesso!');
                    passwordModal.close();
                } else {
                    const res = await response.json();
                    throw new Error(res.message);
                }
            } catch (err) {
                showToast(err.message || 'Erro ao alterar senha.', 'error');
            }
        });
    }

    // =======================================================
    // 7. SUMÁRIOS DE CARGO (ESTATÍSTICAS)
    // =======================================================

    async function loadSummaries() {
        const userType = loggedInUser.tipo;

        if (userType === 'COORDENADOR') {
            try {
                const [p, a] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/certificados?status=ENTREGUE`, { headers: { 'Authorization': `Bearer ${authToken}`, 'ngrok-skip-browser-warning': 'true' } }),
                    fetch(`${API_BASE_URL}/api/certificados?status=APROVADO`, { headers: { 'Authorization': `Bearer ${authToken}`, 'ngrok-skip-browser-warning': 'true' } })
                ]);
                const dp = await p.json();
                const da = await a.json();
                const lp = Array.isArray(dp) ? dp : (dp.data || []);
                const la = Array.isArray(da) ? da : (da.data || []);
                
                if (document.getElementById('summary-pendencias')) document.getElementById('summary-pendencias').textContent = lp.length;
                if (document.getElementById('summary-horas')) document.getElementById('summary-horas').textContent = la.reduce((s, c) => s + (Number(c.horas_validadas) || 0), 0);
            } catch {}
        } 
        else if (userType === 'SECRETARIA') {
            try {
                const r = await fetch(`${API_BASE_URL}/api/usuarios`, { headers: { 'Authorization': `Bearer ${authToken}`, 'ngrok-skip-browser-warning': 'true' } });
                const d = await r.json();
                const l = Array.isArray(d) ? d : (d.data || []);
                if (document.getElementById('summary-alunos')) document.getElementById('summary-alunos').textContent = l.filter(u => u.tipo === 'ALUNO').length;
                if (document.getElementById('summary-coords')) document.getElementById('summary-coords').textContent = l.filter(u => u.tipo === 'COORDENADOR').length;
            } catch {}
        }
    }

    // Inicialização da Página
    populateUserData();
    loadSummaries();
});
