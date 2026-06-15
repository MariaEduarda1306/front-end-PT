// js/utils.js

// =======================================================
// 1. CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
// =======================================================

/**
 * Define a URL base da API de forma dinâmica.
 *
 * Como usar com ngrok:
 * Abra uma vez:
 * index.html?api=https://SEU-LINK.ngrok-free.app
 *
 * Depois o link fica salvo no localStorage.
 */
const urlParams = new URLSearchParams(window.location.search);
const apiFromUrl = urlParams.get('api');

if (apiFromUrl) {
    localStorage.setItem('API_BASE_URL', apiFromUrl.replace(/\/$/, ''));
}

const API_BASE_URL =
    localStorage.getItem('API_BASE_URL') ||
    (
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === 'localhost'
            ? 'http://localhost:8000'
            : 'https://panoramic-figure-mushroom.ngrok-free.dev'
    );

const authToken = localStorage.getItem('authToken');
const loggedInUser = JSON.parse(localStorage.getItem('userData') || '{}');

/**
 * Verifica se o usuário possui um token. Caso contrário, redireciona para o login.
 */
function verificarAutenticacao() {
    if (!authToken) {
        const path = window.location.pathname;
        if (!path.endsWith('index.html') && path !== '/') {
            window.location.href = 'index.html';
        }
    }
}
verificarAutenticacao();

// =======================================================
// 2. TRATAMENTO DE DADOS E FORMATAÇÃO
// =======================================================

/**
 * Padroniza a URL dos arquivos (PDF/Imagens) vindos do servidor.
 */
function formatFileUrl(rawPath) {
    if (!rawPath) return '';

    if (rawPath.startsWith('http')) {
        try {
            const url = new URL(rawPath);
            const path = url.pathname;

            if (path.startsWith('/storage/')) {
                return `${API_BASE_URL}${path}`;
            }

            return rawPath;
        } catch (e) {
            return rawPath;
        }
    }

    let cleanPath = rawPath
        .replace(/^public\//, '')
        .replace(/^\/?storage\//, '');

    if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
    }

    return `${API_BASE_URL}/storage/${cleanPath}`;
}

/**
 * Mapeia o status do certificado para classes CSS e nomes amigáveis.
 */
function getStatusInfo(status) {
    switch (status) {
        case 'APROVADO':
            return { className: 'status-aprovado', text: 'Aprovado' };
        case 'REPROVADO':
            return { className: 'status-reprovado', text: 'Reprovado' };
        case 'APROVADO_COM_RESSALVAS':
            return { className: 'status-ressalva', text: 'Aprovado com Ressalvas' };
        case 'ENTREGUE':
        default:
            return { className: 'status-entregue', text: 'Entregue' };
    }
}

/**
 * Aplica máscara de CPF (000.000.000-00).
 */
function applyCpfMask(value) {
    value = value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
}

// =======================================================
// 3. INTERFACE E FEEDBACK VISUAL
// =======================================================

/**
 * Destaca campos com erro e adiciona animação de shake.
 */
function toggleError(element, hasError) {
    if (!element) return;

    let target = element;

    if (element.tagName === 'SELECT' && element.classList.contains('hidden-select')) {
        const wrapper = element.nextElementSibling;

        if (wrapper && wrapper.classList.contains('custom-select-wrapper')) {
            target = wrapper.querySelector('.custom-select-trigger') || wrapper;
        }
    } else if (element.classList.contains('file-upload-wrapper')) {
        target = element;
    }

    if (hasError) {
        target.classList.add('input-error', 'shake');
        setTimeout(() => target.classList.remove('shake'), 500);
    } else {
        target.classList.remove('input-error', 'shake');
    }
}

/**
 * Exibe notificações na tela.
 */
function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');

    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';

        try {
            toastContainer.popover = 'manual';
        } catch (e) {
            toastContainer.setAttribute('popover', 'manual');
        }

        document.body.appendChild(toastContainer);

        if (toastContainer.showPopover) {
            toastContainer.showPopover();
        }
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-times-circle';

    toast.innerHTML = `
        <i class="fas ${iconClass} toast-icon"></i>
        <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// =======================================================
// 4. COMPONENTES DE UI REUTILIZÁVEIS
// =======================================================

/**
 * Inicializa a funcionalidade de acordeão.
 */
function setupAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);

        newHeader.addEventListener('click', () => {
            newHeader.classList.toggle('active');

            const content = newHeader.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

/**
 * Configura dropdowns customizados.
 */
function setupCustomSelect(wrapper) {
    if (!wrapper) return;

    const trigger = wrapper.querySelector('.custom-select-trigger');
    const optionsContainer = wrapper.querySelector('.custom-options');
    const hiddenSelect = wrapper.previousElementSibling;

    if (!trigger || !optionsContainer || !hiddenSelect) return;

    const triggerSpan = trigger.querySelector('span');
    const customOptions = optionsContainer.querySelectorAll('.custom-option');

    if (!trigger.dataset.hasListener) {
        trigger.addEventListener('click', e => {
            e.stopPropagation();
            wrapper.classList.toggle('open');
        });

        trigger.dataset.hasListener = 'true';
    }

    customOptions.forEach(option => {
        if (option.dataset.hasListener) return;

        option.addEventListener('click', e => {
            e.stopPropagation();

            if (triggerSpan) {
                triggerSpan.textContent = option.textContent;
            }

            hiddenSelect.value = option.dataset.value;
            wrapper.classList.remove('open');
            hiddenSelect.dispatchEvent(new Event('change'));
        });

        option.dataset.hasListener = 'true';
    });
}

/**
 * Atualiza visualmente um select customizado.
 */
function updateCustomSelectUI(selectElement, value) {
    if (!selectElement) return;

    selectElement.value = value;

    const wrapper = selectElement.nextElementSibling;
    if (!wrapper || !wrapper.classList.contains('custom-select-wrapper')) return;

    const triggerSpan = wrapper.querySelector('.custom-select-trigger span');
    const option = wrapper.querySelector(`.custom-option[data-value="${value}"]`);

    if (triggerSpan) {
        triggerSpan.textContent = option ? option.textContent : 'Selecione...';
    }
}

/**
 * Gerencia a exibição do nome do arquivo em inputs de upload.
 */
function setupFileInputs() {
    document.querySelectorAll('.file-upload-wrapper').forEach(wrapper => {
        const fileInput = wrapper.querySelector('input[type="file"]');
        const fileUploadText = wrapper.querySelector('.file-upload-text');
        const fileNameSpan = wrapper.querySelector('#file-name');

        if (!fileInput) return;

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                const fileName = fileInput.files[0].name;

                if (fileUploadText) {
                    fileUploadText.style.display = 'none';
                }

                if (fileNameSpan) {
                    fileNameSpan.innerHTML = `
                        <span class="label">Arquivo selecionado:</span>
                        <span class="name">${fileName}</span>
                    `;
                }
            } else {
                if (fileUploadText) {
                    fileUploadText.style.display = 'block';
                }

                if (fileNameSpan) {
                    fileNameSpan.innerHTML = '';
                }
            }
        });
    });
}

/**
 * Configura o botão flutuante de ajuda baseado na página atual.
 */
function configurarAjudaContextual() {
    const path = decodeURI(window.location.pathname).toLowerCase();

    if (path.includes('manual.html') || path.includes('index.html') || path === '/') return;

    const helpBtn = document.createElement('a');
    helpBtn.className = 'floating-help-btn';
    helpBtn.innerHTML = '<i class="fas fa-question"></i>';
    helpBtn.title = 'Ajuda desta página';

    let anchor = '#comum';

    if (path.includes('cadastro de horas')) anchor = '#aluno-cadastrar';
    else if (path.includes('histórico aluno')) anchor = '#aluno-historico';
    else if (path.includes('validar horas')) anchor = '#coord-validar';
    else if (path.includes('histórico coordenador')) anchor = '#coord-historico';
    else if (path.includes('histórico secretaria')) anchor = '#secretaria-historico';
    else if (path.includes('gerenciar alunos')) anchor = '#secretaria-gerenciar';
    else if (path.includes('gerenciar usuarios')) anchor = '#admin-usuarios';
    else if (path.includes('configurações')) anchor = '#admin-config';
    else if (path.includes('dashboard alunos')) anchor = '#aluno-dashboard';
    else if (path.includes('dashboard coordenador')) anchor = '#coord-dashboard';
    else if (path.includes('dashboard secretaria')) anchor = '#secretaria-dashboard';
    else if (path.includes('dashboard administrador')) anchor = '#admin-dashboard';
    else if (path.includes('perfil')) anchor = '#perfil';

    helpBtn.href = `manual.html${anchor}`;
    document.body.appendChild(helpBtn);
}

// =======================================================
// 5. INICIALIZAÇÃO GLOBAL
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    setupFileInputs();
    configurarAjudaContextual();
});

document.addEventListener('click', e => {
    document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });
});
