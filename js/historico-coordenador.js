// js/historico-coordenador.js

document.addEventListener('DOMContentLoaded', () => {

    const listView = document.getElementById('student-list-view');
    const detailView = document.getElementById('student-detail-view');
    const studentListTbody = document.getElementById('student-list-tbody');
    const backBtn = document.getElementById('back-to-list-btn');
    const filterBtn = document.querySelector('.btn-primary');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const accordionPlaceholder = document.getElementById('accordion-placeholder');

    // Variáveis de estado
    let allStudentsData = [];

        function parseDateInput(value) {
        if (!value) return null;

        const [year, month, day] = value.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    function parseBackendDate(value) {
        if (!value) return null;

        const datePart = String(value).split(' ')[0];
        const [year, month, day] = datePart.split('-').map(Number);

        if (!year || !month || !day) return null;

        return new Date(year, month - 1, day);
    }

    function getPeriodoFiltro() {
        const dataInicioVal = document.getElementById('data-inicio').value;
        const dataFimVal = document.getElementById('data-fim').value;

        return {
            inicio: parseDateInput(dataInicioVal),
            fim: parseDateInput(dataFimVal),
            ativo: Boolean(dataInicioVal || dataFimVal)
        };
    }

    function certificadoDentroDoPeriodo(cert) {
        const { inicio, fim } = getPeriodoFiltro();

        const dataCadastro = parseBackendDate(cert.created_at);

        if (!dataCadastro) return false;

        if (inicio && dataCadastro < inicio) return false;
        if (fim && dataCadastro > fim) return false;

        return true;
    }

    let categoriasDisponiveis = [];

    // =======================================================
    // 1. CARREGAMENTO DE DADOS INICIAIS (AGORA COM FILTROS NO BACKEND)
    // =======================================================

    async function fetchStudents() {
        studentListTbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Carregando alunos...</td></tr>';
        
        try {
            // === MONTAGEM DOS FILTROS PARA O BACKEND ===
            const filters = {
                tipo: 'ALUNO',
                search: document.getElementById('aluno').value.trim(),
                matricula: document.getElementById('matricula').value.trim(),
                fase: document.getElementById('fase').value
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

            // Busca contagem de certificados (mantida)
            try {
                const certResponse = await fetch(`${API_BASE_URL}/api/certificados`, {
                    headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
                });
                
                if (certResponse.ok) {
                    const certResult = await certResponse.json();
                    const certificados = certResult.data || certResult;
                    
                    const contagemPorAluno = {};
                    certificados.forEach(cert => {
                        const alunoId = cert.aluno ? cert.aluno.id : null;
                        if (alunoId) {
                            contagemPorAluno[alunoId] = (contagemPorAluno[alunoId] || 0) + 1;
                        }
                    });
                    
                    studentsData = studentsData.map(aluno => {
                        aluno.certificados_count = contagemPorAluno[aluno.id] || 0;
                        return aluno;
                    });
                }
            } catch (e) {
                console.warn('Não foi possível obter contagem de certificados', e);
            }

            allStudentsData = studentsData; // atualiza cache
            renderStudentsTable();

        } catch (error) {
            studentListTbody.innerHTML = `<tr><td colspan="4" style="color: var(--status-reprovado); text-align:center;">${error.message}</td></tr>`;
        }
    }

    // =======================================================
    // 2. RENDERIZAÇÃO (SEM FILTRO CLIENT-SIDE)
    // =======================================================

    function renderStudentsTable() {
        const studentsArray = allStudentsData || [];

        studentListTbody.innerHTML = '';

        if (studentsArray.length === 0) {
            const searchTerm = document.getElementById('aluno').value.trim();
            const matriculaTerm = document.getElementById('matricula').value.trim();
            const faseValue = document.getElementById('fase').value;

            let mensagem = 'Nenhum aluno cadastrado no momento.';
            
            if (searchTerm || matriculaTerm || faseValue) {
                mensagem = 'Nenhum aluno encontrado com estes filtros.';
            }

            studentListTbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 3rem 1rem;">${mensagem}</td></tr>`;
            return;
        }

        studentsArray.forEach(aluno => {
            const row = document.createElement('tr');
            row.className = 'student-row';
            row.style.cursor = 'pointer';
            
            const count = aluno.certificados_count || 0;
            const badgeClass = count > 0 ? 'status status-entregue' : 'status';
            const badgeStyle = count > 0 ? '' : 'color: #333; background: #eee;';
            
            row.innerHTML = `
                <td data-label="Nome do Aluno"><strong>${aluno.nome}</strong></td>
                <td data-label="Matrícula">${aluno.matricula || '--'}</td>
                <td data-label="Fase">${aluno.fase ? aluno.fase + 'ª Fase' : '--'}</td>
                <td data-label="Total de Solicitações">
                    <span class="${badgeClass}" style="${badgeStyle}">
                        ${count}
                    </span>
                </td>
            `;

            row.addEventListener('click', () => showDetailView(aluno.id, aluno.nome));
            studentListTbody.appendChild(row);
        });
    }

    // =======================================================
    // 3. VISTA DE DETALHES (HISTÓRICO INDIVIDUAL)
    // =======================================================

    async function showDetailView(studentId, studentName) {
        listView.style.display = 'none';
        detailView.style.display = 'block';
        document.getElementById('student-name-title').textContent = `Histórico de: ${studentName}`;
        accordionPlaceholder.innerHTML = '<p style="text-align:center; padding: 2rem;">Carregando histórico...</p>';

        // Elementos de progresso
        const progressBarFill = detailView.querySelector('.progress-bar-fill');
        const progressLabel = detailView.querySelector('.progress-label');
        const breakdownContainer = detailView.querySelector('#progress-breakdown');

        // Reset visual
        if (progressBarFill) progressBarFill.style.width = '0%';
        if (progressLabel) progressLabel.textContent = 'Carregando dados...';
        if (breakdownContainer) breakdownContainer.innerHTML = '';

        // Busca o progresso do aluno via API
        try {
            const progResponse = await fetch(`${API_BASE_URL}/api/usuarios/${studentId}/progresso`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (progResponse.ok) {
                const progressData = await progResponse.json();
                const totalRequired = progressData.horas_necessarias || 200;
                const totalCompleted = progressData.total_horas_aprovadas || 0;
                
                let percentage = Math.min((totalCompleted / totalRequired) * 100, 100);

                if (progressBarFill) progressBarFill.style.width = `${percentage}%`;
                if (progressLabel) progressLabel.textContent = `${totalCompleted} / ${totalRequired} Horas`;

                if (breakdownContainer && progressData.horas_por_categoria) {
                    for (const [categoria, horas] of Object.entries(progressData.horas_por_categoria)) {
                        let catPercentage = Math.min((horas / totalRequired) * 100, 100);
                        const areaHTML = `
                            <div class="area-progress" style="margin-bottom: 0;">
                                <div class="area-label" style="margin-bottom: 0.2rem; font-size: 1.2rem;">
                                    <span>${categoria}</span>
                                    <span>${horas}h (${catPercentage.toFixed(1)}%)</span>
                                </div>
                                <div class="mini-progress-bar" style="height: 0.4rem;">
                                    <div class="mini-progress-bar-fill" style="width: ${catPercentage}%;"></div>
                                </div>
                            </div>
                        `;
                        breakdownContainer.insertAdjacentHTML('beforeend', areaHTML);
                    }
                }
            }
        } catch (error) {
            console.error("Erro ao carregar progresso:", error);
            if (progressLabel) progressLabel.textContent = "Dados indisponíveis";
        }

        // Busca os certificados específicos do aluno
        try {
            const response = await fetch(`${API_BASE_URL}/api/certificados?aluno_id=${studentId}`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (!response.ok) throw new Error('Falha ao carregar o histórico.');
            
            const result = await response.json();
            const certificados = result.data || result;

            if (!Array.isArray(certificados) || certificados.length === 0) {
                accordionPlaceholder.innerHTML = '<p style="text-align:center; padding: 2rem;">Este aluno ainda não enviou certificados.</p>';
                return;
            }

            accordionPlaceholder.innerHTML = ''; 
            
            certificados.forEach(cert => {
                const statusInfo = getStatusInfo(cert.status);
                const filePath = cert.arquivo_url || cert.arquivo || cert.comprovante_url || '';
                const dataEnvio = new Date(cert.created_at).toLocaleDateString('pt-BR');
                
                const horasValue = cert.horas_validadas ?? cert.carga_horaria_solicitada;
                const obsValue = cert.observacao || '';

                // Monta as opções do Select de Categoria
                let categoriasOptions = '<option value="">Selecione...</option>';
                categoriasDisponiveis.forEach(cat => {
                    const selected = (cat.nome === cert.categoria) ? 'selected' : '';
                    categoriasOptions += `<option value="${cat.id}" ${selected}>${cat.nome}</option>`;
                });

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
                                <div class="detail-item"><span>Data Envio:</span> <span>${dataEnvio}</span></div>
                                <div class="detail-item"><span>Horas Solicitadas:</span> <span>${cert.carga_horaria_solicitada}</span></div>
                                <div class="detail-item"><span>Status Atual:</span> <span class="status ${statusInfo.className}">${statusInfo.text}</span></div>
                                
                                <div class="validation-panel" data-cert-id="${cert.id}">
                                    <h4 style="margin-top: 1.5rem; border-top: 1px dashed var(--glass-border); padding-top: 1rem; margin-bottom: 1.5rem;">Editar Dados e Avaliação</h4>
                                    <div class="form-grid">
                                        <div class="form-group">
                                            <label>Categoria</label>
                                            <select class="edit-categoria" style="padding: 1.2rem; background: var(--background-light); border: 1px solid var(--glass-border); border-radius: 0.8rem; color: #fff;">
                                                ${categoriasOptions}
                                            </select>
                                        </div>
                                        <div class="form-group"><label>Nome da Atividade</label><input type="text" class="edit-nome" value="${cert.nome_certificado}"></div>
                                        <div class="form-group"><label>Instituição</label><input type="text" class="edit-instituicao" value="${cert.instituicao}"></div>
                                        <div class="form-group"><label>Data de Emissão</label><input type="date" class="edit-data" value="${cert.data_emissao}"></div>
                                        <div class="form-group"><label>Horas Solicitadas</label><input type="number" class="edit-carga" value="${cert.carga_horaria_solicitada}" min="1"></div>
                                        <div class="form-group"><label>Horas Validadas</label><input type="number" class="horas-validadas" value="${horasValue}" min="0"></div>
                                        <div class="form-group full-width"><label>Observação / Feedback</label><textarea class="observacao" placeholder="Insira uma observação...">${obsValue}</textarea></div>
                                    </div>
                                    <div class="validation-actions">
                                        <button class="btn btn-danger btn-avaliar" data-action="REPROVADO"><i class="fas fa-times-circle"></i> Reprovar</button>
                                        <button class="btn btn-warning btn-avaliar" data-action="APROVADO_COM_RESSALVAS"><i class="fas fa-exclamation-triangle"></i> Ressalvas</button>
                                        <button class="btn btn-success btn-avaliar" data-action="APROVADO"><i class="fas fa-check-circle"></i> Aprovar</button>
                                    </div>
                                </div> 
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

            // Ativa acordeão global
            setupAccordion();
            carregarPreviewsPdf();

            // Ativa os botões de avaliação injetados
            document.querySelectorAll('.btn-avaliar').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const panel = button.closest('.validation-panel');
                    handleEvaluation(panel.dataset.certId, button.dataset.action, studentId, studentName);
                });
            });

        } catch (error) {
            accordionPlaceholder.innerHTML = `<p style="color: var(--status-reprovado); text-align:center;">${error.message}</p>`;
        }
    }



    // =======================================================
    // PREVIEW SEGURO DE PDF
    // Evita que aviso do ngrok ou erro do backend quebre o layout.
    // =======================================================
    async function carregarPreviewsPdf() {
        const previewAreas = document.querySelectorAll('.pdf-preview-area');

        for (const area of previewAreas) {
            const rawPath = area.dataset.filePath;

            if (!rawPath) {
                mostrarPreviewIndisponivel(area, 'Nenhum comprovante foi encontrado para esta atividade.');
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

                if (!response.ok) {
                    throw new Error('Arquivo indisponível.');
                }

                if (contentType.includes('text/html')) {
                    throw new Error('O servidor retornou uma página HTML em vez do PDF.');
                }

                const blob = await response.blob();
                const pdfBlob = new Blob([blob], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);

                area.innerHTML = `
                    <iframe
                        class="pdf-preview"
                        src="${pdfUrl}"
                        title="Pré-visualização do comprovante">
                    </iframe>

                    <a class="pdf-open-link" href="${pdfUrl}" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-up-right-from-square"></i>
                        Abrir comprovante em nova guia
                    </a>
                `;
            } catch (error) {
                console.warn('Erro ao carregar comprovante:', error);
                mostrarPreviewIndisponivel(
                    area,
                    'Não foi possível carregar o comprovante.'
                );
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
    // 4. AÇÕES DE AVALIAÇÃO (PATCH)
    // =======================================================

    async function handleEvaluation(certificateId, newStatus, studentId, studentName) {
        const panel = document.querySelector(`.validation-panel[data-cert-id="${certificateId}"]`);
        
        const payload = {
            status: newStatus,
            horas_validadas: parseInt(panel.querySelector('.horas-validadas').value) || 0,
            observacao: panel.querySelector('.observacao').value || '',
            categoria_id: parseInt(panel.querySelector('.edit-categoria').value) || null,
            nome_certificado: panel.querySelector('.edit-nome').value,
            instituicao: panel.querySelector('.edit-instituicao').value,
            data_emissao: panel.querySelector('.edit-data').value,
            carga_horaria_solicitada: parseInt(panel.querySelector('.edit-carga').value) || 0
        };

        if ((newStatus === 'REPROVADO' || newStatus === 'APROVADO_COM_RESSALVAS') && !payload.observacao.trim()) {
            showToast('Observação obrigatória para reprova ou ressalvas.', 'error');
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/certificados/${certificateId}/avaliar`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Erro ao salvar avaliação.');
            
            showToast('Histórico atualizado com sucesso!');
            showDetailView(studentId, studentName); // Recarrega os detalhes

        } catch (error) {
            showToast(error.message, 'error');
        }
    }
    
    // =======================================================
    // EVENTOS E INICIALIZAÇÃO
    // =======================================================

    // Botão Filtrar
    if (filterBtn) {
        filterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderStudentsTable();
        });
    }

    // Suporte ao Enter
    const filterInputsCoord = [
        document.getElementById('aluno'),
        document.getElementById('matricula'),
        document.getElementById('fase')
    ];

    filterInputsCoord.forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    renderStudentsTable();
                }
            });
        }
    });

    // Limpar Filtros
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            document.getElementById('aluno').value = '';
            document.getElementById('matricula').value = '';
            const faseSelect = document.getElementById('fase');
            if (faseSelect) faseSelect.value = '';
            
            const faseTrigger = document.querySelector('.custom-select-wrapper .custom-select-trigger span');
            if (faseTrigger) faseTrigger.textContent = 'Todas';
            
            renderStudentsTable();
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
        await fetchStudents();
        
        const faseWrapper = document.querySelector('.custom-select-wrapper');
        if (faseWrapper) setupCustomSelect(faseWrapper);
    })();
});
