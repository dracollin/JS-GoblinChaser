//CRIA O CANVAS
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//IMAGEM DO FUNDO
let bgReady = false;
const bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

//IMAGEM DO HEROI
let heroReady = false;
const heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

//IMAGEM DO MONSTRO
let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

//PERSONAGENS E OBJETOS DO JOGO
const hero = {
	speed: 256//movimento em pixels por segundo
};
const monster = {};
let monstersCaught = 0;

//CONTROLE DO TECLADO
const keysDown = {};

window.addEventListener('keydown', function (e) {
  keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function (e) {
  delete keysDown[e.keyCode];
}, false);

//RESETA O JOGO QUANDO O JOGADOR PEGA O MONSTRO
const reset = function () {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;

	//POSICIONA O MONSTRO RANDOMICAMENTE NA TELA
	monster.x = 32 + (Math.random() * (canvas.width - 64));
  	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//ATUALIZA OS OBJETOS DO JOGO
const update = function (modifier) {
  if (38 in keysDown) { // Pressionando a seta pra cima
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) { // Pressionando a seta pra baixo
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) { // Pressionando a seta pra esquerda
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) { // Pressionando a seta pra direita
    hero.x += hero.speed * modifier;
  }

//OS PERSONAGENS SE ENCONSTARAM???
 if (
    hero.x <= (monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    reset();
  }
};

//RENDERIZAR TUDO
const render = function () {
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
const main = function () {
	const now = Date.now();
	const delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	//EXECUTA O MAIS RAPIDO POSSIVEL
	requestAnimationFrame(main);
};

//SUPORTE CROOS-BROWSER PARA requestAnimationFrame
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//COMEÇO DO JOGO
let then = Date.now();
reset();
main();