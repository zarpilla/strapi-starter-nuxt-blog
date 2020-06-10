<template>
  <div>

    <div class="uk-section">
      <div class="uk-container uk-container-large">
        <h1>Strapi blog</h1>

        <Articles :articles="articles"></Articles>
        
      </div>
    </div>

  </div>
</template>

<script>
//import articlesQuery from '~/apollo/queries/article/articles'
import Articles from '~/components/Articles'

export default {
  data() {
    return {
      articles: [],
    }
  },
  async asyncData({ $axios, app }) {
    let { data } = await $axios.get(`/articles-published/?lang=${app.i18n.locale}`);
    return { articles: data };
  },
  components: {
    Articles
  },
  // apollo: {
  //   articles: {
  //     prefetch: true,
  //     query: articlesQuery,
  //     variables () {
  //       return { id: parseInt(this.$route.params.id) }
  //     }
  //   }
  //}
}
</script>
