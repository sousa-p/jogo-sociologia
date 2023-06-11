const { createApp } = Vue

const app = createApp({
  data() {
    return {
      sounds: {
        gameMusic: new Audio('./assets/audio/music_game.mpeg'),
        anuncio: new Audio('./assets/audio/anuncio.mp3'),
        start: new Audio('./assets/audio/start.mp3'),
        player: new Audio('./assets/audio/player.mp3'),
        limparAnuncios: new Audio('./assets/audio/power-up.wav')
      },
      gameOcorrendo: false,
      player: {
        vida: 100,
        score: 0,
        x: 0,
        y: 0,
        sprt: 'assets/sprts/livro-sprite.gif',
        
        aumentarVida(qtdd=5) {
          (this.vida + qtdd <= 100)
            ? this.vida += qtdd
            : this.vida += 100 - this.vida;
        },
        mudarPosicao() {
          this.x = 78*Math.random()+3;
          this.y = 78*Math.random()+3;
        },
        reset () {
          this.vida = 100;
          this.score = 0;
          this.mudarPosicao();
        }
      },
      anuncios: [],
      btnLimparAnuncios: false
    }
  },
  methods: {
    startGame () {
      this.sounds.start.currentTime = 1;
      this.sounds.start.play();
      setTimeout(() => {
        this.sounds.gameMusic.volume = 0.5;
        this.player.reset();
        this.criarAnuncios(5);
        this.sounds.gameMusic.play();
        this.gameOcorrendo = setInterval(() => {
          this.player.vida -= 1;
          if (this.player.vida <= 0) {
            this.gameOver()
          };
        }, 100);
        }, 500);
    },
    criarAnuncios(qtdd=1) {
      for(let i=1; i<=qtdd; i++) {
        this.anuncios.push(
          {
            y: 100*Math.random(),
            tamanho: Math.floor((Math.random()*50) + 50),
            velocidade: Math.floor(Math.random()*5) + 1,
          }
        )
      }
    },
    clickAnuncio() {
      this.player.aumentarVida(-10);
      this.sounds.anuncio.currentTime = 0.25;
      this.sounds.anuncio.play();
    },
    clickPlayer() {
      this.sounds.player.currentTime = 0;
      this.sounds.player.play();
      this.player.aumentarVida();
      this.aumentarScore();
      this.player.mudarPosicao();
    },
    aumentarScore() {
      this.player.score++;
      if (this.player.score % 2 === 0) this.criarAnuncios();
      if (this.player.score % 10 === 0) this.btnLimparAnuncios = true;
    },
    limparAnuncios(qtdd=this.anuncios.length/2.5) {
      this.anuncios.splice(0, qtdd);
      this.sounds.limparAnuncios.play();
      this.btnLimparAnuncios = false;
    },
    gameOver () {
      this.sounds.gameMusic.pause();
      this.sounds.gameMusic.currentTime = 0;
      alert('morreu');
      clearInterval(this.gameOcorrendo);
      this.btnLimparAnuncios = false;
      this.anuncios = []
      this.player.reset();
      this.gameOcorrendo = false;
    }
  }
})

app.mount('#app');