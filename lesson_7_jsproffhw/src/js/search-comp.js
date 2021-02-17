const SearchComp =  {
  template: `<div class="header-search">
                <form>
                    <input v-model="searchLine" class="input-search" type="text" value="" placeholder="Поиск">
                    <!--  

                    @click.prevent="$root.$refs.goods.filter(searchLine)"  дотягиваемся через ref и refs до метода  каталога
                    filter и вызываем его с параметром - searchLine, который содержит условие для фильтрации или поиска()
                     подробнее об использовании $root $refs ref тут: https://ru.vuejs.org/v2/guide/components-edge-cases.html
                    -->
                    <input @click.prevent="$root.$refs.goods.filter(searchLine)" class="submit-btn" type="submit" value="Go">
                </form>
            </div>
  `,
  data: () => ({
    searchLine: '',
  }),
 
}
