<p align="center">
  <img src="logo.png" alt="Logo do Sistema de Horas Complementares" width="500">
</p>

<h1 align="center">SHC — Front-end</h1>

<p align="center">
  Interface web do Sistema de Horas Complementares, desenvolvida para oferecer uma experiência clara, responsiva e integrada à API do sistema.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Interface-Responsiva-00AAFF" alt="Interface responsiva">
</p>

---

## Sobre o front-end

Este repositório reúne a interface do **Sistema de Horas Complementares (SHC)**, responsável pela interação dos usuários com as funcionalidades disponibilizadas pelo sistema.

A aplicação foi estruturada para atender quatro perfis de acesso:

- aluno;
- coordenador;
- secretaria;
- administrador.

Cada perfil possui telas e fluxos próprios, mantendo uma identidade visual consistente e uma navegação adaptada às suas responsabilidades dentro do processo de cadastro, acompanhamento, validação e gerenciamento das horas complementares.

A comunicação com o back-end é realizada por meio da **Fetch API**, utilizando autenticação por token e integração com os endpoints da API do SHC.

---

## Principais funcionalidades

### Recursos gerais

- autenticação por CPF e senha;
- orientação para primeiro acesso;
- orientação para recuperação de senha;
- redirecionamento conforme o perfil autenticado;
- cabeçalho reutilizável;
- botão de voltar;
- logout;
- alteração de senha;
- atualização da foto de perfil;
- validação visual dos formulários;
- notificações do tipo toast;
- seletores personalizados;
- filtros de pesquisa;
- modais de cadastro, edição e confirmação;
- acordeões para organização das informações;
- pré-visualização de certificados em PDF;
- botão flutuante de ajuda contextual;
- manual do usuário integrado;
- interface responsiva.

### Aluno

- acesso ao painel de opções;
- cadastro de atividades complementares;
- envio de comprovante em PDF;
- consulta ao histórico de solicitações;
- acompanhamento dos status das atividades;
- visualização das horas solicitadas e aprovadas;
- acompanhamento do progresso geral;
- acompanhamento das horas por categoria;
- consulta ao perfil;
- alteração de senha e foto.

### Coordenador

- acesso ao painel de opções;
- tela específica para validação de horas;
- visualização dos alunos do curso;
- filtros por nome, matrícula e fase;
- identificação de atividades pendentes;
- consulta ao progresso dos alunos;
- análise dos certificados enviados;
- aprovação, reprovação ou aprovação com ressalvas;
- definição das horas validadas;
- registro de observações;
- consulta ao histórico do curso;
- consulta ao perfil;
- alteração de senha e foto.

### Secretaria

- acesso ao painel de opções;
- consulta ao histórico geral dos alunos;
- filtros por nome, matrícula, curso e período;
- cadastro de alunos;
- edição dos dados dos alunos;
- exclusão de alunos;
- associação de curso e fase;
- redefinição de senha;
- consulta ao perfil;
- alteração de senha e foto.

### Administrador

- acesso ao painel administrativo;
- cadastro de usuários;
- edição de usuários;
- exclusão de usuários;
- filtros por nome, CPF e papel;
- gerenciamento de cursos;
- gerenciamento de categorias;
- configuração de integrações externas;
- importação de usuários;
- exportação de certificados em JSON;
- consulta ao perfil;
- alteração de senha e foto.

---

## Tecnologias utilizadas

- **HTML5** para a estrutura das páginas;
- **CSS3** para estilização e responsividade;
- **JavaScript** para comportamento dinâmico e integração com a API;
- **Fetch API** para requisições HTTP;
- **Local Storage** para gerenciamento da sessão no navegador;
- **FormData** para envio de arquivos;
- **Font Awesome** para ícones;
- **Google Fonts** para tipografia;
- **CSS Grid** e **Flexbox** para organização dos layouts;
- elemento **`dialog`** para modais;
- elemento **`embed`** para pré-visualização de PDFs.

---

## Estrutura do projeto

```text
front-end-PT/
│
├── README.md
├── index.html
├── manual.html
├── logo.png
├── favicon.ico
│
├── dashboard-alunos.html
├── dashboard-coordenador.html
├── dashboard-secretaria.html
├── dashboard-administrador.html
│
├── cadastro-horas.html
├── historico-aluno.html
├── historico-coordenador.html
├── historico-secretaria.html
├── validar-horas.html
│
├── gerenciar-alunos.html
├── gerenciar-usuarios.html
├── configuracoes-sistema.html
│
├── perfil-alunos.html
├── perfil-coordenador.html
├── perfil-secretaria.html
├── perfil-administrador.html
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

---

## Páginas da aplicação

| Arquivo | Finalidade |
|---|---|
| `index.html` | Login, primeiro acesso e recuperação de senha |
| `manual.html` | Manual do usuário |
| `dashboard-alunos.html` | Painel inicial do aluno |
| `cadastro-horas.html` | Cadastro de atividade complementar |
| `historico-aluno.html` | Histórico individual do aluno |
| `perfil-alunos.html` | Perfil e progresso do aluno |
| `dashboard-coordenador.html` | Painel inicial do coordenador |
| `validar-horas.html` | Validação das atividades pendentes |
| `historico-coordenador.html` | Histórico dos alunos do curso |
| `perfil-coordenador.html` | Perfil do coordenador |
| `dashboard-secretaria.html` | Painel inicial da secretaria |
| `historico-secretaria.html` | Histórico geral dos alunos |
| `gerenciar-alunos.html` | Cadastro, edição e exclusão de alunos |
| `perfil-secretaria.html` | Perfil da secretaria |
| `dashboard-administrador.html` | Painel inicial do administrador |
| `gerenciar-usuarios.html` | Gerenciamento de usuários |
| `configuracoes-sistema.html` | Cursos, categorias e integrações |
| `perfil-administrador.html` | Perfil do administrador |

---

## Organização dos scripts

### `utils.js`

Centraliza funções compartilhadas pela aplicação:

- configuração dinâmica da URL da API;
- leitura do token e dos dados do usuário;
- verificação da autenticação;
- formatação de URLs de arquivos;
- máscara de CPF;
- mapeamento dos status;
- validação visual de campos;
- notificações do tipo toast;
- acordeões;
- seletores personalizados;
- inputs de upload;
- botão flutuante de ajuda contextual.

### `components.js`

Responsável pelos componentes reutilizáveis:

- cabeçalho global;
- logo do sistema;
- botão de voltar;
- logout;
- modal de alteração de senha.

### `login.js`

Controla:

- autenticação;
- exibição e ocultação da senha;
- primeiro acesso;
- recuperação de senha;
- redirecionamento conforme o perfil autenticado.

### `dashboard.js`

Controla a personalização dos painéis iniciais e apresenta a saudação ao usuário autenticado.

### `cadastro-horas.js`

Controla:

- carregamento das categorias;
- validação dos campos;
- seleção do comprovante;
- envio da atividade complementar.

### `historico-aluno.js`

Controla o carregamento e a apresentação do histórico individual do aluno em formato de acordeão.

### `historico-coordenador.js`

Controla:

- listagem dos alunos do curso;
- filtros;
- histórico individual;
- progresso;
- visualização dos certificados;
- validação de certificados a partir do histórico.

### `validar-horas.js`

Controla:

- listagem das pendências;
- agrupamento por aluno;
- visualização do progresso;
- formulário de validação;
- envio da decisão do coordenador.

### `historico-secretaria.js`

Controla:

- listagem de alunos;
- filtros;
- histórico individual;
- visualização dos certificados.

### `gerenciar-alunos.js`

Controla:

- cadastro de alunos;
- edição de alunos;
- exclusão de alunos;
- filtros;
- carregamento de cursos.

### `gerenciar-usuarios.js`

Controla:

- cadastro de usuários;
- edição de usuários;
- exclusão de usuários;
- filtros por nome, CPF e papel;
- carregamento de cursos para usuários vinculados a curso.

### `configuracoes.js`

Controla:

- gerenciamento de cursos;
- gerenciamento de categorias;
- configurações de integrações;
- importação de usuários;
- exportação de certificados.

### `perfil.js`

Controla:

- exibição dos dados do perfil;
- progresso do aluno;
- resumos específicos por perfil;
- atualização da foto de perfil;
- alteração de senha.

---

## Organização dos estilos

### `base.css`

Reúne:

- variáveis globais;
- cores principais;
- tema da aplicação;
- tipografia;
- configurações básicas dos elementos.

### `layout.css`

Reúne:

- containers;
- larguras máximas;
- espaçamentos;
- grids;
- organização geral das páginas.

### `components.css`

Reúne os estilos dos principais componentes:

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

Reúne as adaptações visuais para diferentes tamanhos de tela.

---

## Identidade visual

O front-end utiliza uma interface escura com detalhes em azul-ciano, branco e tons de cinza. A escolha visual busca transmitir modernidade, organização e clareza, mantendo bom contraste entre fundo, textos, botões e informações importantes.

### Cores principais

```css
--background-dark: #0f172a;
--background-light: #1e293b;
--text-primary: #e2e8f0;
--text-secondary: #94a3b8;
--primary-glow: #00aaff;
```

O azul-ciano é utilizado como cor de destaque nas telas principais, reforçando a sensação de tecnologia, confiança e objetividade. Os tons escuros ajudam a destacar os cards, formulários e indicadores, além de contribuir para uma interface visualmente consistente.

### Tema administrativo

As telas do administrador utilizam uma variação em vermelho e laranja:

```css
--primary-glow: #e74c3c;
--primary-gradient: linear-gradient(45deg, #e74c3c, #f39c12);
```

Essa variação diferencia visualmente o ambiente administrativo, destacando ações de maior responsabilidade, como gerenciamento de usuários, cursos, categorias e configurações do sistema.

### Tipografia

A fonte principal da interface é a **Poppins**, escolhida por sua boa legibilidade em telas digitais e por contribuir para uma aparência moderna e limpa.

---

## Responsividade

A interface foi organizada para se adaptar a diferentes tamanhos de tela, incluindo celulares, tablets, notebooks e monitores maiores.

### Em telas menores

- tabelas são reorganizadas para facilitar a leitura;
- os títulos das colunas podem ser exibidos por meio do atributo `data-label`;
- botões e filtros são reorganizados verticalmente;
- modais ocupam melhor a largura disponível;
- formulários são apresentados em uma coluna;
- detalhes são apresentados de forma empilhada.

### Em telas maiores

- tabelas são apresentadas no formato tradicional;
- formulários podem utilizar duas colunas;
- filtros são alinhados horizontalmente;
- cards e seções aproveitam melhor a largura disponível.

---

## Como executar localmente

### 1. Clone o repositório

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

Outra opção é utilizar a extensão **Live Server** do Visual Studio Code.

---

## Configuração da API

A URL da API é definida no arquivo:

```text
js/utils.js
```

Em ambiente local, o front-end utiliza:

```text
http://localhost:8000
```

Também é possível informar outro endereço pelo parâmetro `api` na URL:

```text
http://localhost:5500/index.html?api=https://endereco-da-api
```

Exemplo com ngrok:

```text
http://localhost:5500/index.html?api=https://seu-endereco.ngrok-free.app
```

O endereço informado é salvo no navegador para uso nas demais páginas.

Para limpar a configuração da API salva no navegador:

```javascript
localStorage.removeItem('API_BASE_URL');
location.reload();
```

---

## Autenticação e sessão

Após o login, o front-end armazena no navegador:

```javascript
localStorage.getItem('authToken');
localStorage.getItem('userData');
```

As requisições autenticadas utilizam o token no cabeçalho:

```javascript
const response = await fetch(`${API_BASE_URL}/api/recurso`, {
  headers: {
    Authorization: `Bearer ${authToken}`,
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});
```

Ao sair do sistema, os dados da sessão são removidos e o usuário retorna à tela de login.

---

## Primeiro acesso

Na configuração atual da interface, o acesso inicial utiliza CPF e senha provisória baseada na data de nascimento.

| Campo | Informação |
|---|---|
| Usuário | CPF |
| Senha inicial | Data de nascimento no formato `DDMMAAAA` |

Exemplo:

```text
Data de nascimento: 13/06/2000
Senha inicial: 13062000
```

A tela de login possui uma opção destacada com essas orientações.

---

## Integração com a API

O front-end consome recursos relacionados a:

- autenticação;
- usuários;
- alunos;
- certificados;
- cursos;
- categorias;
- progresso;
- configurações;
- importação;
- exportação;
- foto de perfil;
- alteração de senha.

As listagens podem ser recebidas diretamente como array ou dentro da propriedade `data`.

Exemplo:

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

---

## Manual do usuário

O arquivo `manual.html` reúne orientações para:

- acesso e login;
- perfil;
- aluno;
- coordenador;
- secretaria;
- administrador.

O conteúdo é organizado em seções e acordeões para facilitar a navegação. As demais páginas contam com um botão flutuante de ajuda contextual, direcionando o usuário para a seção correspondente do manual.

---

## Publicação

O front-end pode ser publicado em serviços de hospedagem estática, como:

- GitHub Pages;
- Render Static Site;
- Netlify;
- Vercel;
- Apache;
- Nginx.

Antes da publicação, verifique:

1. se a URL da API está correta;
2. se a API utiliza HTTPS quando o front-end também estiver publicado em HTTPS;
3. se o domínio do front-end está autorizado no CORS do back-end;
4. se `logo.png` e `favicon.ico` estão na raiz do projeto;
5. se os caminhos dos arquivos CSS e JavaScript estão corretos;
6. se os arquivos de certificados podem ser acessados pelo navegador.

---

## Boas práticas para manutenção

Ao adicionar uma nova página:

1. importe os arquivos CSS globais;
2. carregue `utils.js` antes dos scripts que dependem dele;
3. carregue `components.js` quando a página utilizar cabeçalho ou modal global;
4. utilize `#app-header` para o cabeçalho reutilizável;
5. configure corretamente o atributo `data-back-url`;
6. aplique `data-label` às células das tabelas responsivas;
7. utilize `toggleError()` nas validações;
8. utilize `showToast()` nas mensagens;
9. envie o token no cabeçalho `Authorization`.

Exemplo de cabeçalho:

```html
<header
  id="app-header"
  data-back-url="dashboard-alunos.html">
</header>
```

Exemplo de validação:

```javascript
if (!campo.value.trim()) {
  toggleError(campo, true);
  showToast('Preencha o campo obrigatório.', 'error');
}
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

---

## Cuidados ao alterar nomes de arquivos

Os arquivos HTML utilizam nomes padronizados com hífen e sem acentuação. Ao renomear uma página, atualize também:

- links nos dashboards;
- atributos `data-back-url`;
- redirecionamentos em `login.js`;
- links do botão flutuante de ajuda em `utils.js`;
- referências no `manual.html`, quando houver.

---

## Autoria

Front-end desenvolvido por **Maria Eduarda** como parte do Projeto Técnico do curso de **Análise e Desenvolvimento de Sistemas da Faculdade Municipal de Palhoça — FMP**.

---

## Uso acadêmico

Este repositório compõe o desenvolvimento do **Sistema de Horas Complementares (SHC)** no contexto de projeto técnico acadêmico.