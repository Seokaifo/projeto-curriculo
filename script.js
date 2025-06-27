// Script para o menu toggle
// Adiciona a classe 'open' ao menu quando o botão é clicado
// Utiliza o evento 'DOMContentLoaded' para garantir que o DOM esteja completamente carregado
document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('open');
        });

        // Fecha o menu ao clicar em qualquer link do menu
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('open');
            });
        });
    }
});


// Animação dos módulos
// Adiciona a classe 'show' quando o módulo entra na viewport
// e remove quando sai da viewport
// Utiliza o Intersection Observer para otimizar a performance

document.addEventListener("DOMContentLoaded", function() {
    const modulos = document.querySelectorAll('.modulo');
    function checkModulos() {
        modulos.forEach(modulo => {
            const rect = modulo.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
                modulo.classList.add('show');
            } else {
                modulo.classList.remove('show');
            }
        });
    }
    window.addEventListener('scroll', checkModulos);
    checkModulos();
});

// Animação das barras de conhecimento
// Adiciona a classe 'show' quando o módulo entra na viewport
// e anima as barras de progresso
// Utiliza o Intersection Observer para otimizar a performance
// A barra de progresso é animada para a largura definida no atributo data-width
// e reseta quando sai da viewport
// A animação é feita com CSS transitions
// e a largura é definida no atributo data-width de cada barra
// A animação é feita com JavaScript para maior controle
// A animação é feita apenas uma vez quando o módulo entra na viewport
// Reseta a barra de progresso quando sai da viewport
// Utiliza setInterval para animar a barra de progresso
// Reseta a barra de progresso quando sai da viewport

document.addEventListener("DOMContentLoaded", function() {
    const modulos = document.querySelectorAll('.modulo');
    const skillbar = document.querySelector('#skillbar');
    const progressBars = document.querySelectorAll('#skillbar .progress');
    let animating = false;

function animateBar(bar, target) {
    if (bar.classList.contains('idioma')) {
        // Para barras de idioma, apenas define a largura final sem animar
        bar.style.width = bar.getAttribute('data-width');
        return;
    }
    let current = 0;
    const duration = 1000;
    const stepTime = 10;
    const steps = Math.floor(duration / stepTime);
    const increment = target / steps;
    clearInterval(bar._interval);
    bar.style.width = "0"; // Garante que a barra começa do zero
    bar._interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(bar._interval);
        }
        bar.style.width = current + "%";
        bar.textContent = Math.round(current) + "%";
    }, stepTime);
}

progressBars.forEach(bar => {
    const dataWidth = bar.getAttribute('data-width');
    if (bar.classList.contains('idioma')) {
        // Para idioma, só define a largura
        bar.style.width = dataWidth;
    } else {
        const target = parseInt(dataWidth);
        animateBar(bar, target);
    }
});

function resetBar(bar) {
    if (bar.classList.contains('idioma')) return; // Não reseta barras de idioma
    clearInterval(bar._interval);
    bar.style.width = "0";
    bar.textContent = "0%";
}

    function checkModulos() {
        modulos.forEach(modulo => {
            const rect = modulo.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
                modulo.classList.add('show');
                // Animação das barras de conhecimento
                if (modulo.id === "skillbar" && !animating) {
                    animating = true;
                    progressBars.forEach(bar => {
                        const target = parseInt(bar.getAttribute('data-width'));
                        animateBar(bar, target);
                    });
                }
            } else {
                modulo.classList.remove('show');
                if (modulo.id === "skillbar") {
                    animating = false;
                    progressBars.forEach(bar => {
                        resetBar(bar);
                    });
                }
            }
        });
    }
    window.addEventListener('scroll', checkModulos);
    checkModulos();
});