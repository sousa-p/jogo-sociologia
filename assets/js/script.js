const { createApp } = Vue

const app = createApp({
  components: {Anuncios},
  data() {
    return {
      player: {
        vida: 5,
        score: 0,
        x: 0,
        y: 0,
        sprt: '',
      },
      anuncios: []
    }
  },
  methods: {
    criarAnuncios (qtdd) {
      for(let i=0; i<qtdd; i++) {
        this.anuncios.push(new Anuncio(10+(i*(100/qtdd)), 10+(i*(100/qtdd)), Math.floor(10/(this.player.score+1)*Math.random()), 'a'))
      }
    }
  }
  ,
  mounted() {
    this.criarAnuncios(this.player.score + 5);
  }
})

app.mount('#app');