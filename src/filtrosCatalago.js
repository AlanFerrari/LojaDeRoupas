const catalagoProdutos = document.getElementById("container-produto");

function esconderMasculinos() {
    exibirTodos();
	const produtosMasculinos = Array.from(
		catalagoProdutos.getElementsByClassName("masculino")
	);

	for (const produtos of produtosMasculinos) {
		produtos.classList.add("hidden");
	}
}

function esconderFeminos() {
    exibirTodos();
	const produtosFemininos = Array.from(
		catalagoProdutos.getElementsByClassName("feminino")
	);

	for (const produtos of produtosFemininos) {
		produtos.classList.add("hidden");
	}
}

function exibirTodos() {
	const produtosEscondidos = Array.from(
		catalagoProdutos.getElementsByClassName("hidden")
	);

	for (const produtos of produtosEscondidos) {
		produtos.classList.remove("hidden");
	}
}

export function incializarFiltros() {
	document
		.getElementById("exibir-femininos")
		.addEventListener("click", esconderMasculinos);
	document
		.getElementById("exibir-masculinos")
		.addEventListener("click", esconderFeminos);
	document
		.getElementById("exibir-todos")
		.addEventListener("click", exibirTodos);
}
