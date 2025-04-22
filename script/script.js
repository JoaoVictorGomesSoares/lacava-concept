//Função que faz o menu subir e descer
function menuopen() { container.style.transform = 'translateY(0)' }
function menuclose() { container.style.transform = 'translateY(-100%)' }

//Função que adiciona a class 'scrolling' no header quando rolar a tela
window.addEventListener("scroll", function() {
    let header = document.querySelector('#header')
    header.classList.toggle('scrolling', window.scrollY > 50)
})