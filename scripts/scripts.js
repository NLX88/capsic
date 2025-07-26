document.addEventListener("DOMContentLoaded", () => {
    const target = document.querySelector('#quienes');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                target.classList.add('start'); 
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.3 });

    if (target) observer.observe(target);
});
//evento touch
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.psico-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c !== card && c.classList.remove('active'));
            card.classList.toggle('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (![...cards].some(c => c.contains(e.target))) {
            cards.forEach(c => c.classList.remove('active'));
        }
    });
});

//Son especialidades en cada ambito
//Marta - familia, adultos
//Filiberto - Parejas, adultos jovenes, niños
//Jacobo - Jovenes universitarios-Adultos jovenes
//Psicologia clinica con area psicoanailitca

document.addEventListener("DOMContentLoaded", () => {
    const tarjetas = document.querySelectorAll(".tarjeta-terapia");
    const contenedorOpciones = document.getElementById("opciones-terapia");

    const opcionesPorEdad = {
        "niño": ["Terapia individual", "Terapia familiar"],
        "adolescente": ["Terapia individual", "Terapia deportiva", "Terapia familiar"],
        "adulto": ["Terapia individual", "Terapia en pareja", "Terapia universitaria"]
    };

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            const edad = tarjeta.dataset.edad;
            const opciones = opcionesPorEdad[edad] || [];

            contenedorOpciones.innerHTML = `
                <h4>Opciones para ${edad}</h4>
                <ul>${opciones.map(op => `<li>${op}</li>`).join("")}</ul>
            `;
            contenedorOpciones.classList.remove("oculto");
        });
    });
});

/*DESVANECIMEINTO*/
document.addEventListener("DOMContentLoaded", () => {
    const elementos = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    elementos.forEach(el => observer.observe(el));
});
