const products = [
  { id: 1, title: "Notebook", price: 20000 },
  { id: 2, title: "Mouse", price: 1500 },
  { id: 3, title: "Keyboard", price: 5000 },
  { id: 4, title: "Gamepad", price: 4500 },
];

const renderProduct = (
  item,
  img = "https://www.meme-arsenal.com/memes/fae5e7084042aa90eb6e86ae3590c9c1.jpg"
) => `<div class="product__item" data-id="${this.id}">
              <img src="${img}" alt="img" width="300px">
                  <h3>${item.title}</h3>
                  <p>${item.price} р </p>
                  <button class="buy-btn">Купить</button>
          </div>`;

const renderProducts = (list) => {
  document
    .querySelector(".catalog")
    .insertAdjacentHTML(
      "beforeend",
      list.map((item) => renderProduct(item)).join("")
    );
};

renderProducts(products);
