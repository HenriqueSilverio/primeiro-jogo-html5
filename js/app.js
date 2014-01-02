var canvas,
	context,
	barraAltura, 
	barraLargura, 
	jogadorPosicaoX, 
	velocidadeJogador, 
	bolaDiametro, 
	bolaPosX, 
	bolaPosY, 
	velocidadeBola, 
	pontosJogador, 
	colisao;

var gameInit = function gameInit() {
	canvas  = document.getElementById('canvas');
	context = canvas.getContext('2d');

	barraAltura  = 15;
	barraLargura = 90;
	
	pontosJogador     = 0;
	jogadorPosicaoX   = (canvas.width - barraLargura) / 2;
	velocidadeJogador = 20;
	
	bolaDiametro   = 10;
	bolaPosX       = (canvas.width / 2);
	bolaPosY       = -10;
	velocidadeBola = 10;

	colisao = false;
	
	document.addEventListener('keydown', keyDown);
	
	setInterval(gameLoop, 30);
}

var keyDown = function keyDown(e) {
	switch(e.keyCode) {
		case 37: // left
			if(jogadorPosicaoX > 0) {
				jogadorPosicaoX -= velocidadeJogador;
			}
			break;
			
		case 39: // right
			if(jogadorPosicaoX < (canvas.width - barraLargura)) {
				jogadorPosicaoX += velocidadeJogador;
			}
			break;
	}
}

var gameLoop = function gameLoop() {
	//Limpa Tela
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// Bola
	context.beginPath();
    context.arc(bolaPosX, bolaPosY, bolaDiametro, 0, Math.PI * 2, true);
    context.fill();
	
	if(bolaPosY <= canvas.height) {
		bolaPosY += velocidadeBola;
	} else {
		bolaPosX = Math.random() * 600;
		bolaPosY = -10;
		colisao  = false;
	}
	
	// Checar Colisão
	if((bolaPosX > jogadorPosicaoX && bolaPosX < jogadorPosicaoX + barraLargura) && bolaPosY >= canvas.height - barraAltura && colisao == false) {
		pontosJogador++;
		colisao = true;
	}

	if(bolaPosY >= canvas.height && colisao === false) {
		pontosJogador = 0;
		colisao = true;
	}
	
	// Escreve placar
    context.font = "32pt Tahoma";
	context.fillText(pontosJogador, canvas.width - 70, 50);
	
	// Jogador
	context.fillRect(jogadorPosicaoX, canvas.height - barraAltura, barraLargura, barraAltura);
}

window.onload = gameInit;