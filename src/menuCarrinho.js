import { catalago, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutoCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};

function abrirCarrinho() {
	document.getElementById("carrinho").classList.remove("right-[-360px]");
	document.getElementById("carrinho").classList.add("right-[0px]");
}

function fecharCarrinho() {
	document.getElementById("carrinho").classList.remove("right-[0px]");
	document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout() {
	if (Object.keys(idsProdutoCarrinhoQuantidade).length === 0) {
		return;
	}
	window.location.href = "./checkout.html";
}

export function incializarCarrinho() {
	const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
	const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
	const botaoIrParaCheckout = document.getElementById("finalizar-compra");

	botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
	botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
	botaoIrParaCheckout.addEventListener("click", irParaCheckout);
}

function removerDoCarrinho(idProduto) {
	delete idsProdutoCarrinhoQuantidade[idProduto];
	renderizarProdutosCarrinho();
	atualizarPrecoCarrinho();
	salvarLocalStorage("carrinho", idsProdutoCarrinhoQuantidade);
}

function incrementarQuantidadeProduto(idProduto) {
	idsProdutoCarrinhoQuantidade[idProduto]++;
	atualizarInformacaoQuantidade(idProduto);
	atualizarPrecoCarrinho();
	salvarLocalStorage("carrinho", idsProdutoCarrinhoQuantidade);
}

function decrementarQuantidadeProduto(idProduto) {
	if (idsProdutoCarrinhoQuantidade[idProduto] === 1) {
		removerDoCarrinho(idProduto);
		return;
	}
	idsProdutoCarrinhoQuantidade[idProduto]--;
	atualizarInformacaoQuantidade(idProduto);
	atualizarPrecoCarrinho();
	salvarLocalStorage("carrinho", idsProdutoCarrinhoQuantidade);
}

function atualizarInformacaoQuantidade(idProduto) {
	document.getElementById(`quantidade-${idProduto}`).innerText =
		idsProdutoCarrinhoQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
	const produto = catalago.find((p) => p.id === idProduto);
	const containerProdutosCarrinho =
		document.getElementById("produtos-carrinho");

	const elementoArticle = document.createElement("article"); //cria a tag <article></article>
	const articleClasses = [
		"flex",
		"bg-slate-100",
		"rounded-lg",
		"p-1",
		"relative",
	];

	for (const articleClass of articleClasses) {
		elementoArticle.classList.add(articleClass);
		/*adiciona as classes <article class="flex bg-slate-100 p-1 rounded-lg relative"></article> */
	}

	const cartaoProdutoCarrinho = `<button id="excluir-item-carrinho${
		produto.id
	}" class="absolute top-0 right-2">
        <i class="fa-solid fa-circle-xmark  text-slate-500 hover:text-slate-800"></i>
    </button>
    <img src="./assets/img/${produto.imagem}" alt="${produto.nome}"
    class="h-24">
    <div class="p-2 flex flex-col justify-between">
        <p class="text-slate-900 text-sm">${produto.nome}</p>
        <p class="text-slate-400 text-xs">Tamanho: M</p>
        <p class="text-green-700 text-lg">R$ ${produto.preco}</p>
    </div>
    <div class="flex text-slate-950 items-end absolute bottom-0 right-4 text-lg">
		<button id="decrementar-produto-${produto.id}"> - </button>
		<p id="quantidade-${produto.id}" class="ml-4">
		${idsProdutoCarrinhoQuantidade[produto.id]}
		</p>
		<button class="ml-4" id="incrementar-produto-${produto.id}"> + </button>
    </div>`;

	elementoArticle.innerHTML = cartaoProdutoCarrinho;
	containerProdutosCarrinho.appendChild(elementoArticle);

	document
		.getElementById(`incrementar-produto-${produto.id}`)
		.addEventListener("click", () =>
			incrementarQuantidadeProduto(produto.id)
		);

	document
		.getElementById(`decrementar-produto-${produto.id}`)
		.addEventListener("click", () =>
			decrementarQuantidadeProduto(produto.id)
		);

	document
		.getElementById(`excluir-item-carrinho${produto.id}`)
		.addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() {
	//renderizar é igual desenhar
	const containerProdutosCarrinho =
		document.getElementById("produtos-carrinho");
	containerProdutosCarrinho.innerHTML = "";

	for (const idProduto in idsProdutoCarrinhoQuantidade) {
		desenharProdutoNoCarrinho(idProduto);
	}
	atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho() {
	const precoCarrinho = document.getElementById("preco-total");
	let precoTotalCarrinho = 0;
	for (const idProdutoNoCarrinho in idsProdutoCarrinhoQuantidade) {
		precoTotalCarrinho +=
			catalago.find((p) => p.id === idProdutoNoCarrinho).preco *
			idsProdutoCarrinhoQuantidade[idProdutoNoCarrinho];
	}
	precoCarrinho.innerText = `Total: R$ ${precoTotalCarrinho}`;
}

export function adicionarAoCarrinho(idProduto) {
	if (idProduto in idsProdutoCarrinhoQuantidade) {
		incrementarQuantidadeProduto(idProduto);
		return;
	}
	idsProdutoCarrinhoQuantidade[idProduto] = 1;
	desenharProdutoNoCarrinho(idProduto);
	atualizarPrecoCarrinho();
	salvarLocalStorage("carrinho", idsProdutoCarrinhoQuantidade);
}
