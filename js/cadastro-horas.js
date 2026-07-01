// js/cadastro-horas.js

document.addEventListener('DOMContentLoaded', async () => {

    const form = document.getElementById('cadastro-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Captura o ID da URL se estiver em modo de edição
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');

    function getCertificateField(cert, ...keys) {
        for (const key of keys) {
            if (cert[key] !== undefined && cert[key] !== null) {
                return cert[key];
            }
        }

        return '';
    }

    function normalizeText(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase();
    }

    function setCategoriaValue(cert) {
        const catSelect = document.getElementById('categoria');
        const categoria = cert.categoria;
        const categoriaId = getCertificateField(
            cert,
            'categoria_id',
            'id_categoria',
            'category_id'
        );

        if (categoriaId) {
            catSelect.value = String(categoriaId);
        } else if (categoria && typeof categoria === 'object' && categoria.id) {
            catSelect.value = String(categoria.id);
        } else if (categoria) {
            const categoriaNome = typeof categoria === 'object'
                ? categoria.nome
                : categoria;
            const optionByName = [...catSelect.options].find(
                opt => normalizeText(opt.textContent) === normalizeText(categoriaNome)
            );

            if (optionByName) {
                catSelect.value = optionByName.value;
            }
        }

        const customWrapper = catSelect.nextElementSibling;
        const triggerSpan = customWrapper.querySelector('.custom-select-trigger span');

        customWrapper.querySelectorAll('.custom-option').forEach(opt => {
            if (opt.dataset.value == catSelect.value) {
                triggerSpan.textContent = opt.textContent;
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }

    function setDataEmissaoValue(cert) {
        const dataISO = getCertificateField(cert, 'data_emissao');
        const dataFormatada = getCertificateField(cert, 'data_emissao_formatada');

        if (dataISO) {
            document.getElementById('data_emissao').value = dataISO;

            if (/^\d{4}-\d{2}-\d{2}$/.test(dataISO)) {
                const [ano, mes, dia] = dataISO.split('-');
                document.getElementById('data_emissao_text').textContent = `${dia}/${mes}/${ano}`;
            } else {
                document.getElementById('data_emissao_text').textContent = dataFormatada || dataISO;
            }

            return;
        }

        if (dataFormatada) {
            const partes = dataFormatada.split('/');
            if (partes.length === 3) {
                const [dia, mes, ano] = partes;
                document.getElementById('data_emissao').value = `${ano}-${mes}-${dia}`;
            }

            document.getElementById('data_emissao_text').textContent = dataFormatada;
        }
    }

    function showArquivoAtual(cert) {
        if (!cert.id && !cert.arquivo_url) return;

        const fileWrapper = form.querySelector('.file-upload-wrapper');
        const fileGroup = fileWrapper.closest('.form-group') || fileWrapper.parentElement;
        const currentFile = document.createElement('p');
        currentFile.style.fontSize = '0.85rem';
        currentFile.style.color = 'var(--text-secondary)';
        currentFile.style.marginTop = '8px';

        const openButton = document.createElement('button');
        openButton.type = 'button';
        openButton.className = 'btn btn-secondary';
        openButton.style.marginTop = '6px';
        openButton.innerHTML = '<i class="fas fa-file-pdf"></i> Ver comprovante atual';

        openButton.addEventListener('click', async () => {
            openButton.disabled = true;
            const originalText = openButton.innerHTML;
            openButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abrindo...';

            try {
                const arquivoUrl = cert.id
                    ? `${API_BASE_URL}/api/certificados/${cert.id}/arquivo`
                    : cert.arquivo_url;
                const response = await fetch(arquivoUrl, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Accept': 'application/pdf',
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                if (!response.ok) {
                    throw new Error('Nao foi possivel abrir o comprovante atual.');
                }

                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                window.open(blobUrl, '_blank', 'noopener');
            } catch (error) {
                showToast(error.message, 'error');
            } finally {
                openButton.disabled = false;
                openButton.innerHTML = originalText;
            }
        });

        currentFile.innerHTML = '<i class="fas fa-paperclip"></i> Comprovante atual mantido no sistema.';
        fileGroup.appendChild(currentFile);
        fileGroup.appendChild(openButton);
    }

    // =======================================================
    // 1. BUSCAR CATEGORIAS DA API
    // =======================================================
    async function populateCategorias() {
        const select = document.getElementById('categoria');
        const customWrapper = select.nextElementSibling; 
        const customOptions = customWrapper.querySelector('.custom-options');
        const triggerSpan = customWrapper.querySelector('.custom-select-trigger span');

        try {
            const response = await fetch(`${API_BASE_URL}/api/categorias`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true'}
            });

            if (!response.ok) throw new Error('Falha ao carregar categorias.');

            const result = await response.json(); 
            const categorias = result.data || result;
            
            select.innerHTML = '<option value="">Selecione uma categoria...</option>';
            customOptions.innerHTML = '<div class="custom-option" data-value="">Selecione uma categoria...</div>';
            triggerSpan.textContent = 'Selecione uma categoria...';

            if (categorias.length === 0) {
                 triggerSpan.textContent = 'Nenhuma categoria disponível';
            }

            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id; 
                option.textContent = categoria.nome;
                select.appendChild(option);

                const customOption = document.createElement('div');
                customOption.classList.add('custom-option');
                customOption.dataset.value = categoria.id;
                customOption.textContent = categoria.nome;
                customOptions.appendChild(customOption);
            });

            setupCustomSelect(customWrapper);

        } catch (error) {
            console.error(error);
            triggerSpan.textContent = 'Erro ao carregar categorias';
            customOptions.innerHTML = '<div class="custom-option" data-value="">Erro de conexão</div>';
            setupCustomSelect(customWrapper); 
        }
    }

    // =======================================================
    // 1.5 CARREGAR DADOS PARA EDIÇÃO
    // =======================================================
    async function loadCertificateData(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/certificados/${id}`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });

            if (!response.ok) throw new Error('Falha ao carregar os dados do certificado.');

            const result = await response.json();
            const cert = result.data || result;

            // Preenche os campos aceitando pequenas variações no formato da API.
            document.getElementById('nome-atividade').value = getCertificateField(cert, 'nome_certificado', 'nome_atividade', 'nome');
            document.getElementById('instituicao').value = getCertificateField(cert, 'instituicao', 'instituição');
            document.getElementById('carga-horaria').value = getCertificateField(cert, 'carga_horaria_solicitada', 'carga_horaria', 'horas_solicitadas');
            setCategoriaValue(cert);
            setDataEmissaoValue(cert);

            // Avisa o usuário que o arquivo não é obrigatório na edição
            const fileWrapper = form.querySelector('.file-upload-wrapper');
            const fileHint = document.createElement('p');
            fileHint.style.fontSize = '0.85rem';
            fileHint.style.color = 'var(--text-secondary)';
            fileHint.style.marginTop = '10px';
            fileHint.innerHTML = '<i class="fas fa-info-circle"></i> Deixe o comprovante em branco para manter o arquivo atual.';
            const fileGroup = fileWrapper.closest('.form-group') || fileWrapper.parentElement;
            fileGroup.appendChild(fileHint);
            showArquivoAtual(cert);

        } catch (error) {
            showToast(error.message, 'error');
        }
    }

    // =======================================================
    // 2. LÓGICA DE ENVIO DO FORMULÁRIO PARA A API
    // =======================================================
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const originalButtonText = submitButton.innerHTML;
        
        const fields = {
            categoria: document.getElementById('categoria'),
            nome: document.getElementById('nome-atividade'),
            instituicao: document.getElementById('instituicao'),
            horas: document.getElementById('carga-horaria'),
            data: document.getElementById('data_emissao'),
            arquivo: document.getElementById('comprovante')
        };
        
        const fileWrapper = form.querySelector('.file-upload-wrapper');
        let hasError = false;

        if (!fields.categoria.value) { toggleError(fields.categoria, true); hasError = true; }
        if (!fields.nome.value.trim()) { toggleError(fields.nome, true); hasError = true; }
        if (!fields.instituicao.value.trim()) { toggleError(fields.instituicao, true); hasError = true; }
        if (!fields.horas.value || fields.horas.value <= 0) { toggleError(fields.horas, true); hasError = true; }
        
        const dateTrigger = document.querySelector('.date-picker-trigger');
        if (!fields.data.value) {
            toggleError(dateTrigger, true);
            hasError = true;
        }
        
        // O arquivo só é obrigatório se for um cadastro novo (não estiver editando)
        if (!editId && fields.arquivo.files.length === 0) {
            toggleError(fileWrapper, true);
            hasError = true;
        }

        if (hasError) {
            showToast('Por favor, preencha os campos destacados em vermelho.', 'error');
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';

        const formData = new FormData();
        
        // Truque do Laravel: Enviar arquivos via PUT exige method POST com _method=PUT no corpo
        if (editId) {
            formData.append('_method', 'PUT');
        }

        formData.append('categoria_id', fields.categoria.value);
        formData.append('nome_certificado', fields.nome.value);
        formData.append('instituicao', fields.instituicao.value);
        formData.append('carga_horaria_solicitada', fields.horas.value);
        formData.append('data_emissao', fields.data.value);  
        
        // Só anexa o arquivo se o usuário selecionou um novo
        if (fields.arquivo.files.length > 0) {
            formData.append('arquivo', fields.arquivo.files[0]);
        }

        const url = editId ? `${API_BASE_URL}/api/certificados/${editId}` : `${API_BASE_URL}/api/certificados`;

        try {
            const response = await fetch(url, {
                method: 'POST', // Mantemos POST pelo FormData, o Laravel lê o _method=PUT
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(await getApiErrorMessage(response, 'Ocorreu um erro ao salvar o certificado.'));
            }
            
            showToast(editId ? 'Certificado atualizado com sucesso!' : 'Certificado enviado com sucesso!');
            
            setTimeout(() => {
                window.location.href = 'historico-aluno.html';
            }, 1500);

        } catch (error) {
            showToast(error.message, 'error');
            console.error('Erro no envio:', error);
            
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });

    // =======================================================
    // 3. INICIALIZAÇÃO E LIMPEZA DE ESTADOS
    // =======================================================
    
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => toggleError(input, false));
        input.addEventListener('change', () => toggleError(input, false));
    });

    const categoriaWrapper = document.getElementById('categoria').nextElementSibling;
    if (categoriaWrapper) {
        categoriaWrapper.addEventListener('click', () => {
            const trigger = categoriaWrapper.querySelector('.custom-select-trigger');
            toggleError(trigger, false);
        });
    }
    
    const fileInputReal = document.getElementById('comprovante');
    const fileWrapper = form.querySelector('.file-upload-wrapper');
    if(fileInputReal) {
        fileInputReal.addEventListener('change', () => toggleError(fileWrapper, false));
    }

    function initDatePicker() {
        const wrapper = document.getElementById('data-emissao-picker');
        if (!wrapper) return;

        const hiddenInput = document.getElementById('data_emissao');
        const trigger = wrapper.querySelector('.date-picker-trigger');
        const text = document.getElementById('data_emissao_text');
        const calendar = wrapper.querySelector('.shc-calendar');
        const title = wrapper.querySelector('.shc-calendar-title');
        const daysContainer = wrapper.querySelector('.shc-calendar-days');
        const prevBtn = wrapper.querySelector('[data-action="prev"]');
        const nextBtn = wrapper.querySelector('[data-action="next"]');
        const todayBtn = wrapper.querySelector('.shc-calendar-today');
        const clearBtn = wrapper.querySelector('.shc-calendar-clear');

        const meses = [
            'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];

        const hoje = new Date();
        let mesAtual = hoje.getMonth();
        let anoAtual = hoje.getFullYear();

        function pad(valor) {
            return String(valor).padStart(2, '0');
        }

        function formatarISO(data) {
            return `${data.getFullYear()}-${pad(data.getMonth() + 1)}-${pad(data.getDate())}`;
        }

        function formatarBR(data) {
            return `${pad(data.getDate())}/${pad(data.getMonth() + 1)}/${data.getFullYear()}`;
        }

        function abrirCalendario() {
            calendar.hidden = false;
            renderizarCalendario();
        }

        function fecharCalendario() {
            calendar.hidden = true;
        }

        function renderizarCalendario() {
            title.textContent = `${meses[mesAtual]} de ${anoAtual}`;
            daysContainer.innerHTML = '';

            const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay();
            const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

            for (let i = 0; i < primeiroDiaSemana; i++) {
                const empty = document.createElement('span');
                empty.className = 'shc-calendar-empty';
                daysContainer.appendChild(empty);
            }

            for (let dia = 1; dia <= ultimoDiaMes; dia++) {
                const data = new Date(anoAtual, mesAtual, dia);
                const iso = formatarISO(data);

                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'shc-calendar-day';
                button.textContent = dia;

                const isToday =
                    data.getDate() === hoje.getDate() &&
                    data.getMonth() === hoje.getMonth() &&
                    data.getFullYear() === hoje.getFullYear();

                if (isToday) {
                    button.classList.add('is-today');
                }

                if (hiddenInput.value === iso) {
                    button.classList.add('is-selected');
                }

                button.addEventListener('click', () => {
                    hiddenInput.value = iso;
                    text.textContent = formatarBR(data);
                    toggleError(trigger, false);
                    fecharCalendario();
                });

                daysContainer.appendChild(button);
            }
        }

        trigger.addEventListener('click', () => {
            if (calendar.hidden) {
                abrirCalendario();
            } else {
                fecharCalendario();
            }
        });

        prevBtn.addEventListener('click', () => {
            mesAtual--;

            if (mesAtual < 0) {
                mesAtual = 11;
                anoAtual--;
            }

            renderizarCalendario();
        });

        nextBtn.addEventListener('click', () => {
            mesAtual++;

            if (mesAtual > 11) {
                mesAtual = 0;
                anoAtual++;
            }

            renderizarCalendario();
        });

        todayBtn.addEventListener('click', () => {
            const data = new Date();

            mesAtual = data.getMonth();
            anoAtual = data.getFullYear();

            hiddenInput.value = formatarISO(data);
            text.textContent = formatarBR(data);
            toggleError(trigger, false);
            fecharCalendario();
        });

        clearBtn.addEventListener('click', () => {
            hiddenInput.value = '';
            text.textContent = 'dd/mm/aaaa';
            renderizarCalendario();
        });

        document.addEventListener('click', (event) => {
            if (!wrapper.contains(event.target)) {
                fecharCalendario();
            }
        });
    }

    initDatePicker();
    
    // Executa a busca de categorias e, se for edição, carrega os dados logo em seguida
    await populateCategorias();
    
    if (editId) {
        // Altera visualmente a página para modo de edição
        const pageTitle = document.querySelector('.page-header h1') || document.querySelector('h1') || document.querySelector('h2');
        if (pageTitle) pageTitle.textContent = 'Editar Atividade';
        submitButton.innerHTML = '<i class="fas fa-save"></i> Salvar Alterações';
        
        await loadCertificateData(editId);
    }
});
