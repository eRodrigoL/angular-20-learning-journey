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

## 4. Anatomia de uma App Angular

### 4.1. Visão geral

- Projeto **sem NgModule**: o bootstrap acontece em `main.ts` com `bootstrapApplication(AppComponent, appConfig)`.
- Configurações globais em `src/app/app.config.ts` (providers como Router, HttpClient, animações etc.).
- Rotas em `src/app/app.routes.ts` (suporta lazy loading).
- Componente raiz em `src/app/app.ts` (standalone: true), com template `app.html` e estilos `app.scss`.
- HTML base em `src/index.html`; estilos globais em `src/styles.scss`.
- `public/` (na raiz) para arquivos estáticos copiados para o build.
- `favicon.ico` na raiz do projeto (fora de `src/`).
- Arquivos de configuração na raiz: `angular.json`, `tsconfig*.json`, `package.json`, `.editorconfig`, `.gitignore`, `README.md`.

### 4.2. Árvore inicial de arquivos

```text
nome-do-projeto
├─ .vscode/                    # configs do VS Code do workspace
├─ node_modules/               # dependências (gerenciado pelo npm)
├─ public/                     # arquivos estáticos copiados "as is" no build
│  └─ ...                      # (imagens, ícones extras, manifest, etc.)
├─ favicon.ico                 # ícone raiz (fora de src/)
├─ src/
│  ├─ app/
│  │  ├─ app.config.ts         # providers globais (Router, HttpClient, animações…)
│  │  ├─ app.routes.ts         # rotas (suporta lazy loading, guards, resolvers)
│  │  ├─ app.ts                # AppComponent (standalone: true)
│  │  ├─ app.html              # template do AppComponent
│  │  ├─ app.scss              # estilos do AppComponent
│  │  └─ app.spec.ts           # testes do AppComponent
│  ├─ index.html               # HTML base (ponto de injeção)
│  ├─ main.ts                  # bootstrapApplication(AppComponent, appConfig)
│  └─ styles.scss              # estilos globais da app
├─ .editorconfig               # padronização de editor (indentação, EOL, charset)
├─ .gitignore                  # arquivos/pastas ignorados pelo Git
├─ angular.json                # config do Angular CLI (build/serve/test)
├─ package.json                # scripts e dependências
├─ package-lock.json           # lockfile do npm
├─ README.md                   # documentação do projeto
├─ tsconfig.json               # tsconfig base
├─ tsconfig.app.json           # tsconfig da aplicação
└─ tsconfig.spec.json          # tsconfig dos testes
```

### 4.3. Conceitos chave (que impactam a anatomia)

- **Control Flow moderno**: preferir a nova sintaxe `@if`, `@for`, `@switch`. As diretivas antigas `*ngIf`, `*ngFor`, `*ngSwitch` estão **deprecadas**.
- **Signals estáveis**: APIs como `signal`, `computed`, `effect` e utilitários (`toSignal` etc.).
- **Zoneless (opcional)**: iniciar sem Zone.js com `provideZonelessChangeDetection()` em providers.
- **SSR/hidratação**: _incremental hydration_ disponível; habilitar quando usar SSR (ex.: `provideClientHydration(...)`).
- **Requisitos**: Node **>= 20.11.1** (ou >= 22.11) e TypeScript **5.8.x**.

### 4.4. Boas práticas no layout

- **Componentes enxutos** + **services** para lógica/IO; componentes focados em UI.
- **Lazy loading** por feature; manter `app.routes.ts` organizado por áreas.
- **Providers centralizados** em `app.config.ts`: `provideRouter`, `provideHttpClient`, `provideAnimations` etc.
- **Migrar templates** para o **control flow novo** (`@if/@for/@switch`) conforme o projeto evoluir.
- **Padrão de nomes** consistente (`feature-name.component.ts`, `feature-name.routes.ts` etc.) e adoção de `core/`, `shared/`, `features/`.

---

---

## 5. Extensões VS Code úteis

Instale e configure as extensões abaixo para acelerar o fluxo:

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) — _Autocomplete_ e diagnósticos para templates.
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) — renomeia automaticamente tags HTML pareadas.

---

---

## 6. Comandos rápidos (cola de bolso)

```bash
# criar projeto
ng new <nome-do-app> --routing --style=scss
```

```bash
# rodar local
ng serve -o
```

```bash
# gerar artefatos
ng g application admin               # application
ng g component shared/header         # component
ng g class models/user               # class
ng g directive shared/auto-focus     # directive
ng g enum models/user-role           # enum
ng g guard auth/auth                 # guard
ng g interceptor core/http/auth      # interceptor
ng g interface models/user           # interface
ng g library ui-kit                  # library
ng g module shared/shared            # module (ainda útil p/ libs e agrupamentos, mesmo com standalone)
ng g pipe shared/currency-br         # pipe
ng g resolver users/user             # resolver
ng g service core/http/api           # service

# O caminho define pastas.
# O último segmento vira o nome base dos arquivos
```

```bash
# checar versões
ng version
node -v
npm -v
```

---

---

## 7. O que são COMPONENTES no Angular

**_COMPONENTE_** é a **unidade básica de UI** no Angular.
com TS (classe e metadados) + HTML (template) + SCSS (estilo) e, opcionalmente, SPEC.TS (testes).

Junta **lógica** (classe TypeScript), **template** (HTML), **estilos** (CSS/SCSS) e **metadados** (decorator @Component).
Componentes são **standalone por padrão** e se conectam via **Inputs/Outputs**, **rotas** e **serviços**.

---

### 7.1. Como gerar um componente?

O **Angular CLI** gera os artefatos para o projeto através do comando `ng generate`.

Para gerar um artefato "componente" o comando é:

```bash
ng generate component <nome>
```

Comando reduzido:

```bash
ng g c <nome>
```

> **Importante**: `<nome>` na verdade representa um **caminho**, onde barras "`/`" separam pasta e subpastas. O **último segmento** define **(a)** a **pasta final** criada, **(b)** o **seletor** (prefixado, ex.: `app-`), e **(c)** o **nome da classe** em **PascalCase**.  
> Ex.: `components/nome-do-componente` → classe `NomeDoComponente`, seletor `app-nome-do-componente`.

### 7.2. O que é gerado

Para o comando de exemplo

```bash
ng g c components/nome-desejado
```

Estrutura criada (padrão Angular 20) é:

```txt
src/
└─ app/
   └─ components/
      └─ nome-desejado/
         ├─ nome-desejado.html       ⭠ template do componente (markup)
         ├─ nome-desejado.scss       ⭠ estilos do componente (pode ser .css/.scss/ .sass)
         ├─ nome-desejado.spec.ts    ⭠ testes unitários do componente
         └─ nome-desejado.ts         ⭠ classe + metadados (@Component) do componente
```

**Arquivo principal: classe + metadados (@Component) do componente:**

```ts
// src/app/components/nome-desejado/nome-desejado.ts
import { Component } from "@angular/core";

@Component({
  //     seletor 👇🏻 = prefixo (p.ex. "app-") + último segmento do caminho
  selector: "app-nome-desejado",
  imports: [], // dependências que o template usa (diretivas, pipes, outros componentes)
  templateUrl: "./nome-desejado.html",
  styleUrl: "./nome-desejado.scss", // v20 costuma gerar "styleUrl" (singular)
})
export class NomeDesejado {}
// nome da classe 👆🏻 = último segmento em PascalCase, sem hífens
```

### 7.3. Opções úteis

O comando `ng g c <nome>` pode receber as seguintes opções:

- `--style=scss` → cria arquivo de estilo em SCSS
- `--skip-tests` → não cria o arquivo de testes `.spec.ts`
- `--selector=app-meu-card` → define um seletor específico
- `--inline-template` / `--inline-style` → usa `template`/`styles` em linha
- `--flat` → coloca os arquivos no diretório alvo **sem** criar uma pasta própria
- `--prefix=app` → altera o prefixo do seletor para este componente

> **Dica**: em apps standalone, tudo que o template usa deve aparecer em `imports` (ex.: `RouterOutlet`, componentes filhos, diretivas/pipes).

---

### 7.4. Como usar o componente

Para usar o componente do exemplo abaixo

```ts
// src/app/components/componente-desejado/componente-desejado.ts
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-omponente-desejado",
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./omponente-desejado.html",
  styleUrl: "./omponente-desejado.scss",
})
export class ComponenteDesejado {}
```

Primeiro importe-o na classe do componente pai (ex: `app.ts`):

```ts
// src/app/app.ts
import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ComponenteDesejado } from "./components/componente-desejado/componente-desejado"; // importação do componente

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ComponenteDesejado], // disponibiliza o <app-componente-desejado> neste template
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("navegacao");
}
```

> **Componente pai ➝** contém o filho no template (`<app-componente-desejado />`), importa-o em imports e passa dados para o filho.
> **Componente filho ➝** é usado dentro do pai. Recebe dados via `@Input()` e emite eventos de volta ao pai via `@Output()`/`EventEmitter`.

Depois, use o seletor no template do componente pai (ex.: `app.html`):

```html
<componente-desejado />
<!-- 👆🏻 nome = valor do selector -->
```

Para mudar o seletor, gere com `--selector` **ou** edite o campo `selector` no decorator @Component.

---

### 7.5. Boas práticas rápidas

- **Kebab-case consistente**: mantenha o mesmo nome base entre `.ts`/`.html`/`.scss`/`.spec.ts`.
- **Uma responsabilidade por componente**: UI e lógica de apresentação; mova regra de negócio para **services**.
- **Imports explícitos**: adicione em `imports` tudo que o template requer.
- **Padrões modernos**: use o **control flow** novo (`@if`, `@for`, `@switch`) e **Signals** quando precisar de estado local reativo e previsível.

---

> **AVISO IMPORTANTE!!!**
>
> No Angular 20, o CLI simplificou a convenção de nomes de arquivos, passando a gerar **nomes curtos**, sem os sufixos no meio.
>
> Ex.: `home.ts`, `home.html`, `home.scss` (em vez de `home.component.ts/html/scss`).
>
> Os nomes curtos valem para os componentes (`.components`), serviço (`.serviço`) e diretiva (`.iretiva`).
>
> Porém os geradores de outros artefatos mantêm o sufixo tipo no nome do arquivo, só que com **hífen** (não mais com ponto):
>
> - Guards → `auth-guard.ts`
> - Interceptors → `logging-interceptor.ts`
> - Resolvers → `user-resolver.ts`
> - Modules → `shared-module.ts`
> - Pipes → `currency-pipe.ts`

---

---
