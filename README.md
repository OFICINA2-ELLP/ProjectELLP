# ProjectELLP
Sistema web de apoio ao ensino de lógica desenvolvido para o projeto de extensão ELLP da UTFPR — Cornélio Procópio. A plataforma centraliza a autenticação via Google, a execução de comandos lúdicos de movimentação de personagens em ambiente visual e o acompanhamento do progresso dos usuários em um único ambiente.

---

## Sobre o Projeto

O **ELLP (Ensino Lúdico de Lógica e Programação)** é um projeto de extensão universitária dedicado a levar conhecimentos de ciência, tecnologia e lógica de programação para estudantes da rede pública de ensino da região de Cornélio Procópio. Por meio de oficinas e experiências lúdicas, o projeto busca desmistificar a computação, estimulando a criatividade, a cooperação e a autoconfiança de crianças e adolescentes.

Este sistema foi desenvolvido como projeto da disciplina de **Oficina de Integração 2** do curso de **Bacharelado em Engenharia de Software da UTFPR** — Campus Cornélio Procópio, com o objetivo de disponibilizar uma ferramenta web interativa e intuitiva de movimentação visual de personagens, permitindo que os alunos pratiquem conceitos básicos de lógica e acompanhem seu aprendizado de forma centralizada e acessível.

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js, React, Tailwind CSS, HeroUI |
| Backend | NestJS, Prisma ORM |
| Banco de dados | PostgreSQL (Supabase) |
| Autenticação | JWT + Google OAuth 2.0 (Passport.js) |
| Testes Automatizados Backend | Jest + Supertest (Unitários e Integração) |
| Testes Automatizados Frontend | Vitest + React Testing Library |
| CI/CD | GitHub Actions (Execução automatizada de testes) |
| Hospedagem Frontend | Vercel |
| Hospedagem Backend | Railway |

---

## Requisitos funcionais

| Código | Descrição |
|:---:|---|
| **RF01** | O sistema deve exibir um mapa contendo um ponto inicial, um objetivo e obstáculos. |
| **RF02** | O sistema deve posicionar o personagem no ponto inicial ao carregar ou reiniciar uma fase. |
| **RF03** | O sistema deve permitir que o usuário crie uma sequência ordenada utilizando os comandos “cima”, “baixo”, “esquerda” e “direita”. |
| **RF04** | O sistema deve exibir visualmente a sequência de comandos criada pelo usuário. |
| **RF05** | O sistema deve permitir adicionar, remover e limpar comandos da sequência antes de sua execução. |
| **RF06** | O sistema deve executar os comandos na ordem definida, movimentando o personagem pelo mapa. |
| **RF07** | O sistema deve permitir pausar, continuar e reiniciar a execução da sequência. |
| **RF08** | O sistema deve permitir o controle direto do personagem pelas setas do teclado ou pelas teclas WASD. |
| **RF09** | O sistema deve impedir que o personagem ultrapasse os limites do mapa ou atravesse obstáculos. |
| **RF10** | O sistema deve informar quando um comando não puder ser executado devido a uma colisão. |
| **RF11** | O sistema deve identificar quando o personagem atingir o objetivo e exibir uma mensagem de fase concluída. |
| **RF12** | O sistema deve permitir que o usuário reinicie a fase após uma colisão ou sequência incorreta. |
| **RF13** | O sistema deve permitir a autenticação do usuário utilizando o login com conta do Google |
| **RF14** | O sistema deve persistir o progresso do usuário autenticado (fase atual/concluída) no banco de dados |
| **RF15** | O sistema deve permitir que o usuário retome o jogo a partir da última fase salva ao logar novamente |
| **RF16** | O sistema deve disponibilizar múltiplas fases com dificuldade progressiva (mapas maiores e/ou mais obstáculos) |
| **RF17** | O sistema deve desbloquear a próxima fase somente após a conclusão da fase atual |
| **RF18** | O sistema deve permitir que o usuário selecione, entre as fases já desbloqueadas, qual deseja jogar |
| **RF19** | O sistema deve exibir um resumo/histórico do desempenho do usuário (ex: fases concluídas, tentativas por fase) |
| **RF20** | O sistema deve permitir logout do usuário autenticado |
| **RF21** | O sistema deve limitar a quantidade máxima de comandos na sequência, conforme a fase (regra de dificuldade) |



## Requisitos não funcionais

| Código | Descrição do Requisito Não Funcional |
| :--- | :--- |
| **RNF01** | A aplicação deve ser compatível e funcionar corretamente nos principais navegadores modernos (Google Chrome, Microsoft Edge, Mozilla Firefox e Safari). |
| **RNF02** | A interface da aplicação deve ser responsiva, adaptando-se adequadamente a computadores e dispositivos móveis. |
| **RNF03** | A interface visual deve responder aos comandos de movimentação do personagem em tempo de execução inferior a 100ms. |
| **RNF04** | A interface gráfica deve manter contraste suficiente e identificação clara do personagem, obstáculos, ponto inicial e objetivo. |
| **RNF05** | O sistema deve possuir suítes de testes automatizados para validar a lógica de movimentação no Front-End e as rotas e regras de negócio no Back-End. |
| **RNF06** | A arquitetura deve ser construída em TypeScript, utilizando Next.js/React no Front-End, NestJS no Back-End, Prisma ORM e PostgreSQL no Banco de Dados. |
| **RNF07** | O código-fonte deve seguir princípios de Clean Code, modularização por camadas (Controller, Service, Repository) e possuir documentação de rotas via Swagger/OpenAPI. |
| **RNF08** | As rotas privadas da API devem ser protegidas por tokens JWT emitidos após autenticação segura via Google OAuth 2.0. |
| **RNF09** | O repositório deve utilizar GitHub Actions como esteira de Integração Contínua (CI) para execução automática de linter e testes. |

---

## Contribuindo
Leia o [Guia de Contribuição](docs/CONTRIBUTING.md) antes de começar a desenvolver. Ele cobre:

* Padrão de branches (feat/, fix/, refact/, docs/)
* Conventional Commits
* Fluxo de Pull Requests e Code Review
* Boas práticas de código para NestJS, Next.js e Prisma

## Equipe
Desenvolvido por estudantes do curso de Engenharia de Software da UTFPR — Cornélio Procópio:

* Julio Cezar Giandoso Filho
* Mateus Rubio Durão
* Rafael Tomé da Silva
* Silvio Henrique Mendes dos Santos
  
Orientador: Prof. Antonio Carlos Fernandes da Silva

---
