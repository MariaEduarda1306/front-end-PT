<p align="center">
  <img src="logo.png" alt="Logo do Sistema de Horas Complementares" width="500">
</p>

<h1 align="center">SHC — Front-end</h1>

<p align="center">
  Interface web do Sistema de Horas Complementares, desenvolvida com HTML, CSS e JavaScript.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Layout-Responsivo-00AAFF" alt="Layout responsivo">
</p>

---

## Sobre este repositório

Este repositório contém exclusivamente o **front-end do Sistema de Horas Complementares (SHC)**.

A aplicação fornece as interfaces utilizadas por alunos, coordenadores, secretaria e administradores para acessar as funcionalidades do sistema. O front-end realiza a comunicação com a API do SHC por meio da Fetch API.

Este repositório não contém:

- banco de dados;
- regras de negócio do servidor;
- autenticação implementada no back-end;
- armazenamento dos certificados;
- código da API.

Para que todas as funcionalidades sejam executadas corretamente, o back-end do SHC deve estar disponível e configurado.

---

## Funcionalidades do front-end

### Recursos gerais

- tela de login;
- orientação para primeiro acesso;
- orientação para recuperação de senha;
- redirecionamento conforme o perfil autenticado;
- cabeçalho reutilizável;
- logout;
- alteração de senha;
- upload e remoção visual da foto de perfil;
- validação visual dos formulários;
- notificações do tipo toast;
- seletores personalizados;
- filtros de pesquisa;
- modais de cadastro, edição e confirmação;
- acordeões para exibição de detalhes;
- pré-visualização de certificados em PDF;
- manual do usuário integrado;
- layout responsivo para dispositivos móveis e computadores.

### Aluno

- painel de opções;
- cadastro de horas complementares;
- envio de certificado em PDF;
- consulta ao histórico de atividades;
- visualização do status das solicitações;
- visualização das horas solicitadas e aprovadas;
- acompanhamento do progresso geral;
- acompanhamento das horas por categoria;
- consulta ao perfil;
- alteração de senha e foto.

### Coordenador

- painel de opções;
- tela específica para validação de horas;
- listagem de alunos com atividades pendentes;
- filtros por nome, matrícula e fase;
- consulta ao progresso dos alunos;
- visualização dos certificados;
- aprovação, reprovação ou aprovação com ressalvas;
- definição das horas validadas;
- registro de observações;
- tela separada para consulta ao histórico dos alunos do curso;
- consulta ao perfil;
- alteração de senha e foto.

### Secretaria

- painel de opções;
- consulta ao histórico geral dos alunos;
- filtros por nome, matrícula, curso e período;
- cadastro de alunos;
- edição dos dados dos alunos;
- exclusão de alunos;
- associação de aluno a curso e fase;
- redefinição de senha durante a edição;
- consulta ao perfil;
- alteração de senha e foto.

### Administrador

- painel administrativo;
- cadastro de usuários;
- edição de usuários;
- exclusão de usuários;
- filtros por nome, CPF e papel;
- gerenciamento de cursos;
- gerenciamento de categorias;
- configuração de integração externa;
- importação de usuários;
- exportação de certificados em JSON;
- consulta ao perfil;
- alteração de senha e foto.

---

## Tecnologias utilizadas

- HTML5;
- CSS3;
- JavaScript Vanilla;
- Fetch API;
- Local Storage;
- FormData;
- Font Awesome;
- Google Fonts;
- CSS Grid;
- Flexbox;
- elementos `dialog` para modais;
- elemento `embed` para visualização de PDF.

O projeto não utiliza framework JavaScript, gerenciador de pacotes ou processo de build.

---

## Estrutura do projeto

```text
front-end-PT/
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
├── histórico coordenador.html
├── histórico secretaria.html
├── validar horas coordenador.html
│
├── gerenciar alunos secretaria.html
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

> Alguns arquivos possuem espaços e caracteres acentuados. Caso seus nomes sejam alterados, todas as referências presentes nos arquivos HTML e JavaScript também deverão ser atualizadas.

---

## Páginas

| Arquivo | Descrição |
|---|---|
| `index.html` | Tela de login, primeiro acesso e recuperação de senha |
| `manual.html` | Manual do usuário |
| `dashboard alunos.html` | Painel inicial do aluno |
| `cadastro de horas alunos.html` | Cadastro de atividade complementar |
| `histórico aluno.html` | Histórico individual do aluno |
| `perfil alunos.html` | Perfil e progresso do aluno |
| `dashboard coordenador.html` | Painel inicial do coordenador |
| `validar horas coordenador.html` | Validação das atividades pendentes |
| `histórico coordenador.html` | Histórico dos alunos do curso |
| `perfil coordenador.html` | Perfil do coordenador |
| `dashboard secretaria.html` | Painel inicial da secretaria |
| `histórico secretaria.html` | Histórico geral dos alunos |
| `gerenciar alunos secretaria.html` | Cadastro, edição e exclusão de alunos |
| `perfil secretaria.html` | Perfil da secretaria |
| `dashboard administrador.html` | Painel inicial do administrador |
| `gerenciar usuarios administrador.html` | Gerenciamento de usuários |
| `configurações do sistema administrador.html` | Cursos, categorias e integrações |
| `perfil administrador.html` | Perfil do administrador |

---

## Arquivos JavaScript

### `utils.js`

Reúne funções utilizadas por diferentes páginas:

- configuração da URL da API;
- recuperação do token e dos dados do usuário;
- verificação da autenticação;
- formatação das URLs de arquivos;
- máscara de CPF;
- mapeamento dos status;
- validação visual dos campos;
- criação de notificações;
- configuração dos acordeões;
- configuração dos seletores personalizados.

### `components.js`

Responsável pelos componentes reutilizáveis:

- cabeçalho global;
- botão de voltar;
- botão de logout;
- logo do sistema;
- modal de alteração de senha.

### `login.js`

Responsável por:

- autenticação;
- exibição e ocultação da senha;
- modal de primeiro acesso;
- orientação de recuperação;
- redirecionamento conforme o perfil.

### `dashboard.js`

Responsável pela personalização dos painéis e pela mensagem de boas-vindas.

### `cadastro-horas.js`

Responsável por:

- carregamento das categorias;
- validação do formulário;
- seleção do certificado;
- envio da atividade para a API.

### `historico-aluno.js`

Responsável por carregar e exibir o histórico do aluno em acordeões.

### `historico-coordenador.js`

Responsável por:

- listar os alunos do curso;
- aplicar filtros;
- abrir o histórico individual;
- exibir o progresso e os certificados.

### `validar-horas.js`

Responsável por:

- listar atividades pendentes;
- agrupar pendências por aluno;
- exibir o progresso;
- apresentar o formulário de validação;
- enviar a decisão do coordenador.

### `historico-secretaria.js`

Responsável por:

- listar alunos;
- aplicar filtros;
- consultar o histórico individual;
- exibir certificados de diferentes cursos.

### `gerenciar-alunos.js`

Responsável pelo cadastro, edição, exclusão e filtragem de alunos.

### `gerenciar-usuarios.js`

Responsável pelo cadastro, edição, exclusão e filtragem dos usuários do sistema.

### `configuracoes.js`

Responsável por:

- gerenciamento de cursos;
- gerenciamento de categorias;
- configurações de integração;
- importação de usuários;
- exportação de certificados.

### `perfil.js`

Responsável por:

- preenchimento dos dados do usuário;
- exibição do progresso do aluno;
- exibição dos resumos dos demais perfis;
- upload de foto;
- alteração de senha.

---

## Arquivos CSS

### `base.css`

Contém:

- variáveis globais;
- cores;
- temas;
- tipografia;
- configurações básicas da página.

### `layout.css`

Contém:

- containers;
- limites de largura;
- espaçamentos;
- grids;
- organização geral das páginas.

### `components.css`

Contém os estilos dos componentes:

- cabeçalho;
- botões;
- formulários;
- filtros;
- tabelas;
- cards;
- modais;
- acordeões;
- badges;
- login;
- perfil;
- barras de progresso;
- upload de arquivos;
- notificações.

### `responsive.css`

Contém as adaptações para diferentes tamanhos de tela.

Em dispositivos móveis, as tabelas são transformadas em cards e os formulários são reorganizados em uma única coluna.

---

## Identidade visual

O front-end utiliza uma interface escura com detalhes em azul-ciano, branco e tons de cinza.

### Cores principais

```css
--background-dark: #0f172a;
--background-light: #1e293b;
--text-primary: #e2e8f0;
--text-secondary: #94a3b8;
--primary-glow: #00aaff;
```

### Tema administrativo

As telas do administrador utilizam uma variação visual em vermelho e laranja:

```css
--primary-glow: #e74c3c;
--primary-gradient: linear-gradient(45deg, #e74c3c, #f39c12);
```

### Tipografia

A fonte utilizada é a **Poppins**, carregada pelo Google Fonts.

---

## Responsividade

O projeto utiliza uma abordagem Mobile First.

### Em telas menores

- tabelas são exibidas como cards;
- os títulos das colunas são mostrados por meio do atributo `data-label`;
- botões e filtros são empilhados;
- modais ocupam a largura disponível;
- formulários utilizam uma coluna;
- conteúdos detalhados são reorganizados verticalmente.

### Em telas maiores

- as tabelas retornam ao formato tradicional;
- formulários podem utilizar duas colunas;
- filtros são alinhados horizontalmente;
- os cards aproveitam melhor a largura da tela.

---

## Pré-requisitos

Para executar o front-end, é necessário:

- navegador moderno;
- servidor HTTP local ou hospedagem estática;
- API do SHC em execução;
- CORS configurado na API;
- conexão com a internet para Google Fonts e Font Awesome.

Não é necessário instalar Node.js ou NPM.

---

## Como executar localmente

### 1. Baixe ou clone o repositório

```bash
git clone https://github.com/MariaEduarda1306/front-end-PT.git
```

Acesse a pasta:

```bash
cd front-end-PT
```

### 2. Inicie um servidor local

Com Python:

```bash
python -m http.server 5500
```

No Windows, também pode ser utilizado:

```bash
py -m http.server 5500
```

Depois, acesse:

```text
http://localhost:5500/index.html
```

Também é possível utilizar a extensão **Live Server** do Visual Studio Code.

> Evite abrir o projeto diretamente com `file://`, pois algumas funções do navegador e requisições à API podem não funcionar corretamente.

---

## Configuração da API

A URL da API é configurada em:

```text
js/utils.js
```

Quando o front-end é executado em `localhost` ou `127.0.0.1`, a URL padrão é:

```text
http://localhost:8000
```

Também é possível informar outro endereço pelo parâmetro `api`:

```text
http://localhost:5500/index.html?api=https://endereco-da-api
```

Exemplo com ngrok:

```text
http://localhost:5500/index.html?api=https://seu-endereco.ngrok-free.app
```

O endereço informado é salvo no `localStorage`.

Para remover a configuração salva, execute no console do navegador:

```javascript
localStorage.removeItem('API_BASE_URL');
location.reload();
```

---

## Sessão do usuário

Após o login, o front-end armazena no navegador:

```javascript
localStorage.getItem('authToken');
localStorage.getItem('userData');
```

O token é enviado nas requisições autenticadas:

```javascript
const response = await fetch(`${API_BASE_URL}/api/recurso`, {
  headers: {
    Authorization: `Bearer ${authToken}`,
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});
```

Ao sair do sistema, os dados da sessão são removidos.

---

## Primeiro acesso

Na configuração atual da interface:

| Campo | Informação |
|---|---|
| Usuário | CPF |
| Senha inicial | Data de nascimento no formato `DDMMAAAA` |

Exemplo:

```text
Data de nascimento: 13/06/2000
Senha inicial: 13062000
```

A tela de login apresenta uma opção destacada com essas orientações.

---

## Manual do usuário

O arquivo `manual.html` reúne instruções para:

- acesso e login;
- perfil;
- aluno;
- coordenador;
- secretaria;
- administrador.

O manual utiliza seções e acordeões para organizar o conteúdo.

---

## Publicação

Por ser um projeto estático, o front-end pode ser publicado em serviços como:

- GitHub Pages;
- Render Static Site;
- Netlify;
- Vercel;
- Apache;
- Nginx.

Antes da publicação, verifique:

1. se a URL da API está correta;
2. se a API utiliza HTTPS;
3. se o domínio do front-end está permitido pelo CORS;
4. se `logo.png` e `favicon.ico` estão na raiz;
5. se os nomes dos arquivos foram mantidos;
6. se os caminhos dos arquivos CSS e JavaScript estão corretos;
7. se os certificados podem ser acessados pelo navegador.

---

## Observações

- o front-end depende da API para carregar e persistir os dados;
- o projeto não possui processo de build;
- o projeto não utiliza framework;
- o endereço do ngrok pode mudar quando o túnel é reiniciado;
- os nomes de alguns arquivos possuem espaços e acentos;
- as permissões de acesso devem ser validadas pelo back-end;
- a exibição de PDFs depende do suporte do navegador;
- fontes e ícones são carregados por serviços externos.

---

## Autoria

Desenvolvido por **Maria Eduarda** como parte do Projeto Técnico do curso de **Análise e Desenvolvimento de Sistemas da Faculdade Municipal de Palhoça — FMP**.

---

## Licença

Este repositório ainda não possui uma licença de distribuição definida.
