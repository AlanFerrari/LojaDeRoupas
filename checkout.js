import {
	apagarDoLocalStorage,
	desenharProdutoCarrinhoSimples,
	lerLocalStorage,
	salvarLocalStorage,
} from "./src/utilidades";

function desenharProdutosCheckout() {
	const idsProdutoCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};
	for (const idProduto in idsProdutoCarrinhoQuantidade) {
		desenharProdutoCarrinhoSimples(
			idProduto,
			"container-produto-checkout",
			idsProdutoCarrinhoQuantidade[idProduto]
		);
	}
}

function finalizarCompra(evento) {
	evento.preventDefault();
	const idsProdutoCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};
	if (Object.keys(idsProdutoCarrinhoQuantidade).length === 0) {
		return;
	}

	const dataAtual = new Date();
	const pedidoFeito = {
		dataPedido: dataAtual,
		pedido: idsProdutoCarrinhoQuantidade,
	};
	const historicoDePedidos = lerLocalStorage("historico") ?? [];
	const historicoPedidosAtualizados = [pedidoFeito, ...historicoDePedidos];

	salvarLocalStorage("historico", historicoPedidosAtualizados);
	apagarDoLocalStorage("carrinho");

	window.location.href = "./pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
