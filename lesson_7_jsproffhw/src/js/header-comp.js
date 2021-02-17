const CompHeader = {
  template: `<header class="header">
                <div class="container">
                  <div class="header-wrapper">

                    <cart-comp :showBasket ="basketIsActive"  ref = "cart" @sentresult="setResultCart($event)" />



                    <div class="header-logo">
                      <img src="http://placehold.it/50x50" alt="Логотип">
                      <p>Linex</p>
                    </div>

                    <div class="header-menu">
                      <ul class="header-ul">
                        <li v-for="el of headerLinks" class="header-li"><a href="#" class="header__link">{{ el }}</a></li>
                      </ul>
                    </div>


                    <search-comp/>

                    <button @click="basketIsActive = !basketIsActive" class="basket-btn">
                      Корзина {{ resultCart ?  resultCart.allQuantity: '0'}}
                    </button>
                  </div>
                </div>
              </header>`,
  data: function () {
    return {
      headerLinks: ["Каталог", "Акции", "О нас", "Контакты"],
      basketIsActive: false,
      resultCart: null,
    };
  },
  components: {
    SearchComp,
    CartComp,
  },
  methods: {
    setResultCart(e) {
      this.resultCart = e;
    },
  },
};
