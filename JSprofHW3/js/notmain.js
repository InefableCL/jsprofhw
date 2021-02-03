const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

//getRequest on promise
let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject("Error");
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send();
  });
};

class ProductList {
  _goods;
  _allProducts;

  constructor(container = ".catalog") {
    this.container = container;
    this._goods = [];
    this._allProducts = [];

    this._newGoods();
    this._render();
  }

  _newGoods() {
    this._goods = [
      { id: 1, title: "Notebook", price: 20000 },
      { id: 2, title: "Mouse", price: 1500 },
      { id: 3, title: "Keyboard", price: 5000 },
      { id: 4, title: "Gamepad", price: 4500 },
    ];
  }

  _render() {
    const cont = document.querySelector(this.container);

    for (let product of this._goods) {
      const productObj = new ProductItem(product);
      this._allProducts.push(productObj);
      cont.insertAdjacentHTML("beforeend", productObj.render());
    }
  }

  sum() {
    return this._goods.reduce((sum, { price }) => sum + price, 0);
  }
}

class ProductItem {
  constructor(
    product,
    img = "https://www.meme-arsenal.com/memes/fae5e7084042aa90eb6e86ae3590c9c1.jpg"
  ) {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product__item" data-id="${this.id}">
              <img src="${this.img}" alt="img" width="300px">
              <h3>${this.title}</h3>
              <p>${this.price} р </p>
              <button class="buy-btn">Купить</button>
            </div>`;
  }
}

class cart {
  cartlist = [];
  
}
const productList = new ProductList();
