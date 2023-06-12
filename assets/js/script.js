const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      partidaOcorrendo: false,
      mostrarGameOver: false,
      mostrarLimparAnuncios: false,
      sons: {
        partida: new Audio("./assets/audio/partida.mpeg"),
        anuncio: new Audio("./assets/audio/anuncio.mp3"),
        comecar: new Audio("./assets/audio/comecar.mp3"),
        livro: new Audio("./assets/audio/livro.mp3"),
        limparAnuncios: new Audio("./assets/audio/limparAnuncios.wav"),
        gameOver: new Audio("./assets/audio/gameOver.wav"),
      },
      jogador: {
        vida: 100,
        score: 0,
        aumentarVida(qtdd = 5) {
          this.vida + qtdd <= 100
            ? (this.vida += qtdd)
            : (this.vida += 100 - this.vida);
        },
        resetStatus() {
          this.vida = 100;
          this.score = 0;
        },
      },
      livro: {
        x: 0,
        y: 0,
        mudarPosicao() {
          this.x = 75 * Math.random() + 3;
          this.y = 75 * Math.random() + 3;
        },
      },
      anuncios: [],
    };
  },
  created () {
    this.sons.partida.volume = 0.5;
    this.sons.gameOver.volume = 0.5;
  },
  methods: {
    comecarPartida() {
      this.sons.comecar.currentTime = 1;
      this.sons.comecar.play();
      this.jogador.resetStatus();
      this.livro.mudarPosicao();
      this.criarAnuncios(5);
      setTimeout(() => {
        this.sons.partida.play();
        this.partidaOcorrendo = setInterval(() => {
          this.jogador.vida -= 1;
          console.log('x')
          if (this.jogador.vida <= 0) {
            clearInterval(this.partidaOcorrendo);
            this.partidaOcorrendo = false;
            this.gameOver();
          }
        }, 100);
      }, 500);
    },
    criarAnuncios(qtdd = 1) {
      for (let i = 1; i <= qtdd; i++) {
        this.anuncios.push({
          y: 70 * Math.random() + 15,
          imgId: Math.ceil(Math.random() * 7),
          tamanho: Math.floor(Math.random() * 30 + 50),
          velocidade: Math.floor(Math.random() * 5) + 1,
        });
      }
    },
    clickAnuncio() {
      this.jogador.aumentarVida(-10);
      this.sons.anuncio.currentTime = 0.25;
      this.sons.anuncio.play();
    },
    clickLivro() {
      this.jogador.aumentarVida();
      this.aumentarScore();
      this.livro.mudarPosicao();
      this.sons.livro.currentTime = 0;
      this.sons.livro.play();
    },
    aumentarScore(qtdd = 1) {
      this.jogador.score += qtdd;
      if (this.jogador.score % 2 === 0) this.criarAnuncios();
      if (this.jogador.score % 10 === 0) this.mostrarLimparAnuncios = true;
    },
    limparAnuncios(qtdd = this.anuncios.length / 2.5) {
      this.anuncios.splice(0, qtdd);
      this.sons.limparAnuncios.play();
      this.mostrarLimparAnuncios = false;
    },
    gameOver() {
      this.sons.partida.pause();
      this.sons.partida.currentTime = 0;
      this.sons.gameOver.play();
      this.mostrarLimparAnuncios = false;
      this.anuncios = [];
      this.mostrarGameOver = true;
    },
  },
});

app.mount("#app");
