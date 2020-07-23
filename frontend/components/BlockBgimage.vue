<template>
  <div>
    <div class="block" v-if="block" v-bind:class="block.css ? block.css : 'z'" v-bind:style="{ lineHeight: block.image.height + 'px', height: block.image.height + 'px', backgroundImage: 'url(' + api_url + block.image.url + ')' }">
      <h2 v-if="block.title" class="text-center normal-title">{{ block.title }}</h2>
      <div v-if="block.description" class="ztext-center description normal-text" v-html="$md.render(block.description)"></div>      
    </div>
  </div>

  
</template>

<script>
export default {
  props: {
    block: Object
  },
  data() {
    return {
      api_url: process.env.strapiBaseUri
    };
  }
};
</script>  
<style lang="less" scoped>
.block h2 {
  margin-bottom: 3rem;
  font-weight: bold;
  line-height: inherit;
  text-align: center;
}
.block .description{
  margin-bottom: 3rem;
}
.block{
  background-repeat: no-repeat;
  background-size: cover;
}
.block.text-white h2{
  color: #fff;
}
</style>
