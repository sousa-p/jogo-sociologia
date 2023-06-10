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
        this.player.vida -= 0.05;
        if (this.player.vida <= 0) {
          this.gameOver()
        };
      }, 1);
    },
    criarAnuncios(qtdd=1) {
      for(let i=1; i<=qtdd; i++) {
        this.anuncios.push(
          {
            y: 100*Math.random(),
            velocidade: Math.floor(10/(this.player.score+1)*(Math.random()+0.2)) + 1,
          }
        )
      }
    },
    aumentarScore() {
      this.player.score++;
      this.criarAnuncios();
      if (this.player.score % 10 === 0) this.btnLimparAnuncios = true;
    },
    limparAnuncios(qtdd=this.anuncios.length/4) {
      this.anuncios.splice(0, qtdd);
      this.btnLimparAnuncios = false;
    },
    gameOver () {
      alert('morreu');
      clearInterval(this.gameOcorrendo);
      this.gameOcorrendo = false;
      this.player.reset();
      this.anuncios = []
      this.btnLimparAnuncios = false;
    }
  }
})

app.mount('#app');