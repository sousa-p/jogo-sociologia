const { createApp } = Vue

const app = createApp({
  data() {
    return {
      player: {
        vida: 5,
        score: 0,
        x: 0,
        y: 0,
        sprt: 'assets/sprts/mario.gif',

        mudarPosicao() {
          this.x = 90*Math.random()+3;
          this.y = 90*Math.random()+3;
        }
      },
      anuncios: [],
      btnLimparAnuncios: false
    }
  },
  methods: {
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
    }
  }
  ,
  created() {
    this.player.mudarPosicao();
    this.criarAnuncios(this.player.score + 5);
  }
})

app.mount('#app');