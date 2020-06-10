<template>
  <div>

    <client-only>
    <div class="uk-section">
      <div class="uk-container uk-container-large">
        <h1>{{ category[nameField] }}</h1>
        <Articles :articles="category.articles || []"></Articles>
      </div>
    </div>
  </client-only>
  </div>
</template>

<script>
import Articles from '~/components/Articles'

export default {    
  components: {
    Articles
  },
  data() {
    return {
      category: {}
    }
  },
  computed: {
    nameField() {
      return `name_` + this.$i18n.locale
    },
    slugField() {
      return `slug_` + this.$i18n.locale
    }
  },
  async asyncData({ $axios, app }) {
    //this.$route.params.id
    //console.log('app',  app )
    let { data } = await $axios.get(`/categories/?slug_${app.i18n.locale}=${app.context.route.params.id}`);
    return { category: data[0] }
  },
  nuxtI18n: {
    paths: {
      en: '/category/:id',
      es: '/categoria/:id'
    }
  }
}
</script>
