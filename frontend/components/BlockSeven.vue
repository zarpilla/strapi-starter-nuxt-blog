<template>
  <div>    
    <div class="block" v-if="block" v-bind:class="block.css ? block.css : 'z'">
      <h2 v-if="block.title" class="text-center normal-title">{{ block.title }}</h2>
      <div v-if="block.description" class="ztext-center description normal-text" v-html="$md.render(block.description)"></div>      
      
      <div class="row categories">
        <router-link
          v-for="(category, i) in block.items"
          :to="category.href"
          class="category zcol-md-3"          
          v-bind:class="categoryClass(i)"
          :key="category.id"                    
          v-bind:style="{ backgroundImage: 'url(' + api_url + ( category.image ? category.image.url : '' ) + ')' }"
        >
          <div class="category-block"
          @mouseover="mouseovered = i"
          @mouseleave="mouseovered = -1"
          v-bind:class="( mouseovered == i ? 'category-active' : 'z' )"
          >
            <div class="title">
              {{ category.title }}
            </div>
            <div class="title-number" v-if="mouseovered != i">
              {{ category.identifier }}
            </div>
            <div class="title-icon" v-if="mouseovered == i">
              <img alt="" v-if="category.icon" v-bind:src="api_url + category.icon.url" />
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
      mouseovered: -1
    };
  },
  props: {
    block: Object
  },
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
    categoryClass(i) {
      if (i % 7 == 0) return 'col-md-2 grey-block'
      if (i % 7 == 1) return 'col-md-4'
      if (i % 7 == 2) return 'col-md-2 grey-block'
      if (i % 7 == 3) return 'col-md-4'
      if (i % 7 == 4) return 'col-md-3 grey-block'
      if (i % 7 == 5) return 'col-md-6'
      if (i % 7 == 6) return 'col-md-3 grey-block'
    },
    catNumber(i) {
      if (i < 10) return '0'+ (i+1)
      return i+1
    },
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
.block .description{
  margin-bottom: 3rem;
}
a.category{
  width: 100%;
  height: 300px;
  border: 1px solid #fff;  
  text-decoration: none;
  display: inline-block;
  background-size:cover;
  background-repeat: no-repeat;
}
a.category .title{
  margin-top: 30px;
  margin-left: 20px;
  color:#fff;
  font-size: 1.3rem;
  font-weight: bold;
  text-decoration: none;
}
a.category.grey-block{
  background: #575757!important;
}
.category-block{
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  position: absolute;
}
.category-block.category-active{
  background: #ec6901;
}
a.category .title-number{
  margin-top: 30px;
  margin-left: 20px;
  color:#fff;
  font-size: 4.5rem;
  font-weight: bold;
  text-decoration: none;
}
.row.categories{
  margin-right: 0px;
  margin-left: -1px;
}
.title-icon{
  margin-left: 20px;
  margin-top: 30px;
}
</style>
