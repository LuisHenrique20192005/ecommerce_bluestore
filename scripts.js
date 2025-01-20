// Seleciona todos os botões de "diminuir"
const diminuiQtd = document.getElementsByClassName("remove-product");

// Itera sobre cada botão
for (let i = 0; i < diminuiQtd.length; i++) {
  diminuiQtd[i].addEventListener("click", function () {
    // Localiza o contêiner da quantidade mais próximo (div.qty)
    const qtyContainer = this.parentElement;

    // Encontra o span com a classe "quantidade" dentro desse contêiner
    const quantidadeSpan = qtyContainer.querySelector(".quantidade");

    // Verifica se o span foi encontrado
    if (quantidadeSpan) {
      // Converte o valor atual para número e diminui
      let quantidadeAtual = parseInt(quantidadeSpan.innerText, 10);

      if (quantidadeAtual > 1) {
        quantidadeAtual--; // Diminui a quantidade
        quantidadeSpan.innerText = quantidadeAtual; // Atualiza no DOM
      } else {
        alert("A quantidade mínima é 1.");
      }
    } else {
      console.error("O span com a classe 'quantidade' não foi encontrado.");
    }
  });
}

// Seleciona todos os botões de "aumentar"
const aumentaQtd = document.getElementsByClassName("add-product");

// Itera sobre cada botão
for (let i = 0; i < aumentaQtd.length; i++) {
  aumentaQtd[i].addEventListener("click", function () {
    // Localiza o contêiner da quantidade mais próximo (div.qty)
    const qtyContainer = this.parentElement;

    // Encontra o span com a classe "quantidade" dentro desse contêiner
    const quantidadeSpan = qtyContainer.querySelector(".quantidade");

    // Verifica se o span foi encontrado
    if (quantidadeSpan) {
      // Converte o valor atual para número e aumenta
      let quantidadeAtual = parseInt(quantidadeSpan.innerText, 10);
      quantidadeAtual++; // Incrementa a quantidade
      quantidadeSpan.innerText = quantidadeAtual; // Atualiza no DOM
    } else {
      console.error("O span com a classe 'quantidade' não foi encontrado.");
    }
  });
}


  //REMOVER PRODUTO

  // Seleciona todos os botões com a classe "remove"
  const removeButtons = document.getElementsByClassName("remove");

  // Itera sobre cada botão
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", function () {
      // Localiza o elemento <tr> mais próximo ao botão clicado
      const productRow = this.closest("tr");

      // Verifica se o <tr> foi encontrado
      if (productRow) {
        // Remove o <tr> do DOM
        productRow.remove();
      } else {
        console.error("A linha do produto não foi encontrada.");
      }
    });
  }

  //ADICIONAR PRODUTO

  // Aqui você pode colocar o código que manipula os produtos e o carrinho
  const addToCartButtons = document.getElementsByClassName(
    "botao-adicionar-carrinho"
  );
  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addProductToCart);
  }

  function addProductToCart(event) {
    const button = event.target;
    const productInfos = button.parentElement;
    const tableBody = document.querySelector(".cart-table tbody");
    if (!tableBody) {
      console.error("Tabela ou tbody não encontrada.");
      return;
    }

    // Verificar se a imagem existe
    const productImageElement = productInfos.getElementsByClassName("img1")[0];
    if (!productImageElement) {
      console.error("Elemento de imagem não encontrado.");
      return;
    }

    const productImage = productImageElement.src;

    // Verificar se o nome do produto existe
    const productNameElement =
      productInfos.getElementsByClassName("product-name")[0];
    if (!productNameElement) {
      console.error("Elemento de nome do produto não encontrado.");
      return;
    }

    const productName = productNameElement.innerHTML;

    // Verificar se o preço do produto existe
    const productPriceElement =
      productInfos.getElementsByClassName("product-price")[0];
    if (!productPriceElement) {
      console.error("Elemento de preço do produto não encontrado.");
      return;
    }

    const productPrice = productPriceElement.innerText;

    let newCartProduct = document.createElement("tr");
    newCartProduct.classList.add("cart-product");

    newCartProduct.innerHTML = `
      <td>
        <div class="product">
          <img src="${productImage}" alt="${productName}" />
          <div class="info">
            <div class="name">${productName}</div>
            <div class="category">Categoria</div>
          </div>
        </div>
      </td>
      <td>${productPrice}</td>
      <td>
        <div class="qty">
          <button type="button" class="remove-product">
            <i class="bx bx-minus"></i>
          </button>
          <span class="quantidade">1</span>
          <button type="button" class="add-product">
            <i class="bx bx-plus"></i>
          </button>
        </div>
      </td>
      <td>R$ 240,00</td>
      <td></td>
      <td>
        <button class="remove"><i class="bx bx-x"></i></button>
      </td>
`;
    tableBody.append(newCartProduct);
  }

  /*const navBar = document.querySelector(".navbar");
  const menuButton = document.querySelector(".menu-button");

  menuButton.addEventListener("click", () => {
    navBar.classList.toggle("show-menu");
  });*/

  window.history.replaceState(null, null, window.location.pathname);

  