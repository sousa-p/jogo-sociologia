const mario = document.querySelector('.mario');
const anuncios = document.querySelectorAll('.anuncio');
const scoreConst = document.querySelector('.score');
const vidaConst = document.querySelector('.vida');
const barraDeVida = document.querySelector('.barraDeVida');
let timeAnuncio = [6, 7, 8, 10, 12];
let score = 0;
let vida = 5;

mario.addEventListener('click', () => {
    verdadeiro = true;
    let esquiva = 0;
    let marioPosition = 0;

    while (verdadeiro == true) {
        esquiva = Math.floor(Math.random() * 80);
        marioPosition = 50 - esquiva;

        if (marioPosition >= 11 && marioPosition <= 88) {
            verdadeiro = false
        }
    }
    scoreConst.textContent = `score: ${1 + score++}`;
    vidaConst.textContent = `vida: ${vida}`;
    barraDeVida.value =  `${vida}`;


    mario.style.top = `${marioPosition}%`;
    verfica_vida();
})

anuncios.forEach((anuncio) => {
    anuncio.addEventListener('click', () => {
        console.log('Venha para o governo HAHAHAHA');
        if (vida <= -1) {
            vidaConst.textContent = `vida: ${0}`;
            barraDeVida.value =  `${0}`;
        } else {
            vidaConst.textContent = `vida: ${vida--}`;
            barraDeVida.value =  `${vida}`;
        }
        verfica_vida();
    })
})

function verfica_vida() {
    console.log(vida)
    if (vida <= 0) {
        vida = 0;
        vidaConst.textContent = `vida: ${0}`;
        barraDeVida.value =  `${0}`;
        setTimeout(()=>{
        alert("Morreu!!!!!!!!!!!!");
        },100)
        score = 0;
    }
}

window.addEventListener('mousemove', ()=>{
    vidaConst.textContent = `vida: ${vida}`;
    barraDeVida.value =  `${vida}`;
    scoreConst.textContent = `score: ${score}`;
})


