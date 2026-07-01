// js/gerenciar-usuarios.js

document.addEventListener('DOMContentLoaded', () => {

    const usersTbody = document.getElementById('users-tbody');
    const userModal = document.getElementById('user-modal');
    const deleteModal = document.getElementById('delete-modal');
    const userForm = document.getElementById('user-form');
    let userIdToDelete = null;

    // Variável Global para filtragem local (cache)
    let allUsersData = [];

    // Garante que o navegador não tente validar nativamente
    userForm.setAttribute('novalidate', true);

    // Seletores do Formulário Modal
    const papelSelect = document.getElementById('papel');
    const cursoGroup = document.getElementById('curso-group');
    const faseGroup = document.getElementById('fase-group');
    const cursoSelect = document.getElementById('curso');
    const faseSelect = document.getElementById('fase');
    const nascimentoGroup = document.getElementById('nascimento-group');
    const passwordGroup = document.getElementById('password-group');

    // Seletores de Filtro
    const filterBtn = document.getElementById('filter-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');

    // =======================================================
    // 1. MÁSCARA DE CPF (Utilizando Utils)
    // =======================================================
    // Aplica máscara no Modal E no Filtro simultaneamente
    const cpfInputs = [document.getElementById('cpf'), document.getElementById('filtro-cpf')];
    cpfInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                e.target.value = applyCpfMask(e.target.value);
            });
        }
    });

    // =======================================================
    // 2. FUNÇÕES DE AUXÍLIO E FORMATAÇÃO
    // =======================================================
    
    function clearFormErrors() {
        userForm.querySelectorAll('input, select').forEach(el => toggleError(el, false));
    }

    function toInputDateFormat(dateStr) {
        if (!dateStr) return '';
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            const [dia, mes, ano] = parts;
            return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
        }
        return '';
    }

    function getRoleBadge(role) {
        if (!role) return '';
        const roleLower = role.toLowerCase();
        const mapClasses = {
            'aluno': 'role-aluno',
            'coordenador': 'role-coord',
            'secretaria': 'role-secret',
            'administrador': 'role-admin'
        };
        const cssClass = mapClasses[roleLower] || '';
        return `<span class="role-badge ${cssClass}">${role}</span>`;
    }

    // =======================================================
    // 3. READ - CARREGAR E RENDERIZAR USUÁRIOS (COM FILTROS NO BACKEND)
    // =======================================================
    async function fetchUsers() {
        usersTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Carregando usuários...</td></tr>';
        
        try {
            // === MONTAGEM DOS FILTROS PARA O BACKEND ===
            const filters = {
                search: document.getElementById('filtro-nome').value.trim(),
                cpf: document.getElementById('filtro-cpf').value.replace(/\D/g, ''), 
                tipo: document.getElementById('filtro-papel').value
            };

            const queryString = buildQueryParams(filters);
            const url = `${API_BASE_URL}/api/usuarios${queryString ? '?' + queryString : ''}`;

            const response = await fetch(url, {
                headers: { 
                    'Authorization': `Bearer ${authToken}`, 
                    'Accept': 'application/json', 
                    'ngrok-skip-browser-warning': 'true' 
                }
            });

            if (!response.ok) throw new Error('Falha ao carregar usuários.');

            const result = await response.json();
            allUsersData = result.data || result;

            if (!Array.isArray(allUsersData)) allUsersData = [];

            renderUsersTable();

        } catch (error) {
            usersTbody.innerHTML = `<tr><td colspan="6" style="color:var(--status-reprovado)">${error.message}</td></tr>`;
        }
    }

    // =======================================================
    // 4. RENDERIZAR TABELA (SEM FILTRO CLIENT-SIDE)
    // =======================================================

    function renderUsersTable() {
        // Backend já filtrou — só renderizamos
        const usersArray = allUsersData;

        usersTbody.innerHTML = '';

        if (usersArray.length === 0) {
            usersTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhum usuário encontrado.</td></tr>';
            return;
        }

        usersArray.forEach(user => {
            const row = usersTbody.insertRow();
            row.innerHTML = `
                <td data-label="Nome">${user.nome}</td>
                <td data-label="CPF">${user.cpf || 'Sem CPF'}</td>
                <td data-label="Email">${user.email}</td>
                <td data-label="ID">${user.matricula || '-'}</td>
                <td data-label="Papel">${getRoleBadge(user.tipo)}</td>
                <td class="action-cell">
                    <button class="action-btn btn-edit" title="Editar"><i class="fas fa-pencil-alt"></i></button>
                    ${user.id !== loggedInUser.id ? '<button class="action-btn btn-delete" title="Remover"><i class="fas fa-trash"></i></button>' : ''}
                </td>
            `;

            row.querySelector('.btn-edit').addEventListener('click', () => openEditModal(user));
            const deleteBtn = row.querySelector('.btn-delete');
            if (deleteBtn) deleteBtn.addEventListener('click', () => openDeleteModal(user.id, user.nome));
        });
    }

    // =======================================================
    // 5. SUBMIT (CREATE / UPDATE)
    // =======================================================
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userId = document.getElementById('user-id').value;
        const isEditing = !!userId;
        
        const fields = {
            nome: document.getElementById('nome'),
            email: document.getElementById('email'),
            cpf: document.getElementById('cpf'),
            matricula: document.getElementById('matricula'),
            dataNasc: document.getElementById('data_nascimento')
        };

        let hasError = false;

        // Validações Básicas usando Utils
        if (!fields.nome.value.trim()) { toggleError(fields.nome, true); hasError = true; }
        if (!fields.email.value.trim()) { toggleError(fields.email, true); hasError = true; }
        if (papelSelect.value === 'ALUNO' && !fields.matricula.value.trim()) {
            toggleError(fields.matricula, true);
            hasError = true;
        }
        if (!papelSelect.value) { toggleError(papelSelect, true); hasError = true; }

        const cpfRaw = fields.cpf.value.replace(/\D/g, '');
        if (cpfRaw.length !== 11) { toggleError(fields.cpf, true); hasError = true; }

        // Validações Condicionais
        if (!cursoGroup.classList.contains('hidden') && !cursoSelect.value) { toggleError(cursoSelect, true); hasError = true; }
        if (!faseGroup.classList.contains('hidden') && !faseSelect.value) { toggleError(faseSelect, true); hasError = true; }
        if (!isEditing && !fields.dataNasc.value) { toggleError(fields.dataNasc, true); hasError = true; }

        if (hasError) {
            showToast('Por favor, verifique os campos destacados.', 'error');
            return;
        }

        const payload = {
            nome: fields.nome.value.trim(),
            email: fields.email.value.trim(),
            cpf: cpfRaw,
            matricula: fields.matricula.value.trim(),
            tipo: papelSelect.value,
            curso_id: (!cursoGroup.classList.contains('hidden')) ? cursoSelect.value : null,
            fase: (!faseGroup.classList.contains('hidden')) ? faseSelect.value : null,
            data_nascimento: fields.dataNasc.value
        };

        if (isEditing) {
            const password = document.getElementById('password').value;
            if (password && password.trim() !== '') payload.password = password;
        }

        const url = isEditing ? `${API_BASE_URL}/api/usuarios/${userId}` : `${API_BASE_URL}/api/usuarios`;
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json', 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Falha ao salvar usuário.');

            showToast(`Usuário ${isEditing ? 'atualizado' : 'criado'} com sucesso!`);
            userModal.close();
            fetchUsers();
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    // =======================================================
    // 6. DELETE
    // =======================================================
    function openDeleteModal(id, name) {
        userIdToDelete = id;
        document.getElementById('delete-user-name').textContent = name;
        deleteModal.showModal();
    }

    document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
        if (!userIdToDelete) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/usuarios/${userIdToDelete}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (!response.ok) throw new Error('Falha ao remover usuário.');

            showToast('Usuário removido com sucesso.');
            deleteModal.close();
            fetchUsers();
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    // =======================================================
    // 7. INICIALIZAÇÃO DE COMPONENTES E SELECTS
    // =======================================================
    async function populateCourseSelects() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cursos`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (!response.ok) return;
            const result = await response.json();
            const cursos = result.data || result;

            cursoSelect.innerHTML = '<option value="">Selecione um curso...</option>';
            const optionsContainer = cursoSelect.nextElementSibling.querySelector('.custom-options');
            if (optionsContainer) optionsContainer.innerHTML = '<div class="custom-option" data-value="">Selecione um curso...</div>';

            cursos.forEach(curso => {
                cursoSelect.insertAdjacentHTML('beforeend', `<option value="${curso.id}">${curso.nome}</option>`);
                if (optionsContainer) optionsContainer.insertAdjacentHTML('beforeend', `<div class="custom-option" data-value="${curso.id}">${curso.nome}</div>`);
            });
        } catch (error) { console.error("Erro ao popular cursos:", error); }
    }

    // Sincroniza a UI do Select Customizado (Usado para reset e edição)
    function updateCustomSelectUI(selectElement, value) {
        if (!selectElement) return;
        const wrapper = selectElement.nextElementSibling;
        if (!wrapper || !wrapper.classList.contains('custom-select-wrapper')) return;
        const triggerSpan = wrapper.querySelector('.custom-select-trigger span');
        let text = value === "" && selectElement.id === 'filtro-papel' ? "Todos" : "Selecione...";
        if (value) {
            const option = selectElement.querySelector(`option[value="${value}"]`);
            if (option) text = option.textContent;
        }
        triggerSpan.textContent = text;
    }

    // Inicialização da Página
    (async () => {
        await populateCourseSelects();
        fetchUsers();
        document.querySelectorAll('.custom-select-wrapper').forEach(setupCustomSelect);
    })();

    // Fechar modais
    document.querySelectorAll('.close-btn').forEach(btn =>
        btn.addEventListener('click', () => btn.closest('dialog').close())
    );

    // Eventos de Filtro com suporte ao Enter
    if (filterBtn) {
        filterBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            fetchUsers(); 
        });
    }

    const filterInputsUsers = [
        document.getElementById('filtro-nome'),
        document.getElementById('filtro-cpf'),
        document.getElementById('filtro-papel')
    ];

    filterInputsUsers.forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    fetchUsers();
                }
            });
        }
    });

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('filtro-nome').value = '';
            document.getElementById('filtro-cpf').value = '';
            document.getElementById('filtro-papel').value = '';
            fetchUsers();
        });
    }
});
