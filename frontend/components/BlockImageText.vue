<template>
  <div
    class="block-image-text"
    v-bind:class="block.css ? block.css : 'z'"
    v-bind:style="{ backgroundImage: 'url(' + api_url + ( block.image ? block.image.url : '' ) + ')' }"
  >
    <div class="container-white hidden-xs"></div>
    <div class="container-xl">
      <div class="row">
        <div class="col-md col-left">
          <!-- <img v-if="block.image" class="image-100" v-bind:src="api_url + block.image.url" /> -->
        </div>
        <div class="col-md col-right bg-white">
          <div class="right-block">
            <template>
              <div
                class="max-width-text content"
                v-if="block.description"
                v-html="$md.render(block.description)"
              ></div>
            </template>
            <a v-if="block.css && block.css.includes('has-call-to-action')" class="call-to-action" v-bind:href="block.href" v-t="'discover'"></a>
          </div>
        </div>
      </div>
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
.block .description {
  margin-bottom: 3rem;
}

.block-c .block-item {
  height: 200px;
  background: #efefef;
  display: block;
}
.block-c .block-item img {
  margin-top: 20px;
  margin-left: 20px;
  border: 2px solid #ec6901;
  border-radius: 50%;
  padding: 10px;
  width: 70px;
  height: 70px;
}
.block-c a.block-item h2.title {
  color: #575757;
  text-align: left;
  margin-left: 20px;
  font-size: 1.1rem;
  font-weight: bold;
}
.block-c a.block-item .rel {
  position: relative;
  bottom: auto;
  margin-top: 20px;
}
.block-c a.block-item:hover {
  background: #ec6901;
  color: #fff;
  text-decoration: none;
}
.block-c a.block-item:hover h2.title {
  color: #fff;
}
.block-c a.block-item img path {
  stroke: #fff;
}
.block-image-text {
  position: relative;
}
.container-white {
  position: absolute;
  width: 50%;
  height: 100%;
  right: 0;
  background: #fff;
}
.right-block {
  padding-left: 50px;
  padding-right: 50px;
}
.call-to-action{
  text-decoration: none;
}
.reverse-order .col-left{
  order: 1;
}
.reverse-order .col-right{
  order: 0;
}
.reverse-order .container-white{
  right: auto;
  left: 0;
}
</style>
