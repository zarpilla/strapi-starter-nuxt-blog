<template>
  <div>
    <div class="block" v-if="block" v-bind:class="block.css ? block.css : 'z'">
      <h2 v-if="block.title" class="text-center normal-title">{{ block.title }}</h2>
      <div
        v-if="block.description"
        class="ztext-center description normal-text"
        v-html="$md.render(block.description)"
      ></div>

      <div class="row contact">
        <div class="col">
          <iframe v-bind:src="block.href" width="100%" height="500" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: Object,
    slug: String,
    texts: Array,
  },
  data() {
    return {
      api_url: process.env.strapiBaseUri,
    };
  },
  computed: {
    sortedItems() {
      return block.items;
    },
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
    t(key) {
      return this.texts.find((t) => t.key == key)
        ? this.texts.find((t) => t.key == key)[`text_` + this.$i18n.locale]
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
iframe{
  margin-bottom: 30px;
  max-height: 80vh;
}
</style>
