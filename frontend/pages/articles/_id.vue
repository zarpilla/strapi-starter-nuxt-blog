<template>
  <div class="single-article" v-bind:class="'single-article-' + article[slug_]">
    <slider :data="slider" :page="null" :social="social"></slider>
    <div class="container-xl article-container">
      <div class="row">
        <div class="col-md-3 bordered-right">
          <block-last-news
            :block="block"
            :texts="texts"
            :layout="'layout-article'"
            :columns-css="'row-cols-md-1'"
            :limit="3"
          ></block-last-news>
        </div>
        <div class="col-md-9">
          <div class="content article-pre-content">
            <h1>{{ article[title_] }}</h1>
            <img v-if="article.image" v-bind:src="api_url + article.image.url" />
            <p
              class="article-date"
              v-if="article[published_at_]"
            >{{ $moment(article[published_at_]).format("DD-MM-YYYY") }}</p>
            <div
              class="article-content"
              v-if="article[content_]"
              v-html="$md.render(article[content_])"
            ></div>

            <div class="share">
              <div class="z">
                <div class="float-right">
                  <a
                    v-for="item in social.items"
                    v-bind:key="item.id"
                    class="share-link"
                    @click="share(item)"
                    target="_blank"
                  >
                    <font-awesome-icon class="icon" :icon="['fab', item.text]" />
                  </a>
                </div>
                <div class="float-right line"></div>
                <div class="float-right" v-t="t('share')">{{ social.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "~/components/Slider";
import BlockLastNews from "~/components/BlockLastNews";
import { mapGetters } from "vuex";

export default {
  components: {
    Slider,
    BlockLastNews,
  },
  data() {
    return {
      article: {},
      //moment: moment,
      api_url: process.env.strapiBaseUri,
      images: [],
      slider: {},
      social: {},
      block: {},
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
    },
    ...mapGetters({
      texts: "texts/get",
    }),
  },
  head() {
    return {
      title:
        this.article && this.article[`seo_${this.$i18n.locale}`]
          ? this.article[`seo_${this.$i18n.locale}`].meta_title + ' | ' + this.t('meta-company')
          : this.article[this.title_] + this.t('meta-company'),
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.article[`seo_${this.$i18n.locale}`]
            ? this.article[`seo_${this.$i18n.locale}`].meta_description
            : "",
        },
        {
          hid: "og:image",
          name: "og:image",
          content:
            this.api_url +
            (this.article[`seo_${this.$i18n.locale}`] &&
            this.article[`seo_${this.$i18n.locale}`].og_image
              ? this.article[`seo_${this.$i18n.locale}`].og_image.formats.medium
                  .url
              : this.article.image),
        },
      ],
    };
  },
  async asyncData({ $axios, app, error, store }) {
    var { data } = await $axios.get(
      `/articles/?slug_${app.i18n.locale}=${app.context.route.params.id}`
    );
    data = data.filter((d) => d[`published_${app.i18n.locale}`] == true);

    if (data.length == 0) {
      error({ statusCode: 404, message: "Page not found" });
    }

    let article = data[0];

    var { data } = await $axios.get(`/images`);
    let images = data;

    var { data } = await $axios.get(`/texts`);
    let texts = data;
    //let texts = await store.getters['texts/get']

    let slider = [
      {
        id: -1,
        title: texts.find((i) => i.key == "news")
          ? texts.find((i) => i.key == "news")[`text_${app.i18n.locale}`]
          : null,
        description: null,
        href: null,
        css: null,
        identifier: null,
        block_type: null,
        type: null,
        image: images.find((i) => i.key == "news-slider")
          ? images.find((i) => i.key == "news-slider")[
              `image_${app.i18n.locale}`
            ]
          : null,
        icon: null,
      },
    ];

    console.log('slider', slider)

    var { data } = await $axios.get(`/menus?name=social_${app.i18n.locale}`);
    const social = data[0];

    let block = {
      css: "single-article-last-news",
      title: texts.find((i) => i.key == "last-news")
        ? texts.find((i) => i.key == "last-news")[`text_${app.i18n.locale}`]
        : "",
    };

    return {
      article: article,
      images: images,
      slider: slider,
      social: social,
      block: block,
    };
  },
  methods: {
    t(key) {
      return this.texts.find((t) => t.key == key)
        ? this.texts.find((t) => t.key == key)[`text_` + this.$i18n.locale]
        : key;
    },
    share(item) {
      let url = encodeURIComponent(window.location.href)
      if (item.text == 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=&url=${url}`)
      }
      else if (item.text == 'facebook') {
        window.open(`https://www.facebook.com/sharer.php?display=popup&u=${url}`,'sharer', 'toolbar=0,status=0,resizable=1,width=626,height=436')
      }
      else if (item.text == 'linkedin') {
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}`)
      }      
    }
  },
  nuxtI18n: {
    paths: {
      en: "/blog/:id",
      es: "/blog/:id",
    },
  },
};
</script>
<style scoped>
.article-content {
  margin-bottom: 3rem;
}
img {
  max-width: 100%;
}
.article-container {
  margin-top: 3rem;
}
h1 {
  font-weight: bold;
  margin-bottom: 2rem;
}
.article-date {
  margin: 2rem 0 2rem;
  color: #666;
  font-size: 0.9rem;
  font-weight: bold;
}
.share {
  width: 100%;
  text-align: right;
  text-transform: uppercase;
  color: #ec6901;
  font-size: 0.8rem;
  width: 100%;
  z-index: 20;
  margin-top: 5rem;
}
.share .line {
  width: 100px;
  height: 1px;
  background: #666;
  vertical-align: 10px;
  margin: 8px 20px 0 20px;
}
.share .icon {
  margin-right: 20px;
  color: #666;
  font-size: 1.2rem;
}
.share-link{
  cursor: pointer;
}
a.share-link:hover .icon{
  color: #ec6901;
}
.bordered-right{
  border-right: 1px solid #ccc;
  margin-bottom: 3rem;
}
.article-pre-content{
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 3rem;
}
</style>