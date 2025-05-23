const menuTab = document.getElementById("menu-tab");
// Abrir e Fechar Menu Hamburguer
function openMenu() {
    menuTab.style.transform = "translateX(0)";
    console.log("Abriu Menu");
}
function closeMenu() {
    menuTab.style.transform = "translateX(-100%)";
    console.log("Fechou Menu");
}

// Abrir e Fechar Pesquisa
document.getElementById("open-search").addEventListener('focus', () => {
    document.getElementById("header-content").classList.add('hidden-header'); // Esconde o header{
    setTimeout(() => {
        document.getElementById("header-content").style.height = '0';  // Esconde o header
        document.getElementById("search-tab").style.height = 'var(--header-nav-height)';  // Faz aparecer o elemento   
        document.getElementById("search-tab").classList.add('active-search-tab');  // Faz aparecer com transição
    }, 100);  // Espera 0.1s para fazer a transição
    console.log("Abriu Pesquisa");
});

document.getElementById("close-search").addEventListener('click', () => {
    document.getElementById("search-tab").classList.remove('active-search-tab');  // Faz desaparecer com transição
    setTimeout(() => {
        document.getElementById("header-content").style.height = 'var(--header-nav-height)';  // Mostra o header
        document.getElementById("search-tab").style.height = '0';  // Faz desaparecer o elemento
        document.getElementById("header-content").classList.remove('hidden-header'); // Mostra o header
    }, 100);  // Mesma duração da transição (0.1s = 100ms)
    console.log("Fechou Pesquisa");
});

// Inicia o intervalo de deslizamento junto com o carregamento da página
document.addEventListener('DOMContentLoaded', function() {
  startSwipeInterval();
});

let counter = 0;// O contador é usado para controlar a posição do slider 
const indicators = document.querySelectorAll('.indicator');// constante indicators recebe o elemento com a classe '.indicator'

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
        document.querySelector('#carousel-content').style.transform = `translateX(0)`
    } else {
        // Caso contrário, move o slider para a próxima imagem
       document.querySelector('#carousel-content').style.transform = `translateX(${-counter * 100}vw)`;
    }
    // Remove a classe 'active' de todos os indicadores e adiciona ao indicador correspondente ao contador atual
    document.querySelectorAll('.indicator').forEach((indicators, index) => {
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
document.querySelector('#carousel-content').addEventListener('touchstart', function(evento) {
    touchstartpositionX = evento.touches[0].clientX; // Armazena a posição do toque inicial
    pauseSwipeInterval(); // Pausa o intervalo de deslizamento
    resetSwipeInterval(); // Reinicia o intervalo de deslizamento
}
);

// Adiciona um evento de toque para detectar o ponto final do movimento
document.querySelector('#carousel-content').addEventListener('touchend', function(evento) {
    touchendpositionX = evento.changedTouches[0].clientX;
    handleSwipe(); // Chama a função handleSwipe para calcular a diferença entre os toques
    resetSwipeInterval(); // Reinicia o intervalo de deslizamento
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
            document.querySelector('#carousel-content').style.transform = `translateX(${-counter * 100}vw)`; // Move o slider para a ultima anterior
        } else {
            document.querySelector('#carousel-content').style.transform = `translateX(${-counter * 100}vw)`; // Move o slider para a imagem anterior
        }

        // Atualiza os indicadores
        document.querySelectorAll('.indicator').forEach((indicators, index) => {
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
}

// Função para pausar o intervalo de deslizamento
function pauseSwipeInterval() {
    clearInterval(swipeInterval); // Limpa o intervalo de deslizamento
}

// Função para resetar o intervalo de deslizamento 
function resetSwipeInterval() {
  clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(() => { startSwipeInterval(); }, 10000); // 10 segundos depois sem interação
}