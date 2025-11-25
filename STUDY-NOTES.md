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

## 8. Ciclo de vida de componentes Angular

O ciclo de vida de um componente Angular é o conjunto de fases pelas quais esse componente passa:
**criação** → **projeção de conteúdo** → **renderização da view** → **atualizações** → **limpeza**.

Cada uma dessas fases dispara métodos especiais do Angular chamados _lifecycle hooks_ (ou simplesmente **hooks**).
Esses hooks são **pontos de extensão do framework** onde você encaixa código para reagir a momentos específicos do ciclo de vida.

Usar o hook certo significa colocar cada ação exatamente na fase em que ela faz mais sentido.

---

### 8.1. Lifecycle Hooks por ordem de execução

Ordem típica de execução em um componente:

1. `constructor()`
2. `ngOnChanges(changes)` _(quando houver `@Input()`; dispara antes do `ngOnInit` e na primeira atribuição)_
3. `ngOnInit()`
4. `ngDoCheck()` _(detecção customizada; roda com alta frequência, antes dos hooks de conteúdo/view)_
5. **Content projection**
   - `ngAfterContentInit()`
   - `ngAfterContentChecked()` _(pode repetir a cada verificação)_
6. **View**
   - `ngAfterViewInit()`
   - `ngAfterViewChecked()` _(pode repetir a cada verificação)_
7. `ngOnDestroy()` _(onde limpar recursos)_

> **Pense assim:** `OnInit` = início, `OnChanges` = reagir ao pai, `After*` = DOM pronto, `OnDestroy` = limpeza.
> Obs: `ngOnChanges` dispara **antes** do `ngOnInit` e sempre que um `@Input()` mudar (incluindo a primeira vez).

---

### 8.2. Quando usar cada um

- **`constructor()`**  
  Chamado quando a classe é instanciada.  
  **Use para**:

  - injeção de dependências (services, tokens, etc.);
  - inicializar **estado leve** (valores padrão, flags simples).  
    **Não use para**:
  - acessar o DOM;
  - depender de `@Input()` (ainda não foram setados).

- **`ngOnInit()`** (`implements OnInit`)  
  Componente está pronto para iniciar sua lógica inicial.  
  **Use para**:

  - carregar dados iniciais (chamadas HTTP, por exemplo);
  - configurar _subscriptions_ (com limpeza planejada);
  - iniciar timers/efeitos (com limpeza posterior).

- **`ngOnChanges(changes)`** (`implements OnChanges`)  
  Reage a **mudanças de `@Input()`** — inclusive a primeira atribuição.  
  **Use para**:

  - recalcular algo em resposta a alterações vindas do componente pai;
  - manter algum estado derivado de `@Input()`.

- **`ngDoCheck()`** (`implements DoCheck`)  
  Hook de **detecção customizada**, chamado antes dos hooks de conteúdo/view e com alta frequência.  
  **Use raramente**:

  - quando `OnChanges` não cobre o caso, por exemplo:
    - comparar profundamente objetos mutáveis;
    - observar mudanças que o Angular não detecta sozinho.  
      **Cuidado**:
  - código pesado aqui afeta muito a performance.

- **`ngAfterContentInit()` / `ngAfterContentChecked()`**  
  Relacionados à **projeção de conteúdo** (`<ng-content>`).  
  **Use para**:

  - interagir com conteúdo projetado via `@ContentChild/@ContentChildren`;
  - configurar algo baseado no conteúdo recebido do pai.  
    `ngAfterContentInit()` roda **uma vez**, após o conteúdo projetado ser inicializado.  
    `ngAfterContentChecked()` roda **a cada ciclo de verificação** após o conteúdo ter sido verificado.

- **`ngAfterViewInit()` / `ngAfterViewChecked()`**  
  Relacionados à **view do próprio componente** (template + `@ViewChild/@ViewChildren`).  
  **Use para**:

  - acessar elementos do template via `@ViewChild/@ViewChildren`;
  - inicializar bibliotecas de UI que dependem do DOM já renderizado.  
    `ngAfterViewInit()` roda **uma vez**, após a view ser inicializada.  
    `ngAfterViewChecked()` roda **a cada ciclo de verificação** após a view ter sido checada.  
    **Cuidado**: evite lógica pesada em `AfterViewChecked` / `AfterContentChecked`.

- **`ngOnDestroy()`** (`implements OnDestroy`)  
  Último hook do ciclo de vida, chamado **antes de o componente ser destruído**.  
  **Use para**:
  - cancelar _subscriptions_;
  - limpar _timeouts_ e _intervals_;
  - remover _observers_ do DOM, _event listeners_ e recursos nativos em geral (ex.: `IntersectionObserver`);
  - liberar qualquer recurso que você tenha “aberto” durante a vida do componente.

> Regra geral: **tudo que você abre (conexões, timers, listeners), você precisa fechar em `ngOnDestroy()` ou usando utilitários que limitem o lifetime automaticamente.**

---

### 8.3. Exemplos de uso por hook

#### 8.3.1. Exemplo simples: `constructor()` + Dependency Injection

Dependency Injection (DI) = Injeção de Dependências

```ts
import { Component } from "@angular/core";
import { LoggerService } from "../logger.service";

@Component({
  selector: "app-logger-demo",
  template: `<p>Veja o console para acompanhar os logs do ciclo de vida.</p>`,
})
export class LoggerDemoComponent {
  constructor(private logger: LoggerService) {
    // DI e setup leve
    this.logger.info("[constructor] Componente instanciado");
  }
}
```

#### 8.3.2. `OnInit` + `OnChanges` com `@Input()`

```ts
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-user-card",
  template: `<h3>{{ user?.name }}</h3>`,
})
export class UserCardComponent implements OnInit, OnChanges {
  @Input() userId!: string;
  user: { id: string; name: string } | null = null;

  ngOnInit() {
    // Carregue dependências que não dependem de @Input()
    // Ex.: inicializar serviços, telemetry etc.
    console.log("[OnInit] Componente pronto para iniciar lógica inicial");
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["userId"] && this.userId) {
      console.log("[OnChanges] userId mudou para:", this.userId);
      // Reaja imediatamente a mudanças do pai
      // this.user = ...
    }
  }
}
```

#### 8.3.3. Content vs View (`AfterContent*` e `AfterView*`)

```ts
import {
  Component,
  ContentChild,
  AfterContentInit,
  AfterContentChecked,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-panel",
  template: ` <section>
    <header><ng-content select="[panel-title]"></ng-content></header>
    <div #contentArea><ng-content></ng-content></div>
  </section>`,
})
export class PanelComponent
  implements
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  @ContentChild("titleTpl") titleTpl!: any; // vindo de fora via <ng-content>
  @ViewChild("contentArea") contentArea!: ElementRef; // elemento do próprio template

  ngAfterContentInit() {
    console.log("[AfterContentInit] Conteúdo projetado disponível");
    // Conteúdo projetado disponível (ng-content)
  }

  ngAfterContentChecked() {
    console.log("[AfterContentChecked] Conteúdo projetado checado");
    // Evite lógica pesada aqui
  }

  ngAfterViewInit() {
    console.log("[AfterViewInit] View inicializada");
    // Elementos do template estão no DOM
    // this.contentArea.nativeElement.focus();
  }

  ngAfterViewChecked() {
    console.log("[AfterViewChecked] View checada");
    // Evite lógica pesada aqui
  }
}
```

#### 8.3.4. `DoCheck` (detecção customizada)

```ts
import { DoCheck, Input, Component } from "@angular/core";

@Component({
  selector: "app-heavy-list",
  template: `<ul>
    <li *ngFor="let item of items">{{ item }}</li>
  </ul>`,
})
export class HeavyListComponent implements DoCheck {
  @Input() items: string[] = [];
  private prevSnapshot = "";

  ngDoCheck() {
    const snapshot = JSON.stringify(this.items);

    if (snapshot !== this.prevSnapshot) {
      console.log("[DoCheck] Lista mudou:", this.items);
      this.prevSnapshot = snapshot;
      // Recalcule algo caro apenas quando realmente mudar
    }
  }
}
```

#### 8.3.5. `OnDestroy` (limpeza de recursos)

```ts
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-timer-demo",
  template: `<p>Contador: {{ counter }}</p>`,
})
export class TimerDemoComponent implements OnInit, OnDestroy {
  counter = 0;
  private intervalId?: number;

  ngOnInit() {
    this.intervalId = window.setInterval(() => {
      this.counter++;
      console.log("[TimerDemo] counter =", this.counter);
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId != null) {
      window.clearInterval(this.intervalId);
      console.log("[OnDestroy] Timer limpo");
    }
  }
}
```

---

### 8.4. Recursos extras relacionados ao ciclo de vida

Além dos hooks clássicos, o Angular moderno oferece utilitários que também se conectam à ideia de “quando algo roda” no ciclo:

- **`afterNextRender()` e `afterEveryRender()`**  
  Funções que você chama (em um contexto de injeção, geralmente no `constructor`) para rodar código **após a renderização da árvore de componentes**.  
  Úteis quando você quer garantir que “tudo já foi renderizado” antes de executar alguma lógica (ex.: integração com libs externas).

- **Signals e `input()` + `effect()`**  
  Em código novo, é comum usar:
  - `input()` (API de signals) no lugar de `@Input()` clássico;
  - `effect()` para reagir a mudanças.  
    Nessas situações, algumas coisas que antes iriam para `ngOnChanges` podem ser expressas com um `effect()` reagindo ao signal, deixando o fluxo mais declarativo.

> Importante: isso **não aposenta** `ngOnChanges`, só oferece mais opções em projetos novos.

---

### 8.5. VAZAMENTO DE MEMÓRIA (Memory Leak)

O vazamento de memória vai na contramão da **performance** e da **leveza** da aplicação.
Em Angular, ele acontece quando um componente é criado e usado na tela, mas, mesmo depois de sair de cena (ser destruído), alguma parte da sua lógica — como _subscriptions_, timers, listeners ou observers — continua ativa **sem necessidade**, mantendo o componente ou seus dados vivos na memória.

Evitar vazamento de memória significa prestar atenção ao tempo de vida (_lifetime_) dos componentes e se preocupar em **ligar cada recurso ao ciclo de vida do componente**, para que tudo seja limpo automaticamente quando ele for destruído.

Ou seja:

- sempre que for **aberto algo que fica vivo no tempo** em qualquer fase do ciclo de vida do componente;
- é preciso garantir que isso **morra junto com o componente**.

Exemplos do que “fica vivo”:

- _subscriptions_ RxJS criadas no código (`.subscribe(...)`);
- `setInterval` / `setTimeout`;
- _event listeners_ manuais (`addEventListener`);
- _observers_ de DOM (`IntersectionObserver`, `MutationObserver`);
- integrações com bibliotecas externas que ficam escutando/observando algo.

### 8.6. Técnicas práticas para evitar o vazamento de memória

Resumindo:

> **“Abri? Tenho que fechar.”**  
> Mas, sempre que possível, deixe o **próprio Angular** fechar usando:
>
> - `| async` no template;
> - `takeUntilDestroyed()` nas _subscriptions_ de código;
> - `DestroyRef` + `onDestroy` / `onCleanup()` para efeitos, listeners e observers.

Seguindo o padrão abaixo (sem `subscribe` “solto” nem `setInterval` sem limpeza), as chances de vazamento de memória são reduzidas drasticamente.

#### 8.6.1. `async` pipe e `takeUntilDestroyed()`

Use `async` pipe e `takeUntilDestroyed()` para tratar _observables_ sem deixar subscriptions penduradas.

- No **template**, prefira o `async` pipe:

  ```html
  <ul *ngIf="users$ | async as users">
    <li *ngFor="let user of users">{{ user.name }}</li>
  </ul>
  ```

  > Com isso, o Angular faz:
  >
  > - a **subscription** quando o componente nasce;
  > - o **unsubscribe** automaticamente quando ele é destruído.

- No **código TypeScript**, ao lidar com _observables_, use `takeUntilDestroyed()`:

  ```ts
  import { Component, OnInit, inject } from "@angular/core";
  import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
  import { UsersService } from "./users.service";

  @Component({
    selector: "app-users",
    template: `<!-- lista -->`,
  })
  export class UsersComponent implements OnInit {
    private users = inject(UsersService);

    ngOnInit() {
      this.users.stream$.pipe(takeUntilDestroyed()).subscribe((users) => {
        console.log("[UsersComponent] recebidos", users);
      });
    }
  }
  ```

  > Aqui, `takeUntilDestroyed()` está ligado ao **lifetime do componente**: quando ele é destruído, a _subscription_ é finalizada automaticamente.

#### 8.6.2. Signals, `DestroyRef` e `onCleanup()`

Quando usar `effect()`, atrele sua lógica ao ciclo de vida registrando a limpeza com `onCleanup()` e, se necessário, usando `DestroyRef` para amarrar o efeito ao contexto do componente.

```ts
import { Component, effect, inject } from "@angular/core";
import { DestroyRef } from "@angular/core";
import { timer } from "rxjs";

@Component({
  selector: "app-signal-demo",
  template: `<p>Veja o console para acompanhar o efeito.</p>`,
})
export class SignalDemoComponent {
  private destroyRef = inject(DestroyRef);

  constructor() {
    const subEffect = effect((onCleanup) => {
      const sub = timer(0, 1000).subscribe(() => {
        console.log("[effect] tick");
      });

      onCleanup(() => {
        sub.unsubscribe();
        console.log("[effect] limpo no destroy");
      });
    });

    this.destroyRef.onDestroy(() => {
      // Ao destruir o contexto, o effect também é limpo
      subEffect.destroy();
    });
  }
}
```

> Qualquer recurso aberto dentro do `effect` é registrado no `onCleanup`, que roda quando o efeito deixa de existir (por exemplo, quando o componente é destruído).

#### 8.6.3. Timers, listeners e observers

Em casos fora do RxJS — Timers (`setInterval`), listeners (`addEventListener`) e observers (`IntersectionObserver`) — use `ngOnDestroy()` ou `onDestroy` (via `DestroyRef`) para limpar:

```ts
import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { DestroyRef } from "@angular/core";

@Component({
  selector: "app-resize-demo",
  template: `<p>Redimensione a janela e veja o console.</p>`,
})
export class ResizeDemoComponent implements OnInit, OnDestroy {
  private destroyRef = inject(DestroyRef);
  private onResize = () => console.log("resize");

  ngOnInit() {
    window.addEventListener("resize", this.onResize);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener("resize", this.onResize);
    });
  }

  ngOnDestroy() {
    // Se preferir o hook clássico, garante a limpeza aqui também
    window.removeEventListener("resize", this.onResize);
  }
}
```

### 8.7. Erros comuns (e como evitar)

- **Ler `@Input()` no `constructor`**  
  `@Input()` ainda não está definido. Use `ngOnInit`/`ngOnChanges`.

- **Lógica pesada em `AfterViewChecked/AfterContentChecked`**  
  Esses hooks rodam muitas vezes; mova o que for possível para `OnInit/AfterViewInit` ou para um `effect()`/`afterNextRender()`.

- **Esquecer de desinscrever**  
  Prefira `async` pipe, `takeUntilDestroyed` ou limpeza em `ngOnDestroy`.

- **Usar `DoCheck` sem necessidade**  
  Prefira `OnChanges` ou signals (`input()` + `effect()`).  
  Se `DoCheck` for realmente necessário, minimize o trabalho feito dentro dele.

---

---
