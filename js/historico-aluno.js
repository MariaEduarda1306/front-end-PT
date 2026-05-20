// js/historico-aluno.js

document.addEventListener('DOMContentLoaded', async () => {
    
    const accordionContainer = document.getElementById('accordion-container');
    if (!accordionContainer) return;

    // Feedback inicial de carregamento
    accordionContainer.innerHTML = '<p>Carregando seu histórico...</p>';

    try {
        // 1. BUSCAR OS CERTIFICADOS NA API
        // Utiliza as variáveis globais API_BASE_URL e authToken definidas no utils.js
        const response = await fetch(`${API_BASE_URL}/api/certificados`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Não foi possível carregar seu histórico.');
        }

        const result = await response.json();
        // Suporte a resposta com ou sem paginação (wrapper 'data')
        const certificados = result.data || result;

        // 2. VERIFICAR SE EXISTEM DADOS
        if (certificados.length === 0) {
            accordionContainer.innerHTML = '<p>Você ainda não enviou nenhum certificado.</p>';
            return;
        }

        accordionContainer.innerHTML = ''; // Limpa a mensagem inicial

        // 3. RENDERIZAR CADA CERTIFICADO
        certificados.forEach(cert => {
            // Utiliza ferramentas globais do utils.js para mapear status e formatar URLs de arquivos
            const statusInfo = getStatusInfo(cert.status);
            const fileUrl = formatFileUrl(cert.arquivo_url);
            
            // Formata a data de criação para o padrão brasileiro
            const dataEnvio = cert.created_at ? new Date(cert.created_at).toLocaleDateString('pt-BR') : '--/--/----';

            // Tratamento visual para o texto da categoria
            const categoriaTexto = cert.categoria ? cert.categoria.replace(/_/g, ' ') : 'Sem categoria';

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
                            <div class="preview-section">
                                <h4>Pré-visualização do Comprovante</h4>
                                <embed class="pdf-preview" src="${fileUrl}" type="application/pdf" />
                            </div>
                        </div>
                    </div>
                </div>
            `;
            accordionContainer.innerHTML += accordionItemHTML;
        });

        // 4. ATIVAR A FUNCIONALIDADE DE CLIQUE (ACORDEÃO)
        // Chama a função global definida no utils.js
        setupAccordion();

    } catch (error) {
        accordionContainer.innerHTML = `<p style="color: var(--status-reprovado);">${error.message}</p>`;
        console.error('Erro ao carregar histórico:', error);
    }
});