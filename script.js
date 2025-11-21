let dados = [];
let cardContainer = document.querySelector('.card-container');

document.addEventListener('DOMContentLoaded', async () => {
    let resposta = await fetch('data.json');
    dados = await resposta.json();
    renderizaCards(dados);
});

function iniciarBusca() {
    const termoBusca = document.getElementById('caixa-busca').value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.Nome.toLowerCase().includes(termoBusca)
    );
    renderizaCards(dadosFiltrados);
}

function renderizaCards(dados) {
    cardContainer.innerHTML = ''; // Limpa os cards existentes
    for (let dado of dados) {
        let article = document.createElement('article');
        article.classList.add('card');
        article.innerHTML = `
            <img src="${dado.Imagem}" alt="${dado.Nome}" class="article-image"/>            
            <h2>${dado.Nome}</h2>            
            <div class="card-details">
                <p>${dado.Descrição}</p>
                <p><strong>Editora:</strong> ${dado.Editora}</p>
                <a href="${dado.Link}" target="_blank">Adquira aqui</a>
            </div>
        `;

        article.addEventListener('click', () => {
            const isExpanded = article.classList.contains('expanded');
            const todosOsCards = cardContainer.querySelectorAll('.card');
            const transitionDuration = 1500; // Duração da transição em ms (deve ser igual ao CSS)

            if (isExpanded) {
                // --- LÓGICA PARA FECHAR O CARD ---

                // 1. Encolhe o card selecionado
                article.classList.remove('expanded');

                // 2. Depois que a animação de encolher terminar, faz os outros reaparecerem
                setTimeout(() => {
                    todosOsCards.forEach(card => {
                        if (card !== article) {
                            card.classList.remove('oculto');
                        }
                    });
                }, transitionDuration);

            } else {
                // --- LÓGICA PARA ABRIR O CARD ---

                // 1. Faz todos os outros cards desaparecerem
                todosOsCards.forEach(card => {
                    if (card !== article) {
                        card.classList.add('oculto');
                    }
                });

                // 2. Depois que a animação de desaparecer terminar, expande o card selecionado
                setTimeout(() => {
                    article.classList.add('expanded');
                }, transitionDuration);
            }
        });

        cardContainer.appendChild(article);
    }
}