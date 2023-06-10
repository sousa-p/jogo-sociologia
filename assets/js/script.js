const { createApp } = Vue

const app = createApp({
  data() {
    return {
      gameOcorrendo: false,
      player: {
        vida: 100,
        score: 0,
        x: 0,
        y: 0,
        sprt: 'assets/sprts/mario.gif',
        
        aumentarVida(qtdd=5) {
          (this.vida + qtdd <= 100)
            ? this.vida += qtdd
            : this.vida += 100 - this.vida;
        },
        mudarPosicao() {
          this.x = 90*Math.random()+3;
          this.y = 90*Math.random()+3;
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
      this.player.reset();
      this.criarAnuncios(5);
      this.gameOcorrendo = setInterval(() => {
        this.player.vida -= 1;
        if (this.player.vida <= 0) {
          this.gameOver()
        };
      }, 100);
    },
    criarAnuncios(qtdd=1) {
      for(let i=1; i<=qtdd; i++) {
        this.anuncios.push(
          {
            y: 100*Math.random(),
            tamanho: Math.floor((Math.random()*50) + 50),
            velocidade: Math.floor(Math.random()*10) + 1,
          }
        )
      }
    },
    aumentarScore() {
      this.player.score++;
      if (this.player.score % 2 === 0) this.criarAnuncios();
      if (this.player.score % 10 === 0) this.btnLimparAnuncios = true;
    },
    limparAnuncios(qtdd=this.anuncios.length/2.5) {
      this.anuncios.splice(0, qtdd);
      this.btnLimparAnuncios = false;
    },
    gameOver () {
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