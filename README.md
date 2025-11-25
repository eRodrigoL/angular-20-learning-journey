# REPOSITÓRIO DE APRENDIZAGEM

Repositório criado para absorver o conteúdo do curso [Angular 19 - Curso Completo do Iniciante ao Avançado (2025)](https://www.udemy.com/course/angular-curso-completo-do-iniciante-ao-avancado/), ministrado pelo professor Dougllas Sousa.

---

## Organização do Conteúdo

Além deste arquivo README.md explicando o repositório, há também o arquivo [**STUDY-NOTES.md**](STUDY-NOTES.md) trazendo, de forma didática, o conteúdo de cada aula mesclado com conhecimentos externos.  
Os projetos desenvolvidos ao longo deste estudo estão separados por pastas, devidamente nomeadas.

---

## Documentação Angular

Documentação oficial: [Angular.dev — Overview](https://angular.dev/overview)

---

## Extensões Relacionadas

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) (indicada no curso)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

---

## Comandos Úteis

- Instalar a versão mais recente do Angular CLI:

  ```bash
  npm install -g @angular/cli
  ```

  > Para instalar uma versão específica, acrescente `@<versão>` (ex.: `npm i -g @angular/cli@20.3.6`).

- Mostrar versões do Angular CLI e dependências relevantes do projeto:

  ```bash
  ng version
  ```

- Criar projeto Angular:

  ```bash
  ng new <nome-do-app> --style=scss --skip-git
  ```

  > **`--style=scss`** → define **SCSS** como linguagem de estilos padrão (novos componentes usarão `.scss`; o arquivo global será `src/styles.scss`).
  > **`--skip-git`** → não executa `git init` no diretório do projeto (cada projeto aqui dentro **não** precisa de `git init`, pois a **raiz do repositório** que reúne todos os projetos já possui a pasta `.git`).
  >
  > Comando padrão para inicialização de um projeto → `ng new <nome-do-app>`

- Para navegar entre os projetos:

  ```bash
  cd <nome-do-sub-repositorio>
  ```

  > Este reposítório reune todos os projetos desenvolvidos durante o curso. Portante é necessário navegar até a pasta de cada projeto (sub-repositório) antes de executar qualquer comando não global (ex.: `ng serve -o`).
  > Aqui, veja os comandos do git como comandos globais.

- Iniciar o servidor de desenvolvimento do Angular (por padrão em `http://localhost:4200`):

  ```bash
  ng serve -o
  ```

  > A opção (flag) **`-o`**/**`--open`** abre automaticamente o navegador na URL do dev server assim que a aplicação terminar de compilar.
  >
  > Sem **`-o`**, é necessário abrir manualmente o navegador em `http://localhost:4200` após a compilação inicial.

---
