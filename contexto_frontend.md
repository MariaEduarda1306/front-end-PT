# Contexto do Projeto Frontend

Este arquivo contém a estrutura e o código-fonte principal do frontend do projeto.

## Arquivo: cadastro-horas.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Horas - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default">
    
    <!-- Componente de Header Injetado via JS -->
    <header id="app-header" data-back-url="dashboard-alunos.html"></header>

    <main class="main-container form-container">
        <div class="form-card">
            <h1 class="form-title">Cadastro de Horas</h1>
            <form id="cadastro-form" novalidate>

                <div class="form-group">
                    <label for="categoria">Categoria da Atividade</label>
                    <select id="categoria" name="categoria" class="hidden-select">
                        <option value="">Carregando categorias...</option>
                    </select>
                    <div class="custom-select-wrapper">
                        <div class="custom-select-trigger">
                            <span>Carregando categorias...</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="custom-options">
                            <div class="custom-option" data-value="">Carregando categorias...</div>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="nome-atividade">Nome da Atividade</label>
                    <input type="text" id="nome-atividade" name="nome-atividade" required>
                </div>

                <div class="form-group">
                    <label for="instituicao">Instituição</label>
                    <input type="text" id="instituicao" name="instituicao" required>
                </div>

                <div class="form-group">
                    <label for="carga-horaria">Carga Horária Solicitada</label>
                    <input type="number" id="carga-horaria" name="carga-horaria" required min="1" placeholder="Ex: 20">
                </div>

                <div class="form-group">
                    <label for="data_emissao">Data de Emissão do Certificado</label>

                    <div class="date-picker-wrapper" id="data-emissao-picker">
                        <input type="hidden" id="data_emissao" name="data_emissao">

                        <button type="button" class="date-picker-trigger">
                            <i class="fas fa-calendar-days" aria-hidden="true"></i>
                            <span id="data_emissao_text">dd/mm/aaaa</span>
                        </button>

                        <div class="shc-calendar" hidden>
                            <div class="shc-calendar-header">
                                <button type="button" class="shc-calendar-nav" data-action="prev">
                                    <i class="fas fa-chevron-left"></i>
                                </button>

                                <button type="button" class="shc-calendar-title">
                                    <span class="shc-calendar-month-label"></span>
                                    <span class="shc-calendar-year-label"></span>
                                </button>

                                <button type="button" class="shc-calendar-nav" data-action="next">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>

                            <div class="shc-calendar-weekdays">
                                <span>D</span>
                                <span>S</span>
                                <span>T</span>
                                <span>Q</span>
                                <span>Q</span>
                                <span>S</span>
                                <span>S</span>
                            </div>

                            <div class="shc-calendar-days"></div>

                            <div class="shc-calendar-footer">
                                <button type="button" class="shc-calendar-clear">Limpar</button>
                                <button type="button" class="shc-calendar-today">Hoje</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Upload do Comprovante</label>
                    <label for="comprovante" class="file-upload-wrapper">
                        <input type="file" id="comprovante" name="comprovante" accept=".pdf" required>
                        <span class="file-upload-text">
                            <i class="fas fa-upload"></i>
                            Clique para escolher o arquivo (somente .pdf)
                        </span>
                        <span id="file-name"></span>
                    </label>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="window.location.href='dashboard-alunos.html'">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </div>
            </form>
        </div>
    </main>

    <script src="js/utils.js"></script>
    <script src="js/components.js"></script>
    <script src="js/cadastro-horas.js"></script>

</body>
</html>
```

## Arquivo: configuracoes-sistema.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistemas de Horas Complementares - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-admin">
    
    <!-- Componente de Header Injetado via JS -->
    <header id="app-header" data-back-url="dashboard-administrador.html"></header>
    
    <main class="main-container">
        <h1 class="page-title"><i class="fas fa-cogs"></i> Configurações do Sistema</h1>

        <section class="settings-card" style="margin-bottom: 4rem;">
            <div class="page-header" style="margin-bottom: 2rem;">
                <h2 style="margin: 0;">Gerenciar Cursos</h2>
                <button id="btn-add-course" class="btn btn-primary"><i class="fas fa-plus"></i> Novo Curso</button>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome do Curso</th>
                            <th>Horas Necessárias</th>
                            <th class="action-cell">Ações</th>
                        </tr>
                    </thead>
                    <tbody id="courses-table-body">
                        </tbody>
                </table>
            </div>
        </section>

        <section class="settings-card">
            <div class="page-header" style="margin-bottom: 2rem;">
                <h2 style="margin: 0;">Gerenciar Categorias</h2>
                <button id="btn-add-category" class="btn btn-primary"><i class="fas fa-plus"></i> Nova Categoria</button>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome da Categoria</th>
                            <th class="action-cell">Ações</th>
                        </tr>
                    </thead>
                    <tbody id="categories-table-body">
                        </tbody>
                </table>
            </div>
        </section>

        <section class="settings-card" style="margin-top: 4rem;">
            <h3>Parâmetros Globais</h3>
            <div class="form-grid" style="margin-bottom: 3rem;">
                <div class="form-group">
                    <label for="horas-minimas">Horas Mínimas Padrão</label>
                    <input type="number" id="horas-minimas" placeholder="Ex: 200" min="1">
                </div>
                <div class="form-group">
                    <label for="modo-manutencao">Modo de Manutenção (Bloqueia novos envios)</label>
                    <select id="modo-manutencao" class="hidden-select">
                        <option value="false">Desativado (Funcionamento Normal)</option>
                        <option value="true">Ativado (Envios Suspensos)</option>
                    </select>
                    <div class="custom-select-wrapper">
                        <div class="custom-select-trigger">
                            <span>Desativado (Funcionamento Normal)</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="custom-options">
                            <div class="custom-option" data-value="false">Desativado (Funcionamento Normal)</div>
                            <div class="custom-option" data-value="true">Ativado (Envios Suspensos)</div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 style="border-top: 1px solid var(--glass-border); padding-top: 2rem;">Integrações Externas</h3>
            <div class="form-group">
                <label for="api-url">URL da API</label>
                <input type="text" id="api-url" placeholder="https://api.instituicao.com/v1/alunos">
            </div>
            <div class="form-group">
                <label for="api-key">Chave da API (API Key)</label>
                <input type="password" id="api-key" placeholder="**************">
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 15px; margin-top: 20px; flex-wrap: wrap;">
                <button id="btn-export-certs" class="btn btn-primary">
                    <i class="fas fa-file-export"></i> Enviar Certificados (API)
                </button>

                <button id="btn-run-import" class="btn btn-secondary">
                    <i class="fas fa-file-import"></i> Importar Usuários
                </button>

                <button id="save-integrations-btn" class="btn btn-secondary">
                    <i class="fas fa-save"></i> Salvar Configurações
                </button>
            </div>
        </section>
    </main>

    <dialog id="course-modal">
        <div class="modal-header">
            <h2 id="course-modal-title" class="modal-title">Adicionar Curso</h2>
            <button class="close-btn" title="Fechar">&times;</button>
        </div>
        <form id="course-form" novalidate>
            <input type="hidden" id="course-id">
            <div class="form-grid">
                <div class="form-group full-width">
                    <label for="course-name">Nome do Curso</label>
                    <input type="text" id="course-name" required placeholder="Ex: Engenharia de Software">
                </div>
                <div class="form-group full-width">
                    <label for="course-hours">Horas Necessárias</label>
                    <input type="number" id="course-hours" required placeholder="Ex: 200">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary close-btn">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
        </form>
    </dialog>

    <dialog id="category-modal">
        <div class="modal-header">
            <h2 id="category-modal-title" class="modal-title">Adicionar Categoria</h2>
            <button class="close-btn" title="Fechar">&times;</button>
        </div>
        <form id="category-form" novalidate>
            <input type="hidden" id="category-id">
            <div class="form-grid">
                <div class="form-group full-width">
                    <label for="category-name">Nome da Categoria</label>
                    <input type="text" id="category-name" required placeholder="Ex: Palestra, Estágio, Monitoria...">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary close-btn">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
        </form>
    </dialog>

    <dialog id="delete-modal">
        <div class="modal-header">
            <h2 class="modal-title">Confirmar Exclusão</h2>
            <button class="close-btn" title="Fechar">&times;</button>
        </div>
        <p>Tem certeza que deseja remover <strong id="delete-item-name"></strong>?</p>
        <p style="font-size: 1.4rem; color: var(--status-reprovado);">Esta ação não pode ser desfeita e pode afetar alunos vinculados.</p>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary close-btn">Cancelar</button>
            <button id="confirm-delete-btn" class="btn btn-danger">Confirmar Exclusão</button>
        </div>
    </dialog>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header) -->
    <script src="js/components.js"></script>
    <script src="js/configuracoes.js"></script>
</body>
</html>
```

## Arquivo: css\base.css
```css
/* ==========================================================================
   base.css: Reset básico, variáveis globais e temas.
   ========================================================================== */

   :root {
    /* Cores de Fundo e Texto */
    --background-dark: #0f172a;
    --background-light: #1e293b;
    --text-primary: #e2e8f0;
    --text-secondary: #94a3b8;

    /* Estilos "Glass" */
    --glass-bg: rgba(30, 41, 59, 0.7);
    --glass-bg-light: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);

    /* Cores de Status */
    --status-aprovado: #2ecc71;
    --status-reprovado: #e74c3c;
    --status-entregue: #3498db;
    --status-ressalva: #e67e22;
    
    /* Cores de Papéis (Roles) */
    --role-aluno: #3498db;
    --role-coord: #9b59b6;
    --role-secret: #e67e22;
    --role-admin: #e74c3c;
}

/* Tema Padrão */
.theme-default {
    --primary-glow: #00aaff;
    --primary-glow-transparent: rgba(0, 170, 255, 0.1);
    --primary-gradient: linear-gradient(45deg, var(--primary-glow), #8e44ad);
}

/* Tema Administrador */
.theme-admin {
    --primary-glow: #e74c3c;
    --primary-glow-transparent: rgba(231, 76, 60, 0.1);
    --primary-gradient: linear-gradient(45deg, var(--primary-glow), #f39c12);
}

/* Define a base para que 1rem = 10px */
html {
    font-size: 62.5%;
    scroll-behavior: smooth;
}

body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: var(--background-dark);
    color: var(--text-primary);
    min-height: 100vh;
    font-size: 1.6rem; /* Padrão 16px */
    line-height: 1.6;
}

.dotted-background {
    background-image: radial-gradient(circle at 1% 1%, var(--background-light) 1px, transparent 1px),
                      radial-gradient(circle at 99% 99%, var(--background-light) 1px, transparent 1px);

}
```

## Arquivo: css\components.css
```css
/* ==========================================================================
   components.css: Botões, tabelas, modais, cards, etc.
   ========================================================================== */

/* --- Cabeçalho (Header) --- */
.header,
#app-header {
    min-height: 8.1rem;
    box-sizing: border-box;
    padding: 1.5rem 2rem;
    display: grid;
    grid-template-columns: minmax(12rem, 1fr) auto minmax(12rem, 1fr);
    align-items: center;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--glass-border);
    position: sticky;
    top: 0;
    z-index: 1000;
    overflow-x: hidden;
    gap: 1.5rem;
}

@media (min-width: 768px) {
    #app-header {
        min-height: 9.1rem;
        padding: 2rem 4rem;
    }
}

.header > :first-child {
    justify-self: start;
}

.header .logo { 
    grid-column: 2;
    justify-self: center;
    font-weight: 600; 
    font-size: 1.8rem; 
    white-space: nowrap;
    min-width: 0;
}

.header > :last-child {
    justify-self: end;
}

.header-spacer {
    width: 12rem;
    height: 1px;
}

.header .logo img.header-logo {
    height: 5rem; 
    width: auto; 
    vertical-align: middle;
}

.header .logout-btn {
    text-decoration: none;
    color: var(--text-secondary);
    transition: color 0.3s ease;
    font-size: 1.4rem;
    white-space: nowrap;
    flex-shrink: 0;
}
.header .logout-btn:hover { color: var(--primary-glow); }
.logout-btn i { margin-right: 0.8rem; }

.login-img-logo-wrapper {
    text-align: center;
    margin: 0 auto 1.5rem auto;
}

/* Estiliza a imagem do logo */
.login-img-logo-wrapper .login-logo {
    height: 12rem; 
    width: auto; 
    display: inline-block;
}

/* --- Títulos de Página --- */
.page-title, .dashboard-title { font-weight: 600; margin: 0 0 3rem 0; }

.page-title {
    display: block; 
    font-size: clamp(2rem, 5vw, 2.4rem);
    font-weight: 600;
    margin: 0 0 3rem 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.page-title i {
    margin-right: 1.5rem;
    color: var(--primary-glow);
    vertical-align: middle;
    position: relative;
    top: -0.1em;
}

.form-title {
    font-size: 2.4rem;
    font-weight: 600;
    margin: 0 0 3rem 0;
    text-align: center;
}

/* --- Botões e Links --- */
.btn {
    padding: 1rem 2rem; border: none; border-radius: 0.8rem;
    cursor: pointer; font-weight: 600; font-size: 1.5rem;
    transition: all 0.3s ease; text-decoration: none;
    display: inline-flex; align-items: center; justify-content: center;
    gap: 0.8rem;
}
.btn-primary { background-color: var(--primary-glow); color: #fff; }
.btn-primary:hover { box-shadow: 0 0 15px var(--primary-glow); }
.btn-secondary { background-color: var(--background-light); color: var(--text-secondary); }
.btn-secondary:hover { background-color: var(--glass-border); }
.btn-success { background-color: var(--status-aprovado); color: #fff; }
.btn-danger { background-color: var(--status-reprovado); color: #fff; }
.btn-warning { background-color: var(--status-ressalva); color: #fff; }
.action-btn {
    background: none; border: none; color: var(--text-secondary); cursor: pointer;
    font-size: 1.8rem; margin: 0 0.8rem; transition: color 0.3s ease;
}
.action-btn:hover { color: var(--primary-glow); }
.action-btn.delete:hover { color: var(--status-reprovado); }

/* --- Filtros e Formulários --- */
.filter-bar, .form-card, .settings-card {
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    border-radius: 1.6rem; padding: 2.5rem; margin-bottom: 3rem;
}

/* Base flexível para a barra de filtros */
.filter-bar {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    align-items: stretch;
}

/* Base para os grupos de filtro */
.filter-group {
    display: flex;
    flex-direction: column;
    flex: 1 1 150px;
}

/* Base para os botões */
.filter-buttons {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    flex: 1 1 auto;
}

.filter-buttons .btn {
    height: 4.7rem;
}

/* ----- ESTILOS GERAIS DE FORMULÁRIO (Unificados) ----- */
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
}

.filter-group label, .form-group label {
    font-size: 1.4rem; margin-bottom: 0.8rem; color: var(--text-secondary);
}

.filter-group input, .filter-group select,
.form-group input, .form-group select, .form-group textarea {
    width: 100%;
    background-color: var(--background-light);
    border: 1px solid var(--glass-border);
    border-radius: 0.8rem;
    color: var(--text-primary);
    padding: 1.2rem;
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    box-sizing: border-box;
    min-width: 0; 
    height: 4.7rem;
    position: relative;
    color-scheme: dark;
    accent-color: var(--primary-glow);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group textarea { min-height: 10rem; resize: vertical; }
.input-wrapper input { padding-left: 4.5rem; }

.input-wrapper #password {
    padding-right: 4.5rem;
}

input[type="date"]:valid,
input[type="date"]:valid::-webkit-datetime-edit-text,
input[type="date"]:valid::-webkit-datetime-edit-month-field,
input[type="date"]:valid::-webkit-datetime-edit-day-field,
input[type="date"]:valid::-webkit-datetime-edit-year-field {
    color: var(--text-primary);
}

input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

/* Classe para destacar o input com erro */
.input-error {
    border-color: var(--status-reprovado) !important;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
}

.shake {
    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
}

/* --- Tabelas --- */
.table-container {
    background: var(--glass-bg); border: 1px solid var(--glass-border);
    border-radius: 1.6rem; overflow-x: auto;
}
table { width: 100%; border-collapse: collapse; text-align: left; }
th, td { padding: 1.5rem 2rem; vertical-align: middle; }
thead { background-color: var(--primary-glow-transparent); }
th { font-weight: 600; white-space: nowrap; }
tbody tr { border-bottom: 1px solid var(--glass-border); }
tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background-color: var(--primary-glow-transparent); }
.action-cell { text-align: right; }
.details-cell { white-space: normal; max-width: 40rem; }

/* --- Dashboard Cards --- */
.options-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 3rem;
}
.option-card {
    background: var(--glass-bg-light);
    border: 1px solid var(--glass-border);
    border-radius: 1.6rem;
    padding: 3rem;
    text-align: center;
    backdrop-filter: blur(10px);
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    text-decoration: none;
    color: inherit;
}

.option-card:hover {
    transform: translateY(-0.4rem);
    border-color: var(--primary-glow);
    box-shadow: 0 0 14px rgba(56, 189, 248, 0.22);
}
.option-card .icon {
    font-size: 4em; margin-bottom: 2rem; background: var(--primary-gradient);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.option-card h3 { margin: 1rem 0 0.5rem 0; font-size: 2rem; font-weight: 600; }
.option-card p { margin: 0; font-size: 1.4rem; color: var(--text-secondary); }

/* --- Acordeão --- */
.accordion-item {
    margin-bottom: 1.5rem; background: var(--glass-bg);
    border: 1px solid var(--glass-border); border-radius: 1.2rem; overflow: hidden;
}
.accordion-header {
    width: 100%; background: none; border: none; padding: 2rem;
    display: flex; align-items: center; justify-content: space-between;
    cursor: pointer; color: var(--text-primary); text-align: left; gap: 2rem;
}
.accordion-header .header-title {
    min-width: 0;
    margin-right: 1.5rem;}
.accordion-header .header-status {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-shrink: 1;
}
.accordion-header h3 { 
    margin: 0;
    font-size: 1.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;}
    
.accordion-header:hover { background-color: var(--primary-glow-transparent); }
.accordion-header.active .accordion-icon { transform: rotate(180deg); }
.accordion-icon { transition: transform 0.4s ease; }
.accordion-content {
    max-height: 0; overflow: hidden; transition: max-height 0.5s ease-out;
    background-color: rgba(15, 23, 42, 0.5); padding: 0 2rem;
}
.content-wrapper { padding: 2rem 0; display: grid; grid-template-columns: 1fr; gap: 3rem; }
.details-list .detail-item {
    display: flex; justify-content: space-between; padding: 1rem 0;
    border-bottom: 1px solid var(--glass-border); flex-wrap: wrap; gap: 1rem;
}
.details-list .detail-item:last-child { border-bottom: none; }
.pdf-preview { width: 100%; height: 40rem; border-radius: 0.8rem; border: 1px solid var(--glass-border); }

/* --- Modais (Dialog) --- */
dialog {
    width: 100%;                          
    max-width: 60rem;                     
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    color: var(--text-primary);
    border-radius: 1.6rem;
    padding: 2.5rem;                     
    box-sizing: border-box;
}
dialog::backdrop { background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(5px); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.modal-title { font-size: 2.2rem; font-weight: 600; }
.close-btn { background: none; border: none; color: var(--text-secondary); font-size: 2.4rem; cursor: pointer; }
.form-group.hidden { display: none; }
.modal-footer { display: flex; flex-direction: column-reverse; gap: 1.5rem; margin-top: 6rem; }
.modal-footer .btn {min-width: 12rem; justify-content: center; flex-grow: 0; font-size: 1.5rem;}
.hidden { display: none !important;}
.modal-error-message { width: 100%; margin: 1rem 0 1.5rem 0; padding: 1rem 1.2rem; border-radius: 0.8rem; border: 1px solid rgba(255, 80, 80, 0.45); background: rgba(255, 80, 80, 0.12); color: #ffb3b3; font-size: 1.35rem; line-height: 1.5;}
/* --- Ajuste específico do modal de alteração de senha --- */
.password-modal { width: min(54rem, calc(100vw - 3rem)); max-width: 54rem; max-height: calc(100vh - 4rem); overflow-y: auto; padding: 2.5rem; z-index: 9999;}
.password-modal::backdrop { background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px);}
.password-modal .modal-footer { display: flex; flex-direction: row; justify-content: flex-end; gap: 1.2rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);}
.password-modal .modal-footer .btn { flex-grow: 0;  min-width: 12rem;}
.password-modal-error { width: 100%; margin: 1rem 0 1.5rem 0; padding: 1rem 1.2rem; border-radius: 0.8rem; border: 1px solid rgba(255, 80, 80, 0.55); background: rgba(255, 80, 80, 0.14); color: #ffb3b3; font-size: 1.35rem; line-height: 1.5;}
@media (max-width: 600px) {
    .password-modal .modal-footer {
        flex-direction: column-reverse;
    }

    .password-modal .modal-footer .btn {
        width: 100%;
    }
}

/* --- Badges --- */
.status, .role-badge { padding: 0.5rem 1.2rem; border-radius: 1.2rem; font-weight: 600; font-size: 1.2rem; }
.status-aprovado { background-color: var(--status-aprovado); color: #fff; }
.status-reprovado { background-color: var(--status-reprovado); color: #fff; }
.status-entregue { background-color: var(--status-entregue); color: #fff; }
.status-ressalva { background-color: var(--status-ressalva); color: #fff; text-align: center; }
.role-aluno { background-color: var(--role-aluno); color: #fff; }
.role-coord { background-color: var(--role-coord); color: #fff; }
.role-secret { background-color: var(--role-secret); color: #fff; }
.role-admin { background-color: var(--role-admin); color: #fff; }

/* --- Componente de Login --- */
.login-card {
    width: 100%; max-width: 48rem; background: var(--glass-bg);
    border: 1px solid var(--glass-border); border-radius: 1.6rem;
    padding: 4rem; backdrop-filter: blur(10px); text-align: center; overflow: hidden;
}
.form-wrapper { transition: opacity 0.4s ease, transform 0.4s ease; }
.form-wrapper.hidden { opacity: 0; transform: scale(0.95); display: none; }
.logo-header { font-size: 3.2rem; font-weight: 600; margin-bottom: 1rem; }
.logo-header span { font-weight: 300; color: var(--primary-glow); }
.login-title { font-size: 1.8rem; color: var(--text-secondary); margin-bottom: 4rem; }
#login-form .form-group {margin-bottom: 1.5rem;}
.input-wrapper { position: relative; }
.input-wrapper i.prefix-icon { position: absolute; left: 1.5rem; top: 50%; transform: translateY(-50%); z-index: 2; width: 1.8rem; text-align: center; font-size: 1.35rem; color: rgba(148, 163, 184, 0.38); pointer-events: none; transition: color 0.25s ease, opacity 0.25s ease;}
.password-toggle { position: absolute; right: 1.5rem; top: 50%; transform: translateY(-50%); z-index: 2; cursor: pointer; font-size: 1.45rem; color: rgba(148, 163, 184, 0.48); transition: color 0.25s ease, opacity 0.25s ease;}
.input-wrapper:focus-within i.prefix-icon { color: rgba(0, 170, 255, 0.52);}
.input-wrapper:focus-within .password-toggle { color: rgba(0, 170, 255, 0.62);}
.btn-full { width: 100%; padding: 1.4rem; border: none; border-radius: 0.8rem; cursor: pointer; font-weight: 600; font-size: 1.6rem; transition: all 0.3s ease; background-color: var(--primary-glow); color: #fff; margin-top: 1rem;}
.btn-full:hover { box-shadow: 0 0 15px var(--primary-glow); }
.link-action { display: block; margin-top: 2rem; color: var(--text-secondary); text-decoration: none; font-size: 1.2rem; cursor: pointer;}
.link-action:hover { color: var(--primary-glow); text-decoration: underline; }
.confirmation-message { text-align: center; }
.confirmation-message i { font-size: 4.8rem; color: var(--primary-glow); margin-bottom: 2rem; }

/* Link discreto para primeiro acesso */
#first-access-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;

    width: auto;
    max-width: 100%;
    margin: 1.6rem auto 0 auto;
    padding: 0.8rem 1.2rem;

    background-color: transparent;
    border: 1px solid rgba(56, 189, 248, 0.28);
    border-radius: 999px;

    color: var(--text-secondary);
    font-size: 1.25rem;
    line-height: 1.4;
    text-decoration: none;

    transition:
        color 0.3s ease,
        border-color 0.3s ease,
        background-color 0.3s ease;
}

#first-access-link i {
    flex-shrink: 0;
    color: var(--primary-glow);
    font-size: 1.3rem;
    opacity: 0.85;
}

#first-access-link strong {
    color: var(--primary-glow);
    font-weight: 600;
}

#first-access-link:hover {
    color: var(--text-primary);
    text-decoration: none;
    border-color: rgba(56, 189, 248, 0.55);
    background-color: rgba(56, 189, 248, 0.06);
}

/* Diminui o espaço do link de recuperação de senha */
#forgot-password-link {
    margin-top: 1.5rem;
}

/* --- Componente de Perfil --- */
.profile-card {
    width: 100%; background: var(--glass-bg); border: 1px solid var(--glass-border);
    border-radius: 1.6rem; padding: 2.5rem; backdrop-filter: blur(10px); text-align: center;
    box-sizing: border-box;
}
.profile-avatar-wrapper {
    position: relative; 
    width: 12rem; 
    height: 12rem; 
    margin: 0 auto 2rem auto;
    border-radius: 50%; 
    background-color: var(--background-light);
    border: 3px solid var(--glass-border); 
    display: flex;
    justify-content: center; 
    align-items: center; 
    cursor: pointer;
    /* Apagamos o overflow: hidden daqui! */
}

#profile-avatar { 
    width: 100%; 
    height: 100%; 
    border-radius: 50%; 
    object-fit: cover; 
    display: block; 
}

#default-avatar-icon { font-size: 6.4rem; color: var(--primary-glow); }
.profile-avatar-wrapper.has-photo #default-avatar-icon { display: none; }
.profile-avatar-wrapper:not(.has-photo) #profile-avatar { display: none; }
.avatar-edit-overlay {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.5); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 2.4rem; opacity: 0; pointer-events: none;
    transition: opacity 0.3s ease;
}
.profile-avatar-wrapper:hover .avatar-edit-overlay { opacity: 1; }
#avatar-input { display: none; }
.avatar-menu {
    position: absolute; bottom: -5rem; left: 50%; transform: translateX(-50%);
    background-color: var(--background-light); border: 1px solid var(--glass-border);
    border-radius: 0.8rem; overflow: hidden; display: none; z-index: 20;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.avatar-menu button {
    display: block; width: 100%; padding: 1rem 1.5rem; background: none;
    border: none; border-bottom: 1px solid var(--glass-border);
    color: var(--text-primary); cursor: pointer; text-align: left; white-space: nowrap;
}
.avatar-menu button:last-child { border-bottom: none; }
.avatar-menu button:hover { background-color: var(--primary-glow); }
.avatar-menu button i { margin-right: 1rem; width: 1.2em; }
.profile-name { font-size: 2.8rem; font-weight: 600; margin: 0; }
.profile-email { font-size: 1.6rem; color: var(--text-secondary); margin: 0.5rem 0 3rem 0; font-size: clamp(1.2rem, 4vw, 1.6rem); white-space: nowrap; }
.profile-details { text-align: left; margin-bottom: 3rem; }
.detail-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.5rem 0; border-bottom: 1px solid var(--glass-border);
    flex-wrap: wrap; gap: 1.5rem;
}
.detail-item:last-child { border-bottom: none; }
.detail-item .label { color: var(--text-secondary); }
.detail-item .value { font-weight: 600; text-align: left; font-size: clamp(1.2rem, 3.5vw, 1.6rem); white-space: nowrap; }
.summary-section { text-align: left; margin-bottom: 3rem; }
.summary-section h3 {
    font-size: 1.8rem; font-weight: 600; color: var(--text-secondary);
    margin: 0 0 1.5rem 0; border-top: 1px solid var(--glass-border); padding-top: 3rem;
}
.summary-stats {
    display: flex; flex-direction: column; gap: 1.5rem; justify-content: space-around;
}
.stat-card {
    background-color: var(--background-light); border-radius: 0.8rem;
    padding: 1.5rem; text-align: center; flex-grow: 1;
}
.stat-card .value { font-size: 2.8rem; font-weight: 600; color: var(--primary-glow); }
.stat-card .label { font-size: 1.2rem; color: var(--text-secondary); text-transform: uppercase; }
.progress-section { text-align: left; margin-bottom: 3rem; }
.progress-section > h3 {
    font-size: 1.8rem; font-weight: 600; color: var(--text-secondary);
    margin: 0 0 1.5rem 0;
}
.progress-bar {
    width: 100%; height: 2rem; background-color: var(--background-light);
    border-radius: 1rem; overflow: hidden; border: 1px solid var(--glass-border);
}
.progress-bar-fill {
    height: 100%; background: linear-gradient(90deg, var(--primary-glow), #3498db);
    border-radius: 1rem;
}
.progress-label { text-align: right; margin-top: 0.5rem; font-size: 1.4rem; color: var(--text-secondary); }
.progress-breakdown { margin-top: 2rem; display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
.area-progress .area-label { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 1.4rem; }
.mini-progress-bar { width: 100%; height: 0.8rem; background-color: var(--background-light); border-radius: 0.4rem; overflow: hidden; }
.mini-progress-bar-fill { height: 100%; background-color: var(--primary-glow); border-radius: 0.4rem; }

#first-access-modal .modal-content-body {
    text-align: center;
}

#first-access-modal .modal-icon {
    font-size: 4rem;
    color: var(--primary-glow);
    margin-bottom: 2rem;
}

#first-access-modal p {
    color: var(--text-secondary);
    font-size: 1.5rem;
    line-height: 1.6;
    margin-bottom: 2.5rem;
}

.instruction-box {
    text-align: left;
    margin-bottom: 2rem;
}

.instruction-box label {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 0.8rem;
    display: block;
}

.credential-info {
    background-color: var(--background-light);
    border: 1px solid var(--glass-border);
    border-radius: 0.8rem;
    padding: 1.2rem 1.5rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--text-primary);
}

.hidden-select {
    display: none;
}

.custom-select-wrapper {
    position: relative;
    cursor: pointer;
    width: 100%;
    display: block; 
    margin-bottom: 0.5rem;
}

.custom-select-trigger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 4.7rem;
    padding: 0 1.2rem;
    background-color: var(--background-light);
    border: 1px solid var(--glass-border);
    border-radius: 0.8rem;
    color: var(--text-primary);
    font-size: 1.6rem;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s ease;
}

.custom-select-trigger i {
    transition: transform 0.3s ease;
}

#password-reset-modal .modal-content-body p {
    text-align: center;
    color: var(--text-secondary);
    font-size: 1.5rem;
    line-height: 1.6;
    margin-bottom: 2.5rem;
}

#password-reset-modal .instruction-box label {
    text-align: center;
    color: var(--primary-glow);
    margin-bottom: 1rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-size: 1.2rem;
}

#password-reset-modal .credential-info {
    background-color: transparent;
    border: 1px dashed var(--glass-border);
    text-align: center;
    font-weight: 400;
    color: var(--text-primary);
    font-size: 1.4rem;
    line-height: 1.5;
    padding: 1.5rem 2rem;
}

#password-reset-modal .credential-info:hover {
    border-color: var(--primary-glow);
    transition: border-color 0.3s ease;
}

.custom-options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: 100%;
    box-sizing: border-box;
    background: var(--background-light);
    border: 1px solid var(--glass-border);
    border-top: none;
    border-bottom-left-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
    z-index: 10000;
    max-height: 200px;
    overflow-y: auto;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

.custom-select-wrapper.open .custom-options {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.custom-select-wrapper.open .custom-select-trigger i {
    transform: rotate(180deg);
}

.custom-option {
    padding: 1.2rem;
    transition: background-color 0.3s ease;
}

.custom-option:hover {
    background-color: var(--primary-glow-transparent);
}

.custom-option.selected {
    background-color: var(--primary-glow);
    color: #fff;
}

.file-upload-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border: 2px dashed var(--glass-border);
    border-radius: 0.8rem;
    background-color: var(--background-light);
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    min-height: 10rem;
}

.file-upload-wrapper:hover {
    background-color: var(--primary-glow-transparent);
    border-color: var(--primary-glow);
}

.file-upload-wrapper input[type="file"] {
    display: none;
}

.file-upload-text {
    color: var(--text-secondary);
    font-size: 1.4rem;
    pointer-events: none;
}

.file-upload-text i {
    display: block;
    font-size: 2.4rem;
    margin-bottom: 1rem;
    color: var(--primary-glow);
}

#file-name {
    font-size: 1.4rem;
    color: var(--text-primary);
    overflow-wrap: break-word;
    width: 100%;
}

#file-name .label {
    color: var(--text-secondary);
    display: block;
    margin-bottom: 0.5rem;
}

#file-name .name {
    font-weight: 600;
}


.filter-group select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 0.8rem; 
    border: 1px solid var(--glass-border);
    background-color: var(--background-light);
    color: var(--text-primary);
    width: 100%;
    height: 4.7rem;
    padding: 0 1.2rem;
    padding-right: 4.5rem;
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    cursor: pointer;
    outline: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1.5rem center;
    background-size: 1.6rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.filter-group select:focus {
    border-color: var(--primary-glow);
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.1);
}

.filter-group select option {
    background-color: #0f172a;
    color: #fff;
    padding: 12px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px var(--background-light) inset !important;
    -webkit-text-fill-color: var(--text-primary) !important;
    transition: background-color 5000s ease-in-out 0s;
}

/* --- Botão Flutuante de Ajuda (FAB) - Muito Discreto --- */
.floating-help-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3.5rem;   /* Tamanho reduzido */
    height: 3.5rem;  /* Tamanho reduzido */
    background: rgba(56, 189, 248, 0.1); /* Super discreto/transparente */
    color: rgba(255, 255, 255, 0.4);     /* Ícone mais apagado */
    border: 1px solid rgba(56, 189, 248, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem; /* Ícone menor */
    backdrop-filter: blur(5px); 
    -webkit-backdrop-filter: blur(5px);
    cursor: pointer;
    z-index: 9999;
    transition: all 0.3s ease;
    text-decoration: none;
}

/* Acende com cor sólida e brilha no hover */
.floating-help-btn:hover {
    transform: scale(1.1);
    background: rgba(56, 189, 248, 0.8);
    color: #fff;
    border-color: rgba(56, 189, 248, 1);
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
}

@media (max-width: 600px) {
    .floating-help-btn {
        bottom: 1.5rem;
        right: 1.5rem;
        width: 3rem;
        height: 3rem;
        font-size: 1.2rem;
    }
}

/* --- Correção da Rolagem de Âncoras (Para não ficar sob o header) --- */
.manual-section, .accordion-item {
    scroll-margin-top: 12rem; /* Dá espaço para o cabeçalho não cobrir o título */
}

/* Notificações (Toasts) */

#toast-container {
    /* Posicionamento e Camada (Movido do JS para cá) */
    position: fixed;
    z-index: 2147483647; 
    
    /* Layout Flex para empilhar mensagens */
    display: flex;
    flex-direction: column;
    gap: 1rem;
    pointer-events: none; 
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    overflow: visible;
    width: auto;
    height: auto;
    inset: auto;
    right: 2rem;
    top: 9rem;
}

.toast {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 0.8rem;
    padding: 1.5rem 2rem;
    min-width: 250px;
    max-width: 350px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    animation: slideInRight 0.5s ease-out forwards, fadeOut 0.5s ease-in 4.5s forwards;
    pointer-events: auto; 
    color: var(--text-primary);
}

.toast-icon {
    font-size: 2rem;
}

.toast.success .toast-icon { color: var(--status-aprovado); }
.toast.error .toast-icon { color: var(--status-reprovado); }

.toast-message {
    font-size: 1.5rem;
    color: var(--text-primary);
    flex: 1; 
    word-break: break-word; 
    overflow-wrap: break-word; 
    min-width: 0;
}

/* Barra de filtros do histórico - garantir quebra limpa em telas médias */
@media (max-width: 1200px) {
    #filter-form {
        flex-wrap: wrap;
    }

    #filter-form .filter-group {
        flex: 1 1 200px;
        min-width: 0;
    }

    #filter-form .filter-buttons {
        flex: 0 0 100%;
        justify-content: flex-end;
    }
}

@media (max-width: 900px) {
    #filter-form {
        flex-direction: column;
        align-items: stretch;
    }

    #filter-form .filter-group,
    #filter-form .filter-buttons {
        flex: 1 1 auto;
        width: 100%;
    }

    #filter-form .filter-buttons {
        justify-content: flex-start;
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
        transform: translateY(-20px);
    }

}

html {
    scrollbar-gutter: stable;
}

body {
    overflow-y: scroll;
}

.main-container,
.dashboard-container,
.form-container,
.profile-container {
    opacity: 1;
    transform: none;
    animation: none;
}

/* --- Preview seguro de comprovantes PDF --- */
.pdf-preview-area {
    width: 100%;
    min-height: 32rem;
    border-radius: 0.8rem;
    border: 1px solid var(--glass-border);
    background: var(--background-light);
    overflow: hidden;
}

.pdf-preview {
    width: 100%;
    height: 32rem;
    border: none;
    display: block;
    background: #ffffff;
}

.pdf-preview-state,
.pdf-preview-unavailable {
    min-height: 32rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;
    color: var(--text-secondary);
    gap: 1rem;
}

.pdf-preview-state i,
.pdf-preview-unavailable i {
    font-size: 3rem;
    color: var(--primary-glow);
}

.pdf-preview-unavailable strong {
    color: var(--text-primary);
    font-size: 1.6rem;
}

.pdf-preview-unavailable span {
    max-width: 34rem;
    font-size: 1.35rem;
    line-height: 1.5;
}

.pdf-open-link {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;

    margin-top: 1rem;
    color: var(--primary-glow);
    font-size: 1.35rem;
    text-decoration: none;
}

.pdf-open-link:hover {
    text-decoration: underline;
}

/* --- Calendário customizado SHC --- */

.date-picker-wrapper {
    position: relative;
    width: 100%;
}

.date-picker-trigger {
    width: 100%;
    height: 4.7rem;
    padding: 0 1.2rem;
    padding-left: 4.5rem;

    display: flex;
    align-items: center;
    gap: 1rem;

    background-color: var(--background-light);
    border: 1px solid var(--glass-border);
    border-radius: 0.8rem;

    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    text-align: left;

    cursor: pointer;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.date-picker-trigger i {
    position: absolute;
    left: 1.5rem;
    color: var(--primary-glow);
    font-size: 1.6rem;
}

.date-picker-trigger:hover,
.date-picker-trigger:focus {
    border-color: var(--primary-glow);
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.1);
    outline: none;
}

.date-picker-trigger.input-error {
    border-color: var(--status-reprovado) !important;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
}

.shc-calendar {
    position: absolute;
    top: calc(100% + 0.8rem);
    left: 0;
    z-index: 20000;

    width: min(31rem, 100%);
    max-width: 100%;
    box-sizing: border-box;
    padding: 1.4rem;

    background: rgba(15, 23, 42, 0.98);
    border: 1px solid var(--glass-border);
    border-radius: 1.2rem;
    box-shadow: 0 1.2rem 3rem rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(12px);
}

.shc-calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.2rem;
}

.shc-calendar-title {
    border: none;
    background: transparent;
    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    font-size: 1.35rem;
    font-weight: 600;
    text-transform: capitalize;
    cursor: pointer;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;

    padding: 0.6rem 1rem;
    border-radius: 0.8rem;
    transition: background-color 0.25s ease, color 0.25s ease;
}

.shc-calendar-title:hover {
    background: var(--primary-glow-transparent);
    color: var(--primary-glow);
}

.shc-calendar-year-label {
    color: var(--primary-glow);
}

.shc-calendar-nav {
    width: 3.2rem;
    height: 3.2rem;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 0.8rem;
    background: var(--background-light);
    color: var(--text-secondary);
    cursor: pointer;

    transition: background-color 0.25s ease, color 0.25s ease;
}

.shc-calendar-nav:hover {
    background: var(--primary-glow-transparent);
    color: var(--primary-glow);
}

.shc-calendar-weekdays,
.shc-calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.4rem;
}

.shc-calendar-weekdays {
    margin-bottom: 0.6rem;
}

.shc-calendar-weekdays span {
    text-align: center;
    font-size: 1.15rem;
    color: var(--text-secondary);
    font-weight: 600;
}

.shc-calendar-day,
.shc-calendar-empty {
    height: 3.4rem;
}

.shc-calendar-day {
    border: none;
    border-radius: 0.8rem;
    background: transparent;
    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    font-size: 1.3rem;
    cursor: pointer;

    transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.shc-calendar-day:hover {
    background: var(--primary-glow-transparent);
    color: var(--primary-glow);
}

.shc-calendar-day.is-today {
    border: 1px solid rgba(56, 189, 248, 0.45);
}

.shc-calendar-day.is-selected {
    background: var(--primary-glow);
    color: #ffffff;
    font-weight: 600;
}

.shc-calendar-footer {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1.2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--glass-border);
}

.shc-calendar-clear,
.shc-calendar-today {
    border: none;
    background: transparent;
    color: var(--primary-glow);
    font-family: 'Poppins', sans-serif;
    font-size: 1.25rem;
    cursor: pointer;
}

.shc-calendar-clear:hover,
.shc-calendar-today:hover {
    text-decoration: underline;
}

@media (max-width: 480px) {
    .shc-calendar {
        width: 100%;
        padding: 1.2rem;
        left: 0;
        right: 0;
        width: 100%;
        max-width: 100%;
    }

    .date-picker-trigger {
        font-size: 1.45rem;
    }

    .shc-year-picker {
        grid-template-columns: repeat(3, 1fr);
        max-height: 16rem;
    }

    .shc-calendar-title {
        font-size: 1.2rem;
        padding: 0.5rem 0.8rem;
    }

    .shc-calendar-header {
        gap: 0.6rem;
        margin-bottom: 1rem;
    }

    .shc-calendar-title {
        font-size: 1.2rem;
        text-align: center;
    }

    .shc-calendar-nav {
        width: 3rem;
        height: 3rem;
        flex-shrink: 0;
    }

    .shc-calendar-weekdays,
    .shc-calendar-days {
        gap: 0.25rem;
    }

    .shc-calendar-day,
    .shc-calendar-empty {
        height: 3rem;
    }

    .shc-calendar-day {
        font-size: 1.2rem;
        border-radius: 0.6rem;
    }

    .shc-calendar-footer {
        margin-top: 1rem;
    }

    .shc-calendar-clear,
    .shc-calendar-today {
        font-size: 1.2rem;
    }
}

.shc-year-picker {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.6rem;

    max-height: 18rem;
    overflow-y: auto;

    padding: 0.4rem 0 1rem 0;
    margin-bottom: 1rem;

    border-bottom: 1px solid var(--glass-border);
}

.shc-year-option {
    height: 3.2rem;

    border: none;
    border-radius: 0.8rem;
    background: transparent;

    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    font-size: 1.25rem;

    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.shc-year-option:hover {
    background: var(--primary-glow-transparent);
    color: var(--primary-glow);
}

.shc-year-option.is-selected {
    background: var(--primary-glow);
    color: #ffffff;
    font-weight: 600;
}

/* =========================================================
   Ajuste específico: Histórico do Aluno
   ========================================================= */

.historico-aluno-page .content-wrapper {
    align-items: start;
}

.historico-aluno-page .details-list {
    min-width: 0;
}

.historico-aluno-page .actions-section {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;

    margin: 0;
    padding: 0;
    border-top: none;

    align-self: start;
}

.historico-aluno-page .actions-section .btn {
    height: auto;
    min-height: 4.4rem;
    width: auto;

    padding: 1rem 1.4rem;
    border-radius: 0.8rem;

    align-self: flex-start;
    white-space: nowrap;
    flex: 0 0 auto;
}

.historico-aluno-page .preview-section {
    min-width: 0;
    margin-top: 0;
}

.historico-aluno-page .pdf-preview-area {
    width: 100%;
}

.historico-aluno-page .pdf-preview {
    display: block;
    width: 100%;
    height: 36rem;
    border-radius: 0.8rem;
}

.historico-aluno-page .pdf-open-link {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 0.8rem;

    color: var(--primary-glow);
    font-size: 1.3rem;
    text-decoration: none;
}

.historico-aluno-page .pdf-open-link:hover {
    text-decoration: underline;
}

@media (min-width: 768px) {
    .historico-aluno-page .content-wrapper {
        grid-template-columns: minmax(28rem, 1fr) minmax(36rem, 1fr);
        grid-template-areas:
            "details preview"
            "actions preview";
        gap: 2.4rem 3rem;
    }

    .historico-aluno-page .details-list {
        grid-area: details;
    }

    .historico-aluno-page .actions-section {
        grid-area: actions;
    }

    .historico-aluno-page .preview-section {
        grid-area: preview;
    }
}

@media (max-width: 767px) {
    .historico-aluno-page .actions-section {
        flex-direction: column;
        width: 100%;
    }

    .historico-aluno-page .actions-section .btn {
        width: 100%;
    }

    .historico-aluno-page .pdf-preview {
        height: 32rem;
    }
}
```

## Arquivo: css\layout.css
```css
/* ==========================================================================
   layout.css: Layout geral, containers e espaçamento.
   ========================================================================== */

.main-container,
.dashboard-container,
.form-container,
.profile-container {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem;
    box-sizing: border-box;
}

.dashboard-container {
    max-width: 1200px;
}

.form-container {
    max-width: 800px;
}

.profile-container {
    max-width: 900px;
}

.page-header {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
    margin-bottom: 3rem;
}

/* Layout específico da página de login */
.layout-login {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    min-height: 100vh;
    box-sizing: border-box;
}

/* Grid para formulários */
.form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}

.form-group.full-width {
    grid-column: 1 / -1;
}
```

## Arquivo: css\responsive.css
```css
/* ==========================================================================
   responsive.css: Abordagem Mobile-First + adaptação para notebooks e 4K
   ========================================================================== */

/* === BASE MOBILE: celulares e telas pequenas === */

.main-container,
.dashboard-container,
.form-container,
.profile-container {
    padding: clamp(1.6rem, 5vw, 2.4rem);
}

.header,
#app-header {
    padding: 1.5rem 2rem;
}

.header .logo,
#app-header .logo {
    font-size: 1.8rem;
}

.header .logo img.header-logo,
#app-header .logo img.header-logo {
    height: 4.5rem;
}

.page-header,
.modal-footer,
.detail-item {
    flex-direction: column;
}

.detail-item {
    align-items: flex-start;
    gap: 0.5rem;
}

/* Cards do dashboard em mobile */
.options-grid {
    grid-template-columns: 1fr;
    gap: 1.8rem;
}

.option-card {
    padding: 2.4rem;
}

/* Tabela responsiva em formato de card */
.table-container {
    background: none;
    border: none;
}

table {
    white-space: normal;
}

thead {
    display: none;
}

tr {
    display: block;
    margin-bottom: 1.2rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 1.2rem;
    padding: 1.2rem 1.6rem;
}

td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    padding: 1.2rem 0;
    border-bottom: 1px dashed var(--glass-border);
    position: static;
    padding-left: 0;
}

td:last-child {
    border-bottom: none;
}

td::before {
    content: attr(data-label);
    position: static;
    font-weight: 600;
    color: var(--text-secondary);
    flex: 0 0 auto;
    margin-right: 2rem;
    text-align: left;
    max-width: 50%;
}

.action-cell {
    text-align: center;
    padding-top: 1.5rem;
}

/* Modais em mobile */
dialog,
#first-access-modal,
#password-reset-modal {
    max-width: calc(100vw - 4rem);
    box-sizing: border-box;
    padding: 2rem;
}

#first-access-modal .modal-footer .btn,
#password-reset-modal .modal-footer .btn {
    width: 100%;
}

/* === CELULARES GRANDES E TABLETS PEQUENOS (>= 600px) === */

@media (min-width: 600px) {
    .options-grid {
        grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
        gap: 2rem;
    }

    .option-card {
        padding: 2.8rem;
    }

    .form-container {
        max-width: 72rem;
    }

    .profile-container {
        max-width: 78rem;
    }
}

/* === TABLETS E NOTEBOOKS PEQUENOS (>= 768px) === */

@media (min-width: 768px) {
    .header,
    #app-header {
        padding: 2rem 4rem;
    }

    .header .logo,
    #app-header .logo {
        font-size: 2.2rem;
    }

    .header .logo img.header-logo,
    #app-header .logo img.header-logo {
        height: 5rem;
    }

    dialog {
        padding: 3rem;
    }

    .filter-bar {
        flex-wrap: nowrap;
    }

    .filter-buttons {
        flex: 0 1 auto;
        margin-left: auto;
    }

    .filter-group input,
    .filter-group select,
    .custom-select-trigger,
    .filter-buttons .btn {
        height: 4.7rem;
        font-size: 1.6rem;
    }

    .filter-group label {
        font-size: 1.4rem;
    }

    .page-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .summary-stats {
        flex-direction: row;
        width: auto;
    }

    .modal-footer {
        flex-direction: row;
        justify-content: flex-end;
    }

    .detail-item .value {
        text-align: right;
    }

    .content-wrapper,
    .form-grid {
        grid-template-columns: 1fr 1fr;
    }

    .page-title,
    .form-title {
        font-size: 3.2rem;
    }

    .options-grid {
        grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
        gap: 2.4rem;
    }

    table {
        white-space: nowrap;
    }

    thead {
        display: table-header-group;
    }

    tr {
        display: table-row;
        margin: 0;
        border: none;
        border-radius: 0;
        padding: 0;
        background: none;
    }

    td {
        display: table-cell;
        text-align: left;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid var(--glass-border);
        position: static;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    td::before {
        display: none;
    }

    .action-cell {
        text-align: right;
    }

    #first-access-modal,
    #password-reset-modal {
        max-width: 45rem;
        overflow: hidden;
        padding: 2rem 3rem;
        margin: auto;
    }

    #first-access-modal .modal-icon,
    #password-reset-modal .modal-icon {
        font-size: 3.5rem;
        margin-bottom: 1rem;
    }

    #first-access-modal p,
    #password-reset-modal p {
        margin-bottom: 2rem;
    }

    #first-access-modal .instruction-box,
    #password-reset-modal .instruction-box {
        margin-bottom: 1.5rem;
    }

    #first-access-modal .modal-footer,
    #password-reset-modal .modal-footer {
        margin-top: 3rem;
        justify-content: center;
    }

    #first-access-modal .modal-footer .btn,
    #password-reset-modal .modal-footer .btn {
        width: 100%;
    }
}

/* === NOTEBOOKS E DESKTOPS PADRÃO (>= 1024px) === */

@media (min-width: 1024px) {
    .main-container,
    .dashboard-container,
    .form-container,
    .profile-container {
        padding: 4rem;
    }

    .main-container {
        max-width: 140rem;
    }

    .dashboard-container {
        max-width: 120rem;
    }

    .form-container {
        max-width: 80rem;
    }

    .profile-container {
        max-width: 90rem;
    }

    .profile-card {
        max-width: 80rem;
        margin: 0 auto;
    }
}

/* === DESKTOPS GRANDES / FULL HD AMPLO (>= 1440px) === */

@media (min-width: 1440px) {
    .main-container {
        max-width: 150rem;
        padding: 4.5rem;
    }

    .dashboard-container {
        max-width: 135rem;
        padding: 4.5rem;
    }

    .form-container {
        max-width: 88rem;
        padding: 4.5rem;
    }

    .profile-container {
        max-width: 105rem;
        padding: 4.5rem;
    }

    .profile-card {
        max-width: 95rem;
    }

    .options-grid {
        gap: 3rem;
    }

    .option-card {
        padding: 3.4rem;
    }
}

/* === MONITORES GRANDES (>= 1600px) === */

@media (min-width: 1600px) {
    .main-container {
        max-width: 170rem;
        padding: 5rem;
    }

    .dashboard-container {
        max-width: 150rem;
        padding: 5rem;
    }

    .form-container {
        max-width: 98rem;
        padding: 5rem;
    }

    .profile-container {
        max-width: 120rem;
        padding: 5rem;
    }

    .profile-card {
        max-width: 108rem;
    }

    .option-card {
        padding: 4rem;
    }

    .settings-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 3rem;
        align-items: start;
    }
}

/* === TELAS MUITO GRANDES / 2K, ULTRAWIDE E 4K (>= 2400px) === */

@media (min-width: 2400px) {
    html {
        font-size: 68.75%;
    }

    .main-container {
        max-width: 210rem;
        padding: 6rem;
    }

    .dashboard-container {
        max-width: 175rem;
        padding: 6rem;
    }

    .form-container {
        max-width: 115rem;
        padding: 6rem;
    }

    .profile-container {
        max-width: 145rem;
        padding: 6rem;
    }

    .profile-card {
        max-width: 130rem;
    }

    .options-grid {
        gap: 4rem;
    }

    .option-card {
        padding: 4.8rem;
    }

    .option-card .icon {
        font-size: 4.6em;
    }

    .page-title,
    .dashboard-title,
    .form-title {
        font-size: clamp(3.4rem, 1.5vw, 4.2rem);
    }
}

/* === 4K AMPLO (>= 3000px) === */

@media (min-width: 3000px) {
    html {
        font-size: 72.5%;
    }

    .main-container {
        max-width: 230rem;
    }

    .dashboard-container {
        max-width: 190rem;
    }

    .form-container {
        max-width: 125rem;
    }

    .profile-container {
        max-width: 155rem;
    }

    .profile-card {
        max-width: 140rem;
    }
}
```

## Arquivo: dashboard-administrador.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistemas de Horas Complementares - SHC</title>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-admin dotted-background">
    
    <!-- Componente de Header Injetado via JS -->
    <header id="app-header"></header>

    <main class="dashboard-container">
        <h1 class="dashboard-title">Painel do Administrador</h1>
        <div id="dashboard-admin" class="options-grid">
            <a href="gerenciar-usuarios.html" class="option-card">
                <div class="icon"><i class="fas fa-user-shield"></i></div>
                <h3>Gerenciar Usuários</h3>
                <p>Crie, edite e defina os papéis dos usuários.</p>
            </a>
            <a href="configuracoes-sistema.html" class="option-card">
                <div class="icon"><i class="fas fa-cogs"></i></div>
                <h3>Configurações do Sistema</h3>
                <p>Ajuste os parâmetros e regras de negócio da aplicação.</p>
            </a>
            <a href="perfil-administrador.html" class="option-card">
                <div class="icon"><i class="fas fa-user-circle"></i></div>
                <h3>Meu Perfil</h3>
                <p>Visualize e gerencie suas informações.</p>
            </a>
        </div>
    </main>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header) -->
    <script src="js/components.js"></script>
    <script src="js/dashboard.js"></script>
    
</body>
</html>
```

## Arquivo: dashboard-alunos.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistemas de Horas Complementares - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default dotted-background">

    <!-- Componente de Header Injetado via JS -->
    <header id="app-header"></header>

    <main class="dashboard-container">
        <h1 class="dashboard-title">Painel de Opções</h1>

        <div id="dashboard-aluno" class="options-grid">
            <a href="historico-aluno.html" class="option-card">
                <div class="icon"><i class="fas fa-history"></i></div>
                <h3>Histórico</h3>
                <p>Consulte o status das suas atividades enviadas.</p>
            </a>
            <a href="cadastro-horas.html" class="option-card">
                <div class="icon"><i class="fas fa-plus-circle"></i></div>
                <h3>Cadastrar Horas</h3>
                <p>Envie um novo certificado de atividade complementar.</p>
            </a>
            <a href="perfil-alunos.html" class="option-card">
                <div class="icon"><i class="fas fa-user-circle"></i></div>
                <h3>Meu Perfil</h3>
                <p>Visualize e gerencie suas informações.</p>
            </a>
        </div>
    </main>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header) -->
    <script src="js/components.js"></script>
    <script src="js/dashboard.js"></script>
    
</body>
</html>
```

## Arquivo: dashboard-coordenador.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistemas de Horas Complementares - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default dotted-background">

    <!-- Componente de Header Injetado via JS -->
    <header id="app-header"></header>

    <main class="dashboard-container">
        <h1 class="dashboard-title">Painel de Opções</h1>
        
        <div id="dashboard-coordenador" class="options-grid">
            <a href="validar-horas.html" class="option-card">
                <div class="icon"><i class="fas fa-check-double"></i></div>
                <h3>Validar Horas</h3>
                <p>Aprove ou recuse as atividades pendentes dos alunos do seu curso.</p>
            </a>
            <a href="historico-coordenador.html" class="option-card">
                <div class="icon"><i class="fas fa-users"></i></div>
                <h3>Histórico do Curso</h3>
                <p>Consulte todos os envios dos alunos sob sua coordenação.</p>
            </a>
            <a href="perfil-coordenador.html" class="option-card">
                <div class="icon"><i class="fas fa-user-circle"></i></div>
                <h3>Meu Perfil</h3>
                <p>Visualize e gerencie suas informações.</p>
            </a>
        </div>

    </main>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header) -->
    <script src="js/components.js"></script>
    <script src="js/dashboard.js"></script>

</body>
</html>
```

## Arquivo: dashboard-secretaria.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistemas de Horas Complementares - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default dotted-background">
    
    <!-- Componente de Header Injetado via JS -->
    <header id="app-header"></header>
    
    <main class="dashboard-container">
        <h1 class="dashboard-title">Painel de Opções</h1>
        <div id="dashboard-secretaria" class="options-grid">
            <a href="historico-secretaria.html" class="option-card">
                <div class="icon"><i class="fas fa-history"></i></div>
                <h3>Histórico Geral</h3>
                <p>Consulte o histórico de todos os alunos da instituição.</p>
            </a>
            <a href="gerenciar-alunos.html" class="option-card">
                <div class="icon"><i class="fas fa-users-cog"></i></div>
                <h3>Gerenciar Alunos</h3>
                <p>Adicione, remova ou edite os dados dos alunos no sistema.</p>
            </a>
             <a href="perfil-secretaria.html" class="option-card">
                <div class="icon"><i class="fas fa-user-circle"></i></div>
                <h3>Meu Perfil</h3>
                <p>Visualize e gerencie suas informações.</p>
            </a>
        </div>
    </main>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header) -->
    <script src="js/components.js"></script>
    <script src="js/dashboard.js"></script>
    
</body>
</html>
```

## Arquivo: gerenciar-alunos.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistemas de Horas Complementares - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default">
    
    <!-- Componente de Header Injetado via JS -->
    <header id="app-header" data-back-url="dashboard-secretaria.html"></header>
    
    <main class="main-container">
        <div class="page-header">
            <h1 class="page-title"><i class="fas fa-users-cog"></i> Gerenciar Alunos</h1>
            <button id="add-student-btn" class="btn btn-primary"><i class="fas fa-plus"></i> Adicionar Novo Aluno</button>
        </div>

        <div id="filter-form" class="filter-bar">
            <div class="filter-group">
                <label for="filtro-nome">Nome do Aluno</label>
                <input type="text" id="filtro-nome" name="filtro-nome">
            </div>
            <div class="filter-group">
                <label for="filtro-matricula">Matrícula</label>
                <input type="text" id="filtro-matricula" name="filtro-matricula">
            </div>
            <div class="filter-group">
                <label for="filtro-curso">Curso</label>
                <select id="filtro-curso" name="filtro-curso">
                    <option value="">Todos</option>
                </select>
            </div>
            <div class="filter-buttons">
                <button id="clear-filters-btn" class="btn btn-secondary"><i class="fas fa-times"></i> Limpar</button>
                <button id="filter-btn" class="btn btn-primary"><i class="fas fa-filter"></i> Filtrar</button>
            </div>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr><th>Nome Completo</th><th>Matrícula</th><th>Email</th><th>Curso</th><th>Fase</th><th class="action-cell">Ações</th></tr>
                </thead>
                <tbody id="students-tbody">
                </tbody>
            </table>
        </div>
    </main>

    <dialog id="student-modal" class="student-modal">
        <div class="modal-header">
            <h2 id="modal-title" class="modal-title">Adicionar Novo Aluno</h2>
            <button class="close-btn" title="Fechar">&times;</button>
        </div>
        <form id="student-form" novalidate>
            <input type="hidden" id="student-id">
            
            <div class="form-group" style="grid-column: 1 / -1;">
                <label for="nome">Nome Completo</label>
                <input type="text" id="nome" required>
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label for="cpf">CPF</label>
                    <input type="text" id="cpf" placeholder="000.000.000-00" maxlength="14" required>
                </div>
                <div class="form-group">
                    <label for="matricula">Matrícula</label>
                    <input type="text" id="matricula" required>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>

                <div class="form-group" id="nascimento-group">
                    <label for="data_nascimento">Data Nascimento (Senha Inicial)</label>
                    <input type="date" id="data_nascimento">
                </div>

                <div class="form-group hidden" id="password-group">
                    <label for="password">Nova Senha</label>
                    <input type="password" id="password" placeholder="Opcional">
                </div>

                <div class="form-group">
                    <label for="curso">Curso</label>
                    <select id="curso" required>
                        <option value="">Carregando...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="fase">Fase</label>
                    <select id="fase" required>
                        <option value="">Selecione...</option>
                        <option value="1">1ª</option><option value="2">2ª</option>
                        <option value="3">3ª</option><option value="4">4ª</option>
                        <option value="5">5ª</option><option value="6">6ª</option>
                        <option value="7">7ª</option><option value="8">8ª</option>
                        <option value="9">9ª</option><option value="10">10ª</option>
                    </select>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary close-btn">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
        </form>
    </dialog>

    <dialog id="delete-modal">
        <div class="modal-header"><h2 class="modal-title">Confirmar Exclusão</h2><button class="close-btn" title="Fechar">&times;</button></div>
        <p>Tem certeza que deseja remover o aluno <strong id="delete-student-name"></strong>? Esta ação não pode ser desfeita.</p>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary close-btn">Cancelar</button>
            <button id="confirm-delete-btn" class="btn btn-danger">Confirmar Exclusão</button>
        </div>
    </dialog>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header) -->
    <script src="js/components.js"></script>
    <script src="js/gerenciar-alunos.js"></script>
</body>
</html>
```

## Arquivo: gerenciar-usuarios.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistemas de Horas Complementares - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-admin">
    
    <!-- Componente de Header Injetado via JS -->
    <header id="app-header" data-back-url="dashboard-administrador.html"></header>

    <main class="main-container">
        <div class="page-header">
            <h1 class="page-title"><i class="fas fa-user-shield"></i> Gerenciar Usuários</h1>
            <button id="add-user-btn" class="btn btn-primary"><i class="fas fa-plus"></i> Adicionar Novo Usuário</button>
        </div>

        <div id="filter-form" class="filter-bar">
            <div class="filter-group">
                <label for="filtro-nome">Nome</label>
                <input type="text" id="filtro-nome">
            </div>
            <div class="filter-group">
                <label for="filtro-cpf">CPF</label>
                <input type="text" id="filtro-cpf" placeholder="000.000.000-00" maxlength="14">
            </div>
            <div class="filter-group">
                <label for="filtro-papel">Papel</label>
                <select id="filtro-papel" class="hidden-select">
                    <option value="">Todos</option>
                    <option value="ALUNO">Aluno</option>
                    <option value="COORDENADOR">Coordenador</option>
                    <option value="SECRETARIA">Secretaria</option>
                    <option value="ADMINISTRADOR">Admin</option>
                </select>
                <div class="custom-select-wrapper">
                    <div class="custom-select-trigger">
                        <span>Todos</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="custom-options">
                        <div class="custom-option" data-value="">Todos</div>
                        <div class="custom-option" data-value="ALUNO">Aluno</div>
                        <div class="custom-option" data-value="COORDENADOR">Coordenador</div>
                        <div class="custom-option" data-value="SECRETARIA">Secretaria</div>
                        <div class="custom-option" data-value="ADMINISTRADOR">Admin</div>
                    </div>
                </div>
            </div>
            <div class="filter-buttons">
                <button id="clear-filters-btn" class="btn btn-secondary"><i class="fas fa-times"></i> Limpar</button>
                <button id="filter-btn" class="btn btn-primary"><i class="fas fa-filter"></i> Filtrar</button>
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr><th>Nome</th><th>CPF</th><th>Email</th><th>Matrícula/ID</th><th>Papel</th><th class="action-cell">Ações</th></tr>
                </thead>
                <tbody id="users-tbody">
                </tbody>
            </table>
        </div>
    </main>

    <dialog id="user-modal">
        <div class="modal-header">
            <h2 id="modal-title" class="modal-title">Adicionar Usuário</h2>
            <button class="close-btn" title="Fechar">&times;</button>
        </div>
        <form id="user-form" novalidate>
            <input type="hidden" id="user-id">
            <div class="form-grid">
                <div class="form-group">
                    <label for="nome">Nome</label>
                    <input type="text" id="nome" name="nome" required>
                </div>
                <div class="form-group">
                    <label for="cpf">CPF</label>
                    <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" maxlength="14" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="matricula">Matrícula/ID</label>
                    <input type="text" id="matricula" name="matricula" required>
                </div>

                <div class="form-group">
                    <label for="papel">Papel</label>
                    <select id="papel" name="papel" required class="hidden-select">
                        <option value="">Selecione...</option>
                        <option value="ALUNO">Aluno</option>
                        <option value="COORDENADOR">Coordenador</option>
                        <option value="SECRETARIA">Secretaria</option>
                        <option value="ADMINISTRADOR">Admin</option>
                    </select>

                    <div class="custom-select-wrapper">
                        <div class="custom-select-trigger">
                            <span>Selecione...</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="custom-options">
                            <div class="custom-option" data-value="">Selecione...</div>
                            <div class="custom-option" data-value="ALUNO">Aluno</div>
                            <div class="custom-option" data-value="COORDENADOR">Coordenador</div>
                            <div class="custom-option" data-value="SECRETARIA">Secretaria</div>
                            <div class="custom-option" data-value="ADMINISTRADOR">Admin</div>
                        </div>
                    </div>
                </div>

                <div id="nascimento-group" class="form-group">
                    <label for="data_nascimento">Data de Nascimento (Senha Padrão)</label>
                    <input type="date" id="data_nascimento" name="data_nascimento">
                </div>

                <div id="password-group" class="form-group">
                    <label for="password">Nova Senha</label>
                    <input type="password" id="password" name="password" placeholder="Deixe em branco para não alterar">
                </div>

                <div id="curso-group" class="form-group hidden">
                    <label for="curso">Curso</label>
                    <select id="curso" name="curso" class="hidden-select"></select>
                    <div class="custom-select-wrapper">
                        <div class="custom-select-trigger">
                            <span>Selecione um curso...</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="custom-options">
                        </div>
                    </div>
                </div>

                <div id="fase-group" class="form-group hidden">
                    <label for="fase">Fase</label>
                    <select id="fase" name="fase" class="hidden-select">
                        <option value="">N/A</option>
                        <option value="1">1ª</option><option value="2">2ª</option><option value="3">3ª</option>
                        <option value="4">4ª</option><option value="5">5ª</option><option value="6">6ª</option>
                    </select>
                    <div class="custom-select-wrapper">
                        <div class="custom-select-trigger">
                            <span>N/A</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="custom-options">
                            <div class="custom-option" data-value="">N/A</div>
                            <div class="custom-option" data-value="1">1ª</div>
                            <div class="custom-option" data-value="2">2ª</div>
                            <div class="custom-option" data-value="3">3ª</div>
                            <div class="custom-option" data-value="4">4ª</div>
                            <div class="custom-option" data-value="5">5ª</div>
                            <div class="custom-option" data-value="6">6ª</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary close-btn">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
        </form>
    </dialog>

    <dialog id="delete-modal">
        <div class="modal-header">
            <h2 class="modal-title">Confirmar Exclusão</h2>
            <button class="close-btn" title="Fechar">&times;</button>
        </div>
        <p>Tem certeza que deseja remover o usuário <strong id="delete-user-name"></strong>? Esta ação não pode ser desfeita.</p>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary close-btn">Cancelar</button>
            <button id="confirm-delete-btn" class="btn btn-danger">Confirmar Exclusão</button>
        </div>
    </dialog>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header) -->
    <script src="js/components.js"></script>
    <script src="js/gerenciar-usuarios.js"></script>
</body>
</html>
```

## Arquivo: historico-aluno.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistemas de Horas Complementares - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default historico-aluno-page">

    <!-- Componente de Header Injetado via JS -->
    <header id="app-header" data-back-url="dashboard-alunos.html"></header>

    <main class="main-container">
        <h1 class="page-title"><i class="fas fa-history"></i>Meu Histórico de Atividades</h1>

        <div id="accordion-container" class="accordion-container">
            </div>
    </main>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header) -->
    <script src="js/components.js"></script>
    <script src="js/historico-aluno.js"></script>

</body>
</html>
```

## Arquivo: historico-coordenador.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistemas de Horas Complementares - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default">

    <!-- Componente de Header Injetado via JS -->
    <header id="app-header" data-back-url="dashboard-coordenador.html"></header>

    <main class="main-container">
        <div id="student-list-view">
            <h1 class="page-title"><i class="fas fa-users"></i> Alunos do Curso</h1>
            <div id="filter-form" class="filter-bar">
                <div class="filter-group">
                    <label for="aluno">Nome do Aluno</label>
                    <input type="text" id="aluno" name="aluno">
                </div>
                <div class="filter-group">
                    <label for="matricula">Matrícula</label>
                    <input type="text" id="matricula" name="matricula">
                </div>
                <div class="filter-group">
                    <label for="fase">Fase</label>
                    <select id="fase" name="fase" style="display: none;">
                        <option value="">Todas</option>
                        <option value="1">1ª Fase</option><option value="2">2ª Fase</option>
                        <option value="3">3ª Fase</option><option value="4">4ª Fase</option>
                        <option value="5">5ª Fase</option><option value="6">6ª Fase</option>
                        <option value="7">7ª Fase</option><option value="8">8ª Fase</option>
                        <option value="9">9ª Fase</option><option value="10">10ª Fase</option>
                    </select>
                    
                    <div class="custom-select-wrapper">
                        <div class="custom-select-trigger">
                            <span>Todas</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="custom-options">
                            <div class="custom-option" data-value="">Todas</div>
                            <div class="custom-option" data-value="1">1ª Fase</div>
                            <div class="custom-option" data-value="2">2ª Fase</div>
                            <div class="custom-option" data-value="3">3ª Fase</div>
                            <div class="custom-option" data-value="4">4ª Fase</div>
                            <div class="custom-option" data-value="5">5ª Fase</div>
                            <div class="custom-option" data-value="6">6ª Fase</div>
                            <div class="custom-option" data-value="7">7ª Fase</div>
                            <div class="custom-option" data-value="8">8ª Fase</div>
                            <div class="custom-option" data-value="9">9ª Fase</div>
                            <div class="custom-option" data-value="10">10ª Fase</div>
                        </div>
                    </div>
                </div>
                <div class="filter-buttons">
                    <button id="clear-filters-btn" class="btn btn-secondary"><i class="fas fa-times"></i> Limpar</button>
                    <button class="btn btn-primary"><i class="fas fa-filter"></i> Filtrar</button>
                </div>
            </div>
            <div class="table-container">
                <table>
                    <thead><tr><th>Nome do Aluno</th><th>Matrícula</th><th>Fase</th><th>Total de Solicitações</th></tr></thead>
                    <tbody id="student-list-tbody">
                        </tbody>
                </table>
            </div>
        </div>

        <div id="student-detail-view" style="display: none;">
            <div class="detail-header">
                <button id="back-to-list-btn" class="btn btn-secondary"><i class="fas fa-arrow-left"></i> Voltar para a Lista</button>
                <h2 id="student-name-title" class="student-name">Detalhes do Aluno</h2>
            </div>

            <div class="progress-section" style="margin-bottom: 1.5rem; background: var(--glass-bg); padding: 1rem 1.5rem; border-radius: 1rem; border: 1px solid var(--glass-border);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <h3 style="margin: 0; font-size: 1.4rem; color: var(--text-primary);">Progresso do Aluno</h3>
                    <p class="progress-label" style="margin: 0; font-size: 1.2rem;">Carregando...</p>
                </div>
                <div class="progress-bar" style="height: 0.8rem;">
                    <div class="progress-bar-fill" style="width: 0%;"></div>
                </div>
                <div id="progress-breakdown" class="progress-breakdown" style="margin-top: 1rem; gap: 0.5rem;"></div>
            </div>

            <div id="accordion-placeholder" class="accordion-container"></div>
        </div>
    </main>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header) -->
    <script src="js/components.js"></script>
    <script src="js/historico-coordenador.js"></script>
</body>
</html>
```

## Arquivo: historico-secretaria.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistemas de Horas Complementares - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default">
    
    <!-- Componente de Header Injetado via JS -->
    <header id="app-header" data-back-url="dashboard-secretaria.html"></header>

    <main class="main-container">
        <div id="student-list-view">
            <h1 class="page-title"><i class="fas fa-history"></i> Histórico Geral de Alunos</h1>
            
            <div id="filter-form" class="filter-bar">
                <div class="filter-group">
                    <label for="aluno">Nome do Aluno</label>
                    <input type="text" id="aluno" name="aluno">
                </div>
                <div class="filter-group">
                    <label for="matricula">Matrícula</label>
                    <input type="text" id="matricula" name="matricula">
                </div>
                
                <div class="filter-group">
                    <label for="curso">Curso</label>
                    <select id="curso" name="curso">
                        <option value="">Todos</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label for="data-inicio">De</label>
                    <div class="date-picker-wrapper" id="data-inicio-picker">
                        <input type="hidden" id="data-inicio" name="data-inicio">
                        <button type="button" class="date-picker-trigger">
                            <i class="fas fa-calendar-days"></i>
                            <span id="data-inicio_text">dd/mm/aaaa</span>
                        </button>
                        <div class="shc-calendar" hidden></div>
                    </div>
                </div>

                <div class="filter-group">
                    <label for="data-fim">Até</label>
                    <div class="date-picker-wrapper" id="data-fim-picker">
                        <input type="hidden" id="data-fim" name="data-fim">
                        <button type="button" class="date-picker-trigger">
                            <i class="fas fa-calendar-days"></i>
                            <span id="data-fim_text">dd/mm/aaaa</span>
                        </button>
                        <div class="shc-calendar" hidden></div>
                    </div>
                </div>
                
                <div class="filter-buttons">
                    <button id="clear-filters-btn" class="btn btn-secondary"><i class="fas fa-times"></i> Limpar</button>
                    <button class="btn btn-primary"><i class="fas fa-filter"></i> Filtrar</button>
                </div>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nome do Aluno</th>
                            <th>Matrícula</th>
                            <th>Curso</th>
                            <th>Fase</th>
                            <th>Total de Solicitações</th>
                        </tr>
                    </thead>
                    <tbody id="student-list-tbody">
                        </tbody>
                </table>
            </div>
        </div>

        <div id="student-detail-view" style="display: none;">
            <div class="detail-header">
                <button id="back-to-list-btn" class="btn btn-secondary"><i class="fas fa-arrow-left"></i> Voltar para a Lista</button>
                <h2 id="student-name-title" class="student-name">Detalhes do Aluno</h2>
            </div>
            <div id="accordion-placeholder" class="accordion-container"></div>
        </div>
    </main>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header) -->
    <script src="js/components.js"></script>
    <script src="js/historico-secretaria.js"></script>
</body>
</html>
```

## Arquivo: index.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SHC - Redirecionando</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
    <script>
        const urlParams = new URLSearchParams(window.location.search);
        const apiFromUrl = urlParams.get('api');

        if (apiFromUrl) {
            localStorage.setItem('API_BASE_URL', apiFromUrl.replace(/\/$/, ''));
        }

        const token = localStorage.getItem('authToken');
        const user = JSON.parse(localStorage.getItem('userData') || '{}');

        const rotasPorPerfil = {
            ALUNO: 'dashboard-alunos.html',
            COORDENADOR: 'dashboard-coordenador.html',
            SECRETARIA: 'dashboard-secretaria.html',
            ADMINISTRADOR: 'dashboard-administrador.html'
        };

        if (!token || !user?.tipo) {
            window.location.href = 'login.html';
        } else {
            window.location.href = rotasPorPerfil[user.tipo] || 'login.html';
        }
    </script>
</body>
</html>
```

## Arquivo: js\cadastro-horas.js
```javascript
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
    
    // Executa a busca de categorias e, se for edição, carrega os dados
    await populateCategorias();
    
    if (editId) {
        const pageTitle = document.querySelector('h1') || document.querySelector('.form-title');
        if (pageTitle) pageTitle.textContent = 'Editar Atividade';
        submitButton.innerHTML = '<i class="fas fa-save"></i> Salvar Alterações';
        
        await loadCertificateData(editId);
    }

    // Inicializa calendário customizado usando a função global de utils.js
    if (typeof setupDatePicker === 'function') {
        setupDatePicker('data-emissao-picker', 'data_emissao', 'data_emissao_text');
    }
});

```

## Arquivo: js\components.js
```javascript
// js/components.js

document.addEventListener('DOMContentLoaded', () => {
    // Injeção automática dos componentes globais
    injectHeader();
    injectPasswordModal();
});

// =======================================================
// 1. COMPONENTE: HEADER GLOBAL
// =======================================================
/**
 * Injeta o cabeçalho dinâmico baseado em atributos do elemento #app-header.
 * Atributos suportados:
 * - data-back-url: URL para o botão de voltar.
 * - data-back-history: Se presente, o botão volta para o histórico do navegador.
 * - data-hide-logout: Se presente, esconde o botão de sair.
 */
function injectHeader() {
    const header = document.getElementById('app-header');
    if (!header) return;

    // 1. Captura configurações passadas via HTML
    const backUrl = header.getAttribute('data-back-url');
    const backHistory = header.hasAttribute('data-back-history');
    const hideLogout = header.hasAttribute('data-hide-logout');

    // 2. Define o conteúdo do lado esquerdo (Voltar)
    let leftContent = '<div class="header-spacer"></div>'; 
    if (backUrl) {
        leftContent = `<a href="${backUrl}" class="logout-btn"><i class="fas fa-chevron-circle-left"></i> Voltar</a>`;
    } else if (backHistory) {
        leftContent = `<a href="javascript:history.back()" class="logout-btn"><i class="fas fa-arrow-left"></i> Voltar</a>`;
    }

    // 3. Define o conteúdo do lado direito (Logout)
    let rightContent = '<div class="header-spacer"></div>';
    if (!hideLogout) {
        rightContent = `<a href="#" id="global-logout-btn" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Sair</a>`;
    }

    // 4. Injeta a estrutura visual
    header.className = 'header';
    header.innerHTML = `
        ${leftContent}
        <div class="logo">
            <img src="logo.png" alt="Logo SHC" class="header-logo">
        </div>
        ${rightContent}
    `;

    // 5. LÓGICA GLOBAL DE LOGOUT
    const logoutBtn = document.getElementById('global-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
                // Tenta invalidar o token no servidor via API (Definida no utils.js)
                if (authToken) {
                    await fetch(`${API_BASE_URL}/api/auth/logout`, {
                        method: 'POST',
                        headers: { 
                            'Authorization': `Bearer ${authToken}`, 
                            'Accept': 'application/json' 
                        }
                    });
                }
            } catch (err) { 
                console.warn('Logout remoto indisponível, limpando dados locais...'); 
            } finally {
                // Limpeza obrigatória dos dados de sessão
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                window.location.href = 'index.html';
            }
        });
    }
}

// =======================================================
// 2. COMPONENTE: MODAL DE ALTERAÇÃO DE SENHA
// =======================================================
/**
 * Injeta o HTML do modal de troca de senha no placeholder indicado.
 * A lógica de submissão do formulário é tratada nos scripts específicos (ex: perfil.js).
 */
function injectPasswordModal() {
    const placeholder = document.getElementById('password-modal-placeholder');
    if (!placeholder) return;

    // Substitui o placeholder pelo componente real
    placeholder.outerHTML = `
    <dialog id="password-modal" class="password-modal">
        <div class="modal-header">
            <h2 class="modal-title">Alterar Senha</h2>
            <button id="close-modal-btn" class="close-btn" title="Fechar">&times;</button>
        </div>
        <form id="password-form" novalidate>
            <p class="modal-instruction">Para sua segurança, escolha uma senha forte com no mínimo 8 caracteres.</p>
            
            <div class="form-group">
                <label for="current-password">Senha Atual</label>
                <input type="password" id="current-password" placeholder="Digite sua senha atual">
            </div>
            
            <div class="form-group">
                <label for="new-password">Nova Senha</label>
                <input type="password" id="new-password" required placeholder="Mínimo 8 caracteres">
            </div>
            
            <div class="form-group">
                <label for="confirm-password">Confirmar Nova Senha</label>
                <input type="password" id="confirm-password" required placeholder="Repita a nova senha">
            </div>
            
            <div class="modal-footer">
                <button type="button" id="cancel-btn" class="btn btn-secondary">Cancelar</button>
                <button type="submit" class="btn btn-primary">Salvar Alterações</button>
            </div>
        </form>
    </dialog>
    `;
}
```

## Arquivo: js\configuracoes.js
```javascript
// js/configuracoes.js

document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // 1. ESTADO GLOBAL E ELEMENTOS
    // =======================================================
    
    let deleteTargetId = null;
    let deleteTargetType = null; // 'curso' ou 'categoria'

    // Elementos de Cursos
    const coursesTableBody = document.getElementById('courses-table-body');
    const courseModal = document.getElementById('course-modal');
    const courseForm = document.getElementById('course-form');
    const btnAddCourse = document.getElementById('btn-add-course');
    const courseModalTitle = document.getElementById('course-modal-title');

    // Elementos de Categorias
    const categoriesTableBody = document.getElementById('categories-table-body');
    const categoryModal = document.getElementById('category-modal');
    const categoryForm = document.getElementById('category-form');
    const btnAddCategory = document.getElementById('btn-add-category');
    const categoryModalTitle = document.getElementById('category-modal-title');

    // Elementos Gerais e Integração
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const deleteItemName = document.getElementById('delete-item-name');
    const apiUrlInput = document.getElementById('api-url');
    const apiKeyInput = document.getElementById('api-key');
    const saveIntegrationsBtn = document.getElementById('save-integrations-btn');

    // =======================================================
    // 2. GERENCIAMENTO DE CURSOS (CRUD)
    // =======================================================

    async function loadCourses() {
        coursesTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center">Carregando cursos...</td></tr>';
        try {
            const response = await fetch(`${API_BASE_URL}/api/cursos`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });

            if (response.ok) {
                const result = await response.json();
                const courses = result.data || result;
                renderCourses(courses);
            } else {
                coursesTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color: var(--status-reprovado)">Erro ao carregar lista.</td></tr>';
            }
        } catch (error) {
            console.error(error);
            showToast('Erro de conexão ao carregar cursos.', 'error');
        }
    }

    function renderCourses(courses) {
        coursesTableBody.innerHTML = '';
        if (courses.length === 0) {
            coursesTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center">Nenhum curso cadastrado.</td></tr>';
            return;
        }

        courses.forEach(course => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td data-label="ID">#${course.id}</td>
                <td data-label="Curso"><strong>${course.nome}</strong></td>
                <td data-label="Horas">${course.horas_necessarias}h</td>
                <td class="action-cell">
                    <button class="action-btn edit-course" data-id="${course.id}" data-nome="${course.nome}" data-horas="${course.horas_necessarias}" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-type="curso" data-id="${course.id}" data-nome="${course.nome}" title="Excluir">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            coursesTableBody.appendChild(tr);
        });
    }

    function openCourseModal(isEdit, data = {}) {
        const idInput = document.getElementById('course-id');
        const nameInput = document.getElementById('course-name');
        const hoursInput = document.getElementById('course-hours');

        // Limpa erros visuais via Utils
        [nameInput, hoursInput].forEach(el => toggleError(el, false));

        if (isEdit) {
            courseModalTitle.textContent = 'Editar Curso';
            idInput.value = data.id;
            nameInput.value = data.nome;
            hoursInput.value = data.horas;
        } else {
            courseModalTitle.textContent = 'Adicionar Curso';
            courseForm.reset();
            idInput.value = '';
        }
        courseModal.showModal();
    }

    courseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('course-id').value;
        const nameInput = document.getElementById('course-name');
        const hoursInput = document.getElementById('course-hours');
        
        let hasError = false;
        if (!nameInput.value.trim()) { toggleError(nameInput, true); hasError = true; }
        if (!hoursInput.value.trim()) { toggleError(hoursInput, true); hasError = true; }
        
        if (hasError) return showToast('Preencha os campos destacados.', 'error');

        const isEdit = !!id;
        const method = isEdit ? 'PUT' : 'POST';
        const url = isEdit ? `${API_BASE_URL}/api/cursos/${id}` : `${API_BASE_URL}/api/cursos`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 
                    'Authorization': `Bearer ${authToken}`, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({ 
                    nome: nameInput.value.trim(), 
                    horas_necessarias: parseInt(hoursInput.value) 
                })
            });

            if (response.ok) {
                showToast(`Curso ${isEdit ? 'atualizado' : 'criado'}!`);
                courseModal.close();
                loadCourses();
            } else {
                const err = await response.json();
                showToast(err.message || 'Erro ao salvar curso.', 'error');
            }
        } catch (error) { showToast('Erro de conexão.', 'error'); }
    });

    // =======================================================
    // 3. GERENCIAMENTO DE CATEGORIAS (CRUD)
    // =======================================================

    async function loadCategories() {
        categoriesTableBody.innerHTML = '<tr><td colspan="3" style="text-align:center">Carregando...</td></tr>';
        try {
            const response = await fetch(`${API_BASE_URL}/api/categorias`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (response.ok) {
                const result = await response.json();
                const categories = result.data || result;
                renderCategories(categories);
            }
        } catch (error) { showToast('Erro ao carregar categorias.', 'error'); }
    }

    function renderCategories(categories) {
        categoriesTableBody.innerHTML = '';
        if (categories.length === 0) {
            categoriesTableBody.innerHTML = '<tr><td colspan="3" style="text-align:center">Nenhuma categoria cadastrada.</td></tr>';
            return;
        }

        categories.forEach(cat => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td data-label="ID">#${cat.id}</td>
                <td data-label="Categoria"><strong>${cat.nome}</strong></td>
                <td class="action-cell">
                    <button class="action-btn delete-btn" data-type="categoria" data-id="${cat.id}" data-nome="${cat.nome}" title="Excluir">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            categoriesTableBody.appendChild(tr);
        });
    }

    function openCategoryModal() {
        const idInput = document.getElementById('category-id');
        const nameInput = document.getElementById('category-name');

        toggleError(nameInput, false);

        categoryModalTitle.textContent = 'Adicionar Categoria';
        categoryForm.reset();

        if (idInput) {
            idInput.value = '';
        }

        categoryModal.showModal();
    }

        categoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('category-name');

        if (!nameInput.value.trim()) {
            toggleError(nameInput, true);
            return showToast('Preencha o nome da categoria.', 'error');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/categorias`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${authToken}`, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({ nome: nameInput.value.trim() })
            });

            if (response.ok) {
                showToast('Categoria criada!');
                categoryModal.close();
                loadCategories();
            } else {
                const err = await response.json();
                showToast(err.message || 'Erro ao criar categoria.', 'error');
            }
        } catch (error) {
            showToast('Erro de conexão.', 'error');
        }
    });

    // =======================================================
    // 4. EXCLUSÃO GENÉRICA
    // =======================================================

    // Delegação de evento para os botões de delete (que são criados dinamicamente)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.delete-btn');
        if (btn) {
            deleteTargetType = btn.dataset.type;
            deleteTargetId = btn.dataset.id;
            deleteItemName.textContent = btn.dataset.nome;
            deleteModal.showModal();
        }
        
        const editCourseBtn = e.target.closest('.edit-course');
        if (editCourseBtn) openCourseModal(true, editCourseBtn.dataset);
    });

    confirmDeleteBtn.addEventListener('click', async () => {
        const endpoint = deleteTargetType === 'curso' ? 'cursos' : 'categorias';
        try {
            const response = await fetch(`${API_BASE_URL}/api/${endpoint}/${deleteTargetId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });

            if (response.ok) {
                showToast('Removido com sucesso!');
                deleteTargetType === 'curso' ? loadCourses() : loadCategories();
            } else {
                const err = await response.json();
                showToast(err.message || 'Erro ao remover.', 'error');
            }
        } catch (error) { showToast('Erro de conexão.', 'error'); }
        finally { deleteModal.close(); }
    });

    // =======================================================
    // 5. INTEGRAÇÕES E CONFIGURAÇÕES GLOBAIS
    // =======================================================
    const horasMinimasInput = document.getElementById('horas-minimas');
    const modoManutencaoSelect = document.getElementById('modo-manutencao');

    async function loadIntegrations() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/configuracoes`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (response.ok) {
                const config = await response.json();
                if (apiUrlInput) apiUrlInput.value = config.api_url || '';
                if (apiKeyInput) apiKeyInput.value = config.api_key || '';
                if (horasMinimasInput) horasMinimasInput.value = config.horas_minimas || '200';
                
                if (modoManutencaoSelect) {
                    const isManutencao = config.modo_manutencao === 'true' || config.modo_manutencao === true;
                    modoManutencaoSelect.value = isManutencao ? 'true' : 'false';
                    
                    const triggerSpan = modoManutencaoSelect.nextElementSibling?.querySelector('.custom-select-trigger span');
                    if (triggerSpan) triggerSpan.textContent = isManutencao ? 'Ativado (Envios Suspensos)' : 'Desativado (Funcionamento Normal)';
                }
            }
        } catch (e) { console.warn("Erro ao carregar configs:", e); }
    }

    saveIntegrationsBtn.addEventListener('click', async () => {
        const originalText = saveIntegrationsBtn.innerHTML;
        saveIntegrationsBtn.disabled = true;
        saveIntegrationsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';

        try {
            const response = await fetch(`${API_BASE_URL}/api/configuracoes`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${authToken}`, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({
                    api_url: apiUrlInput.value,
                    api_key: apiKeyInput.value,
                    horas_minimas: horasMinimasInput ? parseInt(horasMinimasInput.value) : 200, 
                    modo_manutencao: modoManutencaoSelect ? (modoManutencaoSelect.value === 'true') : false
                })
            });
            if (response.ok) showToast('Configurações salvas!');
        } catch (error) { showToast('Erro ao salvar.', 'error'); }
        finally {
            saveIntegrationsBtn.disabled = false;
            saveIntegrationsBtn.innerHTML = originalText;
        }
    });

    // Importação de Sistema Legado
    const btnRunImport = document.getElementById('btn-run-import');
    if (btnRunImport) {
        btnRunImport.addEventListener('click', async () => {
            const externalUrl = apiUrlInput.value.trim();
            const externalKey = apiKeyInput.value.trim();

            if (!externalUrl || !externalKey) return showToast('Configure a API Legada antes.', 'error');

            const originalText = btnRunImport.innerHTML;
            btnRunImport.disabled = true;
            btnRunImport.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Importando...';

            try {
                const respLegado = await fetch(externalUrl, {
                    headers: { 'x-api-key': externalKey, 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' }
                });
                if (!respLegado.ok) throw new Error('Falha ao conectar com sistema legado.');
                const dadosLegado = await respLegado.json();

                const payloadImportacao = Array.isArray(dadosLegado)
                    ? { usuarios: dadosLegado }
                    : dadosLegado;

                const respImport = await fetch(`${API_BASE_URL}/api/usuarios/import`, {
                    method: 'POST',
                    headers: { 
                        'Authorization': `Bearer ${authToken}`, 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    body: JSON.stringify(payloadImportacao)
                });

                if (respImport.ok) showToast('Importação concluída com sucesso!');
                else throw new Error('Erro ao processar no servidor.');

            } catch (error) { showToast(error.message, 'error'); }
            finally {
                btnRunImport.disabled = false;
                btnRunImport.innerHTML = originalText;
            }
        });
    }

    // Exportação de Certificados (API Externa)
    const btnExportCerts = document.getElementById('btn-export-certs');
    if (btnExportCerts) {
        btnExportCerts.addEventListener('click', async () => {
            const externalUrl = apiUrlInput.value.trim();
            const externalKey = apiKeyInput.value.trim();

            // Valida se as credenciais da API Externa foram preenchidas (mesmo comportamento da importação)
            if (!externalUrl || !externalKey) return showToast('Configure a API Legada antes de exportar.', 'error');

            const originalText = btnExportCerts.innerHTML;
            btnExportCerts.disabled = true;
            btnExportCerts.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exportando...';

            try {
                // 1. Busca os certificados da nossa API local
                const response = await fetch(`${API_BASE_URL}/api/certificados/exportar/externo`, {
                    headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
                });
                
                if (!response.ok) throw new Error('Falha ao buscar dados locais para exportação.');

                const dadosExportacao = await response.json();

                // 2. Envia os certificados diretamente para a API Legada Externa
                const respLegado = await fetch(externalUrl, {
                    method: 'POST', // Pode ser alterado para PUT dependendo do padrão da sua API externa
                    headers: { 
                        'x-api-key': externalKey, 
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    body: JSON.stringify(dadosExportacao)
                });

                if (!respLegado.ok) throw new Error('Falha ao enviar os dados para o sistema legado.');

                showToast('Exportação concluída com sucesso!');
            } catch (error) { 
                showToast(error.message, 'error'); 
            } finally {
                // Restaura o botão
                btnExportCerts.disabled = false;
                btnExportCerts.innerHTML = originalText;
            }
        });
    }

    // =======================================================
    // 6. INICIALIZAÇÃO
    // =======================================================
    
    btnAddCourse.addEventListener('click', () => openCourseModal(false));
    btnAddCategory.addEventListener('click', () => openCategoryModal());

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => btn.closest('dialog').close());
    });

    [courseModal, categoryModal, deleteModal].forEach(modal => {
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
    });

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => toggleError(input, false));
    });

    // Carga inicial
    loadCourses();
    loadCategories();
    loadIntegrations();
    
    // Inicia select customizado
    if (modoManutencaoSelect) setupCustomSelect(modoManutencaoSelect.nextElementSibling);
});
```

## Arquivo: js\dashboard.js
```javascript
// js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // 1. VERIFICAÇÃO DE SEGURANÇA
    // =======================================================
    // A função verificarAutenticacao() já roda automaticamente via utils.js.
    // Se por algum motivo o objeto do usuário não estiver carregado, voltamos ao login.
    if (!loggedInUser || !loggedInUser.nome) {
        window.location.href = 'index.html';
        return;
    }

    // =======================================================
    // 2. PERSONALIZAÇÃO DA INTERFACE
    // =======================================================
    const titleElement = document.querySelector('.dashboard-title');
    
    // Atualiza o título de boas-vindas com o nome vindo do utils.js
    if (titleElement) {
        titleElement.innerHTML = `Bem-vindo(a), <span style="color: var(--primary-glow);">${loggedInUser.nome}</span>`;
    }
});
```

## Arquivo: js\gerenciar-alunos.js
```javascript
// js/gerenciar-alunos.js

document.addEventListener('DOMContentLoaded', () => {

    const studentsTbody = document.getElementById('students-tbody');
    const studentModal = document.getElementById('student-modal');
    const deleteModal = document.getElementById('delete-modal');
    const studentForm = document.getElementById('student-form');
    let studentIdToDelete = null;
    let cursosCarregados = false;
    
    // Variável global para dados na memória (cache local para filtros)
    let allStudentsData = []; 

    // =======================================================
    // 1. MÁSCARA DE CPF (Utilizando Utils)
    // =======================================================
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            // Utilizamos a função global do utils.js
            e.target.value = applyCpfMask(e.target.value);
        });
    }

    // =======================================================
    // 2. READ - CARREGAR DADOS DA API (AGORA COM FILTROS NO BACKEND)
    // =======================================================
    async function fetchStudents() {
        studentsTbody.innerHTML = '<tr><td colspan="6">Carregando alunos...</td></tr>';
        
        try {
            // === MONTAGEM DOS FILTROS PARA O BACKEND ===
            const filters = {
                tipo: 'ALUNO',
                search: document.getElementById('filtro-nome').value.trim(),
                matricula: document.getElementById('filtro-matricula').value.trim(),
                curso_id: document.getElementById('filtro-curso').value
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

            if (!response.ok) throw new Error('Falha ao carregar alunos.');

            const result = await response.json();
            allStudentsData = result.data || result;

            if (!Array.isArray(allStudentsData)) allStudentsData = [];

            renderStudentsTable();

        } catch (error) {
            studentsTbody.innerHTML = `<tr><td colspan="6" style="color:var(--status-reprovado)">${error.message}</td></tr>`;
        }
    }

    // =======================================================
    // 3. RENDERIZAR TABELA (SEM FILTRO CLIENT-SIDE)
    // =======================================================

    function renderStudentsTable() {
        const studentsArray = allStudentsData || [];

        studentsTbody.innerHTML = '';

        if (studentsArray.length === 0) {
            const searchTerm = document.getElementById('filtro-nome').value.trim();
            const matriculaTerm = document.getElementById('filtro-matricula').value.trim();
            const cursoValue = document.getElementById('filtro-curso').value;

            let mensagem = 'Nenhum aluno cadastrado no momento.';
            
            if (searchTerm || matriculaTerm || cursoValue) {
                mensagem = 'Nenhum aluno encontrado com estes filtros.';
            }

            studentsTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 3rem 1rem;">${mensagem}</td></tr>`;
            return;
        }

        studentsArray.forEach(aluno => {
            const row = studentsTbody.insertRow();
            row.innerHTML = `
                <td data-label="Nome Completo">${aluno.nome}</td>
                <td data-label="Matrícula">${aluno.matricula || '--'}</td>
                <td data-label="Email">${aluno.email}</td>
                <td data-label="Curso">${aluno.curso?.nome || 'N/A'}</td>
                <td data-label="Fase">${aluno.fase ? aluno.fase + 'ª' : 'N/A'}</td>
                <td class="action-cell">
                    <button class="action-btn btn-edit" title="Editar"><i class="fas fa-pencil-alt"></i></button>
                    <button class="action-btn btn-delete" title="Remover"><i class="fas fa-trash"></i></button>
                </td>
            `;
            row.querySelector('.btn-edit').addEventListener('click', () => openEditModal(aluno));
            row.querySelector('.btn-delete').addEventListener('click', () => openDeleteModal(aluno.id, aluno.nome));
        });
    }

    // Selecionar o botão Filtrar
    const filterBtn = document.getElementById('filter-btn') || document.querySelector('.btn-primary');

    // Eventos dos Filtros com suporte ao Enter
    if (filterBtn) {
        filterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetchStudents();
        });
    }

    const filterInputsAlunos = [
        document.getElementById('filtro-nome'),
        document.getElementById('filtro-matricula'),
        document.getElementById('filtro-curso')
    ];

    filterInputsAlunos.forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    fetchStudents();
                }
            });
        }
    });

    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('filtro-nome').value = '';
            document.getElementById('filtro-matricula').value = '';
            document.getElementById('filtro-curso').value = '';
            fetchStudents();
        });
    }

    // =======================================================
    // 4. CRUD: CREATE / UPDATE
    // =======================================================
    
    function clearFormErrors() {
        // Agora usamos o seletor padrão, pois a função toggleError está global
        studentForm.querySelectorAll('input, select').forEach(el => toggleError(el, false));
    }

    document.getElementById('add-student-btn').addEventListener('click', () => {
        studentForm.reset();
        clearFormErrors();
        document.getElementById('student-id').value = '';
        document.getElementById('modal-title').textContent = 'Adicionar Novo Aluno';
        
        const dataNascInput = document.getElementById('data_nascimento');
        const passwordGroup = document.getElementById('password-group');
        
        if (dataNascInput) {
            dataNascInput.parentElement.classList.remove('hidden');
            dataNascInput.value = '';
        }
        if (passwordGroup) passwordGroup.classList.add('hidden');
        
        studentModal.showModal();
    });

    function openEditModal(aluno) {
        if (!cursosCarregados) {
            setTimeout(() => openEditModal(aluno), 100);
            return;
        }
        studentForm.reset();
        clearFormErrors();
        document.getElementById('modal-title').textContent = 'Editar Aluno';
        document.getElementById('student-id').value = aluno.id;
        document.getElementById('nome').value = aluno.nome || '';
        document.getElementById('cpf').value = aluno.cpf ? applyCpfMask(aluno.cpf) : '';
        document.getElementById('matricula').value = aluno.matricula || '';
        document.getElementById('email').value = aluno.email || '';

        const cursoSelect = document.getElementById('curso');
        const cursoId = aluno.curso_id || aluno.curso?.id;
        if (cursoSelect && cursoId != null) cursoSelect.value = String(cursoId);

        document.getElementById('fase').value = aluno.fase || '';
        
        const dataNascInput = document.getElementById('data_nascimento');
        if (dataNascInput) {
            dataNascInput.value = aluno.data_nascimento || '';
            dataNascInput.parentElement.classList.remove('hidden');
        }

        const passwordGroup = document.getElementById('password-group');
        if (passwordGroup) passwordGroup.classList.remove('hidden');

        studentModal.showModal();
    }

    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentId = document.getElementById('student-id').value;
        const isEditing = !!studentId;

        const nomeInput = document.getElementById('nome');
        const matriculaInput = document.getElementById('matricula');
        let hasError = false;

        // Validação utilizando toggleError do utils.js
        if (!nomeInput.value.trim()) { toggleError(nomeInput, true); hasError = true; }
        if (!matriculaInput.value.trim()) { toggleError(matriculaInput, true); hasError = true; }

        if (hasError) {
            showToast('Preencha os campos obrigatórios', 'error');
            return;
        }

        const data = {
            nome: nomeInput.value,
            matricula: matriculaInput.value,
            email: document.getElementById('email').value,
            cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
            curso_id: document.getElementById('curso').value,
            fase: document.getElementById('fase').value,
            tipo: 'ALUNO'
        };

        const dataNascInput = document.getElementById('data_nascimento');

        if (!dataNascInput || !dataNascInput.value) {
            if (dataNascInput) toggleError(dataNascInput, true);
            showToast('Informe a data de nascimento.', 'error');
            return;
        }

        data.data_nascimento = dataNascInput.value;

        if (!isEditing && dataNascInput && dataNascInput.value) {
            const [y, m, d] = data.data_nascimento.split('-');
            data.password = `${d}${m}${y}`;
        }
        
        const passwordInput = document.getElementById('password');
        if (isEditing && passwordInput && passwordInput.value) {
            data.password = passwordInput.value;
        }

        const url = isEditing ? `${API_BASE_URL}/api/usuarios/${studentId}` : `${API_BASE_URL}/api/usuarios`;
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Erro ao salvar');

            showToast(`Aluno ${isEditing ? 'atualizado' : 'cadastrado'}!`);
            studentModal.close();
            fetchStudents(); 
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    // =======================================================
    // 5. DELETE
    // =======================================================
    function openDeleteModal(id, name) {
        studentIdToDelete = id;
        document.getElementById('delete-student-name').textContent = name;
        deleteModal.showModal();
    }

    document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
        if (!studentIdToDelete) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/usuarios/${studentIdToDelete}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}`, 'ngrok-skip-browser-warning': 'true' }
            });
            if (!response.ok) throw new Error('Erro ao deletar');
            
            showToast('Aluno removido.');
            deleteModal.close();
            fetchStudents();
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    // =======================================================
    // 6. INICIALIZAÇÃO E POPULAR SELECTS
    // =======================================================
    async function populateCourseSelects() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cursos`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'ngrok-skip-browser-warning': 'true' }
            });
            if (!response.ok) return;
            const result = await response.json();
            const cursos = result.data || result;

            const filterSelect = document.getElementById('filtro-curso');
            const modalSelect = document.getElementById('curso');

            cursos.forEach(curso => {
                if (filterSelect) filterSelect.insertAdjacentHTML('beforeend', `<option value="${curso.id}">${curso.nome}</option>`);
                if (modalSelect) modalSelect.insertAdjacentHTML('beforeend', `<option value="${curso.id}">${curso.nome}</option>`);
            });
            cursosCarregados = true;
        } catch (e) { console.error(e); }
    }

    // Fechar modais ao clicar no botão de fechar
    document.querySelectorAll('.close-btn').forEach(btn =>
        btn.addEventListener('click', () => btn.closest('dialog').close())
    );

    // Inicialização da página
    (async () => {
        await populateCourseSelects();
        fetchStudents(); 
    })();
});

```

## Arquivo: js\gerenciar-usuarios.js
```javascript
// js/gerenciar-usuarios.js

document.addEventListener('DOMContentLoaded', () => {

    const usersTbody = document.getElementById('users-tbody');
    const userModal = document.getElementById('user-modal');
    const deleteModal = document.getElementById('delete-modal');
    const userForm = document.getElementById('user-form');
    let userIdToDelete = null;

    // Variável Global para filtragem local (cache)
    let allUsersData = [];

    // Garante que o navegador não tente validar nativamente
    userForm.setAttribute('novalidate', true);

    // Seletores do Formulário Modal
    const papelSelect = document.getElementById('papel');
    const cursoGroup = document.getElementById('curso-group');
    const faseGroup = document.getElementById('fase-group');
    const cursoSelect = document.getElementById('curso');
    const faseSelect = document.getElementById('fase');
    const nascimentoGroup = document.getElementById('nascimento-group');
    const passwordGroup = document.getElementById('password-group');

    // Seletores de Filtro
    const filterBtn = document.getElementById('filter-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');

    // =======================================================
    // 1. MÁSCARA DE CPF (Utilizando Utils)
    // =======================================================
    // Aplica máscara no Modal E no Filtro simultaneamente
    const cpfInputs = [document.getElementById('cpf'), document.getElementById('filtro-cpf')];
    cpfInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                e.target.value = applyCpfMask(e.target.value);
            });
        }
    });

    // =======================================================
    // 2. FUNÇÕES DE AUXÍLIO E FORMATAÇÃO
    // =======================================================
    
    function clearFormErrors() {
        userForm.querySelectorAll('input, select').forEach(el => toggleError(el, false));
    }

    function toInputDateFormat(dateStr) {
        if (!dateStr) return '';
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            const [dia, mes, ano] = parts;
            return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
        }
        return '';
    }

    function getRoleBadge(role) {
        if (!role) return '';
        const roleLower = role.toLowerCase();
        const mapClasses = {
            'aluno': 'role-aluno',
            'coordenador': 'role-coord',
            'secretaria': 'role-secret',
            'administrador': 'role-admin'
        };
        const cssClass = mapClasses[roleLower] || '';
        return `<span class="role-badge ${cssClass}">${role}</span>`;
    }

    // =======================================================
    // 3. READ - CARREGAR E RENDERIZAR USUÁRIOS (COM FILTROS NO BACKEND)
    // =======================================================
    async function fetchUsers() {
        usersTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Carregando usuários...</td></tr>';
        
        try {
            // === MONTAGEM DOS FILTROS PARA O BACKEND ===
            const filters = {
                search: document.getElementById('filtro-nome').value.trim(),
                cpf: document.getElementById('filtro-cpf').value.replace(/\D/g, ''), 
                tipo: document.getElementById('filtro-papel').value
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

            if (!response.ok) throw new Error('Falha ao carregar usuários.');

            const result = await response.json();
            allUsersData = result.data || result;

            if (!Array.isArray(allUsersData)) allUsersData = [];

            renderUsersTable();

        } catch (error) {
            usersTbody.innerHTML = `<tr><td colspan="6" style="color:var(--status-reprovado)">${error.message}</td></tr>`;
        }
    }

    // =======================================================
    // 4. RENDERIZAR TABELA (SEM FILTRO CLIENT-SIDE)
    // =======================================================

    function renderUsersTable() {
        const usersArray = allUsersData || [];

        usersTbody.innerHTML = '';

        if (usersArray.length === 0) {
            const searchTerm = document.getElementById('filtro-nome').value.trim();
            const cpfTerm = document.getElementById('filtro-cpf').value.trim();
            const papelValue = document.getElementById('filtro-papel').value;

            let mensagem = 'Nenhum usuário cadastrado no momento.';
            
            if (searchTerm || cpfTerm || papelValue) {
                mensagem = 'Nenhum usuário encontrado com estes filtros.';
            }

            usersTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 3rem 1rem;">${mensagem}</td></tr>`;
            return;
        }

        usersArray.forEach(user => {
            const row = usersTbody.insertRow();
            row.innerHTML = `
                <td data-label="Nome">${user.nome}</td>
                <td data-label="CPF">${user.cpf || 'Sem CPF'}</td>
                <td data-label="Email">${user.email}</td>
                <td data-label="ID">${user.matricula || '-'}</td>
                <td data-label="Papel">${getRoleBadge(user.tipo)}</td>
                <td class="action-cell">
                    <button class="action-btn btn-edit" title="Editar"><i class="fas fa-pencil-alt"></i></button>
                    ${user.id !== loggedInUser.id ? '<button class="action-btn btn-delete" title="Remover"><i class="fas fa-trash"></i></button>' : ''}
                </td>
            `;

            row.querySelector('.btn-edit').addEventListener('click', () => openEditModal(user));
            const deleteBtn = row.querySelector('.btn-delete');
            if (deleteBtn) deleteBtn.addEventListener('click', () => openDeleteModal(user.id, user.nome));
        });
    }

    // =======================================================
    // 5. SUBMIT (CREATE / UPDATE)
    // =======================================================
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userId = document.getElementById('user-id').value;
        const isEditing = !!userId;
        
        const fields = {
            nome: document.getElementById('nome'),
            email: document.getElementById('email'),
            cpf: document.getElementById('cpf'),
            matricula: document.getElementById('matricula'),
            dataNasc: document.getElementById('data_nascimento')
        };

        let hasError = false;

        // Validações Básicas usando Utils
        if (!fields.nome.value.trim()) { toggleError(fields.nome, true); hasError = true; }
        if (!fields.email.value.trim()) { toggleError(fields.email, true); hasError = true; }
        if (papelSelect.value === 'ALUNO' && !fields.matricula.value.trim()) {
            toggleError(fields.matricula, true);
            hasError = true;
        }
        if (!papelSelect.value) { toggleError(papelSelect, true); hasError = true; }

        const cpfRaw = fields.cpf.value.replace(/\D/g, '');
        if (cpfRaw.length !== 11) { toggleError(fields.cpf, true); hasError = true; }

        // Validações Condicionais
        if (!cursoGroup.classList.contains('hidden') && !cursoSelect.value) { toggleError(cursoSelect, true); hasError = true; }
        if (!faseGroup.classList.contains('hidden') && !faseSelect.value) { toggleError(faseSelect, true); hasError = true; }
        if (!isEditing && !fields.dataNasc.value) { toggleError(fields.dataNasc, true); hasError = true; }

        if (hasError) {
            showToast('Por favor, verifique os campos destacados.', 'error');
            return;
        }

        const payload = {
            nome: fields.nome.value.trim(),
            email: fields.email.value.trim(),
            cpf: cpfRaw,
            matricula: fields.matricula.value.trim(),
            tipo: papelSelect.value,
            curso_id: (!cursoGroup.classList.contains('hidden')) ? cursoSelect.value : null,
            fase: (!faseGroup.classList.contains('hidden')) ? faseSelect.value : null,
            data_nascimento: fields.dataNasc.value
        };

        if (isEditing) {
            const password = document.getElementById('password').value;
            if (password && password.trim() !== '') payload.password = password;
        }

        const url = isEditing ? `${API_BASE_URL}/api/usuarios/${userId}` : `${API_BASE_URL}/api/usuarios`;
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json', 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Falha ao salvar usuário.');

            showToast(`Usuário ${isEditing ? 'atualizado' : 'criado'} com sucesso!`);
            userModal.close();
            fetchUsers();
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    // =======================================================
    // 6. DELETE
    // =======================================================
    function openDeleteModal(id, name) {
        userIdToDelete = id;
        document.getElementById('delete-user-name').textContent = name;
        deleteModal.showModal();
    }

    document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
        if (!userIdToDelete) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/usuarios/${userIdToDelete}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (!response.ok) throw new Error('Falha ao remover usuário.');

            showToast('Usuário removido com sucesso.');
            deleteModal.close();
            fetchUsers();
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    // =======================================================
    // 7. INICIALIZAÇÃO DE COMPONENTES E SELECTS
    // =======================================================
    async function populateCourseSelects() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cursos`, {
                headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'ngrok-skip-browser-warning': 'true' }
            });
            if (!response.ok) return;
            const result = await response.json();
            const cursos = result.data || result;

            cursoSelect.innerHTML = '<option value="">Selecione um curso...</option>';
            const optionsContainer = cursoSelect.nextElementSibling.querySelector('.custom-options');
            if (optionsContainer) optionsContainer.innerHTML = '<div class="custom-option" data-value="">Selecione um curso...</div>';

            cursos.forEach(curso => {
                cursoSelect.insertAdjacentHTML('beforeend', `<option value="${curso.id}">${curso.nome}</option>`);
                if (optionsContainer) optionsContainer.insertAdjacentHTML('beforeend', `<div class="custom-option" data-value="${curso.id}">${curso.nome}</div>`);
            });
        } catch (error) { console.error("Erro ao popular cursos:", error); }
    }

    // Sincroniza a UI do Select Customizado (Usado para reset e edição)
    function updateCustomSelectUI(selectElement, value) {
        if (!selectElement) return;
        const wrapper = selectElement.nextElementSibling;
        if (!wrapper || !wrapper.classList.contains('custom-select-wrapper')) return;
        const triggerSpan = wrapper.querySelector('.custom-select-trigger span');
        let text = value === "" && selectElement.id === 'filtro-papel' ? "Todos" : "Selecione...";
        if (value) {
            const option = selectElement.querySelector(`option[value="${value}"]`);
            if (option) text = option.textContent;
        }
        triggerSpan.textContent = text;
    }

    // Inicialização da Página
    (async () => {
        await populateCourseSelects();
        fetchUsers();
        document.querySelectorAll('.custom-select-wrapper').forEach(setupCustomSelect);
    })();

    // Fechar modais
    document.querySelectorAll('.close-btn').forEach(btn =>
        btn.addEventListener('click', () => btn.closest('dialog').close())
    );

    // Eventos de Filtro com suporte ao Enter
    if (filterBtn) {
        filterBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            fetchUsers(); 
        });
    }

    const filterInputsUsers = [
        document.getElementById('filtro-nome'),
        document.getElementById('filtro-cpf'),
        document.getElementById('filtro-papel')
    ];

    filterInputsUsers.forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    fetchUsers();
                }
            });
        }
    });

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('filtro-nome').value = '';
            document.getElementById('filtro-cpf').value = '';
            document.getElementById('filtro-papel').value = '';
            fetchUsers();
        });
    }
});

```

## Arquivo: js\historico-aluno.js
```javascript
// js/historico-aluno.js
document.addEventListener('DOMContentLoaded', () => {
    
    const accordionContainer = document.getElementById('accordion-container');
    if (!accordionContainer) return;

    // Feedback inicial de carregamento
    accordionContainer.innerHTML = '<p>Carregando seu histórico...</p>';

    async function carregarHistorico() {
        try {
            // === BUSCA COM FILTROS NO BACKEND ===
            const filters = {
                // Aqui você pode adicionar filtros no futuro (ex: por status, data, etc.)
                // search: document.getElementById('algum-campo-busca')?.value.trim() || ''
            };

            const queryString = buildQueryParams(filters);
            const url = `${API_BASE_URL}/api/certificados${queryString ? '?' + queryString : ''}`;

            const response = await fetch(url, {
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

            // Verificar se existem dados
            if (!Array.isArray(certificados) || certificados.length === 0) {
                accordionContainer.innerHTML = `
                    <div style="text-align:center; padding: 5rem 2rem; color: var(--text-secondary);">
                        <i class="fas fa-folder-open" style="font-size: 4.5rem; opacity: 0.4; margin-bottom: 1.5rem;"></i>
                        <p style="font-size: 1.8rem; margin: 0 0 0.5rem 0;">Você ainda não enviou nenhum certificado.</p>
                        <p style="font-size: 1.4rem;">Quando enviar sua primeira atividade, ela aparecerá aqui.</p>
                    </div>`;
                return;
            }

            accordionContainer.innerHTML = ''; // Limpa a mensagem inicial

            // Renderizar cada certificado
            certificados.forEach(cert => {
                const statusInfo = getStatusInfo(cert.status);
                const filePath = cert.id ? `/api/certificados/${cert.id}/arquivo` : '';
                const dataEnvio = cert.created_at ? new Date(cert.created_at).toLocaleDateString('pt-BR') : '--/--/----';
                const categoriaTexto = cert.categoria ? cert.categoria.replace(/_/g, ' ') : 'Sem categoria';

                let acoesHTML = '';
                if (cert.status === 'ENTREGUE') {
                    acoesHTML = `
                        <div class="actions-section">
                            <button type="button" class="btn btn-secondary btn-edit-cert" data-id="${cert.id}">
                                <i class="fas fa-edit"></i> Editar Envio
                            </button>
                            <button type="button" class="btn btn-danger btn-delete-cert" data-id="${cert.id}">
                                <i class="fas fa-trash"></i> Cancelar Envio
                            </button>
                        </div>
                    `;
                }

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
                                ${acoesHTML}
                                <div class="preview-section">
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

            // Ativar funcionalidades
            setupAccordion();
            carregarPreviewsPdf();
            configurarBotoesDeAcao();

        } catch (error) {
            accordionContainer.innerHTML = `<p style="color: var(--status-reprovado); text-align:center;">${error.message}</p>`;
            console.error('Erro ao carregar histórico:', error);
        }
    }

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
                            showToast('Envio cancelado com sucesso!');
                            setTimeout(() => location.reload(), 1000);
                        } else {
                            const err = await response.json();
                            showToast(err.message || 'Erro ao cancelar o envio.', 'error');
                        }
                    } catch (error) {
                        console.error(error);
                        showToast('Erro de conexão.', 'error');
                    }
                }
            });
        });

        // Edição
        document.querySelectorAll('.btn-edit-cert').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const certId = e.currentTarget.dataset.id;
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

                if (!response.ok) throw new Error('Arquivo indisponível.');
                if (contentType.includes('text/html')) throw new Error('O servidor retornou HTML em vez do PDF.');

                const blob = await response.blob();
                const pdfBlob = new Blob([blob], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);

                area.innerHTML = `
                    <iframe class="pdf-preview" src="${pdfUrl}" title="Pré-visualização do comprovante"></iframe>
                    <a class="pdf-open-link" href="${pdfUrl}" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-up-right-from-square"></i> Abrir comprovante em nova guia
                    </a>
                `;
            } catch (error) {
                console.warn('Erro ao carregar comprovante:', error);
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

    // Inicialização
    carregarHistorico();
});
```

## Arquivo: js\historico-coordenador.js
```javascript
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

```

## Arquivo: js\historico-secretaria.js
```javascript
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
    // 2. READ - BUSCAR TODOS OS ALUNOS (COM FILTROS NO BACKEND)
    // =======================================================
    async function fetchStudents() {
        studentListTbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Carregando alunos...</td></tr>';

        try {
            // === MONTAGEM DOS FILTROS PARA O BACKEND ===
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
            let allStudentsData = result.data || result;
            if (!Array.isArray(allStudentsData)) allStudentsData = [];

            // Busca contagem de certificados (mantida)
            try {
                const certResponse = await fetch(`${API_BASE_URL}/api/certificados`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Accept': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                if (certResponse.ok) {
                    const certResult = await certResponse.json();
                    const certificados = certResult.data || certResult;

                    const contagemPorAluno = {};
                    if (Array.isArray(certificados)) {
                        certificados.forEach(cert => {
                            const alunoId = cert.aluno?.id || cert.aluno_id;
                            if (alunoId) {
                                contagemPorAluno[alunoId] = (contagemPorAluno[alunoId] || 0) + 1;
                            }
                        });
                    }

                    allStudentsData = allStudentsData.map(aluno => {
                        aluno.certificados_count = contagemPorAluno[aluno.id] || 0;
                        return aluno;
                    });
                }
            } catch (e) {
                console.warn('Não foi possível obter o total de solicitações.', e);
            }

            // Atualiza a variável global
            window.allStudentsData = allStudentsData; // para usar no render

            renderStudentsTable();

        } catch (error) {
            studentListTbody.innerHTML = `<tr><td colspan="5" style="color: var(--status-reprovado); text-align:center;">${error.message}</td></tr>`;
        }
    }

    // =======================================================
    // 3. RENDERIZAR TABELA (SEM FILTRO CLIENT-SIDE)
    // =======================================================

    function renderStudentsTable() {
        const studentsArray = window.allStudentsData || [];

        studentListTbody.innerHTML = '';

        if (studentsArray.length === 0) {
            const searchTerm = document.getElementById('aluno').value.trim();
            const matriculaTerm = document.getElementById('matricula').value.trim();
            const cursoValue = document.getElementById('curso').value;
            const dataInicio = document.getElementById('data-inicio').value;
            const dataFim = document.getElementById('data-fim').value;

            let mensagem = 'Nenhum aluno cadastrado no momento.';
            
            if (searchTerm || matriculaTerm || cursoValue || dataInicio || dataFim) {
                mensagem = 'Nenhum aluno encontrado com estes filtros.';
            }

            studentListTbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 3rem 1rem;">${mensagem}</td></tr>`;
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
    // 4. DETALHES DO HISTÓRICO (Individual)
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
                // Utiliza as ferramentas globais do utils.js
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

            // Ativa o comportamento do acordeão
            setupAccordion();
            carregarPreviewsPdf();

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
    // EVENTOS E INICIALIZAÇÃO
    // =======================================================

    const filterBtn = document.querySelector('.btn-primary');
    if (filterBtn) {
        filterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetchStudents();        // ← Importante: usa fetchStudents
        });
    }

    // Suporte ao Enter
    const filterInputsSec = [
        document.getElementById('aluno'),
        document.getElementById('matricula'),
        document.getElementById('curso'),
        document.getElementById('data-inicio'),
        document.getElementById('data-fim')
    ];

    filterInputsSec.forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    fetchStudents();    // ← Importante: usa fetchStudents
                }
            });
        }
    });

    // Limpar Filtros
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            document.getElementById('aluno').value = '';
            document.getElementById('matricula').value = '';
            document.getElementById('curso').value = '';
            document.getElementById('data-inicio').value = '';
            document.getElementById('data-fim').value = '';
            fetchStudents();           // ← Importante: usa fetchStudents
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

        // Inicializa calendários customizados
        if (typeof setupDatePicker === 'function') {
            setupDatePicker('data-inicio-picker', 'data-inicio', 'data-inicio_text');
            setupDatePicker('data-fim-picker', 'data-fim', 'data-fim_text');
        }
    })();
});

```

## Arquivo: js\login.js
```javascript
// js/login.js

document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // 1. MÁSCARA DE CPF (Utilizando Utils)
    // =======================================================
    const cpfInput = document.getElementById('cpf');

    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            // Chama a função centralizada no utils.js
            e.target.value = applyCpfMask(e.target.value);
        });
    }

    // =======================================================
    // 2. LÓGICA DE LOGIN (CONEXÃO COM A API)
    // =======================================================
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        // Listener para limpar o erro visual assim que o usuário digita
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(input => {
            // Usa o toggleError global para limpar estados de erro
            input.addEventListener('input', () => toggleError(input, false));
        });

        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const userField = document.getElementById('cpf');
            const passwordField = document.getElementById('password');
            let hasError = false;

            // --- VALIDAÇÃO VISUAL UTILIZANDO UTILS ---
            if (!userField.value.trim()) {
                toggleError(userField, true); // Função global do utils.js
                hasError = true;
            }

            if (!passwordField.value.trim()) {
                toggleError(passwordField, true); // Função global do utils.js
                hasError = true;
            }

            if (hasError) {
                showToast('Por favor, preencha os campos destacados.', 'error'); //
                return;
            }
            // -----------------------------------------

            const data = {
                cpf: userField.value,
                password: passwordField.value
            };

            // Feedback visual no botão (Loading)
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
            submitBtn.disabled = true;

            try {
                if (!API_BASE_URL) {
                    throw new Error(API_CONFIG_HELP);
                }

                const response = await fetch(`${API_BASE_URL}/api/auth/login`, { //
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(result.message || 'Usuário ou senha inválidos.');
                }

                // Salva as credenciais recebidas da API
                localStorage.setItem('authToken', result.access_token);
                localStorage.setItem('userData', JSON.stringify(result.usuario));

                const userType = result.usuario.tipo;

                // Redirecionamento baseado no papel (role) do usuário
                switch (userType) {
                    case 'ALUNO':
                        window.location.href = 'dashboard-alunos.html';
                        break;
                    case 'COORDENADOR':
                        window.location.href = 'dashboard-coordenador.html';
                        break;
                    case 'SECRETARIA':
                        window.location.href = 'dashboard-secretaria.html';
                        break;
                    case 'ADMINISTRADOR':
                        window.location.href = 'dashboard-administrador.html';
                        break;
                    default:
                        throw new Error('Tipo de usuário desconhecido.');
                }

            } catch (error) {
                const message = error instanceof TypeError
                    ? `${API_CONFIG_HELP} Se a URL ja estiver correta, confira se a API esta online e se o CORS permite o dominio do GitHub Pages.`
                    : error.message;

                showToast(message, 'error');
                console.error('Falha no login:', error);
                
                // Restaura o estado do botão em caso de falha
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Destaca os campos como erro para feedback imediato
                toggleError(userField, true);
                toggleError(passwordField, true);
            }
        });
    }

    // =======================================================
    // 3. LÓGICA DA INTERFACE (Troca de formulário)
    // =======================================================
    const loginWrapper = document.getElementById('login-form-wrapper');
    const recoveryWrapper = document.getElementById('recovery-form-wrapper');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const backToLoginLink1 = document.getElementById('back-to-login-link1');

    if (forgotPasswordLink && loginWrapper && recoveryWrapper) {
        forgotPasswordLink.addEventListener('click', () => {
            loginWrapper.classList.add('hidden');
            recoveryWrapper.classList.remove('hidden');
        });
    }

    if (backToLoginLink1) {
        backToLoginLink1.addEventListener('click', () => {
            if (recoveryWrapper) recoveryWrapper.classList.add('hidden');
            if (loginWrapper) loginWrapper.classList.remove('hidden');
        });
    }

    // =======================================================
    // 4. TOGGLE DE SENHA (Mostrar/Ocultar)
    // =======================================================
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('password-toggle');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            passwordToggle.classList.toggle('fa-eye-slash', !isPassword);
            passwordToggle.classList.toggle('fa-eye', isPassword);
        });
    }

    // =======================================================
    // 5. MODAL DE PRIMEIRO ACESSO
    // =======================================================
    const firstAccessLink = document.getElementById('first-access-link');
    const firstAccessModal = document.getElementById('first-access-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const confirmCloseBtn = document.getElementById('confirm-close-btn');

    if (firstAccessLink && firstAccessModal) {
        firstAccessLink.addEventListener('click', (e) => {
            e.preventDefault();
            firstAccessModal.showModal();
        });

        [closeModalBtn, confirmCloseBtn].forEach(btn => {
            if (btn) btn.addEventListener('click', () => firstAccessModal.close());
        });
    }
});

```

## Arquivo: js\perfil.js
```javascript
// js/perfil.js

document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // 1. SEGURANÇA E CARREGAMENTO DE DADOS
    // =======================================================
    
    // Utilizamos as constantes globais authToken e loggedInUser definidas no utils.js
    if (!authToken || !loggedInUser.id) {
        window.location.href = 'login.html';
        return;
    }

    // Elementos Globais do Avatar e UI
    const avatarWrapper = document.querySelector('.profile-avatar-wrapper');
    const profileAvatarImg = document.getElementById('profile-avatar');
    const avatarInput = document.getElementById('avatar-input');
    const avatarMenu = document.getElementById('avatar-menu');
    const uploadBtn = document.getElementById('upload-btn');
    const removeBtn = document.getElementById('remove-btn');

    let currentAvatarObjectUrl = null;

    // =======================================================
    // FUNÇÃO DE CONFIRMAÇÃO PERSONALIZADA (Modal do Sistema)
    // =======================================================
    async function showConfirmModal(title, message, confirmText = 'Confirmar', type = 'danger') {
        return new Promise((resolve) => {
            let modal = document.getElementById('custom-confirm-modal');
            
            if (!modal) {
                modal = document.createElement('dialog');
                modal.id = 'custom-confirm-modal';
                modal.className = 'password-modal'; // reutiliza os estilos existentes
                modal.innerHTML = `
                    <div class="modal-header">
                        <h3 class="modal-title" id="confirm-title"></h3>
                        <button class="close-btn" id="confirm-close">×</button>
                    </div>
                    <div class="modal-content-body" style="padding: 2.5rem 1rem; text-align: center;">
                        <p id="confirm-message" style="font-size: 1.6rem; line-height: 1.6; color: var(--text-primary);"></p>
                    </div>
                    <div class="modal-footer" style="justify-content: flex-end; gap: 1rem; padding-top: 1rem;">
                        <button id="confirm-cancel" class="btn btn-secondary">Cancelar</button>
                        <button id="confirm-action" class="btn"></button>
                    </div>
                `;
                document.body.appendChild(modal);
            }

            document.getElementById('confirm-title').textContent = title;
            document.getElementById('confirm-message').textContent = message;

            const actionBtn = document.getElementById('confirm-action');
            actionBtn.textContent = confirmText;
            actionBtn.className = `btn btn-${type}`;

            const closeModal = () => {
                modal.close();
                resolve(false);
            };

            // Remove listeners antigos para evitar duplicatas
            actionBtn.replaceWith(actionBtn.cloneNode(true));
            const newActionBtn = document.getElementById('confirm-action');
            newActionBtn.addEventListener('click', () => {
                modal.close();
                resolve(true);
            });

            document.getElementById('confirm-cancel').addEventListener('click', closeModal);
            document.getElementById('confirm-close').addEventListener('click', closeModal);

            modal.addEventListener('close', () => resolve(false), { once: true });
            modal.showModal();
        });
    }
    // =======================================================
    // 2. FUNÇÕES AUXILIARES DE INTERFACE
    // =======================================================

    function setAvatarState(hasPhoto, url = '') {
        if (!avatarWrapper || !profileAvatarImg) return;
        
        avatarWrapper.classList.toggle('has-photo', hasPhoto);

        if (removeBtn) {
            // Só esconde se não tiver foto. Se tiver, ele aparece.
            removeBtn.classList.toggle('hidden', !hasPhoto);
        }
        
        if (hasPhoto && url) {
            profileAvatarImg.src = url;
        } else {
            profileAvatarImg.removeAttribute('src');
        }
    }

    function getAvatarDisplayUrl(user = loggedInUser) {
        if (user.avatar_preview) {
            return user.avatar_preview;
        }

        if (!user.avatar_url) {
            return '';
        }

        if (
            user.avatar_url.startsWith('data:') ||
            user.avatar_url.startsWith('blob:')
        ) {
            return user.avatar_url;
        }

        return formatFileUrl(user.avatar_url);
    }

    function isProtectedAvatarUrl(url) {
        try {
            const parsedUrl = new URL(url, window.location.href);
            return parsedUrl.pathname.startsWith('/api/usuarios/avatars/');
        } catch (error) {
            return String(url).includes('/api/usuarios/avatars/');
        }
    }

    async function resolveAvatarDisplayUrl(user = loggedInUser) {
        const avatarUrl = getAvatarDisplayUrl(user);

        if (!avatarUrl) {
            return '';
        }

        if (
            avatarUrl.startsWith('data:') ||
            avatarUrl.startsWith('blob:') ||
            !isProtectedAvatarUrl(avatarUrl)
        ) {
            return avatarUrl;
        }

        const response = await fetch(avatarUrl, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'image/*,*/*',
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!response.ok) {
            throw new Error('Não foi possível carregar a foto de perfil.');
        }

        const blob = await response.blob();

        if (currentAvatarObjectUrl) {
            URL.revokeObjectURL(currentAvatarObjectUrl);
        }

        currentAvatarObjectUrl = URL.createObjectURL(blob);
        return currentAvatarObjectUrl;
    }

    window.addEventListener('beforeunload', () => {
        if (currentAvatarObjectUrl) {
            URL.revokeObjectURL(currentAvatarObjectUrl);
        }
    });

    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Erro ao ler imagem selecionada.'));

            reader.readAsDataURL(file);
        });
    }

    // Trava contra imagens quebradas
    if (profileAvatarImg) {
        profileAvatarImg.onerror = () => {
            const currentSrc = profileAvatarImg.getAttribute('src');

            if (loggedInUser.avatar_preview && currentSrc !== loggedInUser.avatar_preview) {
                setAvatarState(true, loggedInUser.avatar_preview);
                return;
            }

            profileAvatarImg.removeAttribute('src');
            setAvatarState(false);
        };
    }

    function formatUserTypeLabel(type) {
        const map = {
            'ALUNO': 'Aluno',
            'COORDENADOR': 'Coordenador',
            'SECRETARIA': 'Secretaria',
            'ADMINISTRADOR': 'Administrador'
        };

        return map[type] || type;
    }

    async function buscarUsuarioLogado() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/usuarios/me`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (!response.ok) {
                throw new Error('Não foi possível carregar os dados atualizados do usuário.');
            }

            const data = await response.json();

            // Compatível com:
            // { data: usuario }
            // { usuario: usuario }
            // usuario direto
            const usuarioAtualizado = data.data || data.usuario || data;

            const avatarPreviewAtual = loggedInUser.avatar_preview;

            Object.assign(loggedInUser, usuarioAtualizado);

            // Mantém a prévia local apenas se o backend ainda não tiver avatar salvo
            if (!loggedInUser.avatar_url && avatarPreviewAtual) {
                loggedInUser.avatar_preview = avatarPreviewAtual;
            } else {
                delete loggedInUser.avatar_preview;
            }

            localStorage.setItem('userData', JSON.stringify(loggedInUser));
           
            return loggedInUser;
        } catch (error) {
            console.warn('Usando dados locais do usuário:', error);
            return loggedInUser;
        }
    }

    // =======================================================
    // 3. PREENCHIMENTO DOS DADOS DO PERFIL
    // =======================================================

    function populateUserData() {
        const nameElement = document.getElementById('profile-name');
        const emailElement = document.getElementById('profile-email');
        const typeElement = document.getElementById('profile-type');
        const dobElement = document.getElementById('profile-dob');

        if (nameElement) nameElement.textContent = loggedInUser.nome || 'Usuário';
        if (emailElement) emailElement.textContent = loggedInUser.email || '';
        if (typeElement) typeElement.textContent = formatUserTypeLabel(loggedInUser.tipo);

        if (dobElement && loggedInUser.data_nascimento) {
            const [y, m, d] = loggedInUser.data_nascimento.split('-');
            dobElement.textContent = `${d}/${m}/${y}`;
        }

        // Carregamento de Avatar
        (async () => {
            try {
                const avatarDisplayUrl = await resolveAvatarDisplayUrl();

                if (avatarDisplayUrl) {
                    setAvatarState(true, avatarDisplayUrl);
                } else {
                    setAvatarState(false);
                }
            } catch (error) {
                if (loggedInUser.avatar_preview) {
                    setAvatarState(true, loggedInUser.avatar_preview);
                } else {
                    setAvatarState(false);
                }
            }
        })();

        // Dados específicos por papel
        const userType = loggedInUser.tipo;
        const displayId = loggedInUser.cpf || '--';

        if (userType === 'ALUNO') {
            const elCpf = document.getElementById('aluno-cpf');
            const elMat = document.getElementById('aluno-matricula');
            const elCur = document.getElementById('aluno-curso');
            const elFas = document.getElementById('aluno-fase');

            if (elCpf) elCpf.textContent = displayId;
            if (elMat) elMat.textContent = loggedInUser.matricula || '--';
            if (elCur) elCur.textContent = loggedInUser.curso?.nome || '--';
            if (elFas) elFas.textContent = loggedInUser.fase ? `${loggedInUser.fase}ª` : '--';
            
            fetchProgress();
        } 
        else if (userType === 'COORDENADOR') {
            const elCoordCurso = document.getElementById('coord-curso');
            const elCoordId = document.getElementById('coord-id');

            if (elCoordCurso) {
                elCoordCurso.textContent =
                    loggedInUser.curso_coordenado?.nome ||
                    loggedInUser.curso?.nome ||
                    '--';
            }

            if (elCoordId) elCoordId.textContent = displayId;
        } 
        else if (userType === 'SECRETARIA') {
            const elSecId = document.getElementById('secretaria-id');
            if (elSecId) elSecId.textContent = displayId;
        } 
        else if (userType === 'ADMINISTRADOR') {
            const elAdminId = document.getElementById('admin-id');
            if (elAdminId) elAdminId.textContent = displayId;
        }
    }

    // =======================================================
    // 4. LÓGICA DE PROGRESSO (APENAS ALUNO)
    // =======================================================

    async function fetchProgress() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/usuarios/${loggedInUser.id}/progresso`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (!response.ok) return;

            const data = await response.json();

            const totalReq = data.horas_necessarias || 200;
            const totalApp = data.total_horas_aprovadas || 0;
            const percentage = Math.min((totalApp / totalReq) * 100, 100);

            const progressBar = document.querySelector('.progress-bar-fill');
            const progressLabel = document.querySelector('.progress-label');
            const breakdown = document.getElementById('progress-breakdown');

            if (progressBar) progressBar.style.width = `${percentage}%`;
            if (progressLabel) progressLabel.textContent = `${totalApp} / ${totalReq} Horas`;

            if (breakdown && data.horas_por_categoria) {
                breakdown.innerHTML = '';

                Object.entries(data.horas_por_categoria).forEach(([categoria, horas]) => {
                    const catPerc = Math.min((horas / totalReq) * 100, 100);

                    breakdown.insertAdjacentHTML('beforeend', `
                        <div class="area-progress">
                            <div class="area-label">
                                <span>${categoria}</span>
                                <span>${horas}h (${catPerc.toFixed(1)}%)</span>
                            </div>
                            <div class="mini-progress-bar">
                                <div class="mini-progress-bar-fill" style="width: ${catPerc}%;"></div>
                            </div>
                        </div>
                    `);
                });
            }
        } catch (e) {
            console.error('Erro ao carregar progresso:', e);
        }
    }

    // =======================================================
    // 5. LÓGICA DO AVATAR (UPLOAD E REMOÇÃO)
    // =======================================================
    
    if (avatarWrapper) {
        // Abre/Fecha o menu de ações do avatar
        avatarWrapper.addEventListener('click', (e) => {
            if (
                avatarMenu &&
                !e.target.closest('#avatar-menu') &&
                !e.target.closest('#avatar-input')
            ) {
                avatarMenu.style.display = avatarMenu.style.display === 'block' ? 'none' : 'block';
            }
        });

        document.addEventListener('click', (e) => {
            if (avatarMenu && !avatarWrapper.contains(e.target)) {
                avatarMenu.style.display = 'none';
            }
        });

        if (uploadBtn && avatarInput) {
            uploadBtn.addEventListener('click', () => avatarInput.click());
        }

        // Upload da Imagem
        if (avatarInput) {
            avatarInput.addEventListener('change', async (event) => {
                const file = event.target.files[0];

                if (!file) return;

                if (!file.type.startsWith('image/')) {
                    showToast('Selecione um arquivo de imagem.', 'error');
                    avatarInput.value = '';
                    return;
                }

                const maxAvatarSize = 2 * 1024 * 1024; // 2 MB

                if (file.size > maxAvatarSize) {
                    showToast('A foto de perfil deve ter no máximo 2 MB.', 'error');
                    avatarInput.value = '';
                    return;
                }

                if (avatarMenu) {
                    avatarMenu.style.display = 'none';
                }

                const previousUserData = { ...loggedInUser };
                const originalBtn = uploadBtn ? uploadBtn.innerHTML : '';

                try {
                    const localPreview = await readFileAsDataURL(file);

                    loggedInUser.avatar_preview = localPreview;
                    localStorage.setItem('userData', JSON.stringify(loggedInUser));
                    setAvatarState(true, localPreview);

                    if (uploadBtn) {
                        uploadBtn.disabled = true;
                        uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
                    }

                    const formData = new FormData();
                    formData.append('avatar', file);

                    const response = await fetch(`${API_BASE_URL}/api/usuarios/avatar`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'Accept': 'application/json',
                            'ngrok-skip-browser-warning': 'true'
                        },
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao salvar foto.');
                    }

                    const result = await response.json();

                    const avatarUrlRetornada =
                        result.avatar_url ||
                        result.data?.avatar_url ||
                        result.usuario?.avatar_url ||
                        result.data?.usuario?.avatar_url;

                    if (avatarUrlRetornada) {
                        loggedInUser.avatar_url = avatarUrlRetornada;
                    }

                    // Guarda a pré-visualização local no cache do navegador
                    // Isto impede que a imagem fique em branco nas próximas navegações rápidas
                    loggedInUser.avatar_preview = localPreview;
                    localStorage.setItem('userData', JSON.stringify(loggedInUser));

                    // Mantém a imagem que o utilizador escolheu visível na tela
                    // sem forçar uma nova requisição ao servidor
                    setAvatarState(true, localPreview);

                    showToast('Foto de perfil atualizada!');

                } catch (error) {
                    Object.keys(loggedInUser).forEach(key => delete loggedInUser[key]);
                    Object.assign(loggedInUser, previousUserData);

                    localStorage.setItem('userData', JSON.stringify(loggedInUser));

                    const fallbackAvatar = getAvatarDisplayUrl();

                    if (fallbackAvatar) {
                        setAvatarState(true, fallbackAvatar);
                    } else {
                        setAvatarState(false);
                    }

                    showToast(error.message || 'Erro ao salvar foto.', 'error');
                } finally {
                    if (uploadBtn) {
                        uploadBtn.disabled = false;
                        uploadBtn.innerHTML = originalBtn;
                    }

                    avatarInput.value = '';
                }
            });
        }

        // === LÓGICA DO BOTÃO REMOVER ===
        if (removeBtn) {
            removeBtn.addEventListener('click', async () => {
                const confirmed = await showConfirmModal(
                    'Remover Foto de Perfil',
                    'Tem certeza que deseja remover sua foto de perfil? Esta ação não pode ser desfeita.',
                    'Sim, remover',
                    'danger'
                );
                if (!confirmed) return;

                const originalBtnText = removeBtn.innerHTML;
                removeBtn.disabled = true;
                removeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Removendo...';

                try {
                    const formData = new FormData();
                    formData.append('_method', 'DELETE');

                    const response = await fetch(`${API_BASE_URL}/api/usuarios/avatar`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'Accept': 'application/json',
                            'ngrok-skip-browser-warning': 'true'
                        },
                        body: formData
                    });

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));
                        throw new Error(errorData.message || 'Erro ao remover a foto.');
                    }

                    loggedInUser.avatar_url = null;
                    delete loggedInUser.avatar_preview;
                    localStorage.setItem('userData', JSON.stringify(loggedInUser));

                    setAvatarState(false);
                    showToast('Foto de perfil removida com sucesso!', 'success');

                } catch (error) {
                    showToast(error.message || 'Não foi possível remover a foto.', 'error');
                } finally {
                    removeBtn.disabled = false;
                    removeBtn.innerHTML = originalBtnText;
                }
            });
        }
    }

    // =======================================================
    // 6. ALTERAÇÃO DE SENHA
    // =======================================================

    const passwordModal = document.getElementById('password-modal');

    if (passwordModal) {
        const changePasswordBtn = document.getElementById('change-password-btn');
        const passwordForm = document.getElementById('password-form');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const cancelBtn = document.getElementById('cancel-btn');

        const current = document.getElementById('current-password');
        const newVal = document.getElementById('new-password');
        const confirm = document.getElementById('confirm-password');

        function criarErroSenha() {
            let errorBox = document.getElementById('password-modal-error');

            if (!errorBox && passwordForm) {
                errorBox = document.createElement('div');
                errorBox.id = 'password-modal-error';
                errorBox.className = 'password-modal-error';
                errorBox.style.display = 'none';

                const footer = passwordForm.querySelector('.modal-footer');

                if (footer) {
                    passwordForm.insertBefore(errorBox, footer);
                } else {
                    passwordForm.appendChild(errorBox);
                }
            }

            return errorBox;
        }

        function mostrarErroSenha(mensagem) {
            const errorBox = criarErroSenha();

            if (!errorBox) return;

            errorBox.textContent = mensagem;
            errorBox.style.display = 'block';
        }

        function limparErroSenha() {
            const errorBox = criarErroSenha();

            if (errorBox) {
                errorBox.textContent = '';
                errorBox.style.display = 'none';
            }

            [current, newVal, confirm].forEach(input => {
                if (input) {
                    toggleError(input, false);
                }
            });
        }

        function fecharModalSenha() {
            limparErroSenha();

            if (passwordForm) {
                passwordForm.reset();
            }

            passwordModal.close();
        }

        function validarFormularioSenha() {
            limparErroSenha();

            const senhaAtual = current?.value.trim() || '';
            const novaSenha = newVal?.value.trim() || '';
            const confirmarSenha = confirm?.value.trim() || '';

            if (!senhaAtual) {
                toggleError(current, true);
                mostrarErroSenha('Informe sua senha atual.');
                current.focus();
                return false;
            }

            if (!novaSenha) {
                toggleError(newVal, true);
                mostrarErroSenha('Informe a nova senha.');
                newVal.focus();
                return false;
            }

            if (novaSenha.length < 8) {
                toggleError(newVal, true);
                mostrarErroSenha('A nova senha deve ter no mínimo 8 caracteres.');
                newVal.focus();
                return false;
            }

            if (!confirmarSenha) {
                toggleError(confirm, true);
                mostrarErroSenha('Confirme a nova senha.');
                confirm.focus();
                return false;
            }

            if (novaSenha !== confirmarSenha) {
                toggleError(newVal, true);
                toggleError(confirm, true);
                mostrarErroSenha('A nova senha e a confirmação devem ser iguais.');
                confirm.focus();
                return false;
            }

            return true;
        }

        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', () => {
                limparErroSenha();

                if (passwordForm) {
                    passwordForm.reset();
                }

                passwordModal.showModal();
            });
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', fecharModalSenha);
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', fecharModalSenha);
        }

        [current, newVal, confirm].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    toggleError(input, false);

                    const errorBox = document.getElementById('password-modal-error');
                    if (errorBox) {
                        errorBox.textContent = '';
                        errorBox.style.display = 'none';
                    }
                });
            }
        });

        passwordModal.addEventListener('click', (e) => {
            if (e.target === passwordModal) {
                fecharModalSenha();
            }
        });

        passwordModal.addEventListener('cancel', () => {
            limparErroSenha();

            if (passwordForm) {
                passwordForm.reset();
            }
        });

        if (passwordForm) {
            passwordForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (!validarFormularioSenha()) {
                    return;
                }

                const submitBtn = passwordForm.querySelector('button[type="submit"]');
                const originalSubmitText = submitBtn ? submitBtn.innerHTML : '';

                try {
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
                    }

                    const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
                        method: 'POST',
                        headers: { 
                            'Authorization': `Bearer ${authToken}`, 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'ngrok-skip-browser-warning': 'true'
                        },
                        body: JSON.stringify({
                            current_password: current.value,
                            password: newVal.value,
                            password_confirmation: confirm.value
                        })
                    });

                    if (response.ok || response.status === 204) {
                        fecharModalSenha();
                        showToast('Senha alterada com sucesso!');
                        return;
                    }

                    let res = {};

                    try {
                        res = await response.json();
                    } catch (error) {}

                    mostrarErroSenha(res.message || 'Não foi possível alterar a senha. Verifique a senha atual e tente novamente.');
                } catch (err) {
                    mostrarErroSenha(err.message || 'Erro ao alterar senha.');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalSubmitText;
                    }
                }
            });
        }
    }

    // =======================================================
    // 7. SUMÁRIOS DE CARGO (ESTATÍSTICAS)
    // =======================================================

    async function loadSummaries() {
        const userType = loggedInUser.tipo;

        if (userType === 'COORDENADOR') {
            try {
                const [p, a] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/certificados?status=ENTREGUE`, {
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'ngrok-skip-browser-warning': 'true'
                        }
                    }),
                    fetch(`${API_BASE_URL}/api/certificados?status=APROVADO`, {
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'ngrok-skip-browser-warning': 'true'
                        }
                    })
                ]);

                const dp = await p.json();
                const da = await a.json();

                const lp = Array.isArray(dp) ? dp : (dp.data || []);
                const la = Array.isArray(da) ? da : (da.data || []);
                
                if (document.getElementById('summary-pendencias')) {
                    document.getElementById('summary-pendencias').textContent = lp.length;
                }

                if (document.getElementById('summary-horas')) {
                    document.getElementById('summary-horas').textContent =
                        la.reduce((s, c) => s + (Number(c.horas_validadas) || 0), 0);
                }
            } catch (error) {
                console.warn('Erro ao carregar resumo do coordenador:', error);
            }
        } 
        else if (userType === 'SECRETARIA') {
            try {
                const r = await fetch(`${API_BASE_URL}/api/usuarios`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                const d = await r.json();
                const l = Array.isArray(d) ? d : (d.data || []);

                if (document.getElementById('summary-alunos')) {
                    document.getElementById('summary-alunos').textContent =
                        l.filter(u => u.tipo === 'ALUNO').length;
                }

                if (document.getElementById('summary-coords')) {
                    document.getElementById('summary-coords').textContent =
                        l.filter(u => u.tipo === 'COORDENADOR').length;
                }
            } catch (error) {
                console.warn('Erro ao carregar resumo da secretaria:', error);
            }
        }
    }

    // =======================================================
    // 8. INICIALIZAÇÃO DA PÁGINA
    // =======================================================

    buscarUsuarioLogado().then(() => {
        populateUserData();
        loadSummaries();
    });
});
```

## Arquivo: js\utils.js
```javascript
// js/utils.js

// =======================================================
// 1. CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
// =======================================================

const urlParams = new URLSearchParams(window.location.search);
const apiFromUrl = urlParams.get('api');

const isLocalFrontend =
    ['localhost', '127.0.0.1', ''].includes(window.location.hostname) ||
    window.location.protocol === 'file:';

const LOCAL_API_URL = 'http://localhost:8000';

const PRODUCTION_API_URL = 'https://panoramic-figure-mushroom.ngrok-free.dev';

let savedApiUrl = localStorage.getItem('API_BASE_URL');

if (apiFromUrl) {
    savedApiUrl = apiFromUrl.replace(/\/$/, '');
    localStorage.setItem('API_BASE_URL', savedApiUrl);
}

if (!savedApiUrl || savedApiUrl.includes('localhost') || savedApiUrl.includes('127.0.0.1')) {
    savedApiUrl = isLocalFrontend ? LOCAL_API_URL : PRODUCTION_API_URL;
    localStorage.setItem('API_BASE_URL', savedApiUrl);
}

const API_BASE_URL = savedApiUrl.replace(/\/$/, '');

const authToken = localStorage.getItem('authToken');
const loggedInUser = JSON.parse(localStorage.getItem('userData') || '{}');

// =======================================================
// CONTROLE DE ACESSO POR PERFIL
// =======================================================

const ROTAS_POR_PERFIL = {
    ALUNO: 'dashboard-alunos.html',
    COORDENADOR: 'dashboard-coordenador.html',
    SECRETARIA: 'dashboard-secretaria.html',
    ADMINISTRADOR: 'dashboard-administrador.html'
};

const PERFIS_POR_PAGINA = {
    'dashboard-alunos.html': ['ALUNO'],
    'cadastro-horas.html': ['ALUNO'],
    'historico-aluno.html': ['ALUNO'],
    'perfil-alunos.html': ['ALUNO'],

    'dashboard-coordenador.html': ['COORDENADOR'],
    'validar-horas.html': ['COORDENADOR'],
    'historico-coordenador.html': ['COORDENADOR'],
    'perfil-coordenador.html': ['COORDENADOR'],

    'dashboard-secretaria.html': ['SECRETARIA'],
    'gerenciar-alunos.html': ['SECRETARIA'],
    'historico-secretaria.html': ['SECRETARIA'],
    'perfil-secretaria.html': ['SECRETARIA'],

    'dashboard-administrador.html': ['ADMINISTRADOR'],
    'gerenciar-usuarios.html': ['ADMINISTRADOR'],
    'configuracoes-sistema.html': ['ADMINISTRADOR'],
    'perfil-administrador.html': ['ADMINISTRADOR']
};

function obterPaginaAtual() {
    const path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
}

function redirecionarParaDashboardDoPerfil() {
    const tipo = loggedInUser?.tipo;
    const dashboard = ROTAS_POR_PERFIL[tipo] || 'index.html';
    window.location.href = dashboard;
}

function verificarPerfilDaPagina() {
    const paginaAtual = obterPaginaAtual();

    if (paginaAtual === 'index.html' || paginaAtual === 'login.html' || paginaAtual === '') {
        return;
    }

    const perfisPermitidos = PERFIS_POR_PAGINA[paginaAtual];

    if (!perfisPermitidos) {
        return;
    }

    const tipoUsuario = loggedInUser?.tipo;

    if (!tipoUsuario || !perfisPermitidos.includes(tipoUsuario)) {
        showToast('Você não tem permissão para acessar esta página.', 'error');

        setTimeout(() => {
            redirecionarParaDashboardDoPerfil();
        }, 800);
    }
}

/**
 * Verifica se o usuário possui um token. Caso contrário, redireciona para o login.
 */
function verificarAutenticacao() {
    if (!authToken) {
        const path = window.location.pathname;

        if (!path.endsWith('index.html') && !path.endsWith('login.html') && path !== '/') {
            window.location.href = 'login.html';
            return false;
        }
    }

    return true;
}
if (verificarAutenticacao()) {
    verificarPerfilDaPagina();
}

// =======================================================
// 2. TRATAMENTO DE DADOS E FORMATAÇÃO
// =======================================================

/**
 * Padroniza a URL dos arquivos (PDF/Imagens) vindos do servidor.
 */
function formatFileUrl(rawPath) {
    if (!rawPath) return '';

    const apiBase = API_BASE_URL.replace(/\/$/, '');

    if (rawPath.startsWith('http')) {
        try {
            const url = new URL(rawPath);

            // Se a API devolver um link absoluto do próprio backend,
            // reconstrói usando o API_BASE_URL correto, com https.
            if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/storage/')) {
                return `${apiBase}${url.pathname}${url.search}`;
            }

            // Proteção extra para ngrok
            if (url.hostname.includes('ngrok-free.dev') || url.hostname.includes('ngrok-free.app')) {
                url.protocol = 'https:';
                return url.toString();
            }

            return rawPath;
        } catch (e) {
            return rawPath;
        }
    }

    if (rawPath.startsWith('/api/') || rawPath.startsWith('/storage/')) {
        return `${apiBase}${rawPath}`;
    }

    if (rawPath.startsWith('api/') || rawPath.startsWith('storage/')) {
        return `${apiBase}/${rawPath}`;
    }

    let cleanPath = rawPath
        .replace(/^public\//, '')
        .replace(/^\/?storage\//, '');

    if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
    }

    return `${apiBase}/storage/${cleanPath}`;
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

async function getApiErrorMessage(response, fallback = 'Erro na operação.') {
    try {
        const data = await response.json();

        if (data.errors) {
            return Object.values(data.errors).flat().join('\n');
        }

        return data.message || fallback;
    } catch {
        if (response.status === 403) return 'Você não tem permissão para esta ação.';
        if (response.status === 422) return 'Verifique os dados enviados.';
        if (response.status === 401) return 'Sessão expirada. Faça login novamente.';
        return fallback;
    }
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

    if ( path.includes('manual.html') || path.includes('index.html') || path.includes('login.html') || path === '/') return;

    const helpBtn = document.createElement('a');
    helpBtn.className = 'floating-help-btn';
    helpBtn.innerHTML = '<i class="fas fa-question"></i>';
    helpBtn.title = 'Ajuda desta página';

    let anchor = '#comum';

    if (path.includes('cadastro-horas')) anchor = '#aluno-cadastrar';
    else if (path.includes('historico-aluno')) anchor = '#aluno-historico';
    else if (path.includes('validar-horas')) anchor = '#coord-validar';
    else if (path.includes('historico-coordenador')) anchor = '#coord-historico';
    else if (path.includes('historico-secretaria')) anchor = '#secretaria-historico';
    else if (path.includes('gerenciar-alunos')) anchor = '#secretaria-gerenciar';
    else if (path.includes('gerenciar-usuarios')) anchor = '#admin-usuarios';
    else if (path.includes('configuracoes')) anchor = '#admin-config';
    else if (path.includes('dashboard-alunos')) anchor = '#aluno-dashboard';
    else if (path.includes('dashboard-coordenador')) anchor = '#coord-dashboard';
    else if (path.includes('dashboard-secretaria')) anchor = '#secretaria-dashboard';
    else if (path.includes('dashboard-administrador')) anchor = '#admin-dashboard';
    else if (path.includes('perfil')) anchor = '#perfil';

    helpBtn.href = `manual.html${anchor}`;

    helpBtn.addEventListener('click', () => {
        sessionStorage.setItem('manualReturnUrl', window.location.href);
    });

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

// =======================================================
// PRÉ-CARREGAMENTO DE PÁGINAS INTERNAS
// =======================================================

function preCarregarPaginasInternas() {
    if (!authToken || !loggedInUser?.tipo) return;

    const paginasPorPerfil = {
        ALUNO: [
            'dashboard-alunos.html',
            'cadastro-horas.html',
            'historico-aluno.html',
            'perfil-alunos.html',
            'manual.html'
        ],

        COORDENADOR: [
            'dashboard-coordenador.html',
            'validar-horas.html',
            'historico-coordenador.html',
            'perfil-coordenador.html',
            'manual.html'
        ],

        SECRETARIA: [
            'dashboard-secretaria.html',
            'gerenciar-alunos.html',
            'historico-secretaria.html',
            'perfil-secretaria.html',
            'manual.html'
        ],

        ADMINISTRADOR: [
            'dashboard-administrador.html',
            'gerenciar-usuarios.html',
            'configuracoes-sistema.html',
            'perfil-administrador.html',
            'manual.html'
        ]
    };

    const paginas = paginasPorPerfil[loggedInUser.tipo] || [];
    const paginaAtual = obterPaginaAtual();

    paginas
        .filter(pagina => pagina !== paginaAtual)
        .forEach(pagina => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = pagina;
            link.as = 'document';
            document.head.appendChild(link);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(preCarregarPaginasInternas);
    } else {
        setTimeout(preCarregarPaginasInternas, 1000);
    }
});

function buildQueryParams(filters = {}) {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '' && value !== 'null') {
            params.append(key, value);
        }
    });
    
    return params.toString();
}

// =======================================================
// 6. CALENDÁRIO CUSTOMIZADO SHC
// =======================================================

function setupDatePicker(wrapperId, hiddenInputId, displaySpanId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    const hiddenInput = document.getElementById(hiddenInputId);
    const displaySpan = document.getElementById(displaySpanId);
    const trigger = wrapper.querySelector('.date-picker-trigger');
    const calendar = wrapper.querySelector('.shc-calendar');

    if (!trigger || !calendar || !hiddenInput) return;

    const meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

    let mesAtual = new Date().getMonth();
    let anoAtual = new Date().getFullYear();

    function pad(n) { return String(n).padStart(2, '0'); }

    function formatarBR(data) {
        return `${pad(data.getDate())}/${pad(data.getMonth()+1)}/${data.getFullYear()}`;
    }

    function formatarISO(data) {
        return `${data.getFullYear()}-${pad(data.getMonth()+1)}-${pad(data.getDate())}`;
    }

    function renderizarCalendario() {
        const title = calendar.querySelector('.shc-calendar-title');
        const daysContainer = calendar.querySelector('.shc-calendar-days');

        title.textContent = `${meses[mesAtual]} de ${anoAtual}`;
        daysContainer.innerHTML = '';

        const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
        const ultimoDia = new Date(anoAtual, mesAtual + 1, 0).getDate();

        for (let i = 0; i < primeiroDia; i++) {
            const empty = document.createElement('span');
            empty.className = 'shc-calendar-empty';
            daysContainer.appendChild(empty);
        }

        for (let dia = 1; dia <= ultimoDia; dia++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'shc-calendar-day';
            btn.textContent = dia;

            const data = new Date(anoAtual, mesAtual, dia);
            const iso = formatarISO(data);

            if (hiddenInput.value === iso) btn.classList.add('is-selected');

            btn.addEventListener('click', () => {
                hiddenInput.value = iso;
                displaySpan.textContent = formatarBR(data);
                calendar.hidden = true;
            });

            daysContainer.appendChild(btn);
        }
    }

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        calendar.hidden = !calendar.hidden;
        if (!calendar.hidden) renderizarCalendario();
    });

    // Navegação
    calendar.querySelectorAll('.shc-calendar-nav').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.action === 'prev') {
                mesAtual--;
                if (mesAtual < 0) { mesAtual = 11; anoAtual--; }
            } else {
                mesAtual++;
                if (mesAtual > 11) { mesAtual = 0; anoAtual++; }
            }
            renderizarCalendario();
        });
    });

    calendar.querySelector('.shc-calendar-today').addEventListener('click', () => {
        const hoje = new Date();
        mesAtual = hoje.getMonth();
        anoAtual = hoje.getFullYear();
        hiddenInput.value = formatarISO(hoje);
        displaySpan.textContent = formatarBR(hoje);
        calendar.hidden = true;
    });

    calendar.querySelector('.shc-calendar-clear').addEventListener('click', () => {
        hiddenInput.value = '';
        displaySpan.textContent = 'dd/mm/aaaa';
        calendar.hidden = true;
    });

    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) calendar.hidden = true;
    });
}
```

## Arquivo: js\validar-horas.js
```javascript
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
            const filters = {
                status: 'ENTREGUE',
                search: document.getElementById('aluno').value.trim(),
                matricula: document.getElementById('matricula').value.trim(),
                fase: faseSelect ? faseSelect.value : ''
            };

            const queryString = buildQueryParams(filters);
            const url = `${API_BASE_URL}/api/certificados${queryString ? '?' + queryString : ''}`;

            const response = await fetch(url, {
                headers: { 
                    'Authorization': `Bearer ${authToken}`, 
                    'Accept': 'application/json', 
                    'ngrok-skip-browser-warning': 'true' 
                }
            });
            
            if (!response.ok) throw new Error('Falha ao buscar solicitações entregues.');

            const result = await response.json();
            const pendingCertificates = result.data || result;

            if (!Array.isArray(pendingCertificates) || pendingCertificates.length === 0) {
                const searchTerm = document.getElementById('aluno').value.trim();
                const matriculaTerm = document.getElementById('matricula').value.trim();
                const faseValue = faseSelect ? faseSelect.value : '';
                
                let mensagem = 'Nenhuma solicitação entregue para validação no momento.';
                
                if (searchTerm || matriculaTerm || faseValue) {
                    mensagem = 'Nenhum aluno encontrado com os filtros aplicados.';
                }
                
                studentListTbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">${mensagem}</td></tr>`;
                return;
            }

            // Agrupamento por aluno
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

            const studentsArray = Object.values(studentsMap);

            // Esta verificação raramente será atingida, mas mantemos por segurança
            if (studentsArray.length === 0) {
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

                                <div class="pdf-preview-area" data-cert-id="${cert.id}">
                                    <div class="pdf-preview-state">
                                        <i class="fas fa-spinner fa-spin"></i>
                                        <span>Carregando comprovante...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            });

            setupAccordion();
            carregarPreviewsPdf();

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

        async function carregarPreviewsPdf() {
        const previewAreas = document.querySelectorAll('.pdf-preview-area[data-cert-id]');

        for (const area of previewAreas) {
            const certId = area.dataset.certId;

            if (!certId) {
                mostrarPreviewIndisponivel(area, 'ID do certificado não encontrado.');
                continue;
            }

            const fileUrl = `${API_BASE_URL}/api/certificados/${certId}/arquivo`;

            try {
                const response = await fetch(fileUrl, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Accept': 'application/pdf,application/octet-stream,*/*',
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                const contentType = response.headers.get('content-type') || '';

                if (!response.ok) {
                    throw new Error(`Erro ${response.status} ao carregar comprovante.`);
                }

                if (contentType.includes('text/html')) {
                    throw new Error('O servidor retornou HTML em vez do PDF.');
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

    async function handleEvaluation(certificateId, newStatus, studentId, studentName) {
        const panel = document.querySelector(`.validation-panel[data-cert-id="${certificateId}"]`);
        
        const categoriaValue = panel.querySelector('.edit-categoria').value;
        const categoriaId = parseInt(categoriaValue, 10);

        const payload = {
            status: newStatus,
            horas_validadas: parseInt(panel.querySelector('.horas-validadas').value, 10) || 0,
            observacao: panel.querySelector('.observacao').value || '',
            nome_certificado: panel.querySelector('.edit-nome').value,
            instituicao: panel.querySelector('.edit-instituicao').value,
            data_emissao: panel.querySelector('.edit-data').value,
            carga_horaria_solicitada: parseInt(panel.querySelector('.edit-carga').value, 10) || 0
        };

        if (categoriaId) {
            payload.categoria_id = categoriaId;
        }

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

    // Botão Filtrar
    if (filterBtn) {
        filterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetchAndRenderStudents();
        });
    }

    // Suporte ao pressionar ENTER nos campos de filtro
    const filterInputs = [
        document.getElementById('aluno'),
        document.getElementById('matricula'),
        faseSelect
    ];

    filterInputs.forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    fetchAndRenderStudents();
                }
            });
        }
    });

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

```

## Arquivo: login.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Sistemas de Horas Complementares - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default dotted-background layout-login">
    <main class="login-card">
        <div id="login-form-wrapper" class="form-wrapper">
            <div class="logo login-img-logo-wrapper">
                <img src="logo.png" alt="Logo SHC" class="login-logo">
            </div>
            <p class="login-title">Acesse sua conta</p>

            <form id="login-form" novalidate>
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="fas fa-user prefix-icon"></i>
                        <input
                            type="text"
                            id="cpf"
                            placeholder="CPF (apenas números)"
                            maxlength="14"
                            required
                            inputmode="numeric"
                            autocomplete="username"
                        >
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="fas fa-lock prefix-icon"></i>
                        <input
                            type="password"
                            id="password"
                            placeholder="Senha"
                            required
                            autocomplete="current-password"
                        >
                        <i id="password-toggle" class="fas fa-eye-slash password-toggle"></i>
                    </div>
                </div>
                <button type="submit" class="btn-full">Entrar</button>
            </form>

            <a id="first-access-link" class="link-action first-access-highlight">
                <i class="fas fa-key" aria-hidden="true"></i>
                <span>
                    <strong>É seu primeiro acesso?</strong>
                    Veja como entrar.
                </span>
            </a>

            <a id="forgot-password-link" class="link-action">Esqueceu a senha?</a>
        </div>

        <div id="recovery-form-wrapper" class="form-wrapper hidden">
            <h1 class="logo-header">FMP <span>| SHC</span></h1>
            <p class="login-title">Redefinição de Senha</p>

            <div class="modal-content-body">
                <div class="modal-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <p>
                    Para alterar ou recuperar sua senha, dirija-se à Secretaria Acadêmica
                    da instituição e solicite a redefinição de acesso.
                </p>

                <div class="instruction-box">
                    <label>Importante</label>
                    <div class="credential-info">
                        <span>Leve um documento oficial com foto para confirmar sua identidade.</span>
                    </div>
                </div>
            </div>

            <a id="back-to-login-link1" class="link-action">Voltar para o Login</a>
        </div>

        <dialog id="first-access-modal">
            <div class="modal-header">
                <h2 class="modal-title">Primeiro Acesso</h2>
                <button id="close-modal-btn" class="close-btn" aria-label="Fechar">&times;</button>
            </div>

            <div class="modal-content-body">
                <div class="modal-icon">
                    <i class="fas fa-key"></i>
                </div>
                <p>Seu acesso ao sistema já foi criado. Utilize os dados abaixo para entrar:</p>

                <div class="instruction-box">
                    <label>Usuário</label>
                    <div class="credential-info">
                        <span>Seu número de CPF</span>
                    </div>
                </div>

                <div class="instruction-box">
                    <label>Senha</label>
                    <div class="credential-info">
                        <span>Sua data de nascimento (DDMMAAAA)</span>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button id="confirm-close-btn" class="btn btn-primary">OK, entendi!</button>
            </div>
        </dialog>

        <dialog id="password-reset-modal">
            <div class="modal-header">
                <h2 class="modal-title">Redefinição de Senha</h2>
                <button id="close-password-reset-btn" class="close-btn" aria-label="Fechar">&times;</button>
            </div>

            <div class="modal-content-body">
                <div class="modal-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <p>
                    Para alterar ou recuperar sua senha, dirija-se à Secretaria Acadêmica
                    da instituição e solicite a redefinição de acesso.
                </p>

                <div class="instruction-box">
                    <label>Importante</label>
                    <div class="credential-info">
                        <span>Leve um documento oficial com foto para confirmar sua identidade.</span>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button id="password-reset-ok-btn" class="btn btn-primary">OK, entendi!</button>
            </div>
        </dialog>
    </main>

    <script src="js/utils.js"></script>
    <script src="js/login.js"></script>
</body>
</html>
```

## Arquivo: manual.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manual do Usuário - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
    <style>
        .manual-grid { display: grid; grid-template-columns: 280px 1fr; gap: 4rem; align-items: start; margin-top: 2rem; }
        .manual-sidebar { position: sticky; top: 10rem; background: var(--glass-bg); padding: 2rem; border-radius: 1.6rem; border: 1px solid var(--glass-border); }
        .manual-nav { display: flex; flex-direction: column; gap: 1rem; }
        .manual-nav a { color: var(--text-secondary); text-decoration: none; padding: 1rem; border-radius: 0.8rem; transition: 0.3s; font-size: 1.4rem; }
        .manual-nav a:hover { background: var(--primary-glow-transparent); color: var(--primary-glow); }
        .manual-nav a.active { background: var(--primary-glow); color: #fff; }
        .manual-section { margin-bottom: 5rem; scroll-margin-top: 11rem; }
        .manual-section h2 { color: var(--primary-glow); margin-bottom: 2rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 1rem; }
        @media (max-width: 900px) { .manual-grid { grid-template-columns: 1fr; } .manual-sidebar { display: none; } }
        .manual-content .accordion-content .content-wrapper { display: block !important; width: 100% !important; padding: 2rem 0 !important; }
        .manual-content .accordion-content p { width: 100% !important; max-width: none !important; line-height: 1.6 !important; margin: 0 0 1.2rem 0 !important; text-align: justify; }
        .manual-content .accordion-content ul,
        .manual-content .accordion-content ol { margin: 0 0 1.4rem 2.4rem; padding: 0; color: var(--text-secondary); font-size: 1.45rem; line-height: 1.7; }
        .manual-content .accordion-content li { margin-bottom: 0.6rem; }
        .manual-content .accordion-content strong { color: var(--text-primary); }
        .manual-content .accordion-header h3 { white-space: normal !important; line-height: 1.4 !important; }
        .manual-content .accordion-header .header-title { flex: 1 1 auto !important; }
        .manual-note { margin-top: 1.2rem; padding: 1.2rem 1.4rem; border-radius: 1rem; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.04); color: var(--text-secondary); font-size: 1.35rem; line-height: 1.6; }
    </style>
</head>
<body class="theme-default dotted-background">
    <header class="header">
        <div class="logo"><img src="logo.png" alt="Logo SHC" class="header-logo"></div>
        <a href="#" id="manual-back-btn" class="logout-btn"><i class="fas fa-arrow-left"></i> Voltar</a>
    </header>

    <main class="main-container">
        <h1 class="page-title"><i class="fas fa-book"></i> Manual do Usuário</h1>

        <div class="manual-grid">
            <aside class="manual-sidebar">
                <nav class="manual-nav">
                    <a href="#comum" class="active" data-manual-link="comum">Acesso e Login</a>
                    <a href="#perfil" data-manual-link="perfil">Meu Perfil</a>
                    <a href="#aluno" data-manual-link="aluno">Guia do Aluno</a>
                    <a href="#coord" data-manual-link="coord">Guia do Coordenador</a>
                    <a href="#secretaria" data-manual-link="secretaria">Guia da Secretaria</a>
                    <a href="#admin" data-manual-link="admin">Guia do Administrador</a>
                </nav>
            </aside>

            <div class="manual-content">
                <!-- 1. GUIA COMUM -->
                <section id="comum" class="manual-section" data-manual-section="comum">
                    <h2>Guia Comum a Todos</h2>

                    <div class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Acesso e Login</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O acesso ao Sistema de Horas Complementares (SHC) é realizado por meio de autenticação com CPF e senha. Após o login, o sistema identifica automaticamente o perfil do usuário e direciona para o painel correspondente.</p>
                                <ol>
                                    <li>Acesse a página de login do SHC.</li>
                                    <li>Informe o CPF no campo indicado.</li>
                                    <li>Informe a senha cadastrada.</li>
                                    <li>Clique em <strong>Entrar</strong>.</li>
                                    <li>Aguarde o redirecionamento para o dashboard do seu perfil.</li>
                                </ol>
                                <p>Caso seja o primeiro acesso, utilize o CPF como usuário e a senha padrão informada pela instituição, geralmente correspondente à data de nascimento no formato <strong>DDMMAAAA</strong>, salvo orientação diferente da administração do sistema.</p>
                                <div class="manual-note">Por segurança, recomenda-se alterar a senha no primeiro acesso e não compartilhar suas credenciais com outras pessoas.</div>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Navegação pelo Sistema</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>Após o login, o usuário visualiza apenas as funcionalidades compatíveis com seu perfil de acesso. Essa organização facilita a navegação e evita o acesso a recursos que não fazem parte das responsabilidades do usuário.</p>
                                <ul>
                                    <li>Utilize os cards ou botões do dashboard para acessar as principais funções.</li>
                                    <li>Use o botão de ajuda, quando disponível, para abrir o manual diretamente na seção relacionada à tela atual.</li>
                                    <li>Utilize o botão <strong>Voltar</strong> para retornar à tela anterior ou ao painel de origem.</li>
                                    <li>Ao finalizar o uso, utilize a opção de saída do sistema para encerrar a sessão.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Mensagens, Erros e Confirmações</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O SHC apresenta mensagens de confirmação, alerta ou erro para orientar o usuário durante o uso. Essas mensagens indicam se uma ação foi realizada com sucesso, se algum campo obrigatório não foi preenchido ou se ocorreu alguma falha de comunicação com o servidor.</p>
                                <ul>
                                    <li>Mensagens de sucesso confirmam que a operação foi concluída.</li>
                                    <li>Mensagens de erro indicam que uma ação não pôde ser executada.</li>
                                    <li>Campos destacados indicam dados obrigatórios ou informações preenchidas incorretamente.</li>
                                    <li>Em caso de erro persistente, recomenda-se revisar os dados informados e procurar o setor responsável.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Orientações Gerais de Segurança</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O uso adequado do sistema contribui para a organização, centralização e rastreabilidade das atividades complementares. Cada usuário deve utilizar apenas as funcionalidades compatíveis com seu perfil de acesso.</p>
                                <ul>
                                    <li>Não compartilhe sua senha com terceiros.</li>
                                    <li>Confira os dados antes de enviar cadastros ou avaliações.</li>
                                    <li>Utilize arquivos legíveis e em formato PDF quando solicitado.</li>
                                    <li>Em caso de inconsistência nas informações, entre em contato com o setor responsável pela administração do sistema.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 2. MEU PERFIL -->
                <section id="perfil" class="manual-section" data-manual-section="perfil">
                    <h2>Meu Perfil</h2>
                    
                    <div class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Ações Comuns do perfil</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>A tela de perfil reúne informações de identificação do usuário autenticado. Dependendo do perfil, também pode exibir informações acadêmicas, curso vinculado, progresso de horas ou permissões de acesso.</p>
                                <ul>
                                    <li>Para alterar a <strong>foto</strong>, clique na imagem de perfil e selecione um novo arquivo, quando essa opção estiver disponível.</li>
                                    <li>Para alterar a <strong>senha</strong>, clique no botão correspondente, informe a senha atual e a nova senha.</li>
                                    <li>Após salvar, aguarde a mensagem de confirmação do sistema.</li>
                                    <li>Se algum dado cadastral estiver incorreto, solicite ajuste ao setor responsável.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item" data-manual-section="aluno">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Perfil do Aluno</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O perfil do aluno exibe dados acadêmicos, como matrícula, curso e fase atual. O principal destaque é a barra de progresso, que apresenta a relação entre as horas já validadas e o total exigido para conclusão das atividades complementares.</p>
                                <ul>
                                    <li>Consulte suas informações acadêmicas.</li>
                                    <li>Acompanhe o total de horas aprovadas.</li>
                                    <li>Observe a distribuição das horas por categoria, quando disponível.</li>
                                    <li>Use essas informações para identificar quanto ainda falta para cumprir a carga horária exigida.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item" data-manual-section="coord">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Perfil do Coordenador</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O perfil do coordenador apresenta suas informações de identificação e o curso sob sua responsabilidade. Esse vínculo é utilizado para direcionar as solicitações de atividades complementares que devem ser avaliadas pela coordenação.</p>
                                <ul>
                                    <li>Confira seus dados de identificação.</li>
                                    <li>Verifique o curso vinculado à sua coordenação.</li>
                                    <li>Utilize o menu do sistema para acessar as solicitações pendentes e o histórico do curso.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item" data-manual-section="secretaria">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Perfil da Secretaria</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O perfil da Secretaria Acadêmica exibe os dados do usuário administrativo e confirma seu acesso às funcionalidades de acompanhamento geral e gerenciamento de alunos.</p>
                                <ul>
                                    <li>Consulte suas informações de identificação.</li>
                                    <li>Acesse as funcionalidades administrativas compatíveis com a secretaria.</li>
                                    <li>Utilize o gerenciamento de alunos para manter os dados acadêmicos atualizados.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item" data-manual-section="admin">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Perfil do Administrador</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O perfil do administrador exibe os dados de identificação do usuário responsável pela manutenção geral do sistema. Esse perfil possui acesso ampliado às configurações, aos usuários e aos parâmetros administrativos.</p>
                                <ul>
                                    <li>Consulte suas informações cadastrais.</li>
                                    <li>Altere sua senha quando necessário.</li>
                                    <li>Acesse as áreas de gerenciamento de usuários e configurações do sistema.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 3. ALUNO -->
                <section id="aluno" class="manual-section" data-manual-section="aluno">
                    <h2>Guia do Aluno</h2>

                    <div id="aluno-dashboard" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Painel Principal (Dashboard)</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O dashboard do aluno é a tela inicial após o login. Ele reúne atalhos para as principais funcionalidades utilizadas pelo estudante durante o processo de envio e acompanhamento das atividades complementares.</p>
                                <ul>
                                    <li><strong>Cadastrar Horas:</strong> permite enviar uma nova atividade complementar com comprovante.</li>
                                    <li><strong>Histórico:</strong> permite acompanhar os envios realizados e seus respectivos status.</li>
                                    <li><strong>Meu Perfil:</strong> permite visualizar dados acadêmicos e acompanhar o progresso de horas.</li>
                                </ul>
                                <p>Utilize o painel principal para iniciar novos cadastros, consultar solicitações anteriores ou verificar seu progresso geral.</p>
                            </div>
                        </div>
                    </div>

                    <div id="aluno-cadastrar" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Cadastrar Horas</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>A tela de cadastro de horas complementares substitui o requerimento físico por um formulário digital estruturado. Nela, o aluno registra a atividade realizada e anexa o comprovante correspondente.</p>
                                <ol>
                                    <li>Acesse a opção <strong>Cadastrar Horas</strong> no dashboard do aluno.</li>
                                    <li>Selecione a <strong>categoria da atividade</strong>.</li>
                                    <li>Informe o <strong>nome da atividade</strong>.</li>
                                    <li>Informe a <strong>instituição</strong> responsável pela atividade.</li>
                                    <li>Preencha a <strong>carga horária solicitada</strong>.</li>
                                    <li>Informe a <strong>data de emissão do certificado</strong>.</li>
                                    <li>Anexe o comprovante em formato <strong>PDF</strong>.</li>
                                    <li>Confira os dados informados e clique em <strong>Enviar</strong>.</li>
                                </ol>
                                <p>Após o envio, a solicitação passa a integrar o fluxo de análise e ficará disponível para acompanhamento no histórico do aluno.</p>
                                <div class="manual-note">Antes de enviar, verifique se o arquivo está legível e se as informações do certificado correspondem aos dados preenchidos no formulário.</div>
                            </div>
                        </div>
                    </div>

                    <div id="aluno-historico" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Consultar Histórico</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>A tela de histórico permite acompanhar todas as atividades complementares enviadas pelo aluno, incluindo dados da atividade, carga horária, categoria, comprovante e situação da análise.</p>
                                <ul>
                                    <li><strong>Entregue:</strong> solicitação enviada e aguardando análise.</li>
                                    <li><strong>Aprovado:</strong> solicitação validada pela coordenação.</li>
                                    <li><strong>Reprovado:</strong> solicitação não aceita, geralmente acompanhada de observação.</li>
                                    <li><strong>Aprovado com ressalvas:</strong> solicitação aceita parcialmente ou com observações específicas.</li>
                                </ul>
                                <p>Utilize o histórico para verificar o andamento das solicitações e identificar eventuais observações registradas durante a avaliação.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 4. COORDENADOR -->
                <section id="coord" class="manual-section" data-manual-section="coord">
                    <h2>Guia do Coordenador</h2>

                    <div id="coord-dashboard" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Painel Principal (Dashboard)</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O dashboard do coordenador reúne as funcionalidades necessárias para analisar solicitações enviadas pelos alunos vinculados ao curso sob sua responsabilidade.</p>
                                <ul>
                                    <li><strong>Validar Horas:</strong> acesso às solicitações pendentes de análise.</li>
                                    <li><strong>Histórico do Curso:</strong> consulta de registros já avaliados ou submetidos pelos alunos do curso.</li>
                                    <li><strong>Meu Perfil:</strong> consulta dos dados do coordenador e do curso vinculado.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div id="coord-validar" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Validar Horas</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>A funcionalidade de validação permite que o coordenador analise os certificados enviados pelos alunos e registre o resultado da avaliação no sistema.</p>
                                <ol>
                                    <li>Acesse a opção <strong>Validar Horas</strong>.</li>
                                    <li>Selecione uma solicitação pendente.</li>
                                    <li>Confira os dados informados pelo aluno.</li>
                                    <li>Abra e analise o comprovante em PDF.</li>
                                    <li>Informe a carga horária validada, quando aplicável.</li>
                                    <li>Selecione o resultado da avaliação: <strong>Aprovar</strong>, <strong>Reprovar</strong> ou <strong>Aprovar com Ressalvas</strong>.</li>
                                    <li>Registre uma observação quando necessário, especialmente em reprovações ou aprovações parciais.</li>
                                    <li>Confirme a avaliação.</li>
                                </ol>
                                <p>Após a validação, o status da solicitação é atualizado e fica disponível para consulta no histórico do aluno e nos históricos administrativos.</p>
                            </div>
                        </div>
                    </div>

                    <div id="coord-historico" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Histórico do Curso</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O histórico do curso permite ao coordenador consultar os registros de atividades complementares relacionados aos alunos do curso sob sua coordenação.</p>
                                <ul>
                                    <li>Consulte solicitações já avaliadas.</li>
                                    <li>Verifique status, cargas horárias e observações.</li>
                                    <li>Utilize filtros de busca quando disponíveis para localizar registros específicos.</li>
                                    <li>Acompanhe a evolução das validações realizadas no curso.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 5. SECRETARIA -->
                <section id="secretaria" class="manual-section" data-manual-section="secretaria">
                    <h2>Guia da Secretaria</h2>

                    <div id="secretaria-dashboard" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Painel Principal (Dashboard)</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O dashboard da Secretaria Acadêmica reúne recursos de acompanhamento administrativo e gerenciamento dos dados dos alunos. Esse perfil contribui para manter as informações acadêmicas organizadas e acessíveis aos demais fluxos do sistema.</p>
                                <ul>
                                    <li><strong>Histórico Geral:</strong> consulta ampla das atividades complementares registradas.</li>
                                    <li><strong>Gerenciar Alunos:</strong> cadastro, edição e remoção de alunos.</li>
                                    <li><strong>Meu Perfil:</strong> consulta das informações do usuário da secretaria.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div id="secretaria-gerenciar" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Gerenciar Alunos</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>A funcionalidade de gerenciamento de alunos permite manter atualizados os dados acadêmicos necessários para o funcionamento do processo de horas complementares.</p>
                                <ol>
                                    <li>Acesse a opção <strong>Gerenciar Alunos</strong>.</li>
                                    <li>Para cadastrar, selecione a opção de adicionar novo aluno.</li>
                                    <li>Preencha os dados solicitados, como nome, CPF, e-mail, matrícula, curso e fase.</li>
                                    <li>Confirme o cadastro e aguarde a mensagem do sistema.</li>
                                    <li>Para editar, localize o aluno na lista e selecione a opção de edição.</li>
                                    <li>Para remover, selecione a opção correspondente e confirme a ação.</li>
                                </ol>
                                <p>Os dados cadastrados nessa área são utilizados em outras funcionalidades, como acompanhamento de histórico, validação e cálculo de progresso.</p>
                            </div>
                        </div>
                    </div>

                    <div id="secretaria-historico" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Histórico Geral</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O histórico geral permite à Secretaria Acadêmica consultar registros de atividades complementares de forma ampla, oferecendo suporte ao acompanhamento administrativo do processo.</p>
                                <ul>
                                    <li>Consulte registros de diferentes alunos e cursos.</li>
                                    <li>Visualize status, categorias, cargas horárias e observações.</li>
                                    <li>Utilize filtros e campos de busca quando disponíveis.</li>
                                    <li>Apoie alunos, coordenações e setores administrativos com informações centralizadas.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 6. ADMINISTRADOR -->
                <section id="admin" class="manual-section" data-manual-section="admin">
                    <h2>Guia do Administrador</h2>

                    <div id="admin-dashboard" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Painel Principal (Dashboard)</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>O dashboard do administrador centraliza o acesso às funcionalidades de manutenção geral do SHC. Esse perfil possui permissões ampliadas para gerenciar usuários, parâmetros acadêmicos e configurações do sistema.</p>
                                <ul>
                                    <li><strong>Gerenciar Usuários:</strong> manutenção de contas e perfis de acesso.</li>
                                    <li><strong>Configurações do Sistema:</strong> gerenciamento de cursos, categorias e parâmetros administrativos.</li>
                                    <li><strong>Meu Perfil:</strong> consulta dos dados do administrador e alteração de senha.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div id="admin-usuarios" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Gerenciar Usuários</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>A funcionalidade <strong>Gerenciar Usuários</strong> permite que o administrador consulte, cadastre, edite e remova usuários do sistema, conforme as permissões definidas.</p>
                                <p>Essa funcionalidade pode abranger diferentes perfis, como aluno, coordenador, Secretaria Acadêmica e administrador.</p>
                                <p><strong>Para cadastrar um usuário:</strong></p>
                                <ol>
                                    <li>Acesse a funcionalidade <strong>Gerenciar Usuários</strong>.</li>
                                    <li>Selecione a opção de adicionar novo usuário.</li>
                                    <li>Preencha os dados cadastrais solicitados.</li>
                                    <li>Defina o perfil de acesso do usuário.</li>
                                    <li>Informe dados adicionais, como curso, matrícula ou fase, quando aplicável.</li>
                                    <li>Confirme a operação.</li>
                                    <li>Aguarde a validação dos dados e a mensagem de confirmação ou erro.</li>
                                </ol>
                                <p><strong>Para editar ou remover:</strong></p>
                                <ol>
                                    <li>Localize o usuário na lista.</li>
                                    <li>Selecione a opção de edição ou remoção.</li>
                                    <li>Altere os dados necessários ou confirme a exclusão.</li>
                                    <li>Aguarde a atualização das informações no sistema.</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div id="admin-config" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Configurações do Sistema</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>A funcionalidade <strong>Configurações do Sistema</strong> permite ao administrador ajustar parâmetros administrativos utilizados no funcionamento do SHC.</p>
                                <p>Entre os parâmetros que podem ser gerenciados, estão cursos cadastrados, categorias de atividades complementares, limites de horas, carga horária exigida e configurações relacionadas ao gerenciamento das atividades complementares.</p>
                                <p><strong>Para alterar uma configuração:</strong></p>
                                <ol>
                                    <li>Acesse <strong>Configurações do Sistema</strong>.</li>
                                    <li>Visualize os cursos, categorias ou parâmetros cadastrados.</li>
                                    <li>Selecione a opção de adicionar, editar ou remover, conforme disponível.</li>
                                    <li>Informe ou altere os dados necessários.</li>
                                    <li>Confirme a operação.</li>
                                    <li>Aguarde a validação das informações e a mensagem do sistema.</li>
                                </ol>
                                <p>As configurações definidas nessa área passam a ser utilizadas pelas demais funcionalidades do sistema, conforme as regras estabelecidas para a aplicação.</p>
                            </div>
                        </div>
                    </div>

                    <div id="admin-integracoes" class="accordion-item">
                        <button class="accordion-header">
                            <div class="header-title"><h3>Integrações, Importação e Exportação</h3></div>
                            <i class="fas fa-chevron-down accordion-icon"></i>
                        </button>
                        <div class="accordion-content">
                            <div class="content-wrapper">
                                <p>Quando disponíveis, os recursos de integração permitem configurar dados de comunicação com sistemas externos, importar informações legadas e exportar registros do SHC para apoio administrativo.</p>
                                <ul>
                                    <li><strong>Integrações:</strong> permitem registrar parâmetros de conexão com sistemas externos.</li>
                                    <li><strong>Importação:</strong> pode ser utilizada para trazer dados de sistemas legados, quando configurado.</li>
                                    <li><strong>Exportação:</strong> permite gerar arquivo com dados de certificados para consulta, auditoria ou apoio à gestão.</li>
                                </ul>
                                <div class="manual-note">Essas ações devem ser utilizadas com cautela, pois podem afetar dados administrativos e parâmetros gerais do sistema.</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>

    <script src="js/utils.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const manualBackBtn = document.getElementById('manual-back-btn');

            if (manualBackBtn) {
                manualBackBtn.addEventListener('click', (e) => {
                    e.preventDefault();

                    const returnUrl = sessionStorage.getItem('manualReturnUrl');

                    if (returnUrl) {
                        window.location.href = returnUrl;
                        return;
                    }

                    redirecionarParaDashboardDoPerfil();
                });
            }
            
            const permissoesManual = {
                ALUNO: ['comum', 'perfil', 'aluno'],
                COORDENADOR: ['comum', 'perfil', 'aluno', 'coord'],
                SECRETARIA: ['comum', 'perfil', 'aluno', 'coord', 'secretaria'],
                ADMINISTRADOR: ['comum', 'perfil', 'aluno', 'coord', 'secretaria', 'admin']
            };

            const tipoUsuario = loggedInUser?.tipo;
            const secoesPermitidas = permissoesManual[tipoUsuario];

            if (!tipoUsuario || !secoesPermitidas) {
                window.location.href = 'login.html';
                return;
            }

            document.querySelectorAll('[data-manual-section]').forEach(section => {
                const sectionType = section.dataset.manualSection;

                if (!secoesPermitidas.includes(sectionType)) {
                    section.remove();
                }
            });

            document.querySelectorAll('[data-manual-link]').forEach(link => {
                const linkType = link.dataset.manualLink;

                if (!secoesPermitidas.includes(linkType)) {
                    link.remove();
                }
            });

            setupAccordion();

            const navLinks = document.querySelectorAll('.manual-nav a');

            function ativarLinkDoMenu(sectionId) {
                navLinks.forEach(link => {
                    link.classList.remove('active');

                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }

            function atualizarMenuAtivoPeloScroll() {
                const sections = document.querySelectorAll('.manual-section');
                let current = '';

                const pontoReferencia = window.innerHeight * 0.45;

                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();

                    if (rect.top <= pontoReferencia && rect.bottom >= pontoReferencia) {
                        current = section.getAttribute('id');
                    }
                });

                if (current) {
                    ativarLinkDoMenu(current);
                }
            }

            const hash = window.location.hash;

            if (hash) {
                setTimeout(() => {
                    const target = document.querySelector(hash);

                    if (target) {
                        const section = target.classList.contains('manual-section')
                            ? target
                            : target.closest('.manual-section');

                        const header = target.classList.contains('accordion-header')
                            ? target
                            : target.querySelector('.accordion-header');

                        if (header && !header.classList.contains('active')) {
                            header.click();
                        }

                        if (section) {
                            ativarLinkDoMenu(section.id);

                            const y = section.getBoundingClientRect().top + window.pageYOffset - 110;
                            window.scrollTo({ top: y, behavior: 'smooth' });

                            setTimeout(() => ativarLinkDoMenu(section.id), 350);
                        }
                    } else {
                        window.location.hash = '#comum';
                        ativarLinkDoMenu('comum');
                    }
                }, 150);
            } else {
                ativarLinkDoMenu('comum');
            }

            window.addEventListener('scroll', atualizarMenuAtivoPeloScroll);
        });
    </script>
</body>
</html>

```

## Arquivo: perfil-administrador.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistemas de Horas Complementares - SHC</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-admin">

    <!-- Componente de Header Injetado via JS -->
    <header id="app-header" data-back-url="dashboard-administrador.html"></header>

    <main class="main-container">
        <div class="profile-card">

            <div class="profile-avatar-wrapper">
                <i id="default-avatar-icon" class="fas fa-user-circle"></i>
                <img id="profile-avatar" src="" alt="Foto do Perfil" onerror="this.parentElement.classList.remove('has-photo')">
                <div class="avatar-edit-overlay"><i class="fas fa-camera"></i></div>
                <input type="file" id="avatar-input" accept="image/*">
                
                <div id="avatar-menu" class="avatar-menu">
                    <button id="upload-btn"><i class="fas fa-upload"></i> Carregar Nova Foto</button>
                    <button id="remove-btn" class="hidden"><i class="fas fa-trash"></i> Remover Foto</button>
                </div>
            </div>

            <h2 id="profile-name" class="profile-name">Carregando...</h2>
            <p id="profile-email" class="profile-email">...</p>

            <div class="profile-details">
                <div class="detail-item"><span class="label">CPF</span><span id="admin-id" class="value">--</span></div>
            </div>

            <div class="summary-section">
                <h3>Status do Sistema</h3>
                <div class="summary-stats">
                    <div class="stat-card">
                        <div class="value">v1.1</div>
                        <div class="label">VERSÃO DO SISTEMA</div>
                    </div>
                    <div class="stat-card">
                        <div class="value"><span class="status-badge">OPERACIONAL</span></div>
                        <div class="label">STATUS DA API</div>
                    </div>
                </div>
            </div>

            <div class="profile-actions">
                <button id="change-password-btn" class="btn btn-secondary">
                    <i class="fas fa-key"></i> Alterar Senha
                </button>
            </div>

        </div>
    </main>

    <!-- Placeholder para o Modal de Alterar Senha Injetado via JS -->
    <div id="password-modal-placeholder"></div>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header e Modal) -->
    <script src="js/components.js"></script>
    <script src="js/perfil.js"></script>
    
</body>
</html>
```

## Arquivo: perfil-alunos.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistemas de Horas Complementares - SHC</title>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default">

  <!-- Componente de Header Injetado via JS -->
  <header id="app-header" data-back-url="dashboard-alunos.html"></header>

  <main class="main-container">
    <div class="profile-card">
      <div class="profile-avatar-wrapper">
          <i id="default-avatar-icon" class="fas fa-user-circle"></i>
          <img id="profile-avatar" src="" alt="Foto do Perfil" onerror="this.parentElement.classList.remove('has-photo')">
          <div class="avatar-edit-overlay"><i class="fas fa-camera"></i></div>
          <input type="file" id="avatar-input" accept="image/*">
          
          <div id="avatar-menu" class="avatar-menu">
              <button id="upload-btn"><i class="fas fa-upload"></i> Carregar Nova Foto</button>
              <button id="remove-btn" class="hidden"><i class="fas fa-trash"></i> Remover Foto</button>
          </div>
      </div>

      <h2 id="profile-name" class="profile-name">Carregando...</h2>
      <p id="profile-email" class="profile-email">Carregando...</p>

      <div class="profile-details">
          <div class="detail-item"><span class="label">CPF</span><span id="aluno-cpf" class="value">--</span></div>
          <div class="detail-item"><span class="label">Curso</span><span id="aluno-curso" class="value">--</span></div>
          <div class="detail-item"><span class="label">Matrícula</span><span id="aluno-matricula" class="value">--</span></div>
          <div class="detail-item"><span class="label">Fase</span><span id="aluno-fase" class="value">--</span></div>
          <div class="detail-item"><span class="label">Data de Nascimento</span><span id="profile-dob" class="value">--</span></div>
      </div>

      <div class="progress-section">
        <h3>Progresso Geral de Horas</h3>
        
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width: 0%;"></div>
        </div>
        <p class="progress-label">Carregando dados...</p>

        <div id="progress-breakdown" class="progress-breakdown"></div>
      </div>

      <div class="profile-actions">
        <button id="change-password-btn" class="btn btn-secondary">
          <i class="fas fa-key"></i> Alterar Senha
        </button>
      </div>
    </div>
  </main>

  <!-- Placeholder para o Modal de Alterar Senha Injetado via JS -->
  <div id="password-modal-placeholder"></div>

  <script src="js/utils.js"></script>
  <!-- Script de Componentes (Injeta Header e Modal) -->
  <script src="js/components.js"></script>
  <script src="js/perfil.js"></script>
  
</body>
</html>
```

## Arquivo: perfil-coordenador.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil do Coordenador - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default dotted-background">
    
    <!-- Componente de Header Injetado via JS -->
    <header id="app-header" data-back-url="dashboard-coordenador.html"></header>

    <main class="main-container">
        <div class="profile-card">

            <div class="profile-avatar-wrapper">
                <i id="default-avatar-icon" class="fas fa-user-circle"></i>
                <img id="profile-avatar" src="" alt="Foto do Perfil" onerror="this.parentElement.classList.remove('has-photo')">
                <div class="avatar-edit-overlay"><i class="fas fa-camera"></i></div>
                <input type="file" id="avatar-input" accept="image/*">
                
                <div id="avatar-menu" class="avatar-menu">
                    <button id="upload-btn"><i class="fas fa-upload"></i> Carregar Nova Foto</button>
                    <button id="remove-btn" class="hidden"><i class="fas fa-trash"></i> Remover Foto</button>
                </div>
            </div>

            <h2 id="profile-name" class="profile-name">Carregando...</h2>
            <p id="profile-email" class="profile-email">...</p>

            <div class="profile-details">
                <div class="detail-item"><span class="label">Curso Coordenado</span><span id="coord-curso" class="value">--</span></div>
                <div class="detail-item"><span class="label">Data de Nascimento</span><span id="profile-dob" class="value">--</span></div>
                <div class="detail-item"><span class="label">CPF</span><span id="coord-id" class="value">--</span></div>
            </div>

            <div class="summary-section">
                <h3>Sumário de Certificados</h3>
                <div class="summary-stats">
                    <div class="stat-card">
                        <div id="summary-horas" class="value">--</div> 
                        <div class="label">HORAS REGISTRADAS</div>
                    </div>
                    <div class="stat-card">
                        <div id="summary-pendencias" class="value">--</div>
                        <div class="label">PENDÊNCIAS</div>
                    </div>
                </div>
            </div>

            <div class="profile-actions">
                <button id="change-password-btn" class="btn btn-secondary"><i class="fas fa-key"></i> Alterar Senha</button>
            </div>

        </div>
    </main>

    <!-- Placeholder para o Modal de Alterar Senha Injetado via JS -->
    <div id="password-modal-placeholder"></div>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header e Modal) -->
    <script src="js/components.js"></script>
    <script src="js/perfil.js"></script>

</body>
</html>
```

## Arquivo: perfil-secretaria.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil da Secretaria - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default dotted-background">
    
    <!-- Componente de Header Injetado via JS -->
    <header id="app-header" data-back-url="dashboard-secretaria.html"></header>

    <main class="main-container">
        <div class="profile-card">
            <div class="profile-avatar-wrapper">
                <i id="default-avatar-icon" class="fas fa-user-circle"></i>
                <img id="profile-avatar" src="" alt="Foto do Perfil" onerror="this.parentElement.classList.remove('has-photo')">
                <div class="avatar-edit-overlay"><i class="fas fa-camera"></i></div>
                <input type="file" id="avatar-input" accept="image/*">
                
                <div id="avatar-menu" class="avatar-menu">
                    <button id="upload-btn"><i class="fas fa-upload"></i> Carregar Nova Foto</button>
                    <button id="remove-btn" class="hidden"><i class="fas fa-trash"></i> Remover Foto</button>
                </div>
            </div>

            <h2 id="profile-name" class="profile-name">Carregando...</h2>
            <p id="profile-email" class="profile-email">...</p>

            <div class="profile-details">
                <div class="detail-item"><span class="label">CPF</span><span id="secretaria-id" class="value">--</span></div>
                <div class="detail-item"><span class="label">Data de Nascimento</span><span id="profile-dob" class="value">--</span></div>
            </div>

            <div class="summary-section">
                <h3>Número de Usuários</h3>
                <div class="summary-stats">
                    <div class="stat-card">
                        <div id="summary-alunos" class="value">--</div>
                        <div class="label">TOTAL DE ALUNOS</div>
                    </div>
                    <div class="stat-card">
                        <div id="summary-coords" class="value">--</div>
                        <div class="label">TOTAL DE COORDENADORES</div>
                    </div>
                </div>
            </div>

            <div class="profile-actions">
                <button id="change-password-btn" class="btn btn-secondary"><i class="fas fa-key"></i> Alterar Senha</button>
            </div>
        </div>
    </main>

    <!-- Placeholder para o Modal de Alterar Senha Injetado via JS -->
    <div id="password-modal-placeholder"></div>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header e Modal) -->
    <script src="js/components.js"></script>
    <script src="js/perfil.js"></script>

</body>
</html>
```

## Arquivo: validar-horas.html
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistemas de Horas Complementares - SHC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body class="theme-default">
    
    <!-- Componente de Header Injetado via JS -->
    <header id="app-header" data-back-url="dashboard-coordenador.html"></header>

    <main class="main-container">
        <div id="student-list-view">
            <h1 class="page-title"><i class="fas fa-check-double"></i> Validar Horas</h1>
            <div id="filter-form" class="filter-bar">
                <div class="filter-group">
                    <label for="aluno">Nome do Aluno</label>
                    <input type="text" id="aluno" name="aluno">
                </div>
                <div class="filter-group">
                    <label for="matricula">Matrícula</label>
                    <input type="text" id="matricula" name="matricula">
                </div>
                <div class="filter-group">
                    <label for="fase">Fase</label>
                    <select id="fase" name="fase" class="hidden-select">
                        <option value="">Todas</option>
                        <option value="1">1ª Fase</option>
                        <option value="2">2ª Fase</option>
                        <option value="3">3ª Fase</option>
                        <option value="4">4ª Fase</option>
                        <option value="5">5ª Fase</option>
                        <option value="6">6ª Fase</option>
                        <option value="7">7ª Fase</option>
                        <option value="8">8ª Fase</option>
                    </select>
                    
                    <div class="custom-select-wrapper">
                        <div class="custom-select-trigger">
                            <span>Todas</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="custom-options">
                            <div class="custom-option" data-value="">Todas</div>
                            <div class="custom-option" data-value="1">1ª Fase</div>
                            <div class="custom-option" data-value="2">2ª Fase</div>
                            <div class="custom-option" data-value="3">3ª Fase</div>
                            <div class="custom-option" data-value="4">4ª Fase</div>
                            <div class="custom-option" data-value="5">5ª Fase</div>
                            <div class="custom-option" data-value="6">6ª Fase</div>
                            <div class="custom-option" data-value="7">7ª Fase</div>
                            <div class="custom-option" data-value="8">8ª Fase</div>
                            <div class="custom-option" data-value="9">9ª Fase</div>
                            <div class="custom-option" data-value="10">10ª Fase</div>
                        </div>
                    </div>
                </div>
                <div class="filter-buttons">
                    <button id="clear-filters-btn" type="button" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Limpar
                    </button>
                    <button id="filter-btn" type="button" class="btn btn-primary">
                        <i class="fas fa-filter"></i> Filtrar
                    </button>
                </div>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Notificação</th>
                            <th>Nome do Aluno</th>
                            <th>Matrícula</th>
                            <th>Fase</th>
                            <th>Entregues para Validação</th>
                        </tr>
                    </thead>
                    <tbody id="student-list-tbody"></tbody>
                </table>
            </div>
        </div>

        <div id="student-detail-view" style="display: none;">
            <div class="detail-header">
                <button id="back-to-list-btn" class="btn btn-secondary">
                    <i class="fas fa-arrow-left"></i> Voltar
                </button>
                <h2 id="student-name-title" class="student-name">Detalhes do Aluno</h2>
            </div>

            <div class="progress-section" style="margin-bottom: 1.5rem; background: var(--glass-bg); padding: 1rem 1.5rem; border-radius: 1rem; border: 1px solid var(--glass-border);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <h3 style="margin: 0; font-size: 1.4rem; color: var(--text-primary);">Progresso do Aluno</h3>
                    <p class="progress-label" style="margin: 0; font-size: 1.2rem;">Carregando...</p>
                </div>
                <div class="progress-bar" style="height: 0.8rem;">
                    <div class="progress-bar-fill" style="width: 0%;"></div>
                </div>
                <div id="progress-breakdown" class="progress-breakdown" style="margin-top: 1rem; gap: 0.5rem;"></div>
            </div>

            <div id="accordion-placeholder" class="accordion-container"></div>
        </div>
    </main>

    <script src="js/utils.js"></script>
    <!-- Script de Componentes (Injeta Header) -->
    <script src="js/components.js"></script>
    <script src="js/validar-horas.js"></script>
</body>
</html>
```

