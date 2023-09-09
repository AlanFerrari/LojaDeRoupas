import { renderizarCatalogo } from "./src/cartaoProduto";
import { incializarFiltros } from "./src/filtrosCatalago";
import { incializarCarrinho, atualizarPrecoCarrinho, renderizarProdutosCarrinho } from "./src/menuCarrinho";

renderizarCatalogo();
incializarCarrinho();
atualizarPrecoCarrinho();
renderizarProdutosCarrinho();
incializarFiltros();