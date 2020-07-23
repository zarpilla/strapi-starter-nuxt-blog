<template>
  <div>
    <div
      v-if="article.image"
      id="banner"
      class="uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding"
      :data-src="api_url + article.image.url"
      uk-img
    >
      <h1>{{ article[title_] }}</h1>
    </div>

    <div class="uk-section">
      <div class="uk-container uk-container-small">
        <div v-if="article[content_]" id="editor" v-html="$md.render(article[content_])"></div>
        <p v-if="article[published_at_]">{{ $moment(article[published_at_]).format("MMM Do YY") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
//var moment = require("moment");

export default {
  data() {
    return {
      article: {},
      //moment: moment,
      api_url: process.env.strapiBaseUri
    };
  },
  computed: {
    title_() {
      return `title_` + this.$i18n.locale;
    },
    content_() {
      return `content_` + this.$i18n.locale;
    },
    slug_() {
      return `slug_` + this.$i18n.locale;
    },
    published_at_() {
      return `published_at_` + this.$i18n.locale;
    }
  },
  head() {
    return {
      title: this.article && this.article[`seo_${this.$i18n.locale}`] ? this.article[`seo_${this.$i18n.locale}`].meta_title : this.article[this.title_],
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.article[`seo_${this.$i18n.locale}`] ? this.article[`seo_${this.$i18n.locale}`].meta_description : ''
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.api_url + ( this.article[`seo_${this.$i18n.locale}`] && this.article[`seo_${this.$i18n.locale}`].og_image ? this.article[`seo_${this.$i18n.locale}`].og_image.formats.medium.url : this.article.image )
        }
      ]
    };
  },
  async asyncData({ $axios, app, error }) {
    
    let { data } = await $axios.get(
      `/articles/?slug_${app.i18n.locale}=${app.context.route.params.id}`
    );
    data = data.filter(d => d[`published_${app.i18n.locale}`] == true)

    if (data.length == 0) {
      error({ statusCode: 404, message: 'Page not found' })
    }
    return { article: data[0] };
  },
  nuxtI18n: {
    paths: {
      en: "/blog/:id",
      es: "/blog/:id"
    }
  }
};
</script>
