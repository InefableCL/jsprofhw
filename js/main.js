const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

let app = new Vue({
  el: "#app",
  data: {
    cartUrl: "/getBasket.json",
    catalogUrl: "/catalogData.json",
    products: [],
    imgCatalog: "http://placehold.it/250x150",
    imgCart: "https://placehold.it/50x100",
    searchText: "",
    filteredProducts: [],
    showCart: false,
    cartItems: [],
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },
    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`).then((data) => {
        if (data.result === 1) {
          let find = this.cartItems.find(
            (el) => el.id_product === product.id_product
          );
          if (find) {
            find.quantity++;
          } else {
            let prod = Object.assign({ quantity: 1 }, product);
            this.cartItems.push(prod);
          }
        } else {
          alert("Error");
        }
      });
    },

    remove(item) {
      this.getJson(`${API}/deleteFromBasket.json`).then((data) => {
        if (data.result === 1) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            this.cartItems.splice(this.cartItems.indexOf(item), 1);
          }
        }
      });
    },

    searchFor() {
      let text = this.searchText.toLowerCase().trim();

      if (text === "") {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter((el) => {
          return el.product_name.toLowerCase().includes(text);
        });
      }
    },
  },
  mounted() {
    this.getJson(`${API + this.catalogUrl}`).then((data) => {
      for (let el of data) {
        this.products.push(el);
      }
    });
    this.filteredProducts = this.products;
    // if (this.products < 1) {
    //     document.getElementById("not_date").innerHTML = `<p>Нет данных</p>`;
    //   } else {
    //   }
  },
});