// js/cadastro-horas.js

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('cadastro-form');
    const submitButton = form.querySelector('button[type="submit"]');

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
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json' }
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
                // Adiciona ao select escondido (importante para o envio do form)
                const option = document.createElement('option');
                option.value = categoria.id; 
                option.textContent = categoria.nome;
                select.appendChild(option);

                // Adiciona ao menu visual (customizado)
                const customOption = document.createElement('div');
                customOption.classList.add('custom-option');
                customOption.dataset.value = categoria.id;
                customOption.textContent = categoria.nome;
                customOptions.appendChild(customOption);
            });

            // Inicializa a lógica do dropdown utilizando a função global do utils.js
            setupCustomSelect(customWrapper);

        } catch (error) {
            console.error(error);
            triggerSpan.textContent = 'Erro ao carregar categorias';
            customOptions.innerHTML = '<div class="custom-option" data-value="">Erro de conexão</div>';
            setupCustomSelect(customWrapper); 
        }
    }

    // =======================================================
    // 2. LÓGICA DE ENVIO DO FORMULÁRIO PARA A API
    // =======================================================
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const originalButtonText = submitButton.innerHTML;
        
        // Seleção dos elementos para validação
        const fields = {
            categoria: document.getElementById('categoria'),
            nome: document.getElementById('nome-atividade'),
            instituicao: document.getElementById('instituicao'),
            horas: document.getElementById('carga-horaria'),
            data: document.getElementById('data_emissao'),
            arquivo: document.getElementById('comprovante')
        };
        
        // Wrapper do arquivo para feedback de erro visual
        const fileWrapper = form.querySelector('.file-upload-wrapper');

        let hasError = false;

        // --- VALIDAÇÃO VISUAL UTILIZANDO UTILS ---
        
        // Valida campos de texto e selects
        if (!fields.categoria.value) { toggleError(fields.categoria, true); hasError = true; }
        if (!fields.nome.value.trim()) { toggleError(fields.nome, true); hasError = true; }
        if (!fields.instituicao.value.trim()) { toggleError(fields.instituicao, true); hasError = true; }
        if (!fields.horas.value || fields.horas.value <= 0) { toggleError(fields.horas, true); hasError = true; }
        if (!fields.data.value) { toggleError(fields.data, true); hasError = true; }
        
        // Valida arquivo utilizando o wrapper como alvo da borda vermelha
        if (fields.arquivo.files.length === 0) {
            toggleError(fileWrapper, true);
            hasError = true;
        }

        if (hasError) {
            showToast('Por favor, preencha os campos destacados em vermelho.', 'error');
            return;
        }
        // -----------------------------------------

        // Estado de Loading no botão
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        const formData = new FormData();
        formData.append('categoria_id', fields.categoria.value);
        formData.append('nome_certificado', fields.nome.value);
        formData.append('instituicao', fields.instituicao.value);
        formData.append('carga_horaria_solicitada', fields.horas.value);
        formData.append('data_emissao', fields.data.value);  
        formData.append('arquivo', fields.arquivo.files[0]);

        try {
            const response = await fetch(`${API_BASE_URL}/api/certificados`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json',
                },
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    const errors = result.errors || {};
                    let errorMessages = Object.values(errors).flat().join('\n');
                    throw new Error(errorMessages || result.message);
                }
                throw new Error(result.message || 'Ocorreu um erro ao enviar o certificado.');
            }
            
            showToast('Certificado enviado com sucesso!');
            
            // Redireciona após um curto delay para o usuário ver a confirmação
            setTimeout(() => {
                window.location.href = 'histórico aluno.html';
            }, 1500);

        } catch (error) {
            showToast(error.message, 'error');
            console.error('Erro no envio:', error);
            
            // Restaura o botão apenas em caso de erro
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });

    // =======================================================
    // 3. INICIALIZAÇÃO E LIMPEZA DE ESTADOS
    // =======================================================
    
    // Remove o erro visual assim que o usuário interage com o campo
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => toggleError(input, false));
        input.addEventListener('change', () => toggleError(input, false));
    });

    // Tratamento especial para o clique no seletor customizado (limpa o erro ao abrir)
    const categoriaWrapper = document.getElementById('categoria').nextElementSibling;
    if (categoriaWrapper) {
        categoriaWrapper.addEventListener('click', () => {
            const trigger = categoriaWrapper.querySelector('.custom-select-trigger');
            toggleError(trigger, false);
        });
    }
    
    // Tratamento especial para o wrapper de upload de arquivo
    const fileInputReal = document.getElementById('comprovante');
    const fileWrapper = form.querySelector('.file-upload-wrapper');
    if(fileInputReal) {
        fileInputReal.addEventListener('change', () => toggleError(fileWrapper, false));
    }

    // Carrega as categorias na inicialização
    populateCategorias();
});