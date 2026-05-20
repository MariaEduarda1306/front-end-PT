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
    let categoriasDisponiveis = [];

    // =======================================================
    // 1. CARREGAMENTO DE DADOS INICIAIS
    // =======================================================

    async function fetchCategorias() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/categorias`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json' }
            });
            if (response.ok) {
                const result = await response.json();
                categoriasDisponiveis = result.data || result;
            }
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
        }
    }

    async function fetchStudents() {
        studentListTbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Carregando alunos...</td></tr>';
        
        try {
            // Busca apenas alunos (o Coordenador vê apenas o seu curso via Backend)
            const response = await fetch(`${API_BASE_URL}/api/usuarios?tipo=ALUNO`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json' }
            });
            
            if (!response.ok) throw new Error('Falha ao carregar a lista de alunos.');
            
            const result = await response.json();
            allStudentsData = result.data || result;
            if (!Array.isArray(allStudentsData)) allStudentsData = [];

            // Busca certificados para processar a contagem de solicitações pendentes/enviadas
            try {
                const certResponse = await fetch(`${API_BASE_URL}/api/certificados`, {
                    headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json' }
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
                    
                    allStudentsData = allStudentsData.map(aluno => {
                        aluno.certificados_count = contagemPorAluno[aluno.id] || 0;
                        return aluno;
                    });
                }
            } catch (e) {
                console.warn('Não foi possível obter a contagem detalhada', e);
            }

            renderStudentsTable();

        } catch (error) {
            studentListTbody.innerHTML = `<tr><td colspan="4" style="color: var(--status-reprovado); text-align:center;">${error.message}</td></tr>`;
        }
    }

    // =======================================================
    // 2. FILTRAGEM E RENDERIZAÇÃO DA LISTA
    // =======================================================

    function renderStudentsTable() {
        const nomeFilter = document.getElementById('aluno').value.toLowerCase().trim();
        const matriculaFilter = document.getElementById('matricula').value.trim();
        const faseFilter = document.getElementById('fase').value;

        const filteredStudents = allStudentsData.filter(aluno => {
            const matchNome = !nomeFilter || (aluno.nome && aluno.nome.toLowerCase().includes(nomeFilter));
            const matchMatricula = !matriculaFilter || (String(aluno.matricula || '').includes(matriculaFilter));
            const matchFase = !faseFilter || (String(aluno.fase || '') === String(faseFilter));
            return matchNome && matchMatricula && matchFase;
        });

        studentListTbody.innerHTML = '';

        if (filteredStudents.length === 0) {
            studentListTbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Nenhum aluno encontrado.</td></tr>';
            return;
        }

        filteredStudents.forEach(aluno => {
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
                <td data-label="Solicitações">
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
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json' }
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
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json' }
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
                const fileUrl = formatFileUrl(cert.arquivo_url);
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
                                <embed class="pdf-preview" src="${fileUrl}" type="application/pdf" />
                            </div>
                        </div>
                    </div>
                </div>`;
                accordionPlaceholder.innerHTML += itemHTML;
            });

            // Ativa acordeão global
            setupAccordion();

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
                    'Content-Type': 'application/json'
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
    // 5. EVENTOS E INICIALIZAÇÃO
    // =======================================================

    if (filterBtn) filterBtn.addEventListener('click', (e) => { e.preventDefault(); renderStudentsTable(); });
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('aluno').value = '';
            document.getElementById('matricula').value = '';
            document.getElementById('fase').value = '';
            
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

    // Inicialização da página
    (async () => {
        await fetchCategorias();
        await fetchStudents();
        
        // Inicializa o dropdown de Fase usando Utils
        const faseWrapper = document.querySelector('.custom-select-wrapper');
        if (faseWrapper) setupCustomSelect(faseWrapper);
    })();
});