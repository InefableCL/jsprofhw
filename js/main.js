//   getRequest on promise
// let getRequest = (url) => {
//   return new Promise((resolve, reject) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4) {
//         if (xhr.status !== 200) {
//           reject("Error");
//         } else {
//           resolve(xhr.responseText);
//         }
//       }
//     };
//     xhr.send();
//   });
// };

const BASE_URL =
  "https://raw.githubusercontent.com/lotostoi/JS2_FOR_STUDENTS/lesson3/responses/";

const CATALOG_URL = { goods: BASE_URL + "catalogData.json" };

const CART_URL = {
  goods: BASE_URL + "getBasket.json",
  addById: BASE_URL + "addToBasket.json",
  delById: BASE_URL + "deleteFromBasket.json",
};

class Good {
  constructor({ id, title, price }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img =
      "https://www.meme-arsenal.com/memes/fae5e7084042aa90eb6e86ae3590c9c1.jpg";
  }
  rander() {
    return `<div class="product__item" data-id="${this.id}">
              <img src="${this.img}" alt="img" width="300px">
              <h3>${this.title}</h3>
              <p>${this.price} р </p>
              <button class="buy-btn" data-id-Add="${this.id}">Купить</button>
            </div>`;
  }
}

class Goods {
  constructor(options) {
    this.container = document.querySelector(options.mainSelector);
    this.allGoods = [];
    this.GoodsForShow = [];
    this.url = options.URL;
    this.good = options.good ? options.good : null;
    this.cart = options.cart ? options.cart : null;
    this._init();
  }
  _init() {
    return makeRequestFetch(this.url.goods)
      .then((data) => {
        this.allGoods = this.GoodsForShow = data;
        this._rander();
      })
      .then(() => this._handler())
      .catch((e) => {
        console.error(e);
      });
  }

  _rander() {
    this.container.innerHTML = "";
    this.allGoods.forEach((good) => {
      let newGood = new this.good(good);
      this.container.insertAdjacentHTML("beforeend", newGood.rander());
    });
  }

  _handler() {
    this.container.addEventListener("click", (e) => {
      if (e.target.dataset.idAdd) {
        let item = this.allGoods.find((g) => +g.id === +e.target.dataset.idAdd);
        this.cart.addItem(item);
      }
    });
  }
}

class GoodInCart extends Good {
  constructor({ id, title, price, img, quantity }) {
    super({ id, title, price, img, quantity });
    this.quantity = quantity;
  }
  rander() {
    return `
    <div class="shoppingCart-line"></div>
    <div class="productLine">
      <div class="productDetails">
        <div class="productDetails__photo"><a href="#"><img src="${
          this.img
        }" alt="t-shirt2"></a>
        </div>
        <div class="productDetails__description">
          <h2>${this.title}</h2>
          <p>Color:<span>Red</span></p>
          <p>Size:<span>Xll</span></p>
        </div>
      </div>
      <div class="unitPrice">
        <p class="productFeatures">$${this.price}</p>
      </div>
      <div class="quantity">
        <p class="productFeatures">${this.quantity}</p>
      </div>
      <div class="subtotal">
        <p class="productFeatures">${this.quantity * this.price}</p>
      </div>
      <div class="action" data-id-del="${this.id}">
        <p class="productFeatures" data-id-del="${this.id}">Удалить</p>
      </div>
    </div>
    `;
  }
}

class Cart extends Goods {
  constructor(options) {
    super(options);
    this.fieldsForAllSum = options.selectorsFieldsForAllSum
      ? options.selectorsFieldsForAllSum
      : null;
    this.fieldsForAllQuantity = options.selectorsFieldsForAllQuantity
      ? options.selectorsFieldsForAllQuantity
      : null;
  }
  _handler() {
    this.container.addEventListener("click", (e) => {
      if (e.target.dataset.idDel) {
        let item = this.allGoods.find((g) => +g.id === +e.target.dataset.idDel);
        this.removeItem(item);
      }
    });
  }

  clacAllQuantity() {
    return this.GoodsForShow.reduce((accum, g) => accum + g.quantity, 0);
  }
  clacAllSum() {
    return this.GoodsForShow.reduce(
      (accum, g) => accum + g.quantity * g.price,
      0
    );
  }

  _rander() {
    super._rander();
    setContentInElements.apply(this, [
      this.fieldsForAllQuantity,
      this.clacAllQuantity(),
    ]);
    setContentInElements.apply(this, [this.fieldsForAllSum, this.clacAllSum()]);
  }
  addItem(item) {
    makeRequestFetch(this.url.addById)
      .then(({ result }) => {
        if (result) {
          let good = this.GoodsForShow.find((g) => g.id === item.id);
          if (good) {
            good.quantity++;
          } else {
            this.GoodsForShow.push({ ...item, quantity: 1 });
          }
          this._rander();
        } else {
          throw new Error("Server's answer isn't correct...");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
  removeItem(item) {
    makeRequestFetch(this.url.delById)
      .then(({ result }) => {
        if (result) {
          let good = this.GoodsForShow.find((g) => g.id === item.id);
          if (good.quantity > 1) {
            good.quantity--;
          } else {
            let idx = this.GoodsForShow.findIndex((g) => g.id === item.id);
            this.GoodsForShow.splice(idx, 1);
          }
          this._rander();
        } else {
          throw new Error("Server's answer isn't correct...");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

let CartShop = new Cart({
  mainSelector: ".CartList",
  good: GoodInCart,
  URL: CART_URL,
  selectorsFieldsForAllSum: ".header__cart-sum",
  selectorsFieldsForAllQuantity: ".header__cart-quantity",
});

new Goods({
  mainSelector: ".catalog",
  good: Good,
  cart: CartShop,
  URL: CATALOG_URL,
});

function makeRequestFetch(url) {
  return fetch(url).then((data) => data.json());
}

function setContentInElements(selectors, value) {
  if (typeof selectors === "string") {
    let elements = [...document.querySelectorAll(selectors)];
    elements.forEach((e) => {
      e.innerHTML = value;
    });
  } else {
  }
}

// class ProductItem {
//   constructor(
//     product,
//     img = "https://www.meme-arsenal.com/memes/fae5e7084042aa90eb6e86ae3590c9c1.jpg"
//   ) {
//     this.title = product.title;
//     this.price = product.price;
//     this.id = product.id;
//     this.img = img;
//   }

//   render() {
//     return `<div class="product__item" data-id="${this.id}">
//               <img src="${this.img}" alt="img" width="300px">
//               <h3>${this.title}</h3>
//               <p>${this.price} р </p>
//               <button class="buy-btn">Купить</button>
//             </div>`;
//   }
// }

// class cart {
//   cartlist = [];

// }
// const productList = new ProductList();
