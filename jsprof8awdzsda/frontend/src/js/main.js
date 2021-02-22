const app = new Vue({
  el: '#myApp',
  data: {
  },

  components: {
    CompHeader,
    CompFooter,
    CompProducts,
  },

  methods: {
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error)
        })
    },
  },

})



