# NOTAS DE APRENDIZAGEM

## 1. O que é SPA e o que é Angular

**SPA (Single Page Application)**:

- A navegação acontece **no cliente**: o browser carrega um HTML inicial e o JavaScript atualiza a UI sem recarregar a página inteira.
- Vantagens: fluidez, experiência próxima a app nativa, menor tráfego após o primeiro load.
- Desvantagens: SEO mais difícil; atenção a performance e acessibilidade.

**Angular**:

- _Framework_ completo para construir SPAs robustas.
- Inclui: _components_, _modules_, _dependency injection_, _routing_, _forms_, _http client_, _testing_, _i18n_.
- Usa **TypeScript** (tipagem estática + recursos ESNext).

**Quando usar Angular**:

- Projetos grandes, equipes médias/grandes, necessidade de padrões e escalabilidade.
- Ecossistema consistente (CLI, estruturas padronizadas, tooling).

---

---

## 2. Documentação Angular

- **Site oficial**: [https://angular.dev](https://angular.dev) (Guides, Tutorials, API).
- **Como ler a doc**:
  - Comece por _Guides_ e _Tutorials_; depois aprofunde em _API Reference_.
  - Procure exemplos práticos e diferenças entre versões.
- **Dica**: salve trechos no seu _snippet manager_ e referencie no código.

---

---

## 3. Setup de um projeto

### 3.1. Pré-requisitos

- Node.js instalado [link para download](https://nodejs.org/en/download).

  Verifique Node.js (LTS recomendado) e npm:

  ```bash
  node -v
  npm -v
  ```

- Opcionalmente, pode ser instalado o NVM (Node Version Manager) que permite instalar e alternar entre várias versões do Node.js na mesma máquina. [link para download](https://www.nvmnode.com/pt/guide/download.html)

### 3.2. Instalar Angular CLI

Versão mais recente:

```bash
npm i -g @angular/cli
ng version
```

Versão específica (ex: v20.3.6):

```bash
npm i -g @angular/cli@20.3.6
ng version
```

### 3.3. Criar projeto

Rode `ng new <nome-do-app>` trocando `<nome-do-app>` pelo nome que o projeto terá.

Nome de exemplo: **_meu-primeiro-app-angular_**

```bash
ng new <meu-primeiro-app-angular>
# stylesheet format: SCSS
# Server-Side Rendering (SSR): N
# zoneless: N
# AI tools: None
```

**Stylesheet Format: Sass (SCSS)**:

- O que é: pré-processador de CSS com variáveis, mixins, aninhamento etc.
- Por que escolher: estilos mais organizados e reutilizáveis.
- Alternativas: CSS, Sass (indented), Less (dependendo do preset).
- Impacto: o projeto nasce com arquivos `.scss` e build já configurado.

**SSR/SSG: No**:

- O que é: SSR renderiza HTML no servidor (melhora SEO/TTFB); SSG gera HTML estático no build.
- Por que “No”: simplifica o começo (menos camadas/deploys).
- Quando “Yes”: apps públicas com SEO/preview/primeiro carregamento crítico.
- Como ligar depois: `ng add @angular/ssr` (cria setup para SSR/Prerender).

**Zoneless (sem zone.js): No**:

- O que é: remove zone.js e usa detecção de mudanças orientada por **Signals**.
- Por que “No”: caminho tradicional; muitos exemplos/libs assumem zone.js.
- Quando “Yes”: foco em performance/controle fino de change detection.
- Observação: zoneless exige padrões mais explícitos para atualizar a UI.

**AI Tools: None**:

- O que é: a CLI pode pré-configurar integrações (prompts, regras, snippets).
- Por que “None”: evita ruído no começo; pode adicionar depois.
- Se escolher outra: a CLI cria arquivos/configs de boas práticas da ferramenta.

### 3.4. Rodar projeto

A opção **`-o`** (`--open`) abre o navegador automaticamente em `http://localhost:4200` ao terminar a compilação.
Sem **`-o`**, abra manualmente: `http://localhost:4200`.

```bash
cd <nome-do-app>
ng serve -o
```

---

---
