<template>
  <div>
    <div class="block" v-if="block" v-bind:class="block.css ? block.css : 'z'">
      <h2 v-if="block.title" class="text-center normal-title">{{ block.title }}</h2>
      <div
        v-if="block.description"
        class="ztext-center description normal-text"
        v-html="$md.render(block.description)"
      ></div>

      <div class="row categories">
        <router-link
          v-for="item in sortedItems"
          :to="item.href"
          class="col-12 col-category"
          :key="item.id"
        >
          <div class="category">
            <div class="row">
              <div
                class="col col-image"
                v-bind:style="{ backgroundImage: 'url(' + api_url + item.image.url + ')' }"
              >
                <div class="col-image-inner">
                  <img v-bind:src="api_url + item.icon.url" />
                </div>
                
              </div>
            </div>
            <div class="row category-body">
              <div class="col-1 identifier">
                {{item.identifier}}                
              </div>
              <div class="col-5 title">
                {{item.title}}
              </div>
              <div class="col-6 desc">                
                {{item.description}}
                <a v-if="item.href" class="call-to-action" v-bind:href="item.href" v-t="'discover'"></a>
              </div>
            </div>
          </div>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: Object,
    slug: String,
  },
  data() {
    return {
      api_url: process.env.strapiBaseUri,      
    };
  },
  computed: {
    sortedItems() {
      return this.block.items.sort((a, b) => (a.identifier > b.identifier) ? 1 : -1)
    }
  },
  // async fetch() {
  //   let { data } = await this.$axios.get(
  //     `/pages/?parent.slug_${this.$i18n.locale}=${this.slug}`
  //   );
  //   this.children = data;
  // },
  // fetchOnServer: true,
  methods: {
    categoryImage(category) {
      return category[this.slider_] &&
        category[this.slider_].length > 0 &&
        category[this.slider_][0].image
        ? category[this.slider_][0].image.url
        : "";
    },
  },
};
</script>  
<style lang="less" scoped>
.block h2 {
  margin-bottom: 3rem;
  font-weight: bold;
}
.block .description {
  margin-bottom: 3rem;
}
a:hover .category{
  text-decoration: none;
}
.category-body {
  background: #efefef;
  margin-bottom: 30px;
  padding: 60px 20px 30px;
}
.col-image {
  height: 300px;
  background-size: cover;
}
.col-image-inner {
  background: #fff;
  width: 100px;
  height: 100px;
  position: absolute;
  top:150px;
  left: 50px;
  border-radius: 50%;
  box-shadow: 0px 4px 15px -6px rgba(0,0,0,0.75);
}
.col-image-inner img{
  width: 50px;
  height: 50px;
  margin: 25px;
}
.identifier{
  font-size: 50px;
  color: #ec6901;
  font-weight: 800;
  text-decoration: none;
  line-height: 50px;
}
.title{
  font-size: 50px;
  color: #fff;
  font-weight: 800;
  text-decoration: none;
  text-transform: uppercase;
  line-height: 50px;
}
.desc{
  color:#666666;
}
a:hover{
  text-decoration: none;
}
.call-to-action{
  color: #ec6901;  
  border-color: #ec6901;
}
</style>
