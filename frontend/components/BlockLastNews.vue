<template>
  <div class="block">
        <h2 v-if="block.title" class="text-center normal-title">{{ block.title }}</h2>
      <div
        v-if="block.description"
        class="ztext-center description normal-text"
        v-html="$md.render(block.description)"
      ></div>
    <div class="container-xl">
      <div class="row row-cols-md-3 articles">
        <router-link
          v-for="(article, i) in articles"
          :to="localePath({ name: 'articles-id', params: { id: article[slug_] } })"
          class="article col-md"
          v-bind:class="{ 'article-active' : mouseovered == i}"
          :key="article.id"          
        >
          <div class="article-inner" 
            @mouseover="mouseovered = i"
            @mouseleave="mouseovered = -1">
            <!--  -->
            <div class="article-content">
              <h2 class="article-title">{{ article[title_] }}</h2>
              <div class="article-desc">{{excerpt(article)}}</div>
              <div class="article-more" v-t="'read-more'">
              </div>
              <div class="article-date">
                {{ $moment(article[published_at_]).format('DD/MM/YYYY') }}
              </div>
            </div>
            <div class="article-image-container animate__animated animate__fadeIn" v-if="mouseovered == i">
                <img :src="api_url + article.image.url" alt height="100" />
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      api_url: process.env.strapiBaseUri,
      mouseovered: -1,
      articles: []
    };
  },
  props: {
    texts: Array,
    block: Object
  },
  async fetch() {
    let { data } = await this.$axios.get(`/articles-published/?lang=${this.$i18n.locale}`);
    this.articles = data.filter((d, i) => i < 9);
  },
  fetchOnServer: true,
  computed: {
    slug_() {
      return `slug_` + this.$i18n.locale;
    },
    title_() {
      return `title_` + this.$i18n.locale;
    },
    name_() {
      return `name_` + this.$i18n.locale;
    },
    published_at_() {
      return `published_at_` + this.$i18n.locale;
    }
  },
  methods: {
    excerpt(article) {
      const content = article[`content_` + this.$i18n.locale];
      const len = 150;
      return content.length > len
        ? article[`content_` + this.$i18n.locale].substr(0, 150) + "..."
        : content;
    }
  }
};
</script>
<style scoped>
.block h2 {
  margin-bottom: 3rem;
  font-weight: bold;
}
.block .description {
  margin-bottom: 3rem;
}
.article {
  border: 1px solid #ccc;  
  min-height: 400px;
  text-decoration: none;
  position: relative;
}
.article-inner{
  padding: 2rem 5rem;
  display: flex;
}
.article-content {
  color: #666;
  z-index: 10;
  position: relative;
}
.article-title {
  color: #666;
  z-index: 10;
  position: relative;
}
.article-desc {
  color: #888;
  margin-top: 20px;
}
.article-date, .article-more {
  color: #666;
  margin-top: 20px;
  display: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
}
.article-more {
  color: #ec6901;
}
.article-active .article-content, .article-active .article-title, .article-active .article-desc, .article-active .article-date {
  color:#fff!important;
}
.article-active .article-date, .article-active .article-more{
  display: block;
}

/* .article:nth-child(n+1) {
border-left: 0;
}
.article:nth-child(n+2) {
border-left: 0;
}
.article:nth-child(n+3) {
border-left: 0;
border-right: 0;
} */
.article:nth-child(n) {
  border-left: 0;
}
.article:nth-child(3n) {
  border-right: 0;
}
.article:nth-child(3n + 1) {
  border-bottom: 0;
}
.article:nth-child(3n + 2) {
  border-bottom: 0;
}
.article:nth-child(3n + 3) {
  border-bottom: 0;
}
.article-image-container{
  position: absolute;
  position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
.article-image-container img{
  max-width: 100%;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
