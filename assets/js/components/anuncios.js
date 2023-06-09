const Anuncios = {
  template: `<div class="anuncio">{{ mensagem }}</div>`,
  props: ['mensagem'],
  data() {
    return {};
  }
};

class Anuncio {
  constructor (x, y, velocidade, mensagem) {
    this.x = x;
    this.y = y;
    this.velocidade = velocidade;
    this.mensagem = mensagem;
  }
}