<template>
  <div>
    <div class="block" v-if="block" v-bind:class="block.css ? block.css : 'z'">
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
}
.block .description{
  margin-bottom: 3rem;
}</style>
