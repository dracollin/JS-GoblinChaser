'use strict';

//CRIA O CANVAS
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//IMAGEM DO FUNDO
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background.png";

//IMAGEM DO HEROI
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/hero.png";

//IMAGEM DO MONSTRO
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "images/monster.png";

//PERSONAGENS E OBJETOS DO JOGO
var hero = {
  speed: 256 //movimento em pixels por segundo
};
var monster = {};
var monstersCaught = 0;

//CONTROLE DO TECLADO
var keysDown = {};

window.addEventListener('keydown', function (e) {
  keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function (e) {
  delete keysDown[e.keyCode];
}, false);

//RESETA O JOGO QUANDO O JOGADOR PEGA O MONSTRO
var reset = function reset() {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;

  //POSICIONA O MONSTRO RANDOMICAMENTE NA TELA
  monster.x = 32 + Math.random() * (canvas.width - 64);
  monster.y = 32 + Math.random() * (canvas.height - 64);
};

//ATUALIZA OS OBJETOS DO JOGO
var update = function update(modifier) {
  if (38 in keysDown) {
    // Pressionando a seta pra cima
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) {
    // Pressionando a seta pra baixo
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) {
    // Pressionando a seta pra esquerda
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) {
    // Pressionando a seta pra direita
    hero.x += hero.speed * modifier;
  }

  //OS PERSONAGENS SE ENCONSTARAM???
  if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32 && hero.y <= monster.y + 32 && monster.y <= hero.y + 32) {
    ++monstersCaught;
    reset();
  }
};

//RENDERIZAR TUDO
var render = function render() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  //PONTOS
  ctx.fillStyle = 'rgb(250, 250, 250)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Goblins capturados: ' + monstersCaught, 40, 36);
};

//CONTROLE DO LOOP
var main = function main() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  //EXECUTA O MAIS RAPIDO POSSIVEL
  requestAnimationFrame(main);
};

//SUPORTE CROOS-BROWSER PARA requestAnimationFrame
var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//COMEÇO DO JOGO
var then = Date.now();
reset();
main();
