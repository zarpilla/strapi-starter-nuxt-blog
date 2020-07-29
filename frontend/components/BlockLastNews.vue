<template>
  <div class="block" v-bind:class="block.css ? block.css + ' ' + layout : layout">
    <h2 v-if="block.title" class="text-center normal-title">{{ block.title }}</h2>
    <div
      v-if="block.description"
      class="ztext-center description normal-text"
      v-html="$md.render(block.description)"
    ></div>
    <div class="container-xl">
      <div class="row zrow-cols-md-3 articles" v-bind:class="columnsCss">
        <router-link
          v-for="(article, i) in articles"
          :to="localePath({ name: 'articles-id', params: { id: article[slug_] } })"
          class="article col-md"
          v-bind:class="{ 'article-active' : mouseovered == i}"
          :key="article.id"
        >
          <div class="article-inner" @mouseover="mouseovered = i" @mouseleave="mouseovered = -1">
            <img
              class="layout-article-image"
              v-if="article.image && layout == 'layout-article'"
              :src="api_url + article.image.url"
              alt
            />

            <div class="list-article-content">
              <h2 class="article-title">{{ article[title_] }}</h2>
              <div class="article-desc" v-html="(excerpt(article))"></div>
              <div class="article-more" v-t="'read-more'"></div>
              <div
                class="article-date"
                v-if="layout != 'layout-article'"
              >{{ $moment(article[published_at_]).format('DD/MM/YYYY') }}</div>
            </div>
            <div
              class="article-image-container animate__animated animate__fadeIn"
              v-if="mouseovered == i && layout != 'layout-article'"
            >
              <img v-if="article.image" :src="api_url + article.image.url" alt height="100" />
            </div>

          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      api_url: process.env.strapiBaseUri,
      mouseovered: -1,
      articles: [],
    };
  },
  props: {
    texts: Array,
    block: Object,
    limit: Number,
    columnsCss: String,
    layout: String,
  },
  async fetch() {
    let { data } = await this.$axios.get(
      `/articles-published/?lang=${this.$i18n.locale}`
    );
    this.articles = data.sort((a, b) => (a['published_at_'+this.$i18n.locale] < b['published_at_'+this.$i18n.locale]) ? 1 : -1).filter((d, i) => i < this.limit);
    //return this.block.items.sort((a, b) => (a.identifier > b.identifier) ? 1 : -1)
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
    },
  },
  methods: {
    excerpt(article) {
      const content = article[`content_` + this.$i18n.locale].replace(/#/g, "");
      const len = 150;
      return content.length > len ? content.substr(0, 150) + "..." : content;
    },
  },
};
</script>
<style scoped>
.block {
  margin-bottom: 3rem;
}
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
.article-inner {
  padding: 2rem 5rem;
  display: flex;
}
.list-article-content {
  color: #666;
  z-index: 10;
  position: relative;
}
.article-title {
  color: #575757;
  z-index: 10;
  position: relative;
  font-weight: normal !important;
}
.article-desc {
  color: #666;
  margin-top: 20px;
}
.article-date,
.article-more {
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
.article-active .list-article-content,
.article-active .article-title,
.article-active .article-desc,
.article-active .article-date {
  color: #fff !important;
}
.article-active .article-date,
.article-active .article-more {
  display: block;
}

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
.article-image-container {
  position: absolute;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.article-image-container img {
  max-width: 100%;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
<style lang="less" scoped>
.layout-article {
  
  .normal-title{
    margin-top: 0.5rem;
  }
  .article {
    border: 0;
    margin-bottom: 3rem;
  }
  .article-inner {
    padding: 0;
    display: block;
  }
  .layout-article-image {
    width: 100%;
  }
  .article-date,
  .article-more {
    display: block;
  }

  .article-active .article-title {
    color: #575757 !important;
  }
  .article-desc{
    font-size: 0.9rem;
  }
  .article-active .list-article-content,
  .article-active .article-title,
  .article-active .article-desc,
  .article-active .article-date {
    color: #666 !important;
  }
  h2.article-title {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .article-more {
    text-transform: none;
    font-size: 0.9rem;
  }
  .article-more::after {
    content: ">";
    padding-left: 1rem;
  }
}
</style>