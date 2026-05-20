// js/historico-secretaria.js

document.addEventListener('DOMContentLoaded', () => {

    const listView = document.getElementById('student-list-view');
    const detailView = document.getElementById('student-detail-view');
    const studentListTbody = document.getElementById('student-list-tbody');
    const backBtn = document.getElementById('back-to-list-btn');
    const filterBtn = document.querySelector('.btn-primary');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const accordionPlaceholder = document.getElementById('accordion-placeholder');
    const courseFilterSelect = document.getElementById('curso');

    // Variável global para armazenar dados para filtragem local (Cache)
    let allStudentsData = [];

    // =======================================================
    // 1. POPULAR FILTROS (Cursos)
    // =======================================================
    async function populateCourseFilter() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cursos`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json' }
            });
            if (!response.ok) return; 
            
            const result = await response.json();
            const cursos = result.data || result;
            
            courseFilterSelect.innerHTML = '<option value="">Todos</option>';

            cursos.forEach(curso => {
                const option = document.createElement('option');
                option.value = curso.id;
                option.textContent = curso.nome;
                courseFilterSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar cursos:", error);
        }
    }

    // =======================================================
    // 2. READ - BUSCAR TODOS OS ALUNOS (Visão Global)
    // =======================================================
    async function fetchStudents() {
        studentListTbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Carregando alunos...</td></tr>';
        try {
            const response = await fetch(`${API_BASE_URL}/api/usuarios?tipo=ALUNO`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json' }
            });
            
            if (!response.ok) throw new Error('Falha ao carregar a lista de alunos.');
            
            const result = await response.json();
            allStudentsData = result.data || result;

            if (!Array.isArray(allStudentsData)) allStudentsData = [];

            renderStudentsTable();

        } catch (error) {
            studentListTbody.innerHTML = `<tr><td colspan="5" style="color: var(--status-reprovado); text-align:center;">${error.message}</td></tr>`;
        }
    }

    // =======================================================
    // 3. RENDERIZAR TABELA (Lógica de Filtro Local)
    // =======================================================
    function renderStudentsTable() {
        const nomeFilter = document.getElementById('aluno').value.toLowerCase().trim();
        const matriculaFilter = document.getElementById('matricula').value.trim();
        const cursoFilter = document.getElementById('curso').value;
        
        const dataInicioVal = document.getElementById('data-inicio').value;
        const dataFimVal = document.getElementById('data-fim').value;
        const dataInicio = dataInicioVal ? new Date(dataInicioVal) : null;
        const dataFim = dataFimVal ? new Date(dataFimVal) : null;

        const filteredStudents = allStudentsData.filter(aluno => {
            const matchNome = !nomeFilter || (aluno.nome && aluno.nome.toLowerCase().includes(nomeFilter));
            const matchMatricula = !matriculaFilter || (String(aluno.matricula || '').includes(matriculaFilter));
            
            const alunoCursoId = aluno.curso?.id || aluno.curso_id;
            const matchCurso = !cursoFilter || (String(alunoCursoId) === String(cursoFilter));

            // Filtro de Data (Baseado no cadastro do aluno)
            let matchData = true;
            if (dataInicio || dataFim) {
                const dataCadastro = new Date(aluno.created_at);
                dataCadastro.setHours(0,0,0,0);
                if (dataInicio) dataInicio.setHours(0,0,0,0);
                if (dataFim) dataFim.setHours(0,0,0,0);

                if (dataInicio && dataCadastro < dataInicio) matchData = false;
                if (dataFim && dataCadastro > dataFim) matchData = false;
            }

            return matchNome && matchMatricula && matchCurso && matchData;
        });

        studentListTbody.innerHTML = '';

        if (filteredStudents.length === 0) {
            studentListTbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Nenhum aluno encontrado.</td></tr>';
            return;
        }

        filteredStudents.forEach(aluno => {
            const row = document.createElement('tr');
            row.className = 'student-row';
            row.style.cursor = 'pointer';
            
            row.innerHTML = `
                <td data-label="Nome do Aluno"><strong>${aluno.nome}</strong></td>
                <td data-label="Matrícula">${aluno.matricula || '--'}</td>
                <td data-label="Curso">${aluno.curso?.nome || 'N/A'}</td>
                <td data-label="Fase">${aluno.fase ? aluno.fase + 'ª Fase' : '--'}</td>
                <td data-label="Solicitações">
                    <span class="status" style="color: #333; background: #eee;">
                        ${aluno.certificados_count || 0}
                    </span>
                </td>
            `;
            row.addEventListener('click', () => showDetailView(aluno.id, aluno.nome));
            studentListTbody.appendChild(row);
        });
    }

    // =======================================================
    // 4. DETALHES DO HISTÓRICO (Individual)
    // =======================================================
    async function showDetailView(studentId, studentName) {
        listView.style.display = 'none';
        detailView.style.display = 'block';
        document.getElementById('student-name-title').textContent = `Histórico de: ${studentName}`;
        accordionPlaceholder.innerHTML = '<p style="text-align:center; padding: 2rem;">Carregando histórico...</p>';

        try {
            const response = await fetch(`${API_BASE_URL}/api/certificados?aluno_id=${studentId}`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json' }
            });
            if (!response.ok) throw new Error('Falha ao carregar o histórico.');
            
            const result = await response.json();
            const certificados = result.data || result;
            
            accordionPlaceholder.innerHTML = '';
            
            if (!Array.isArray(certificados) || certificados.length === 0) {
                accordionPlaceholder.innerHTML = '<p style="text-align:center; padding: 2rem;">Este aluno ainda não enviou certificados.</p>';
                return;
            }

            certificados.forEach(cert => {
                // Utiliza as ferramentas globais do utils.js
                const statusInfo = getStatusInfo(cert.status);
                const fileUrl = formatFileUrl(cert.arquivo_url);
                const dataEnvio = new Date(cert.created_at).toLocaleDateString('pt-BR');

                const itemHTML = `
                <div class="accordion-item">
                    <button class="accordion-header">
                        <div class="header-title"><h3>${cert.nome_certificado}</h3></div>
                        <div class="header-status">
                            <span class="status ${statusInfo.className}">${statusInfo.text}</span>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </div>
                    </button>
                    <div class="accordion-content">
                        <div class="content-wrapper">
                            <div class="details-list">
                                <div class="detail-item"><span>Data de Envio:</span> <span>${dataEnvio}</span></div>
                                <div class="detail-item"><span>Horas Solicitadas:</span> <span>${cert.carga_horaria_solicitada}</span></div>
                                <div class="detail-item"><span>Horas Validadas:</span> <span>${cert.horas_validadas ?? '--'}</span></div>
                                <div class="detail-item"><span>Observação:</span> <span>${cert.observacao || 'Sem observações.'}</span></div>
                            </div>
                            <div class="preview-section">
                                <h4>Comprovante</h4>
                                <embed class="pdf-preview" src="${fileUrl}" type="application/pdf" />
                            </div>
                        </div>
                    </div>
                </div>`;
                accordionPlaceholder.innerHTML += itemHTML;
            });

            // Ativa o comportamento do acordeão
            setupAccordion();

        } catch (error) {
            accordionPlaceholder.innerHTML = `<p style="color: var(--status-reprovado); text-align:center;">${error.message}</p>`;
        }
    }
    
    // =======================================================
    // 5. EVENTOS E INICIALIZAÇÃO
    // =======================================================

    backBtn.addEventListener('click', () => {
        detailView.style.display = 'none';
        listView.style.display = 'block';
    });

    filterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        renderStudentsTable();
    });
    
    clearFiltersBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('aluno').value = '';
        document.getElementById('matricula').value = '';
        document.getElementById('curso').value = '';
        document.getElementById('data-inicio').value = '';
        document.getElementById('data-fim').value = '';
        renderStudentsTable();
    });

    // Inicialização da página
    populateCourseFilter();
    fetchStudents();
});