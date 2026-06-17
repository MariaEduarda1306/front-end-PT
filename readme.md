# Como executar o projeto

1. Abra a pasta do projeto no **Visual Studio Code**.
2. Clique com o botão direito no arquivo **index.html**.
3. Selecione **"Open with Live Server"**.
4. O navegador abrirá automaticamente na URL padrão do Live Server, geralmente:

(http://127.0.0.1:5500/)

5. Caso não abra automaticamente, acesse essa URL manualmente.

# Sistema de Horas Complementares - SHC (Frontend)

**Desenvolvimento de uma solução web para centralização e gestão de atividades complementares no ensino superior.**

Projeto técnico apresentado como requisito para aprovação na disciplina **Projeto Técnico II** do Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas da **Faculdade Municipal de Palhoça (FMP)**.

**Autores:**  
Leonardo de Oliveira  
Maria Eduarda Schmidt  

**Orientadoras:** Profª Msc. Simone Regina da Silva e Profª Daniela Amorim.

**Ano:** 2026

---

## 📋 Sobre o Projeto

O **SHC** é um sistema web moderno e responsivo desenvolvido para resolver os problemas de um processo manual de gestão de horas complementares na FMP. O sistema permite o cadastro, submissão, análise, validação e acompanhamento das atividades complementares por diferentes perfis de usuários (Aluno, Coordenador, Secretaria Acadêmica e Administrador).

O frontend foi construído com foco em **usabilidade**, **acessibilidade** e **experiência do usuário (UX)**, utilizando design glassmorphism, componentes reutilizáveis e integração completa com uma API REST (Laravel).

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**, **CSS3** (com variáveis customizadas e design system)
- **Vanilla JavaScript** (ES6+)
- **Font Awesome** (ícones)
- **Google Fonts** (Poppins)

### Arquitetura e Padrões
- Componentização via JS (header, modal de senha, etc.)
- Consumo de API REST com `fetch`
- Autenticação via JWT (Bearer Token)
- Validações visuais e feedback em tempo real
- Design responsivo com mobile-first
- Temas por perfil (cores diferenciadas)

### Ferramentas de Desenvolvimento
- Ngrok (para testes com backend local)
- Estrutura modular de arquivos JS (`utils.js`, `components.js`, etc.)

---

## ✨ Funcionalidades Principais

### Perfis de Usuário
- **Aluno**: Cadastro de atividades, upload de PDF, histórico pessoal e progresso visual de horas.
- **Coordenador**: Validação de solicitações, histórico do curso e análise individual.
- **Secretaria Acadêmica**: Histórico geral, gerenciamento de alunos.
- **Administrador**: Gerenciamento completo de usuários, cursos, categorias e configurações do sistema.

### Recursos Gerais
- Login com CPF + senha (senha inicial = data de nascimento)
- Dashboard personalizado por perfil
- Upload de comprovantes em PDF
- Acordeão interativo para histórico
- Filtros avançados e busca em tabelas
- Alteração de foto de perfil e senha
- Exportação/Importação de dados
- Toast notifications e feedback visual
- Manual do usuário integrado

---

## 📁 Estrutura de Pastas

/ (raiz)
├── index.html                  # Tela de Login
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── utils.js                # Funções globais, API, toast, etc.
│   ├── components.js           # Header e Modal de senha
│   ├── login.js
│   ├── cadastro-horas.js
│   ├── dashboard.js
│   ├── historico-aluno.js
│   ├── validar-horas.js
│   ├── historico-coordenador.js
│   ├── historico-secretaria.js
│   ├── gerenciar-alunos.js
│   ├── gerenciar-usuarios.js
│   ├── configuracoes.js
│   └── perfil.js
├── attachments/                # Arquivos fonte (para referência)
├── logo.png
└── manual.html


---

## 🚀 Como Executar (Desenvolvimento)

1. **Clone o repositório** ou extraia os arquivos.
2. Coloque todos os arquivos em um servidor local (recomendado: Live Server do VS Code ou XAMPP).
3. Certifique-se de que o backend (Laravel) esteja rodando.
4. Ajuste a URL da API:
   - Acesse `index.html?api=https://SEU-NGROK.ngrok-free.app`
   - Ou edite manualmente a variável `API_BASE_URL` em `js/utils.js`.
5. Abra `index.html` no navegador.

**Credenciais de teste (padrão):**
- Usuário: CPF
- Senha inicial: Data de nascimento no formato `DDMMAAAA`

---

## 🎨 Identidade Visual

- **Paleta**: Tons escuros modernos com destaque em azul (`#00aaff`).
- **Estilo**: Glassmorphism, gradientes, sombras suaves e transições fluidas.
- **Logo**: Incluído (`logo.png`).

---

## 📸 Telas Principais

- Login com suporte a primeiro acesso
- Dashboards por perfil
- Cadastro de horas com upload
- Históricos com acordeão e preview de PDF
- Validação com painel de avaliação
- Gerenciamento completo de usuários e configurações

---

## 🔗 Integração com Backend

O frontend foi projetado para consumir uma **API REST** com os seguintes endpoints principais:

- `/api/auth/login`
- `/api/certificados` (CRUD + avaliação)
- `/api/usuarios` (gerenciamento)
- `/api/cursos` e `/api/categorias`
- `/api/usuarios/{id}/progresso`

---

## 📄 Documentação Adicional

- **Manual do Usuário**: `manual.html` (acessível via botão flutuante de ajuda)
- **Protótipos e Requisitos**: Ver documento completo do Projeto Técnico II (`.docx`)

---

## 📌 Próximos Passos / Melhorias Futuras

- Implementação de notificações em tempo real (WebSocket)
- Relatórios em PDF
- Recuperação de senha por e-mail
- Modo escuro/claro dinâmico
- Testes automatizados (Jest/Cypress)
- PWA (Progressive Web App)
