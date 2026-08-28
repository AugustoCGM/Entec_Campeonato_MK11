# 🐉 ENTEC Gamer 2026 - Kampeonato Mortal Kombat 11

![Status](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tech-HTML%20|%20CSS%20|%20JS%20Vanilla-blue?style=for-the-badge)
![Equipe](https://img.shields.io/badge/Equipe-JAM%20Labs-orange?style=for-the-badge)

Landing page promocional e simulador dinâmico de torneio de e-sports desenvolvida para o **Kampeonato de Mortal Kombat 11**, atração principal do evento acadêmico ENTEC 2026 na UNINASSAU (Campina Grande - PB).

## 🎮 Sobre o Projeto

O objetivo desta página é divulgar o torneio, apresentar as regras do formato "Tag Team" (Duplas) e fornecer um link direto para as inscrições. O grande diferencial técnico do projeto é a **Simulação de Arena**: uma árvore de chaveamento totalmente construída em CSS Flexbox e animada com JavaScript, que simula o andamento do campeonato até a Grande Final.

## ✨ Funcionalidades Principais

* **Hero Section Dinâmica:** Roster de personagens com seleção automatizada via JavaScript. A cada intervalo de tempo, o sistema "escolhe" lutadores diferentes para o Player 1 e Player 2, atualizando os renders de corpo inteiro na tela.
* **Simulador de Chaveamento (Bracket):**
  * Árvore de torneio construída matematicamente com CSS Grid/Flexbox (sem sobreposições).
  * Linhas guias (`guide lines`) que acendem em dourado acompanhando o caminho da vitória de cada equipe.
  * Lógica assíncrona em JS (`async/await`) que gera equipes aleatórias, simula vitórias e injeta dinamicamente fundos de arena nas caixas dos lutadores.
  * Efeito *Pop-in* com CSS Keyframes para os personagens e selo "WINS" carimbado na tela.
* **UI/UX Focada em E-sports:** Layout dark mode temático, uso de fontes clássicas da franquia (MK11 e Cinzel), hover effects com sombras douradas e caixas estruturais baseadas na proporção real de renders de jogos (2:1).
* **Responsividade Completa:** 
  * Adaptação do Grid de personagens no mobile (3x2).
  * Ocultação inteligente do chaveamento complexo em telas menores para garantir legibilidade e performance.
  * Uso de personagens em "marca d'água" nas laterais do menu mobile.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído do zero, sem uso de frameworks pesados, garantindo máxima performance:

* **HTML5:** Semântica e estruturação em camadas.
* **CSS3:** Flexbox, Grid, Animações (`@keyframes`), Variáveis (`:root`), Filtros de imagem (`grayscale`, `brightness`) e Media Queries.
* **JavaScript (ES6):** Manipulação de DOM, Timers (`setInterval`, `setTimeout`), Intersection Observers (para disparar animações ao rolar a página) e Lógica Assíncrona.

## 🚀 Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/SEU-USUARIO/entec-gamer-mk11.git](https://github.com/SEU-USUARIO/entec-gamer-mk11.git)