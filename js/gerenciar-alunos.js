// js/gerenciar-alunos.js

document.addEventListener('DOMContentLoaded', () => {

    const studentsTbody = document.getElementById('students-tbody');
    const studentModal = document.getElementById('student-modal');
    const deleteModal = document.getElementById('delete-modal');
    const studentForm = document.getElementById('student-form');
    let studentIdToDelete = null;
    let cursosCarregados = false;
    
    // Variável global para dados na memória (cache local para filtros)
    let allStudentsData = []; 

    // =======================================================
    // 1. MÁSCARA DE CPF (Utilizando Utils)
    // =======================================================
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            // Utilizamos a função global do utils.js
            e.target.value = applyCpfMask(e.target.value);
        });
    }

    // =======================================================
    // 2. READ - CARREGAR DADOS DA API (AGORA COM FILTROS NO BACKEND)
    // =======================================================
    async function fetchStudents() {
        studentsTbody.innerHTML = '<tr><td colspan="6">Carregando alunos...</td></tr>';
        
        try {
            // === MONTAGEM DOS FILTROS PARA O BACKEND ===
            const filters = {
                tipo: 'ALUNO',
                search: document.getElementById('filtro-nome').value.trim(),
                matricula: document.getElementById('filtro-matricula').value.trim(),
                curso_id: document.getElementById('filtro-curso').value
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

            if (!response.ok) throw new Error('Falha ao carregar alunos.');

            const result = await response.json();
            allStudentsData = result.data || result;

            if (!Array.isArray(allStudentsData)) allStudentsData = [];

            renderStudentsTable();

        } catch (error) {
            studentsTbody.innerHTML = `<tr><td colspan="6" style="color:var(--status-reprovado)">${error.message}</td></tr>`;
        }
    }

    // =======================================================
    // 3. RENDERIZAR TABELA (SEM FILTRO CLIENT-SIDE)
    // =======================================================

    function renderStudentsTable() {
        const studentsArray = allStudentsData || [];

        studentsTbody.innerHTML = '';

        if (studentsArray.length === 0) {
            const searchTerm = document.getElementById('filtro-nome').value.trim();
            const matriculaTerm = document.getElementById('filtro-matricula').value.trim();
            const cursoValue = document.getElementById('filtro-curso').value;

            let mensagem = 'Nenhum aluno cadastrado no momento.';
            
            if (searchTerm || matriculaTerm || cursoValue) {
                mensagem = 'Nenhum aluno encontrado com estes filtros.';
            }

            studentsTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 3rem 1rem;">${mensagem}</td></tr>`;
            return;
        }

        studentsArray.forEach(aluno => {
            const row = studentsTbody.insertRow();
            row.innerHTML = `
                <td data-label="Nome Completo">${aluno.nome}</td>
                <td data-label="Matrícula">${aluno.matricula || '--'}</td>
                <td data-label="Email">${aluno.email}</td>
                <td data-label="Curso">${aluno.curso?.nome || 'N/A'}</td>
                <td data-label="Fase">${aluno.fase ? aluno.fase + 'ª' : 'N/A'}</td>
                <td class="action-cell">
                    <button class="action-btn btn-edit" title="Editar"><i class="fas fa-pencil-alt"></i></button>
                    <button class="action-btn btn-delete" title="Remover"><i class="fas fa-trash"></i></button>
                </td>
            `;
            row.querySelector('.btn-edit').addEventListener('click', () => openEditModal(aluno));
            row.querySelector('.btn-delete').addEventListener('click', () => openDeleteModal(aluno.id, aluno.nome));
        });
    }

    // Selecionar o botão Filtrar
    const filterBtn = document.getElementById('filter-btn') || document.querySelector('.btn-primary');

    // Eventos dos Filtros com suporte ao Enter
    if (filterBtn) {
        filterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetchStudents();
        });
    }

    const filterInputsAlunos = [
        document.getElementById('filtro-nome'),
        document.getElementById('filtro-matricula'),
        document.getElementById('filtro-curso')
    ];

    filterInputsAlunos.forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    fetchStudents();
                }
            });
        }
    });

    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('filtro-nome').value = '';
            document.getElementById('filtro-matricula').value = '';
            document.getElementById('filtro-curso').value = '';
            fetchStudents();
        });
    }

    // =======================================================
    // 4. CRUD: CREATE / UPDATE
    // =======================================================
    
    function clearFormErrors() {
        // Agora usamos o seletor padrão, pois a função toggleError está global
        studentForm.querySelectorAll('input, select').forEach(el => toggleError(el, false));
    }

    document.getElementById('add-student-btn').addEventListener('click', () => {
        studentForm.reset();
        clearFormErrors();
        document.getElementById('student-id').value = '';
        document.getElementById('modal-title').textContent = 'Adicionar Novo Aluno';
        
        const dataNascInput = document.getElementById('data_nascimento');
        const passwordGroup = document.getElementById('password-group');
        
        if (dataNascInput) {
            dataNascInput.parentElement.classList.remove('hidden');
            dataNascInput.value = '';
        }
        if (passwordGroup) passwordGroup.classList.add('hidden');
        
        studentModal.showModal();
    });

    function openEditModal(aluno) {
        if (!cursosCarregados) {
            setTimeout(() => openEditModal(aluno), 100);
            return;
        }
        studentForm.reset();
        clearFormErrors();
        document.getElementById('modal-title').textContent = 'Editar Aluno';
        document.getElementById('student-id').value = aluno.id;
        document.getElementById('nome').value = aluno.nome || '';
        document.getElementById('cpf').value = aluno.cpf ? applyCpfMask(aluno.cpf) : '';
        document.getElementById('matricula').value = aluno.matricula || '';
        document.getElementById('email').value = aluno.email || '';

        const cursoSelect = document.getElementById('curso');
        const cursoId = aluno.curso_id || aluno.curso?.id;
        if (cursoSelect && cursoId != null) cursoSelect.value = String(cursoId);

        document.getElementById('fase').value = aluno.fase || '';
        
        const dataNascInput = document.getElementById('data_nascimento');
        if (dataNascInput) {
            dataNascInput.value = aluno.data_nascimento || '';
            dataNascInput.parentElement.classList.remove('hidden');
        }

        const passwordGroup = document.getElementById('password-group');
        if (passwordGroup) passwordGroup.classList.remove('hidden');

        studentModal.showModal();
    }

    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentId = document.getElementById('student-id').value;
        const isEditing = !!studentId;

        const nomeInput = document.getElementById('nome');
        const matriculaInput = document.getElementById('matricula');
        let hasError = false;

        // Validação utilizando toggleError do utils.js
        if (!nomeInput.value.trim()) { toggleError(nomeInput, true); hasError = true; }
        if (!matriculaInput.value.trim()) { toggleError(matriculaInput, true); hasError = true; }

        if (hasError) {
            showToast('Preencha os campos obrigatórios', 'error');
            return;
        }

        const data = {
            nome: nomeInput.value,
            matricula: matriculaInput.value,
            email: document.getElementById('email').value,
            cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
            curso_id: document.getElementById('curso').value,
            fase: document.getElementById('fase').value,
            tipo: 'ALUNO'
        };

        const dataNascInput = document.getElementById('data_nascimento');

        if (!dataNascInput || !dataNascInput.value) {
            if (dataNascInput) toggleError(dataNascInput, true);
            showToast('Informe a data de nascimento.', 'error');
            return;
        }

        data.data_nascimento = dataNascInput.value;

        if (!isEditing && dataNascInput && dataNascInput.value) {
            const [y, m, d] = data.data_nascimento.split('-');
            data.password = `${d}${m}${y}`;
        }
        
        const passwordInput = document.getElementById('password');
        if (isEditing && passwordInput && passwordInput.value) {
            data.password = passwordInput.value;
        }

        const url = isEditing ? `${API_BASE_URL}/api/usuarios/${studentId}` : `${API_BASE_URL}/api/usuarios`;
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Erro ao salvar');

            showToast(`Aluno ${isEditing ? 'atualizado' : 'cadastrado'}!`);
            studentModal.close();
            fetchStudents(); 
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    // =======================================================
    // 5. DELETE
    // =======================================================
    function openDeleteModal(id, name) {
        studentIdToDelete = id;
        document.getElementById('delete-student-name').textContent = name;
        deleteModal.showModal();
    }

    document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
        if (!studentIdToDelete) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/usuarios/${studentIdToDelete}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}`, 'ngrok-skip-browser-warning': 'true' }
            });
            if (!response.ok) throw new Error('Erro ao deletar');
            
            showToast('Aluno removido.');
            deleteModal.close();
            fetchStudents();
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    // =======================================================
    // 6. INICIALIZAÇÃO E POPULAR SELECTS
    // =======================================================
    async function populateCourseSelects() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cursos`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'ngrok-skip-browser-warning': 'true' }
            });
            if (!response.ok) return;
            const result = await response.json();
            const cursos = result.data || result;

            const filterSelect = document.getElementById('filtro-curso');
            const modalSelect = document.getElementById('curso');

            cursos.forEach(curso => {
                if (filterSelect) filterSelect.insertAdjacentHTML('beforeend', `<option value="${curso.id}">${curso.nome}</option>`);
                if (modalSelect) modalSelect.insertAdjacentHTML('beforeend', `<option value="${curso.id}">${curso.nome}</option>`);
            });
            cursosCarregados = true;
        } catch (e) { console.error(e); }
    }

    // Fechar modais ao clicar no botão de fechar
    document.querySelectorAll('.close-btn').forEach(btn =>
        btn.addEventListener('click', () => btn.closest('dialog').close())
    );

    // Inicialização da página
    (async () => {
        await populateCourseSelects();
        fetchStudents(); 
    })();
});
