// js/historico-secretaria.js

document.addEventListener('DOMContentLoaded', () => {

    const listView = document.getElementById('student-list-view');
    const detailView = document.getElementById('student-detail-view');
    const studentListTbody = document.getElementById('student-list-tbody');
    const backBtn = document.getElementById('back-to-list-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const accordionPlaceholder = document.getElementById('accordion-placeholder');
    const courseFilterSelect = document.getElementById('curso');

    let allStudentsData = [];

    // =======================================================
    // 1. POPULAR CURSOS
    // =======================================================
    async function populateCourseFilter() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cursos`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
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
    // 2. BUSCAR ALUNOS (Backend)
    // =======================================================
    async function fetchStudents() {
        studentListTbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Carregando alunos...</td></tr>';

        try {
            const filters = {
                tipo: 'ALUNO',
                search: document.getElementById('aluno').value.trim(),
                matricula: document.getElementById('matricula').value.trim(),
                curso_id: document.getElementById('curso').value,
                data_inicio: document.getElementById('data-inicio').value,
                data_fim: document.getElementById('data-fim').value
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

            if (!response.ok) throw new Error('Falha ao carregar a lista de alunos.');

            const result = await response.json();
            let studentsData = result.data || result;
            if (!Array.isArray(studentsData)) studentsData = [];

            // Contagem de certificados
            try {
                const certResponse = await fetch(`${API_BASE_URL}/api/certificados`, {
                    headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
                });

                if (certResponse.ok) {
                    const certResult = await certResponse.json();
                    const certificados = certResult.data || certResult;
                    const contagemPorAluno = {};

                    certificados.forEach(cert => {
                        const alunoId = cert.aluno?.id || cert.aluno_id;
                        if (alunoId) contagemPorAluno[alunoId] = (contagemPorAluno[alunoId] || 0) + 1;
                    });

                    studentsData = studentsData.map(aluno => {
                        aluno.certificados_count = contagemPorAluno[aluno.id] || 0;
                        return aluno;
                    });
                }
            } catch (e) {
                console.warn('Não foi possível obter o total de solicitações.', e);
            }

            allStudentsData = studentsData;
            renderStudentsTable();

        } catch (error) {
            console.error(error);
            studentListTbody.innerHTML = `<tr><td colspan="5" style="color: var(--status-reprovado); text-align:center;">${error.message}</td></tr>`;
        }
    }

    // =======================================================
    // 3. RENDERIZAR TABELA
    // =======================================================
    function renderStudentsTable() {
        const studentsArray = allStudentsData || [];
        studentListTbody.innerHTML = '';

        if (studentsArray.length === 0) {
            const hasFilter = document.getElementById('aluno').value.trim() || 
                             document.getElementById('matricula').value.trim() || 
                             document.getElementById('curso').value ||
                             document.getElementById('data-inicio').value ||
                             document.getElementById('data-fim').value;

            studentListTbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 3rem 1rem;">
                ${hasFilter ? 'Nenhum aluno encontrado com estes filtros.' : 'Nenhum aluno cadastrado no momento.'}
            </td></tr>`;
            return;
        }

        studentsArray.forEach(aluno => {
            const row = document.createElement('tr');
            row.className = 'student-row';
            row.style.cursor = 'pointer';
            
            row.innerHTML = `
                <td data-label="Nome do Aluno"><strong>${aluno.nome}</strong></td>
                <td data-label="Matrícula">${aluno.matricula || '--'}</td>
                <td data-label="Curso">${aluno.curso?.nome || 'N/A'}</td>
                <td data-label="Fase">${aluno.fase ? aluno.fase + 'ª Fase' : '--'}</td>
                <td data-label="Total de Solicitações">
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
    // 4. DETALHES DO ALUNO
    // =======================================================
    async function showDetailView(studentId, studentName) {
        listView.style.display = 'none';
        detailView.style.display = 'block';
        document.getElementById('student-name-title').textContent = `Histórico de: ${studentName}`;
        accordionPlaceholder.innerHTML = '<p style="text-align:center; padding: 2rem;">Carregando histórico...</p>';

        try {
            const response = await fetch(`${API_BASE_URL}/api/certificados?aluno_id=${studentId}`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
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
                const statusInfo = getStatusInfo(cert.status);
                const filePath = cert.arquivo_url || cert.arquivo || cert.comprovante_url || '';
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
                                <div class="pdf-preview-area" data-file-path="${filePath}">
                                    <div class="pdf-preview-state">
                                        <i class="fas fa-spinner fa-spin"></i>
                                        <span>Carregando comprovante...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                accordionPlaceholder.innerHTML += itemHTML;
            });

            setupAccordion();
            carregarPreviewsPdf();

        } catch (error) {
            accordionPlaceholder.innerHTML = `<p style="color: var(--status-reprovado); text-align:center;">${error.message}</p>`;
        }
    }

    // =======================================================
    // 5. PREVIEW PDF
    // =======================================================
    async function carregarPreviewsPdf() {
        const previewAreas = document.querySelectorAll('.pdf-preview-area');

        for (const area of previewAreas) {
            const rawPath = area.dataset.filePath;
            if (!rawPath) {
                mostrarPreviewIndisponivel(area, 'Nenhum comprovante encontrado.');
                continue;
            }

            const fileUrl = formatFileUrl(rawPath);

            try {
                const response = await fetch(fileUrl, {
                    headers: {
                        'Accept': 'application/pdf,application/octet-stream,*/*',
                        'Authorization': `Bearer ${authToken}`,
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                const contentType = response.headers.get('content-type') || '';

                if (!response.ok) throw new Error('Arquivo indisponível.');
                if (contentType.includes('text/html')) throw new Error('Servidor retornou HTML.');

                const blob = await response.blob();
                const pdfUrl = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

                area.innerHTML = `
                    <iframe class="pdf-preview" src="${pdfUrl}" title="Pré-visualização"></iframe>
                    <a class="pdf-open-link" href="${pdfUrl}" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-up-right-from-square"></i> Abrir em nova guia
                    </a>
                `;
            } catch (error) {
                console.warn('Erro ao carregar PDF:', error);
                mostrarPreviewIndisponivel(area, 'Não foi possível carregar o comprovante.');
            }
        }
    }

    function mostrarPreviewIndisponivel(area, mensagem) {
        area.innerHTML = `
            <div class="pdf-preview-unavailable">
                <i class="fas fa-file-circle-exclamation"></i>
                <strong>Comprovante indisponível</strong>
                <span>${mensagem}</span>
            </div>
        `;
    }

    // =======================================================
    // 6. EVENTOS E INICIALIZAÇÃO
    // =======================================================
    const filterBtn = document.querySelector('.btn-primary');
    if (filterBtn) {
        filterBtn.addEventListener('click', (e) => { e.preventDefault(); fetchStudents(); });
    }

    // Enter nos filtros
    const filterInputs = ['aluno','matricula','curso','data-inicio','data-fim'];
    filterInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.addEventListener('keypress', e => {
            if (e.key === 'Enter') { e.preventDefault(); fetchStudents(); }
        });
    });

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            document.getElementById('aluno').value = '';
            document.getElementById('matricula').value = '';
            document.getElementById('curso').value = '';
            document.getElementById('data-inicio').value = '';
            document.getElementById('data-fim').value = '';
            document.getElementById('data-inicio_text').textContent = 'dd/mm/aaaa';
            document.getElementById('data-fim_text').textContent = 'dd/mm/aaaa';
            fetchStudents();
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            detailView.style.display = 'none';
            listView.style.display = 'block';
        });
    }

    // Inicialização
    (async () => {
        await populateCourseFilter();
        await fetchStudents();

        // Calendários customizados (igual ao cadastro-horas)
        if (typeof setupDatePicker === 'function') {
            setupDatePicker('data-inicio-picker', 'data-inicio', 'data-inicio_text');
            setupDatePicker('data-fim-picker', 'data-fim', 'data-fim_text');
        }
    })();
});