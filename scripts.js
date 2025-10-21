const navBar = document.querySelector(".navbar");
const menuButton = document.querySelector(".menu-button");

menuButton.addEventListener("click", () => {
  navBar.classList.toggle("show-menu");
});

window.history.replaceState(null, null, window.location.pathname);

function sendToWhatsApp() {
  let phoneNumber = "5555991366180"; // Substitua pelo número da sua cliente (com DDD, sem espaços ou traços)
  let cartProducts = document.querySelectorAll(".cart-product");
  console.log("Quantidade de produtos no carrinho:", cartProducts.length);
  let message = "\u{1F6D2} *Pedido do Cliente:*%0A%0A";

  if (cartProducts.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  cartProducts.forEach((product, index) => {
    let productName = product.querySelector(".name").innerText;
    let productQuantity = product.querySelector(".quantidade").innerText;
    let productPrice =
      product.querySelector(".cart-product-price")?.innerText || "R$ 0,00";

    if (!productName || productName.includes("Adicione seu produto")) {
      return; // Ignora produtos sem nome ou com o nome fictício
    }

    message += `🔹 *${productName}*%0A`;
    message += `   🔢 Quantidade: ${productQuantity}%0A`;
    message += `   💰 Preço unitário: ${productPrice}%0A%0A`;
  });

  let totalAmount = document.querySelector(".botao-total").innerText;
  message += `🛍️ *${totalAmount}*%0A`;
  message += "📦 Desejo finalizar a compra!";

  let whatsappURL = `https://wa.me/${phoneNumber}?text=${(message)}`;
  console.log(whatsappURL);
  window.open(whatsappURL, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  const qtyContainers = document.querySelectorAll(".qty");

  qtyContainers.forEach((container) => {
    const reduceButton = container.querySelector(".reduce-product");
    const addButton = container.querySelector(".add-product");
    const quantitySpan = container.querySelector(".quantidade");
    const cartProducts = document.getElementsByClassName("cart-product");
    const removeButton = document.getElementsByClassName("remove"); //Quando seleciona pela classe, se tira o ponto

    document.addEventListener("click", (event) => {
      if (event.target.closest(".add-product")) {
        const quantitySpan = event.target
          .closest(".qty")
          .querySelector(".quantidade");
        quantitySpan.textContent = parseInt(quantitySpan.textContent, 10) + 1;
        updateTotal();
      }

      if (event.target.closest(".reduce-product")) {
        const quantitySpan = event.target
          .closest(".qty")
          .querySelector(".quantidade");
        let currentQuantity = parseInt(quantitySpan.textContent, 10);
        if (currentQuantity >= 1) {
          quantitySpan.textContent = currentQuantity - 1;
          updateTotal();
        }
      }

      if (event.target.closest(".remove")) {
        event.target.closest(".cart-product").remove();
        updateTotal();
      }
    });

    function updateTotal() {
      let totalAmount = 0;
      const cartProducts = document.querySelectorAll(".cart-product"); // Pegando os produtos do carrinho

      cartProducts.forEach((product) => {
        const productPrice = product
          .querySelector(".cart-product-price")
          .innerText.replace("R$", "")
          .replace(",", ".");
        const productQuantity = product.querySelector(".quantidade").innerText;
        totalAmount += parseFloat(productPrice) * parseInt(productQuantity, 10);
      });

      totalAmount = totalAmount.toFixed(2).replace(".", ",");
      document.querySelector(".carrinho .botao-total").innerText =
        "Total = R$" + totalAmount;
    }

    const addToCartButtons = document.getElementsByClassName(
      "botao-adicionar-carrinho"
    );
    for (var i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener("click", addProductToCart);
    }

    function addProductToCart(event) {
      const button = event.target;
      const productInfos = button.parentElement;
      const productImage =
        productInfos.getElementsByClassName("product-img")[0].src;
      const productTitle =
        productInfos.getElementsByClassName("product-name")[0].innerText;
      const productPrice =
        productInfos.getElementsByClassName("product-price")[0].innerText;

      let newCartProduct = document.createElement("tr");
      newCartProduct.classList.add("cart-product");

      newCartProduct.innerHTML = `
              <td>
                <div class="product">
                  <img src="${productImage}" alt="${productTitle}" />
                  <div class="info">
                    <div class="name">${productTitle}</div>
                    <div class="category">Categoria</div>
                  </div>
                </div>
              </td>
              <td class="cart-product-price">${productPrice}</td>
              <td>
                <div class="qty">
                  <button type="button" class="reduce-product">
                    <i class="bx bx-minus"></i>
                  </button>
                  <span class="quantidade">0</span>
                  <button type="button" class="add-product">
                    <i class="bx bx-plus"></i>
                  </button>
                </div>
              </td>
              <td>
                <button class="remove"><i class="bx bx-x"></i></button>
              </td>
      `;

      const tableBody = document.querySelector(".cart-table tbody");
      tableBody.append(newCartProduct);
      //ONDE PAREI: ATÉ QUE ENFIM CONSIGO ADICIONAR PRODUTOS AO CARRINHO, PORÉM TA INDO 2 LINHAS, DESDE QUE EU CLICO NO BOTÃO ADD CARRINHO, APARECE 2 BUTTONS NO CONSOLE, E FORMATAR IMG
    }
  });
});

/*Seleciona todos os botões de "diminuir"
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
*/
