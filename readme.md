O README abaixo foi estruturado conforme as páginas, perfis, componentes reutilizáveis, integração com a API, manual e responsividade presentes no front-end enviado.      

````markdown
<p align="center">
  <img src="logo.png" alt="Logo do Sistema de Horas Complementares" width="520">
</p>

<h1 align="center">Sistema de Horas Complementares — SHC</h1>

<p align="center">
  Front-end do sistema web destinado ao registro, acompanhamento, validação e gerenciamento de atividades complementares em instituições de ensino superior.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-Front--end-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-Responsivo-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/API-REST-00AAFF" alt="API REST">
  <img src="https://img.shields.io/badge/Versão-1.1-2ECC71" alt="Versão 1.1">
</p>

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Objetivos](#objetivos)
- [Funcionalidades](#funcionalidades)
- [Perfis de acesso](#perfis-de-acesso)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Arquitetura do front-end](#arquitetura-do-front-end)
- [Estrutura de arquivos](#estrutura-de-arquivos)
- [Páginas do sistema](#páginas-do-sistema)
- [Módulos JavaScript](#módulos-javascript)
- [Organização dos estilos](#organização-dos-estilos)
- [Pré-requisitos](#pré-requisitos)
- [Como executar localmente](#como-executar-localmente)
- [Configuração da API](#configuração-da-api)
- [Autenticação e sessão](#autenticação-e-sessão)
- [Primeiro acesso](#primeiro-acesso)
- [Integração com o back-end](#integração-com-o-back-end)
- [Estruturas esperadas da API](#estruturas-esperadas-da-api)
- [Status dos certificados](#status-dos-certificados)
- [Responsividade](#responsividade)
- [Identidade visual](#identidade-visual)
- [Manual e ajuda contextual](#manual-e-ajuda-contextual)
- [Publicação](#publicação)
- [Segurança](#segurança)
- [Solução de problemas](#solução-de-problemas)
- [Comportamentos e limitações atuais](#comportamentos-e-limitações-atuais)
- [Melhorias futuras](#melhorias-futuras)
- [Autoria](#autoria)
- [Licença](#licença)

---

## Sobre o projeto

O **Sistema de Horas Complementares (SHC)** é uma aplicação web desenvolvida para centralizar e apoiar o gerenciamento das atividades complementares realizadas por estudantes de instituições de ensino superior.

O sistema substitui processos descentralizados baseados em documentos físicos, planilhas, e-mails ou formulários isolados por um fluxo digital integrado. Por meio da aplicação, os alunos podem cadastrar atividades e enviar os respectivos comprovantes, enquanto coordenadores, integrantes da secretaria e administradores utilizam interfaces específicas de acordo com suas responsabilidades.

Este repositório contém exclusivamente o **front-end do SHC**. Para que todas as funcionalidades operem corretamente, é necessário executar também a API do sistema.

O projeto foi desenvolvido no contexto do Projeto Técnico do curso de Análise e Desenvolvimento de Sistemas da Faculdade Municipal de Palhoça — FMP.

---

## Objetivos

O front-end do SHC tem como principais objetivos:

- disponibilizar interfaces específicas para cada perfil de usuário;
- permitir o envio digital de certificados em PDF;
- apresentar o andamento das horas complementares do aluno;
- facilitar a análise e a validação das atividades pela coordenação;
- permitir a consulta dos históricos acadêmicos;
- apoiar o gerenciamento de alunos, usuários, cursos e categorias;
- oferecer uma experiência visual consistente e responsiva;
- integrar o navegador a uma API REST responsável pelas regras de negócio e persistência dos dados.

---

## Funcionalidades

### Funcionalidades gerais

- autenticação por CPF e senha;
- máscara automática de CPF;
- exibição e ocultação da senha no login;
- orientação para primeiro acesso;
- orientação para recuperação de senha;
- redirecionamento conforme o perfil autenticado;
- armazenamento temporário da sessão no navegador;
- cabeçalho reutilizável;
- logout integrado à API;
- atualização de senha;
- upload de foto de perfil;
- notificações visuais do tipo toast;
- validação visual de formulários;
- campos de seleção customizados;
- pré-visualização de comprovantes em PDF;
- filtros de pesquisa;
- acordeões para exibição de detalhes;
- botão flutuante de ajuda contextual;
- manual integrado ao sistema;
- layout responsivo para celulares, tablets e computadores.

### Funcionalidades do aluno

- acesso ao painel do aluno;
- cadastro de atividades complementares;
- seleção da categoria da atividade;
- preenchimento do nome da atividade;
- preenchimento da instituição responsável;
- informação da carga horária solicitada;
- informação da data de emissão do certificado;
- envio do comprovante em PDF;
- consulta ao histórico de atividades;
- visualização do status de cada solicitação;
- consulta das horas solicitadas e aprovadas;
- visualização de observações da coordenação;
- pré-visualização do comprovante enviado;
- acompanhamento do progresso geral;
- acompanhamento das horas por categoria;
- consulta e atualização das informações do perfil;
- alteração de senha;
- atualização da foto de perfil.

### Funcionalidades do coordenador

- acesso ao painel do coordenador;
- visualização dos alunos vinculados ao seu curso;
- localização de alunos por nome, matrícula e fase;
- visualização da quantidade de atividades pendentes;
- consulta ao progresso individual dos alunos;
- visualização das horas por categoria;
- consulta dos comprovantes em PDF;
- análise das atividades pendentes;
- edição dos dados da atividade durante a avaliação;
- definição da categoria da atividade;
- definição da quantidade de horas validadas;
- inserção de observações e justificativas;
- aprovação de certificados;
- reprovação de certificados;
- aprovação com ressalvas;
- consulta ao histórico dos alunos do curso;
- visualização de resumo de horas registradas e pendências;
- consulta e atualização do próprio perfil;
- alteração de senha e foto.

As telas de **Validação de Horas** e **Histórico do Curso** são apresentadas separadamente. A primeira é destinada ao tratamento das atividades pendentes, enquanto a segunda permite consultar os registros dos alunos vinculados ao curso.

### Funcionalidades da secretaria

- acesso ao painel da secretaria;
- consulta ao histórico geral dos alunos;
- pesquisa por nome e matrícula;
- filtro por curso;
- filtro por período;
- visualização dos certificados de diferentes cursos;
- visualização dos comprovantes em PDF;
- cadastro de novos alunos;
- edição de dados dos alunos;
- exclusão de alunos;
- associação de aluno a curso e fase;
- definição da data de nascimento utilizada no primeiro acesso;
- redefinição de senha durante a edição do aluno;
- visualização do total de alunos;
- visualização do total de coordenadores;
- consulta e atualização do próprio perfil;
- alteração de senha e foto.

### Funcionalidades do administrador

- acesso ao painel administrativo;
- cadastro de usuários;
- edição de usuários;
- exclusão de usuários;
- pesquisa por nome, CPF e papel;
- definição do papel de acesso;
- associação de alunos e coordenadores a cursos;
- definição da fase do aluno;
- gerenciamento de cursos;
- definição das horas necessárias de cada curso;
- gerenciamento de categorias;
- configuração de integração com sistemas externos;
- importação de usuários;
- exportação de certificados em JSON;
- visualização da versão apresentada pelo sistema;
- consulta e atualização do próprio perfil;
- alteração de senha e foto.

---

## Perfis de acesso

O SHC trabalha com quatro perfis principais:

| Perfil | Identificador utilizado pela API | Responsabilidades |
|---|---|---|
| Aluno | `ALUNO` | Enviar certificados, consultar histórico e acompanhar o progresso |
| Coordenador | `COORDENADOR` | Avaliar atividades e consultar os alunos do curso coordenado |
| Secretaria | `SECRETARIA` | Gerenciar alunos e consultar o histórico geral |
| Administrador | `ADMINISTRADOR` | Gerenciar usuários, cursos, categorias e integrações |

Após o login, o usuário é direcionado automaticamente ao painel correspondente ao seu papel.

---

## Tecnologias utilizadas

### Estrutura

- HTML5;
- elementos semânticos;
- formulários nativos;
- elemento `dialog` para modais;
- elemento `embed` para pré-visualização de arquivos PDF.

### Estilização

- CSS3;
- variáveis CSS;
- Flexbox;
- CSS Grid;
- abordagem Mobile First;
- animações e transições;
- interface escura;
- efeito visual inspirado em glassmorphism;
- temas específicos para áreas comuns e administrativas.

### Programação

- JavaScript Vanilla;
- Fetch API;
- Promises;
- `async` e `await`;
- manipulação do DOM;
- `FormData`;
- Local Storage;
- eventos personalizados e componentes reutilizáveis.

### Recursos externos

- Google Fonts — fonte Poppins;
- Font Awesome — ícones;
- API REST do SHC.

O projeto não utiliza framework JavaScript, gerenciador de pacotes ou processo de compilação.

---

## Arquitetura do front-end

O front-end utiliza uma arquitetura baseada em páginas HTML independentes, arquivos CSS compartilhados e módulos JavaScript responsáveis por cada funcionalidade.

O fluxo principal é:

```text
Usuário
   ↓
Páginas HTML
   ↓
Módulos JavaScript
   ↓
Fetch API
   ↓
API REST do SHC
   ↓
Banco de dados e armazenamento de arquivos
```

Os arquivos `utils.js` e `components.js` disponibilizam recursos reutilizáveis para as demais páginas.

### `utils.js`

Responsável por:

- definir a URL da API;
- recuperar a sessão do navegador;
- verificar a existência do token;
- aplicar máscara de CPF;
- padronizar URLs de arquivos;
- mapear os status dos certificados;
- destacar campos inválidos;
- exibir notificações;
- inicializar acordeões;
- inicializar seletores customizados;
- tratar campos de upload;
- criar o botão de ajuda contextual.

### `components.js`

Responsável por:

- injetar o cabeçalho global;
- exibir a identidade visual;
- configurar os botões de voltar e sair;
- executar o logout;
- injetar o modal reutilizável de alteração de senha.

---

## Estrutura de arquivos

```text
shc-frontend/
│
├── index.html
├── manual.html
├── logo.png
├── favicon.ico
│
├── dashboard alunos.html
├── dashboard coordenador.html
├── dashboard secretaria.html
├── dashboard administrador.html
│
├── cadastro de horas alunos.html
├── histórico aluno.html
│
├── validar horas coordenador.html
├── histórico coordenador.html
│
├── histórico secretaria.html
├── gerenciar alunos secretaria.html
│
├── gerenciar usuarios administrador.html
├── configurações do sistema administrador.html
│
├── perfil alunos.html
├── perfil coordenador.html
├── perfil secretaria.html
├── perfil administrador.html
│
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
│
└── js/
    ├── utils.js
    ├── components.js
    ├── login.js
    ├── dashboard.js
    ├── cadastro-horas.js
    ├── historico-aluno.js
    ├── historico-coordenador.js
    ├── historico-secretaria.js
    ├── validar-horas.js
    ├── gerenciar-alunos.js
    ├── gerenciar-usuarios.js
    ├── configuracoes.js
    └── perfil.js
```

> Os nomes atuais de alguns arquivos possuem espaços e caracteres acentuados. Eles não devem ser alterados sem que todas as referências existentes nos arquivos HTML e JavaScript também sejam atualizadas.

---

## Páginas do sistema

| Página | Finalidade |
|---|---|
| `index.html` | Login, primeiro acesso e orientação para recuperação de senha |
| `manual.html` | Manual integrado para todos os perfis |
| `dashboard alunos.html` | Painel principal do aluno |
| `cadastro de horas alunos.html` | Envio de atividade e certificado |
| `histórico aluno.html` | Histórico individual do aluno |
| `perfil alunos.html` | Dados acadêmicos e progresso do aluno |
| `dashboard coordenador.html` | Painel principal do coordenador |
| `validar horas coordenador.html` | Avaliação das atividades pendentes |
| `histórico coordenador.html` | Consulta ao histórico dos alunos do curso |
| `perfil coordenador.html` | Dados e resumo do coordenador |
| `dashboard secretaria.html` | Painel principal da secretaria |
| `histórico secretaria.html` | Consulta geral aos alunos e certificados |
| `gerenciar alunos secretaria.html` | Cadastro, edição e remoção de alunos |
| `perfil secretaria.html` | Dados e resumo da secretaria |
| `dashboard administrador.html` | Painel administrativo |
| `gerenciar usuarios administrador.html` | Gerenciamento de todos os usuários |
| `configurações do sistema administrador.html` | Cursos, categorias, integrações, importação e exportação |
| `perfil administrador.html` | Informações do administrador e versão apresentada pelo sistema |

---

## Módulos JavaScript

| Arquivo | Responsabilidade |
|---|---|
| `utils.js` | Funções globais, sessão, API, CPF, toast, acordeão, uploads e ajuda |
| `components.js` | Cabeçalho, logout e modal de alteração de senha |
| `login.js` | Autenticação, primeiro acesso, recuperação e redirecionamento |
| `dashboard.js` | Saudação personalizada e comportamento dos painéis |
| `cadastro-horas.js` | Carregamento de categorias e envio de certificados |
| `historico-aluno.js` | Histórico individual do aluno |
| `historico-coordenador.js` | Lista e histórico dos alunos do curso |
| `historico-secretaria.js` | Histórico geral e filtros da secretaria |
| `validar-horas.js` | Agrupamento de pendências e avaliação dos certificados |
| `gerenciar-alunos.js` | CRUD de alunos realizado pela secretaria |
| `gerenciar-usuarios.js` | CRUD de usuários realizado pelo administrador |
| `configuracoes.js` | Cursos, categorias, integrações, importação e exportação |
| `perfil.js` | Perfis, progresso, resumos, avatar e alteração de senha |

---

## Organização dos estilos

### `base.css`

Contém:

- reset básico;
- variáveis globais;
- cores de fundo e texto;
- cores dos status;
- cores dos papéis;
- tema padrão;
- tema administrativo;
- tipografia global.

### `layout.css`

Contém:

- containers principais;
- limites de largura;
- espaçamentos;
- layout da tela de login;
- grid dos formulários.

### `components.css`

Contém:

- cabeçalho;
- logotipo;
- botões;
- links;
- formulários;
- filtros;
- tabelas;
- dashboards;
- cards;
- acordeões;
- modais;
- badges;
- tela de login;
- perfis;
- barras de progresso;
- upload de arquivos;
- notificações;
- seletores customizados;
- botão de ajuda.

### `responsive.css`

Contém:

- regras Mobile First;
- transformação das tabelas em cards;
- adaptação de modais;
- reorganização dos formulários;
- breakpoints para tablets e desktops;
- ajustes para telas a partir de `768px`, `1024px` e `1200px`.

---

## Pré-requisitos

Para executar o front-end, é necessário possuir:

- navegador moderno, como Chrome, Edge, Firefox ou equivalente;
- API do SHC em execução;
- servidor HTTP local ou hospedagem estática;
- conexão com a internet para carregar Google Fonts e Font Awesome;
- CORS configurado corretamente no back-end.

Não é necessário instalar Node.js, NPM ou bibliotecas JavaScript.

---

## Como executar localmente

### 1. Obtenha o projeto

Clone ou baixe o repositório e acesse a pasta do front-end.

```bash
cd shc-frontend
```

### 2. Inicie a API

Por padrão, quando o front-end é aberto em `localhost` ou `127.0.0.1`, ele procura a API em:

```text
http://localhost:8000
```

A API deve estar ativa antes da tentativa de login.

### 3. Inicie um servidor local para o front-end

#### Opção A — Python

```bash
python -m http.server 5500
```

Em algumas instalações do Windows, utilize:

```bash
py -m http.server 5500
```

Depois, acesse:

```text
http://localhost:5500/index.html
```

#### Opção B — Live Server no Visual Studio Code

1. Instale a extensão **Live Server**.
2. Clique com o botão direito em `index.html`.
3. Escolha **Open with Live Server**.

> Não é recomendado abrir o projeto diretamente por meio de um endereço iniciado com `file://`, pois isso pode provocar restrições de carregamento, navegação e integração com a API.

---

## Configuração da API

A URL da API é definida pelo arquivo:

```text
js/utils.js
```

A configuração segue esta ordem:

1. endereço informado no parâmetro `api` da URL;
2. endereço salvo anteriormente no `localStorage`;
3. `http://localhost:8000`, quando o front-end está em ambiente local;
4. endereço externo de fallback configurado no próprio `utils.js`.

### Configuração temporária por URL

Para utilizar uma API publicada por ngrok ou outro serviço, abra o sistema desta forma:

```text
http://localhost:5500/index.html?api=https://seu-endereco-de-api
```

Exemplo com ngrok:

```text
http://localhost:5500/index.html?api=https://seu-subdominio.ngrok-free.app
```

O endereço é salvo no navegador e reutilizado nas próximas páginas.

### Alterar a API novamente

Basta acessar o login com um novo parâmetro:

```text
index.html?api=https://novo-endereco-da-api
```

### Remover a configuração salva

No console do navegador, execute:

```javascript
localStorage.removeItem('API_BASE_URL');
location.reload();
```

### Definir manualmente pelo console

```javascript
localStorage.setItem('API_BASE_URL', 'https://seu-endereco-da-api');
location.reload();
```

---

## Autenticação e sessão

O login é realizado por meio do endpoint:

```text
POST /api/auth/login
```

O front-end envia:

```json
{
  "cpf": "00000000000",
  "password": "senha"
}
```

A resposta esperada contém:

```json
{
  "access_token": "TOKEN_DE_ACESSO",
  "usuario": {
    "id": 1,
    "nome": "Nome do Usuário",
    "cpf": "00000000000",
    "email": "usuario@exemplo.com",
    "tipo": "ALUNO"
  }
}
```

Após a autenticação:

- o token é salvo como `authToken`;
- os dados do usuário são salvos como `userData`;
- ambos são armazenados no `localStorage`;
- o usuário é redirecionado ao dashboard correspondente.

Os valores utilizados são:

```javascript
localStorage.getItem('authToken');
localStorage.getItem('userData');
```

As requisições autenticadas utilizam:

```http
Authorization: Bearer TOKEN_DE_ACESSO
```

Quando não existe token, as páginas protegidas redirecionam o usuário para `index.html`.

### Logout

No logout, o front-end tenta executar:

```text
POST /api/auth/logout
```

Independentemente da resposta do servidor, os dados locais são removidos:

```javascript
localStorage.removeItem('authToken');
localStorage.removeItem('userData');
```

---

## Primeiro acesso

No primeiro acesso, o usuário utiliza:

| Campo | Informação |
|---|---|
| Usuário | CPF |
| Senha inicial | Data de nascimento no formato `DDMMAAAA` |

Exemplo:

```text
Data de nascimento: 13/06/2000
Senha inicial: 13062000
```

O usuário deve ser previamente cadastrado pela secretaria, pelo administrador ou por uma integração autorizada.

A tela de login possui um destaque específico para orientar usuários que ainda não acessaram o sistema.

A recuperação de senha não é feita diretamente por e-mail. O usuário recebe a orientação para solicitar a redefinição à Secretaria Acadêmica.

---

## Integração com o back-end

O front-end utiliza os seguintes endpoints.

### Autenticação

| Método | Endpoint | Finalidade |
|---|---|---|
| `POST` | `/api/auth/login` | Autenticar usuário |
| `POST` | `/api/auth/logout` | Encerrar sessão |
| `POST` | `/api/auth/change-password` | Alterar senha |

### Usuários

| Método | Endpoint | Finalidade |
|---|---|---|
| `GET` | `/api/usuarios` | Listar usuários |
| `GET` | `/api/usuarios?tipo=ALUNO` | Listar alunos |
| `POST` | `/api/usuarios` | Cadastrar usuário |
| `PUT` | `/api/usuarios/{id}` | Atualizar usuário |
| `DELETE` | `/api/usuarios/{id}` | Remover usuário |
| `POST` | `/api/usuarios/import` | Importar usuários |
| `POST` | `/api/usuarios/avatar` | Enviar foto de perfil |
| `GET` | `/api/usuarios/{id}/progresso` | Consultar progresso |

### Certificados

| Método | Endpoint | Finalidade |
|---|---|---|
| `GET` | `/api/certificados` | Listar certificados |
| `GET` | `/api/certificados?aluno_id={id}` | Listar certificados de um aluno |
| `GET` | `/api/certificados?status=ENTREGUE` | Listar pendências |
| `POST` | `/api/certificados` | Enviar certificado |
| `PATCH` | `/api/certificados/{id}/avaliar` | Avaliar certificado |
| `GET` | `/api/certificados/export` | Exportar certificados em JSON |

### Cursos

| Método | Endpoint | Finalidade |
|---|---|---|
| `GET` | `/api/cursos` | Listar cursos |
| `POST` | `/api/cursos` | Criar curso |
| `PUT` | `/api/cursos/{id}` | Atualizar curso |
| `DELETE` | `/api/cursos/{id}` | Remover curso |

### Categorias

| Método | Endpoint | Finalidade |
|---|---|---|
| `GET` | `/api/categorias` | Listar categorias |
| `POST` | `/api/categorias` | Criar categoria |
| `PUT` | `/api/categorias/{id}` | Atualizar categoria |
| `DELETE` | `/api/categorias/{id}` | Remover categoria |

### Configurações

| Método | Endpoint | Finalidade |
|---|---|---|
| `GET` | `/api/configuracoes` | Consultar integrações |
| `PUT` | `/api/configuracoes` | Salvar integrações |

---

## Estruturas esperadas da API

O front-end aceita listagens retornadas diretamente como array ou dentro da propriedade `data`.

Exemplo direto:

```json
[
  {
    "id": 1,
    "nome": "Registro"
  }
]
```

Exemplo paginado ou encapsulado:

```json
{
  "data": [
    {
      "id": 1,
      "nome": "Registro"
    }
  ]
}
```

### Usuário

```json
{
  "id": 1,
  "nome": "Maria",
  "cpf": "00000000000",
  "email": "maria@exemplo.com",
  "matricula": "20260001",
  "tipo": "ALUNO",
  "fase": 5,
  "data_nascimento": "2000-06-13",
  "avatar_url": "/storage/avatars/foto.jpg",
  "curso_id": 1,
  "curso": {
    "id": 1,
    "nome": "Análise e Desenvolvimento de Sistemas"
  }
}
```

### Curso

```json
{
  "id": 1,
  "nome": "Análise e Desenvolvimento de Sistemas",
  "horas_necessarias": 200
}
```

### Categoria

```json
{
  "id": 1,
  "nome": "Atividades científico-acadêmicas"
}
```

### Certificado

```json
{
  "id": 1,
  "nome_certificado": "Curso de Desenvolvimento Web",
  "instituicao": "Instituição de Ensino",
  "categoria": "Atividades científico-acadêmicas",
  "categoria_id": 1,
  "carga_horaria_solicitada": 20,
  "horas_validadas": 20,
  "data_emissao": "2026-06-01",
  "arquivo_url": "/storage/certificados/arquivo.pdf",
  "status": "APROVADO",
  "observacao": "Atividade aprovada.",
  "created_at": "2026-06-10T10:00:00Z",
  "aluno": {
    "id": 1,
    "nome": "Maria",
    "matricula": "20260001",
    "fase": 5
  }
}
```

### Progresso

```json
{
  "horas_necessarias": 200,
  "total_horas_aprovadas": 80,
  "horas_por_categoria": {
    "Atividades científico-acadêmicas": 40,
    "Atividades socioculturais": 20,
    "Prática profissional": 20
  }
}
```

---

## Envio de certificado

O cadastro de uma atividade utiliza `FormData` e envia:

```text
categoria_id
nome_certificado
instituicao
carga_horaria_solicitada
data_emissao
arquivo
```

O comprovante deve ser enviado em formato PDF.

Exemplo conceitual:

```javascript
const formData = new FormData();

formData.append('categoria_id', categoriaId);
formData.append('nome_certificado', nome);
formData.append('instituicao', instituicao);
formData.append('carga_horaria_solicitada', horas);
formData.append('data_emissao', dataEmissao);
formData.append('arquivo', arquivoPdf);
```

O front-end não define manualmente o cabeçalho `Content-Type` nesse envio, permitindo que o navegador gere corretamente o limite do formulário multipart.

---

## Avaliação de certificados

Durante a avaliação, o coordenador pode enviar:

```json
{
  "status": "APROVADO",
  "horas_validadas": 20,
  "observacao": "",
  "categoria_id": 1,
  "nome_certificado": "Curso de Desenvolvimento Web",
  "instituicao": "Instituição de Ensino",
  "data_emissao": "2026-06-01",
  "carga_horaria_solicitada": 20
}
```

Uma justificativa é obrigatória no front-end para:

```text
REPROVADO
APROVADO_COM_RESSALVAS
```

---

## Status dos certificados

| Código da API | Exibição no front-end | Significado |
|---|---|---|
| `ENTREGUE` | Entregue | Aguardando análise |
| `APROVADO` | Aprovado | Atividade aceita |
| `REPROVADO` | Reprovado | Atividade recusada |
| `APROVADO_COM_RESSALVAS` | Aprovado com Ressalvas | Atividade aceita com ajustes, redução de horas ou observação |

As cores são definidas por variáveis CSS:

```css
--status-aprovado: #2ecc71;
--status-reprovado: #e74c3c;
--status-entregue: #3498db;
--status-ressalva: #e67e22;
```

---

## Responsividade

O projeto utiliza uma abordagem **Mobile First**.

### Celulares

- tabelas são transformadas em cards;
- cabeçalhos das tabelas são ocultados;
- os nomes das colunas são exibidos com `data-label`;
- botões e formulários são reorganizados verticalmente;
- modais ocupam a largura disponível;
- detalhes são empilhados;
- áreas de ação são adaptadas para telas menores.

### A partir de 768px

- tabelas retornam ao formato tradicional;
- formulários podem utilizar duas colunas;
- filtros são organizados horizontalmente;
- rodapés de modais ficam alinhados à direita;
- cards de resumo ficam lado a lado.

### A partir de 1024px

- os containers recebem maior espaçamento;
- os cards de perfil recebem limites de largura adequados para desktop.

### A partir de 1200px

- seções administrativas podem utilizar mais colunas;
- os componentes aproveitam melhor telas grandes.

---

## Identidade visual

A interface utiliza fundo azul-escuro, detalhes em azul-ciano e elementos em branco, mantendo contraste com o logotipo do SHC.

### Tema padrão

Utilizado por aluno, coordenador e secretaria:

```css
--primary-glow: #00aaff;
--primary-gradient: linear-gradient(45deg, #00aaff, #8e44ad);
```

### Tema administrativo

Utilizado nas telas do administrador:

```css
--primary-glow: #e74c3c;
--primary-gradient: linear-gradient(45deg, #e74c3c, #f39c12);
```

### Cores de base

```css
--background-dark: #0f172a;
--background-light: #1e293b;
--text-primary: #e2e8f0;
--text-secondary: #94a3b8;
```

### Tipografia

A fonte principal é:

```text
Poppins
```

Pesos utilizados:

```text
300
400
600
```

---

## Manual e ajuda contextual

O sistema possui um manual interno em:

```text
manual.html
```

O conteúdo é dividido em:

- acesso e login;
- perfil;
- guia do aluno;
- guia do coordenador;
- guia da secretaria;
- guia do administrador.

Nas páginas autenticadas, o `utils.js` cria um botão flutuante de ajuda. Esse botão direciona o usuário diretamente à seção do manual relacionada à tela atual.

Exemplos:

```text
Cadastro de Horas → manual.html#aluno-cadastrar
Validar Horas → manual.html#coord-validar
Gerenciar Alunos → manual.html#secretaria-gerenciar
Gerenciar Usuários → manual.html#admin-usuarios
Configurações → manual.html#admin-config
```

---

## Publicação

Por não possuir processo de compilação, o front-end pode ser hospedado em serviços de arquivos estáticos, como:

- GitHub Pages;
- Render Static Site;
- Netlify;
- Vercel;
- servidor Apache;
- servidor Nginx.

### Antes da publicação

Verifique:

1. se a API está publicada em HTTPS;
2. se o domínio do front-end está liberado no CORS da API;
3. se a pasta de armazenamento dos certificados está publicamente acessível para usuários autorizados;
4. se a URL de fallback da API está atualizada;
5. se `logo.png` e `favicon.ico` estão na raiz;
6. se os nomes dos arquivos foram preservados;
7. se os links com espaços e acentos estão funcionando;
8. se o back-end aceita o cabeçalho `Authorization`;
9. se os certificados em PDF podem ser carregados pelo navegador.

### Configuração de CORS

O back-end deve autorizar a origem exata do front-end.

Exemplos de origens:

```text
http://localhost:5500
https://usuario.github.io
https://seu-front-end.onrender.com
```

Também deve permitir, conforme a necessidade:

```text
GET
POST
PUT
PATCH
DELETE
OPTIONS
```

Cabeçalhos normalmente utilizados:

```text
Authorization
Content-Type
Accept
ngrok-skip-browser-warning
```

---

## Segurança

### Regras importantes

- todas as permissões devem ser validadas novamente pelo back-end;
- esconder uma tela no front-end não impede acesso indevido a um endpoint;
- o back-end deve verificar o papel do usuário autenticado;
- o coordenador deve receber apenas alunos do próprio curso;
- a secretaria e o administrador devem possuir autorizações específicas;
- arquivos enviados devem ser validados no servidor;
- o tipo real do arquivo deve ser verificado no back-end;
- limites de tamanho devem ser aplicados aos uploads;
- CPFs e demais dados pessoais devem ser protegidos;
- chaves de integração não devem ser inseridas diretamente no código-fonte;
- a API deve utilizar HTTPS em produção;
- mensagens de erro não devem revelar informações internas do servidor.

### Local Storage

A implementação atual armazena token e dados do usuário no `localStorage`.

Essa estratégia facilita o funcionamento da aplicação acadêmica, mas exige proteção contra injeção de scripts. Em um ambiente de produção com requisitos de segurança mais elevados, pode ser considerada a utilização de cookies:

```text
HttpOnly
Secure
SameSite
```

### Chaves de integração

A chave utilizada para importação de sistemas externos deve ser armazenada e protegida pelo back-end. Em produção, recomenda-se não devolver a chave completa ao navegador depois de salva.

---

## Solução de problemas

### Erro `401 Unauthorized`

Possíveis causas:

- token ausente;
- token expirado;
- usuário sem permissão;
- API utilizando outro padrão de autenticação;
- endereço incorreto da API.

Solução inicial:

```javascript
localStorage.removeItem('authToken');
localStorage.removeItem('userData');
location.href = 'index.html';
```

Depois, realize o login novamente.

---

### Erro de CORS

Mensagem comum:

```text
Access to fetch has been blocked by CORS policy
```

Verifique se o back-end permite a origem em que o front-end está sendo executado.

A origem inclui:

```text
protocolo + domínio + porta
```

Exemplo:

```text
http://localhost:5500
```

é diferente de:

```text
http://127.0.0.1:5500
```

---

### A API do ngrok mudou

Abra novamente o login passando a nova URL:

```text
index.html?api=https://novo-endereco.ngrok-free.app
```

Também é possível limpar a URL anterior:

```javascript
localStorage.removeItem('API_BASE_URL');
location.reload();
```

---

### Categorias não são carregadas

Verifique:

- se a API está ativa;
- se `/api/categorias` está respondendo;
- se o token está válido;
- se o usuário possui permissão;
- se o endereço salvo em `API_BASE_URL` está correto;
- se o CORS está configurado.

---

### Certificado não é enviado

Verifique:

- se todos os campos foram preenchidos;
- se a carga horária é maior que zero;
- se uma categoria foi selecionada;
- se o arquivo é PDF;
- se o back-end aceita `multipart/form-data`;
- se o tamanho do arquivo está dentro do limite;
- se a pasta de armazenamento possui permissão de escrita.

---

### PDF não aparece na pré-visualização

Verifique:

- se `arquivo_url` foi retornado pela API;
- se o caminho pode ser acessado pelo navegador;
- se o arquivo realmente existe;
- se a rota `/storage/` está publicada;
- se não há bloqueio de conteúdo misto entre HTTP e HTTPS;
- se o navegador oferece suporte à exibição interna de PDF.

O sistema utiliza a função `formatFileUrl()` para ajustar caminhos recebidos do servidor.

---

### Página redireciona para o login

Isso ocorre quando o valor `authToken` não está disponível no navegador.

Verifique:

```javascript
localStorage.getItem('authToken');
localStorage.getItem('userData');
```

---

### Logo, fonte ou ícones não aparecem

Verifique:

- se `logo.png` está na raiz;
- se o navegador possui acesso à internet;
- se o CDN do Font Awesome está acessível;
- se o Google Fonts está acessível;
- se não existe bloqueio por política de conteúdo.

---

### Uma página retorna erro `404`

Como os nomes atuais possuem espaços e acentos, verifique:

- letras maiúsculas e minúsculas;
- acentuação;
- espaços;
- codificação `%20`;
- nome exato do arquivo no servidor.

Exemplo:

```text
dashboard%20alunos.html
```

representa:

```text
dashboard alunos.html
```

---

## Comportamentos e limitações atuais

- o front-end depende integralmente da API para persistir os dados;
- a recuperação de senha depende de atendimento pela Secretaria Acadêmica;
- o status da API mostrado no perfil administrativo é uma informação visual e não substitui um endpoint real de monitoramento;
- a remoção da foto de perfil é realizada visualmente no front-end e precisa de um endpoint de exclusão para persistência definitiva;
- o filtro de período no histórico da secretaria utiliza atualmente a data de cadastro do aluno;
- os arquivos de fontes e ícones dependem de serviços externos;
- os comprovantes são visualizados conforme o suporte a PDF do navegador;
- a proteção de rotas no navegador não substitui a autorização realizada pelo servidor;
- mudanças nos nomes das páginas exigem atualização dos links internos;
- o projeto não possui processo automatizado de testes;
- o projeto não possui processo de build ou minificação;
- o endereço do ngrok pode mudar e precisa ser atualizado quando o túnel é reiniciado.

---

## Melhorias futuras

Possíveis evoluções do front-end:

- substituir nomes de arquivos com espaços e acentos por URLs padronizadas;
- criar um roteador central;
- separar estilos específicos do manual em arquivo próprio;
- implementar testes automatizados;
- adicionar testes de integração com a API;
- implementar exclusão permanente de avatar;
- criar endpoint real de verificação da API;
- adicionar paginação às grandes listagens;
- implementar busca com atraso controlado;
- melhorar o tratamento global de erros HTTP;
- tratar automaticamente respostas `401`;
- renovar tokens expirados;
- adicionar confirmação antes de ações críticas;
- permitir ordenação das tabelas;
- implementar filtros por status;
- aprimorar acessibilidade por teclado;
- revisar contraste e estados de foco;
- adicionar textos alternativos e atributos ARIA onde necessário;
- compactar imagens e arquivos de produção;
- substituir dependências externas por arquivos locais quando necessário;
- criar configuração por ambiente;
- utilizar variáveis de ambiente durante a publicação;
- documentar o contrato completo da API com OpenAPI ou Swagger;
- criar indicadores reais de carregamento e disponibilidade;
- implementar visualização alternativa quando o navegador não suporta PDF.

---

## Boas práticas para desenvolvimento

Ao adicionar uma nova página:

1. importe os quatro arquivos CSS globais;
2. importe `utils.js` antes dos scripts que dependem dele;
3. importe `components.js` quando houver cabeçalho ou modal global;
4. adicione o elemento `#app-header` quando necessário;
5. utilize `data-back-url` para configurar o botão de voltar;
6. aplique `data-label` às células das tabelas;
7. utilize `toggleError()` para validações visuais;
8. utilize `showToast()` para mensagens ao usuário;
9. envie o token no cabeçalho `Authorization`;
10. configure o botão de ajuda contextual no `utils.js`.

Exemplo de cabeçalho:

```html
<header
  id="app-header"
  data-back-url="dashboard%20alunos.html">
</header>
```

Exemplo de requisição autenticada:

```javascript
const response = await fetch(`${API_BASE_URL}/api/recurso`, {
  headers: {
    Authorization: `Bearer ${authToken}`,
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});
```

Exemplo de validação:

```javascript
if (!campo.value.trim()) {
  toggleError(campo, true);
  showToast('Preencha o campo obrigatório.', 'error');
}
```

---

## Versionamento

A versão apresentada atualmente no perfil administrativo é:

```text
v1.1
```

Sugestão de versionamento:

```text
MAJOR.MINOR.PATCH
```

Exemplos:

```text
1.1.0
1.2.0
2.0.0
```

- `MAJOR`: alterações incompatíveis ou grandes reformulações;
- `MINOR`: novas funcionalidades compatíveis;
- `PATCH`: correções e pequenos ajustes.

---

## Autoria

Desenvolvido por **Maria Eduarda** no contexto do curso de **Análise e Desenvolvimento de Sistemas da Faculdade Municipal de Palhoça — FMP**.

Projeto: **Sistema de Horas Complementares — SHC**

---

## Licença

Este projeto ainda não possui uma licença de distribuição definida.

Antes de disponibilizá-lo publicamente para reutilização, modificação ou distribuição, recomenda-se adicionar um arquivo:

```text
LICENSE
```

Enquanto não houver uma licença explícita, permanecem reservados os direitos sobre o código, a identidade visual e os demais materiais do projeto.
````
