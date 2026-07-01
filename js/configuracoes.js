// js/configuracoes.js

document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // 1. ESTADO GLOBAL E ELEMENTOS
    // =======================================================
    
    let deleteTargetId = null;
    let deleteTargetType = null; // 'curso' ou 'categoria'

    // Elementos de Cursos
    const coursesTableBody = document.getElementById('courses-table-body');
    const courseModal = document.getElementById('course-modal');
    const courseForm = document.getElementById('course-form');
    const btnAddCourse = document.getElementById('btn-add-course');
    const courseModalTitle = document.getElementById('course-modal-title');

    // Elementos de Categorias
    const categoriesTableBody = document.getElementById('categories-table-body');
    const categoryModal = document.getElementById('category-modal');
    const categoryForm = document.getElementById('category-form');
    const btnAddCategory = document.getElementById('btn-add-category');
    const categoryModalTitle = document.getElementById('category-modal-title');

    // Elementos Gerais e Integração
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const deleteItemName = document.getElementById('delete-item-name');
    const apiUrlInput = document.getElementById('api-url');
    const apiKeyInput = document.getElementById('api-key');
    const saveIntegrationsBtn = document.getElementById('save-integrations-btn');

    // =======================================================
    // 2. GERENCIAMENTO DE CURSOS (CRUD)
    // =======================================================

    async function loadCourses() {
        coursesTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center">Carregando cursos...</td></tr>';
        try {
            const response = await fetch(`${API_BASE_URL}/api/cursos`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });

            if (response.ok) {
                const result = await response.json();
                const courses = result.data || result;
                renderCourses(courses);
            } else {
                coursesTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color: var(--status-reprovado)">Erro ao carregar lista.</td></tr>';
            }
        } catch (error) {
            console.error(error);
            showToast('Erro de conexão ao carregar cursos.', 'error');
        }
    }

    function renderCourses(courses) {
        coursesTableBody.innerHTML = '';
        if (courses.length === 0) {
            coursesTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center">Nenhum curso cadastrado.</td></tr>';
            return;
        }

        courses.forEach(course => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td data-label="ID">#${course.id}</td>
                <td data-label="Curso"><strong>${course.nome}</strong></td>
                <td data-label="Horas">${course.horas_necessarias}h</td>
                <td class="action-cell">
                    <button class="action-btn edit-course" data-id="${course.id}" data-nome="${course.nome}" data-horas="${course.horas_necessarias}" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-type="curso" data-id="${course.id}" data-nome="${course.nome}" title="Excluir">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            coursesTableBody.appendChild(tr);
        });
    }

    function openCourseModal(isEdit, data = {}) {
        const idInput = document.getElementById('course-id');
        const nameInput = document.getElementById('course-name');
        const hoursInput = document.getElementById('course-hours');

        // Limpa erros visuais via Utils
        [nameInput, hoursInput].forEach(el => toggleError(el, false));

        if (isEdit) {
            courseModalTitle.textContent = 'Editar Curso';
            idInput.value = data.id;
            nameInput.value = data.nome;
            hoursInput.value = data.horas;
        } else {
            courseModalTitle.textContent = 'Adicionar Curso';
            courseForm.reset();
            idInput.value = '';
        }
        courseModal.showModal();
    }

    courseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('course-id').value;
        const nameInput = document.getElementById('course-name');
        const hoursInput = document.getElementById('course-hours');
        
        let hasError = false;
        if (!nameInput.value.trim()) { toggleError(nameInput, true); hasError = true; }
        if (!hoursInput.value.trim()) { toggleError(hoursInput, true); hasError = true; }
        
        if (hasError) return showToast('Preencha os campos destacados.', 'error');

        const isEdit = !!id;
        const method = isEdit ? 'PUT' : 'POST';
        const url = isEdit ? `${API_BASE_URL}/api/cursos/${id}` : `${API_BASE_URL}/api/cursos`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 
                    'Authorization': `Bearer ${authToken}`, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({ 
                    nome: nameInput.value.trim(), 
                    horas_necessarias: parseInt(hoursInput.value) 
                })
            });

            if (response.ok) {
                showToast(`Curso ${isEdit ? 'atualizado' : 'criado'}!`);
                courseModal.close();
                loadCourses();
            } else {
                const err = await response.json();
                showToast(err.message || 'Erro ao salvar curso.', 'error');
            }
        } catch (error) { showToast('Erro de conexão.', 'error'); }
    });

    // =======================================================
    // 3. GERENCIAMENTO DE CATEGORIAS (CRUD)
    // =======================================================

    async function loadCategories() {
        categoriesTableBody.innerHTML = '<tr><td colspan="3" style="text-align:center">Carregando...</td></tr>';
        try {
            const response = await fetch(`${API_BASE_URL}/api/categorias`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (response.ok) {
                const result = await response.json();
                const categories = result.data || result;
                renderCategories(categories);
            }
        } catch (error) { showToast('Erro ao carregar categorias.', 'error'); }
    }

    function renderCategories(categories) {
        categoriesTableBody.innerHTML = '';
        if (categories.length === 0) {
            categoriesTableBody.innerHTML = '<tr><td colspan="3" style="text-align:center">Nenhuma categoria cadastrada.</td></tr>';
            return;
        }

        categories.forEach(cat => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td data-label="ID">#${cat.id}</td>
                <td data-label="Categoria"><strong>${cat.nome}</strong></td>
                <td class="action-cell">
                    <button class="action-btn delete-btn" data-type="categoria" data-id="${cat.id}" data-nome="${cat.nome}" title="Excluir">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            categoriesTableBody.appendChild(tr);
        });
    }

    function openCategoryModal() {
        const idInput = document.getElementById('category-id');
        const nameInput = document.getElementById('category-name');

        toggleError(nameInput, false);

        categoryModalTitle.textContent = 'Adicionar Categoria';
        categoryForm.reset();

        if (idInput) {
            idInput.value = '';
        }

        categoryModal.showModal();
    }

        categoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('category-name');

        if (!nameInput.value.trim()) {
            toggleError(nameInput, true);
            return showToast('Preencha o nome da categoria.', 'error');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/categorias`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${authToken}`, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({ nome: nameInput.value.trim() })
            });

            if (response.ok) {
                showToast('Categoria criada!');
                categoryModal.close();
                loadCategories();
            } else {
                const err = await response.json();
                showToast(err.message || 'Erro ao criar categoria.', 'error');
            }
        } catch (error) {
            showToast('Erro de conexão.', 'error');
        }
    });

    // =======================================================
    // 4. EXCLUSÃO GENÉRICA
    // =======================================================

    // Delegação de evento para os botões de delete (que são criados dinamicamente)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.delete-btn');
        if (btn) {
            deleteTargetType = btn.dataset.type;
            deleteTargetId = btn.dataset.id;
            deleteItemName.textContent = btn.dataset.nome;
            deleteModal.showModal();
        }
        
        const editCourseBtn = e.target.closest('.edit-course');
        if (editCourseBtn) openCourseModal(true, editCourseBtn.dataset);
    });

    confirmDeleteBtn.addEventListener('click', async () => {
        const endpoint = deleteTargetType === 'curso' ? 'cursos' : 'categorias';
        try {
            const response = await fetch(`${API_BASE_URL}/api/${endpoint}/${deleteTargetId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });

            if (response.ok) {
                showToast('Removido com sucesso!');
                deleteTargetType === 'curso' ? loadCourses() : loadCategories();
            } else {
                const err = await response.json();
                showToast(err.message || 'Erro ao remover.', 'error');
            }
        } catch (error) { showToast('Erro de conexão.', 'error'); }
        finally { deleteModal.close(); }
    });

    // =======================================================
    // 5. INTEGRAÇÕES E CONFIGURAÇÕES GLOBAIS
    // =======================================================
    const horasMinimasInput = document.getElementById('horas-minimas');
    const modoManutencaoSelect = document.getElementById('modo-manutencao');

    async function loadIntegrations() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/configuracoes`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (response.ok) {
                const config = await response.json();
                if (apiUrlInput) apiUrlInput.value = config.api_url || '';
                if (apiKeyInput) apiKeyInput.value = config.api_key || '';
                if (horasMinimasInput) horasMinimasInput.value = config.horas_minimas || '200';
                
                if (modoManutencaoSelect) {
                    const isManutencao = config.modo_manutencao === 'true' || config.modo_manutencao === true;
                    modoManutencaoSelect.value = isManutencao ? 'true' : 'false';
                    
                    const triggerSpan = modoManutencaoSelect.nextElementSibling?.querySelector('.custom-select-trigger span');
                    if (triggerSpan) triggerSpan.textContent = isManutencao ? 'Ativado (Envios Suspensos)' : 'Desativado (Funcionamento Normal)';
                }
            }
        } catch (e) { console.warn("Erro ao carregar configs:", e); }
    }

    saveIntegrationsBtn.addEventListener('click', async () => {
        const originalText = saveIntegrationsBtn.innerHTML;
        saveIntegrationsBtn.disabled = true;
        saveIntegrationsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';

        try {
            const response = await fetch(`${API_BASE_URL}/api/configuracoes`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${authToken}`, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({
                    api_url: apiUrlInput.value,
                    api_key: apiKeyInput.value,
                    horas_minimas: horasMinimasInput ? parseInt(horasMinimasInput.value) : 200, 
                    modo_manutencao: modoManutencaoSelect ? (modoManutencaoSelect.value === 'true') : false
                })
            });
            if (response.ok) showToast('Configurações salvas!');
        } catch (error) { showToast('Erro ao salvar.', 'error'); }
        finally {
            saveIntegrationsBtn.disabled = false;
            saveIntegrationsBtn.innerHTML = originalText;
        }
    });

    // Importação de Sistema Legado
    const btnRunImport = document.getElementById('btn-run-import');
    if (btnRunImport) {
        btnRunImport.addEventListener('click', async () => {
            const externalUrl = apiUrlInput.value.trim();
            const externalKey = apiKeyInput.value.trim();

            if (!externalUrl || !externalKey) return showToast('Configure a API Legada antes.', 'error');

            const originalText = btnRunImport.innerHTML;
            btnRunImport.disabled = true;
            btnRunImport.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Importando...';

            try {
                const respLegado = await fetch(externalUrl, {
                    headers: { 'x-api-key': externalKey, 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' }
                });
                if (!respLegado.ok) throw new Error('Falha ao conectar com sistema legado.');
                const dadosLegado = await respLegado.json();

                const payloadImportacao = Array.isArray(dadosLegado)
                    ? { usuarios: dadosLegado }
                    : dadosLegado;

                const respImport = await fetch(`${API_BASE_URL}/api/usuarios/import`, {
                    method: 'POST',
                    headers: { 
                        'Authorization': `Bearer ${authToken}`, 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    body: JSON.stringify(payloadImportacao)
                });

                if (respImport.ok) showToast('Importação concluída com sucesso!');
                else throw new Error('Erro ao processar no servidor.');

            } catch (error) { showToast(error.message, 'error'); }
            finally {
                btnRunImport.disabled = false;
                btnRunImport.innerHTML = originalText;
            }
        });
    }

    // Exportação de Certificados (API Externa)
    const btnExportCerts = document.getElementById('btn-export-certs');
    if (btnExportCerts) {
        btnExportCerts.addEventListener('click', async () => {
            const externalUrl = apiUrlInput.value.trim();
            const externalKey = apiKeyInput.value.trim();

            // Valida se as credenciais da API Externa foram preenchidas (mesmo comportamento da importação)
            if (!externalUrl || !externalKey) return showToast('Configure a API Legada antes de exportar.', 'error');

            const originalText = btnExportCerts.innerHTML;
            btnExportCerts.disabled = true;
            btnExportCerts.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exportando...';

            try {
                // 1. Busca os certificados da nossa API local
                const response = await fetch(`${API_BASE_URL}/api/certificados/exportar/externo`, {
                    headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
                });
                
                if (!response.ok) throw new Error('Falha ao buscar dados locais para exportação.');

                const dadosExportacao = await response.json();

                // 2. Envia os certificados diretamente para a API Legada Externa
                const respLegado = await fetch(externalUrl, {
                    method: 'POST', // Pode ser alterado para PUT dependendo do padrão da sua API externa
                    headers: { 
                        'x-api-key': externalKey, 
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    body: JSON.stringify(dadosExportacao)
                });

                if (!respLegado.ok) throw new Error('Falha ao enviar os dados para o sistema legado.');

                showToast('Exportação concluída com sucesso!');
            } catch (error) { 
                showToast(error.message, 'error'); 
            } finally {
                // Restaura o botão
                btnExportCerts.disabled = false;
                btnExportCerts.innerHTML = originalText;
            }
        });
    }

    // =======================================================
    // 6. INICIALIZAÇÃO
    // =======================================================
    
    btnAddCourse.addEventListener('click', () => openCourseModal(false));
    btnAddCategory.addEventListener('click', () => openCategoryModal());

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => btn.closest('dialog').close());
    });

    [courseModal, categoryModal, deleteModal].forEach(modal => {
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
    });

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => toggleError(input, false));
    });

    // Carga inicial
    loadCourses();
    loadCategories();
    loadIntegrations();
    
    // Inicia select customizado
    if (modoManutencaoSelect) setupCustomSelect(modoManutencaoSelect.nextElementSibling);
});