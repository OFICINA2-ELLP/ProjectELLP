# Guia de Contribuição - ProjectELLP
Este documento define os padrões de desenvolvimento, convenções de código e fluxo de trabalho adotados no projeto. Todos os membros devem seguir este guia para garantir consistência e qualidade ao longo do desenvolvimento.

## Fluxo de Branches
### Convenção de Nomes
Todas as branches devem seguir o padrão `tipo/descricao-curta`, usando kebab-case na descrição:

| Tipo | Quando usar | Exemplo |
|------|-------------|---------|
| `feat/` | Implementação de novos recursos ou telas | `feat/login-google-oauth` |
| `fix/` | Resolução de falhas e bugs | `fix/movimentacao-personagem` |
| `refact/` | Melhorias estruturais sem alterar o comportamento | `refactor/controle-autenticacao` |
| `docs/` | Criação ou ajuste de documentações (README, guias) | `docs/atualiza-guia-contribuicao` |
| `test/` | Adição ou ajuste em suítes de testes automatizados | `test/testes-servico-usuario` |

### Regras

* Restrição da branch principal: Commits diretos na main são bloqueados.
* Branch de staging: Todos os Pull Requests (PRs) devem ser direcionados para a branch test.
* Procedimento para criação de branch: Certifique-se de partir sempre da test sincronizada:
  
```bash
git checkout test
git pull origin test
git checkout -b feat/sua-funcionalidade
```

* Escopo delimitado: Mantenha cada branch focada em apenas um requisito ou correção específica.
* Limpeza: A remoção da branch de trabalho é recomendada após a conclusão do merge.

---

## Padrão de Commits

O projeto adota o padrão [Conventional Commits](https://www.conventionalcommits.org), restrito aos seguintes tipos:

### Estrutura

```
tipo: descrição objetiva no imperativo em português
```

| Tipo | Quando usar |
|------|-------------|
| `feat:` | Novas funcionalidades ou endpoints da API |
| `fix:` | Correções de problemas ou bugs identificados |
| `refact:` | Ajustes de código sem alteração na lógica de negócio |
| `docs:` | Alterações puramente documentais |
| `test:` | Inclusão ou ajuste em testes unitários/E2E |



### Exemplos

```bash
feat: adiciona controle de movimentacao do personagem por teclado
fix: corrige validacao do token JWT nas rotas protegidas
refactor: isola comunicacao do Google OAuth2 em um modulo dedicado
docs: detalha guia de instalacao com Docker no README
test: adiciona teste de integracao para o servico de autenticacao
```

### Boas práticas de commit

* Mensagens no imperativo: Escreva a ação principal no presente do indicativo ou imperativo (ex: "adiciona", "ajusta", "remove"), evitando formas no passado ou gerúndio ("adicionado", "adicionando").
* Clareza e objetividade: Limite a primeira linha a 70–72 caracteres.
* Atomicidade: Realize commits pequenos com frequência. Agrupe apenas mudanças que pertençam ao mesmo contexto lógico.
* Segurança: Jamais inclua variáveis de ambiente (.env), chaves de API ou segredos do Google/Supabase nos commits.

---
