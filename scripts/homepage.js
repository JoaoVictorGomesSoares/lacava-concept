const menuTab = document.getElementById("menu-tab");
const buttonOpenMenu = document.getElementById("open-menu");
const buttonCloseMenu = document.getElementById("close-menu");

// Abrir e Fechar Menu Hamburguer
// Abre
buttonOpenMenu.addEventListener('click', () => { 
    menuTab.style.transform = "translateX(0)";
    console.log("Abriu Menu");
});
// Fecha
buttonCloseMenu.addEventListener('click', () => {
    menuTab.style.transform = "translateX(-100%)";
    console.log("Fechou Menu");
});


const buttonOpenSearch = document.getElementById("open-search");
const buttonCloseSearch = document.getElementById("close-search");
const headerContent = document.getElementById("header-content");
const searchTab = document.getElementById("search-tab");
// Abrir e Fechar Pesquisa
// Abre
buttonOpenSearch.addEventListener('click', () => {
    headerContent.classList.add('hidden-header'); // Esconde o header
    setTimeout(() => {
        headerContent.style.display = 'none';  // Esconde o header
        searchTab.style.display = 'block';  // Faz aparecer o elemento   
        searchTab.classList.add('active-search-tab');  // Faz aparecer com transição
    }, 100);  // Espera 0.1s para fazer a transição
    console.log("Abriu Pesquisa");
});
// Fecha
buttonCloseSearch.addEventListener('click', () => {
    searchTab.classList.remove('active-search-tab');  // Faz desaparecer com transição
    setTimeout(() => {
        searchTab.style.display = 'none';  // Faz desaparecer o elemento
        headerContent.style.display = 'flex';  // Mostra o header
        headerContent.classList.remove('hidden-header'); // Mostra o header
    }, 100);  // Mesma duração da transição (0.1s = 100ms)
    console.log("Fechou Pesquisa");
});

// Inicia o intervalo de deslizamento junto com o carregamento da página
document.addEventListener('DOMContentLoaded', function() {
  startSwipeInterval();
});

let counter = 0;// O contador é usado para controlar a posição do slider
const carouselContent = document.querySelector('#carousel-content'); // Seleciona o elemento do slider
const indicators = document.querySelectorAll('.indicator'); // Seleciona todos os indicadores do slider

// A função slider é responsável por mover o slider para a próxima imagem
function swipeSlide() {
    counter++;
    if (counter <= 4) {
        console.log(`Avançando para imagem ${counter + 1}`);
    }
    
    // Verifica se o contador é maior ou igual ao número de imagens
    if (counter >= document.querySelectorAll('#carousel-content img').length ) {
        // Se sim, reinicia o contador para 0
        counter = 0;
        console.log('Avançando para imagem 1');
        carouselContent.style.transform = `translateX(0)`
    } else {
        // Caso contrário, move o slider para a próxima imagem
       carouselContent.style.transform = `translateX(${-counter * 100}vw)`;
    }
    // Remove a classe 'active' de todos os indicadores e adiciona ao indicador correspondente ao contador atual
    indicators.forEach((indicators, index) => {
        if (index === counter) {
            indicators.classList.add('active');
        } else {
            indicators.classList.remove('active');
        }
    });
}

let touchstartpositionX = 0; // Variável para armazenar a posição do toque inicial
let touchendpositionX = 0; // Variável para armazenar a posição do toque final

// Adiciona um evento de toque para detectar o ponto de início do movimento
carouselContent.addEventListener('touchstart', function(evento) {
    touchstartpositionX = evento.touches[0].clientX; // Armazena a posição do toque inicial
    pauseSwipeInterval(); // Pausa o intervalo de deslizamento
    resetSwipeInterval(); // Reinicia o intervalo de deslizamento
    console.log('Iniciando o toque na posição'); // Exibe a posição do toque inicial no console
}
);

// Adiciona um evento de toque para detectar o ponto final do movimento
carouselContent.addEventListener('touchend', function(evento) {
    touchendpositionX = evento.changedTouches[0].clientX;
    handleSwipe(); // Chama a função handleSwipe para calcular a diferença entre os toques
    resetSwipeInterval(); // Reinicia o intervalo de deslizamento
    console.log('Finalizando o toque na posição'); // Exibe a posição do toque final no console
});

// Função para Calcular a diferença entre os toques
function handleSwipe() {
    const touchDiffX = touchstartpositionX - touchendpositionX; // Calcula a diferença entre o toque inicial e o toque final

    // Se o movimento for para a esquerda, chama a função slider
    if (touchDiffX > 50) {
        // Chama a função swipeSlide para mover o slider para a próxima imagem
        swipeSlide();
    } else if (touchDiffX < -50) {
        counter--; // Decrementa o contador

        // Verifica se o contador é menor que 0
        if (counter < 0) {
            counter = 4;
            carouselContent.style.transform = `translateX(${-counter * 100}vw)`; // Move o slider para a ultima anterior
        } else {
            carouselContent.style.transform = `translateX(${-counter * 100}vw)`; // Move o slider para a imagem anterior
        }

        // Atualiza os indicadores
        indicators.forEach((indicators, index) => {
            if (index === counter) {
                indicators.classList.add('active');
            } else {
                indicators.classList.remove('active');
            }
        });
        
        console.log(`Retornando para imagem ${counter + 1}`) // Exibe o contador no console
    }
}

let swipeInterval;
let resumeTimeout;

// Função para iniciar o intervalo de deslizamento
function startSwipeInterval() {
    swipeInterval = setInterval(swipeSlide, 5000); // Chama a função swipeSlide a cada 5 segundos
    console.log("Iniciando o slide automatico"); // Exibe no console que o intervalo foi iniciado
}

// Função para pausar o intervalo de deslizamento
function pauseSwipeInterval() {
    clearInterval(swipeInterval); // Limpa o intervalo de deslizamento
    console.log("Pausando o slide"); // Exibe no console que o intervalo foi pausado
}

// Função para resetar o intervalo de deslizamento 
function resetSwipeInterval() {
  clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(() => { startSwipeInterval(); }, 10000); // 10 segundos depois sem interação
  console.log("Reiniciando o slide"); // Exibe no console que o intervalo foi reiniciado
}