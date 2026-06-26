// js/validar-horas.js

document.addEventListener('DOMContentLoaded', () => {

    const listView = document.getElementById('student-list-view');
    const detailView = document.getElementById('student-detail-view');
    const studentListTbody = document.getElementById('student-list-tbody');
    const backBtn = document.getElementById('back-to-list-btn');
    const accordionPlaceholder = document.getElementById('accordion-placeholder');
    
    // Seletores de Filtro
    const filterBtn = document.getElementById('filter-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const faseSelect = document.getElementById('fase');

    // Variável para guardar as categorias
    let categoriasDisponiveis = [];

    // =======================================================
    // 1. CARREGAMENTO DE DADOS INICIAIS
    // =======================================================

    async function fetchCategorias() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/categorias`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (response.ok) {
                const result = await response.json();
                categoriasDisponiveis = result.data || result;
            }
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
        }
    }

    // =======================================================
    // 2. LISTAGEM E AGRUPAMENTO DE SOLICITAÇÕES ENTREGUES
    // =======================================================

    async function fetchAndRenderStudents() {
        studentListTbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Buscando solicitações entregues...</td></tr>';
        
        try {
            // Busca certificados com status ENTREGUE (o backend já filtra pelo curso do coordenador)
            const response = await fetch(`${API_BASE_URL}/api/certificados?status=ENTREGUE`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            
            if (!response.ok) throw new Error('Falha ao buscar solicitações entregues.');

            const result = await response.json();
            const pendingCertificates = result.data || result;

            if (!Array.isArray(pendingCertificates) || pendingCertificates.length === 0) {
                studentListTbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Nenhuma solicitação entregue para validação no momento.</td></tr>';
                return;
            }

            // Agrupa os certificados por aluno para facilitar a gestão do Coordenador
            const studentsMap = {};
            pendingCertificates.forEach(cert => {
                const dadosAluno = cert.aluno || cert.requerente;
                if (dadosAluno) {
                    const studentId = dadosAluno.id;
                    if (!studentsMap[studentId]) {
                        studentsMap[studentId] = {
                            id: studentId,
                            nome: dadosAluno.nome,
                            matricula: dadosAluno.matricula,
                            fase: dadosAluno.fase ?? '',
                            pending_count: 0
                        };
                    }
                    studentsMap[studentId].pending_count++;
                }
            });

            let studentsArray = Object.values(studentsMap);

            // Aplicação dos Filtros Locais
            const filterNome = document.getElementById('aluno').value.toLowerCase().trim();
            const filterMatricula = document.getElementById('matricula').value.trim();
            const filterFase = faseSelect ? faseSelect.value : '';

            if (filterNome) studentsArray = studentsArray.filter(s => s.nome?.toLowerCase().includes(filterNome));
            if (filterMatricula) studentsArray = studentsArray.filter(s => String(s.matricula ?? '').includes(filterMatricula));
            if (filterFase) studentsArray = studentsArray.filter(s => String(s.fase ?? '') === filterFase);

            if (!studentsArray.length) {
                studentListTbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Nenhum aluno encontrado com estes filtros.</td></tr>';
                return;
            }

            studentListTbody.innerHTML = '';
            studentsArray.forEach(aluno => {
                const row = document.createElement('tr');
                row.className = 'student-row';
                row.style.cursor = 'pointer';
                row.innerHTML = `
                    <td data-label="Notificação">
                        <i class="fas fa-bell notification-bell" style="color:var(--status-ressalva)" title="Solicitação entregue para validação"></i>
                    </td>
                    <td data-label="Nome do Aluno"><strong>${aluno.nome}</strong></td>
                    <td data-label="Matrícula">${aluno.matricula}</td>
                    <td data-label="Fase">${aluno.fase || 'N/A'}</td>
                    <td data-label="Entregues para Validação">
                        <span class="status status-ressalva">${aluno.pending_count}</span>
                    </td>
                `;
                row.addEventListener('click', () => showDetailView(aluno.id, aluno.nome));
                studentListTbody.appendChild(row);
            });

        } catch (error) {
            studentListTbody.innerHTML = `<tr><td colspan="5" style="color: var(--status-reprovado); text-align:center;">${error.message}</td></tr>`;
        }
    }

    // =======================================================
    // 3. VISTA DE DETALHES E PAINEL DE VALIDAÇÃO
    // =======================================================

    async function showDetailView(studentId, studentName) {
        listView.style.display = 'none';
        detailView.style.display = 'block';
        document.getElementById('student-name-title').textContent = `Validar: ${studentName}`;
        accordionPlaceholder.innerHTML = '<p style="text-align:center; padding: 2rem;">Carregando certificados...</p>';

        const progressBarFill = detailView.querySelector('.progress-bar-fill');
        const progressLabel = detailView.querySelector('.progress-label');
        const breakdownContainer = detailView.querySelector('#progress-breakdown');

        // Reset visual do progresso
        if (progressBarFill) progressBarFill.style.width = '0%';
        if (progressLabel) progressLabel.textContent = 'Buscando progresso...';
        if (breakdownContainer) breakdownContainer.innerHTML = '';

        // Busca o progresso atual do aluno
        try {
            const progResponse = await fetch(`${API_BASE_URL}/api/usuarios/${studentId}/progresso`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (progResponse.ok) {
                const progressData = await progResponse.json();
                const totalReq = progressData.horas_necessarias || 200;
                const totalApp = progressData.total_horas_aprovadas || 0;
                let perc = Math.min((totalApp / totalReq) * 100, 100);

                if (progressBarFill) progressBarFill.style.width = `${perc}%`;
                if (progressLabel) progressLabel.textContent = `${totalApp} / ${totalReq} Horas`;

                if (breakdownContainer && progressData.horas_por_categoria) {
                    for (const [cat, hrs] of Object.entries(progressData.horas_por_categoria)) {
                        let cPerc = Math.min((hrs / totalReq) * 100, 100);
                        breakdownContainer.insertAdjacentHTML('beforeend', `
                            <div class="area-progress" style="margin-bottom: 0;">
                                <div class="area-label" style="font-size: 1.2rem;">
                                    <span>${cat}</span>
                                    <span>${hrs}h (${cPerc.toFixed(1)}%)</span>
                                </div>
                                <div class="mini-progress-bar" style="height: 0.4rem;">
                                    <div class="mini-progress-bar-fill" style="width: ${cPerc}%;"></div>
                                </div>
                            </div>`);
                    }
                }
            }
        } catch (e) { console.error("Erro ao carregar progresso:", e); }

        // Busca certificados pendentes do aluno específico
        try {
            const response = await fetch(`${API_BASE_URL}/api/certificados?aluno_id=${studentId}&status=ENTREGUE`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (!response.ok) throw new Error('Falha ao carregar certificados.');

            const result = await response.json();
            const certificados = result.data || result;

            accordionPlaceholder.innerHTML = '';

            if (!Array.isArray(certificados) || certificados.length === 0) {
                accordionPlaceholder.innerHTML = '<p style="text-align:center;">Não há mais solicitações entregues para validação deste aluno.</p>';
                return;
            }

            certificados.forEach(cert => {
                const statusInfo = getStatusInfo(cert.status);
                const fileUrl = formatFileUrl(cert.arquivo_url);
                const dataEnvio = new Date(cert.created_at).toLocaleDateString('pt-BR');
                
                const horasVal = cert.horas_validadas ?? cert.carga_horaria_solicitada;

                // Opções de categorias
                let catOptions = '<option value="">Selecione...</option>';
                categoriasDisponiveis.forEach(c => {
                    const sel = (c.nome === cert.categoria) ? 'selected' : '';
                    catOptions += `<option value="${c.id}" ${sel}>${c.nome}</option>`;
                });

                accordionPlaceholder.innerHTML += `
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
                                <div class="detail-item"><span>ID:</span> <span>${cert.id}</span></div>
                                <div class="detail-item"><span>Enviado em:</span> <span>${dataEnvio}</span></div>
                                <div class="detail-item"><span>Horas Solicitadas:</span> <span>${cert.carga_horaria_solicitada}h</span></div>
                                
                                <div class="validation-panel" data-cert-id="${cert.id}" style="margin-top:2rem; padding-top:2rem; border-top:1px dashed var(--glass-border);">
                                    <h4 style="margin-bottom: 1.5rem;">Avaliação do Certificado</h4>
                                    <div class="form-grid">
                                        <div class="form-group"><label>Categoria</label><select class="edit-categoria" style="padding:1.2rem; background:var(--background-light); border:1px solid var(--glass-border); border-radius:0.8rem; color:#fff;">${catOptions}</select></div>
                                        <div class="form-group"><label>Nome da Atividade</label><input type="text" class="edit-nome" value="${cert.nome_certificado}"></div>
                                        <div class="form-group"><label>Instituição</label><input type="text" class="edit-instituicao" value="${cert.instituicao}"></div>
                                        <div class="form-group"><label>Data Emissão</label><input type="date" class="edit-data" value="${cert.data_emissao}"></div>
                                        <div class="form-group"><label>Carga Horária</label><input type="number" class="edit-carga" value="${cert.carga_horaria_solicitada}"></div>
                                        <div class="form-group"><label>Horas Validadas</label><input type="number" class="horas-validadas" value="${horasVal}"></div>
                                        <div class="form-group full-width"><label>Justificativa / Feedback</label><textarea class="observacao" placeholder="Obrigatório para reprova ou ressalvas...">${cert.observacao || ''}</textarea></div>
                                    </div>
                                    <div class="validation-actions" style="display:flex; gap:1rem; justify-content:flex-end; margin-top:1.5rem;">
                                        <button class="btn btn-danger btn-avaliar" data-action="REPROVADO"><i class="fas fa-times-circle"></i> Reprovar</button>
                                        <button class="btn btn-warning btn-avaliar" data-action="APROVADO_COM_RESSALVAS"><i class="fas fa-exclamation-triangle"></i> Ressalvas</button>
                                        <button class="btn btn-success btn-avaliar" data-action="APROVADO"><i class="fas fa-check-circle"></i> Aprovar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="preview-section">
                                <h4>Comprovante</h4>
                                <embed class="pdf-preview" src="${fileUrl}" type="application/pdf" />
                            </div>
                        </div>
                    </div>
                </div>`;
            });

            setupAccordion();

            // Ativa eventos nos botões de avaliar injetados
            document.querySelectorAll('.btn-avaliar').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const p = btn.closest('.validation-panel');
                    handleEvaluation(p.dataset.certId, btn.dataset.action, studentId, studentName);
                });
            });

        } catch (error) {
            accordionPlaceholder.innerHTML = `<p style="color: var(--status-reprovado); text-align:center;">${error.message}</p>`;
        }
    }

    // =======================================================
    // 4. PROCESSAMENTO DA AVALIAÇÃO (PATCH)
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
            showToast('Justificativa obrigatória para esta ação.', 'error');
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

            if (!response.ok) throw new Error('Erro ao processar avaliação.');

            showToast('Avaliação concluída!');
            showDetailView(studentId, studentName); // Recarrega os detalhes

        } catch (error) {
            showToast(error.message, 'error');
        }
    }

    // =======================================================
    // 5. EVENTOS E INICIALIZAÇÃO
    // =======================================================

    if (filterBtn) filterBtn.addEventListener('click', (e) => { e.preventDefault(); fetchAndRenderStudents(); });

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            document.getElementById('aluno').value = '';
            document.getElementById('matricula').value = '';
            if (faseSelect) {
                faseSelect.value = '';
                // Atualiza UI do Select Customizado via Utils
                const triggerSpan = faseSelect.nextElementSibling?.querySelector('.custom-select-trigger span');
                if (triggerSpan) triggerSpan.textContent = 'Todas';
            }
            fetchAndRenderStudents();
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            detailView.style.display = 'none';
            listView.style.display = 'block';
            fetchAndRenderStudents();
        });
    }

    // Inicialização da página
    (async () => {
        await fetchCategorias();
        await fetchAndRenderStudents();
        
        // Inicializa o select customizado de Fase via Utils
        const faseWrapper = document.querySelector('.custom-select-wrapper');
        if (faseWrapper) setupCustomSelect(faseWrapper);
    })();
});
