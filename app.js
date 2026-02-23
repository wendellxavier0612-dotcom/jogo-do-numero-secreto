// TITULO
// let titulo = document.querySelector ('h1');
// titulo.innerHTML ='Hora do desafio';
// SUBTITULO OU PARAGRAFO
// let paragrafo = document.querySelector ('p');
// paragrafo.innerHTML = "Digite um número de 1 a 10";
//TRABALHANDO COM FUNÇÃO
let listaDeNumerosSorteados = [];
let numeroLimite = 1000;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto)
let tentativas = 1;
function exibirTextoNaTela(tag, texto) {
	let campo = document.querySelector(tag);
	campo.innerHTML = texto;
	 if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMensagemInicial() {
	exibirTextoNaTela('h1', 'Jogo do número secreto 2.0');
	exibirTextoNaTela('p', 'Escolha um número de 1 a 1000');
}

exibirMensagemInicial();

function verificarChute() {
	let chute = document.querySelector('input').value;
	if (chute == numeroSecreto) {
		exibirTextoNaTela('h1', 'Acertou!');
		let palavratentativa = tentativas > 1 ? "tentativas" : "tentativa";
		let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavratentativa}!`;
		exibirTextoNaTela('p', mensagemTentativas);
		document.getElementById('reiniciar').removeAttribute("disabled");
	} else {
		if (chute > numeroSecreto) {
			exibirTextoNaTela('p', 'O número secreto é menor');
		} else {
			exibirTextoNaTela('p', 'O número secreto é maior');
		}
	} tentativas++;
	limparCampo();
}

function gerarNumeroAleatorio() {
	let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
	let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

	if (quantidadeDeElementosNaLista == numeroLimite) {
		listaDeNumerosSorteados = [];
	}

	if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
		return gerarNumeroAleatorio();
	} else {
		listaDeNumerosSorteados.push(numeroEscolhido);
		console.log(listaDeNumerosSorteados);
		return numeroEscolhido;
	}
}

function limparCampo() {
	chute = document.querySelector('input');
	chute.value = '';
}

function reiniciarJogo() {
	numeroSecreto = gerarNumeroAleatorio();
	console.log(numeroSecreto)
	limparCampo();
	tentativas = 1;
	exibirMensagemInicial()
	document.getElementById('reiniciar').setAttribute("disabled", true)
}