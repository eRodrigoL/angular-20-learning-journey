<!-- commit-messages.md -->

# COMMITS

## Alterar template padrão de commits

> **NOTA:** A alteração é local, ocorrendo estritamente na máquina de quem executar o comando e unicamente no projeto onde o comando for executado.

Para definir um template guia de commits conforme **Conventional Commits** e em português, certificar-se de haver o arquivo `.git-commit-template.txt`, insira o texto guia dentro e execute:

```bash
git config --local commit.template .git-commit-template.txt
```

## Restaurar template padrão original

Para redefinir o template padrão de volta ao original, execute:

```bash
git config --local commit.template ""
```

E então (se desejar) o arquivo `.git-commit-template.txt` pode ser excluído.
