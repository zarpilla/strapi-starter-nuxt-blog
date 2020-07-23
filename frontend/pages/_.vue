<template>
  <div>
    <slider v-if="page" :data="page[slider_]" :page="page" :social="social"></slider>

    <blocks v-if="page" :blocks="page[blocks_]" :slug="slug"></blocks>    

  </div>
</template>

<script>
import Slider from "~/components/Slider";
import Blocks from "~/components/Blocks";

export default {
  components: {    
    Slider,
    Blocks
  },
  data() {
    return {
      page: {},
      social: {},
      api_url: process.env.strapiBaseUri,
      categories: [],
      slug: ''
    };
  },
  computed: {
    title_() {
      return `title_` + this.$i18n.locale;
    },
    slider_() {
      return `slider_` + this.$i18n.locale;
    },
    blocks_() {
      return `blocks_` + this.$i18n.locale;
    }
  },
  async asyncData({ $axios, app }) {

    const pathMatch = app.context.route.params.pathMatch
    const pathMatchSlug = pathMatch.endsWith('/') ? pathMatch.substring(0, pathMatch.length -1 ) : pathMatch
    let index = pathMatchSlug.indexOf('/')    
    const slug = pathMatchSlug.substring(index).replace(/\//, '')
    const pages = await $axios.$get(`/pages/?slug_${app.i18n.locale}=${slug}`)
    const social = await $axios.$get(`/menus?name=social_${app.i18n.locale}`)

    return { page: pages[0], social: social[0], slug: slug };
  },
  head() {
    return {
      title:
        this.page && this.page[`seo_${this.$i18n.locale}`]
          ? this.page[`seo_${this.$i18n.locale}`].meta_title
          : this.page[this.title_],
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.page[`seo_${this.$i18n.locale}`]
            ? this.page[`seo_${this.$i18n.locale}`].meta_description
            : ""
        },
        {
          hid: "og:image",
          name: "og:image",
          content:
            this.api_url +
            (this.page[`seo_${this.$i18n.locale}`] &&
            this.page[`seo_${this.$i18n.locale}`].og_image
              ? this.page[`seo_${this.$i18n.locale}`].og_image.formats.medium
                  .url
              : "")
        }
      ]
    };
  },
  mounted() {
    console.log('_vue mounted')
    //console.log("page", JSON.parse(JSON.stringify(this.page)));
  }

  // apollo: {
  //   articles: {
  //     prefetch: true,
  //     query: articlesQuery,
  //     variables () {
  //       return { id: parseInt(this.$route.params.id) }
  //     }
  //   }
  //}
};
</script>
<style scoped>
/* .carousel-item {
  max-height: 70vh;
}
.carousel-caption {
  top: 200px;
  left: 130px;
  text-align: left;
}
.carousel-caption h5 {
  font-size: 60px;
  font-weight: bold;
} */

</style>
