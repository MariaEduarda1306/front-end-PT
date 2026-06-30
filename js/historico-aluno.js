// js/historico-aluno.js

document.addEventListener('DOMContentLoaded', async () => {
    
    const accordionContainer = document.getElementById('accordion-container');
    if (!accordionContainer) return;

    // Feedback inicial de carregamento
    accordionContainer.innerHTML = '<p>Carregando seu histórico...</p>';

    try {
        // 1. BUSCAR OS CERTIFICADOS NA API
        const response = await fetch(`${API_BASE_URL}/api/certificados`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!response.ok) {
            throw new Error('Não foi possível carregar seu histórico.');
        }

        const result = await response.json();
        const certificados = result.data || result;

        // 2. VERIFICAR SE EXISTEM DADOS
        if (certificados.length === 0) {
            accordionContainer.innerHTML = '<p>Você ainda não enviou nenhum certificado.</p>';
            return;
        }

        accordionContainer.innerHTML = ''; // Limpa a mensagem inicial

        // 3. RENDERIZAR CADA CERTIFICADO
        certificados.forEach(cert => {
            const statusInfo = getStatusInfo(cert.status);
            const filePath = cert.id ? `/api/certificados/${cert.id}/arquivo` : '';
            const dataEnvio = cert.created_at ? new Date(cert.created_at).toLocaleDateString('pt-BR') : '--/--/----';
            const categoriaTexto = cert.categoria ? cert.categoria.replace(/_/g, ' ') : 'Sem categoria';

            // --- LÓGICA NOVA: BOTÕES DE AÇÃO SOMENTE SE STATUS FOR 'ENTREGUE' ---
            let acoesHTML = '';

            if (cert.status === 'ENTREGUE') {
                acoesHTML = `
                    <div class="actions-section">
                        <button type="button" class="btn btn-secondary btn-edit-cert" data-id="${cert.id}">
                            <i class="fas fa-edit"></i>
                            Editar Envio
                        </button>

                        <button type="button" class="btn btn-danger btn-delete-cert" data-id="${cert.id}">
                            <i class="fas fa-trash"></i>
                            Cancelar Envio
                        </button>
                    </div>
                `;
            }
            // -------------------------------------------------------------------

            const accordionItemHTML = `
                <div class="accordion-item">
                    <button class="accordion-header">
                        <div class="header-title">
                            <h3>${cert.nome_certificado}</h3>
                            <p>ID do Requerimento: ${cert.id}</p>
                        </div>
                        <div class="header-status">
                            <span class="status ${statusInfo.className}">${statusInfo.text}</span>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </div>
                    </button>
                    <div class="accordion-content">
                        <div class="content-wrapper">
                            <div class="details-list">
                                <div class="detail-item"><span>Data de Envio:</span> <span>${dataEnvio}</span></div>
                                <div class="detail-item"><span>Categoria:</span> <span>${categoriaTexto}</span></div>
                                <div class="detail-item"><span>Horas Solicitadas:</span> <span>${cert.carga_horaria_solicitada}</span></div>
                                <div class="detail-item"><span>Horas Aprovadas:</span> <span>${cert.horas_validadas || '--'}</span></div>
                                <div class="detail-item"><span>Observação:</span> <span>${cert.observacao || 'Nenhuma observação.'}</span></div>
                            </div>
                            
                            ${acoesHTML} <div class="preview-section">
                                <h4>Pré-visualização do Comprovante</h4>
                                <div class="pdf-preview-area" data-file-path="${filePath}">
                                    <div class="pdf-preview-state">
                                        <i class="fas fa-spinner fa-spin"></i>
                                        <span>Carregando comprovante...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            accordionContainer.innerHTML += accordionItemHTML;
        });

        // 4. ATIVAR A FUNCIONALIDADE DE CLIQUE (ACORDEÃO) E PREVIEWS
        setupAccordion();
        carregarPreviewsPdf();
        configurarBotoesDeAcao(); // Inicia os ouvintes dos novos botões

    // =======================================================
    // FUNÇÕES DOS BOTÕES DE EDIÇÃO E EXCLUSÃO (ALUNO)
    // =======================================================
    function configurarBotoesDeAcao() {
        // Exclusão (Cancelar Envio)
        document.querySelectorAll('.btn-delete-cert').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const certId = e.currentTarget.dataset.id;
                
                if(confirm('Tem certeza que deseja cancelar e apagar este envio? Esta ação não pode ser desfeita.')) {
                    try {
                        const response = await fetch(`${API_BASE_URL}/api/certificados/${certId}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${authToken}`,
                                'Accept': 'application/json',
                                'ngrok-skip-browser-warning': 'true'
                            }
                        });

                        if (response.ok) {
                            if (typeof showToast === 'function') showToast('Envio cancelado com sucesso!');
                            else alert('Envio cancelado com sucesso!');
                            setTimeout(() => location.reload(), 1000); // Recarrega a página para atualizar a lista
                        } else {
                            const err = await response.json();
                            if (typeof showToast === 'function') showToast(err.message || 'Erro ao cancelar o envio.', 'error');
                            else alert(err.message || 'Erro ao cancelar o envio.');
                        }
                    } catch (error) {
                        console.error(error);
                        if (typeof showToast === 'function') showToast('Erro de conexão.', 'error');
                        else alert('Erro de conexão.');
                    }
                }
            });
        });

        // Edição
        document.querySelectorAll('.btn-edit-cert').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const certId = e.currentTarget.dataset.id;
                // Redireciona para o formulário de cadastro enviando o ID pela URL
                window.location.href = `cadastro-horas.html?edit=${certId}`;
            });
        });
    }

    // =======================================================
    // PREVIEW SEGURO DE PDF
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

    } catch (error) {
        accordionContainer.innerHTML = `<p style="color: var(--status-reprovado);">${error.message}</p>`;
        console.error('Erro ao carregar histórico:', error);
    }
});