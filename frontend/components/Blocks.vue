<template>
  <div>
    
    <div v-for="block in blocks" v-bind:key="block.id" class="blocks">

      <div v-if="block.__component == 'items-block.items-block' && block.type == 'Carousel'" class="container-xl blocks block-a">
        <block-carousel :block="block"></block-carousel>
      </div>

      <div v-if="block.__component == 'block.block' && block.type == 'Text'" class="container-xl blocks block-text">        
        <block-text :block="block"></block-text>
      </div>
      
      <div v-if="block.__component == 'block.block' && block.type == 'Bgimage'" class="blocks block-bgimage">        
        <block-bgimage :block="block"></block-bgimage>
      </div>

      <div v-if="block.__component == 'items-block.items-block' && block.type == 'Goto'" class="container-xl blocks block-goto">
        <block-goto :block="block"></block-goto>
      </div>

      <div v-if="block.__component == 'items-block.items-block' && block.type == 'SevenItems'" class="blocks block-seven-items">        
        <block-seven :block="block"></block-seven>
      </div>

      <div v-if="block.__component == 'block.block' && block.type == 'ImageText'" class="block-block block-b">
        <block-image-text :block="block"></block-image-text>
      </div>

      <div v-if="block.__component == 'items-block.items-block' && block.type == 'Children'" class="container-xl block-block block-children">
        <block-children :block="block" :slug="slug"></block-children>
      </div>

      <div v-if="block.__component == 'items-block.items-block' && block.type == 'Columns'" class="block-block block-b">
        <block-columns :block="block"></block-columns>
      </div>

      <div v-if="block.__component == 'block.block' && block.type == 'ContactForm'" class="container-xl block-block block-contact">
        <block-contact :block="block" :texts="texts"></block-contact>
      </div>

      <div v-if="block.__component == 'block.block' && block.type == 'Map'" class="block-block block-contact">
        <block-map :block="block" :texts="texts"></block-map>
      </div>

      <div v-if="block.__component == 'block.block' && block.type == 'LastNews'" class="block-block block-contact">        
        <block-last-news :block="block" :texts="texts"></block-last-news>
      </div>
      
      
    </div>
  </div>
</template>

<script>
import BlockCarousel from './BlockCarousel'
import BlockText from './BlockText'
import BlockBgimage from './BlockBgimage'
import BlockGoto from './BlockGoto'
import BlockSeven from './BlockSeven'
import BlockImageText from './BlockImageText'
import BlockChildren from './BlockChildren'
import BlockColumns from './BlockColumns'
import BlockContact from './BlockContact'
import BlockMap from './BlockMap'
import BlockLastNews from "./BlockLastNews"

export default {
  components: {
    BlockCarousel, BlockText, BlockBgimage, BlockGoto, BlockSeven, BlockImageText, BlockChildren, BlockColumns, BlockContact, BlockMap, BlockLastNews
  },
  props: {
    blocks: Array,
    slug: String
  },
  data() {
    return {
      api_url: process.env.strapiBaseUri,
      mouseovered: -1,
      mouseovered2: -1,
      texts: []
    };
  },
  async fetch() {
    var { data } = await this.$axios.get(`/texts`);
    this.texts = data;    
  },
  fetchOnServer: true,
  // methods: {
  //   t(key) {
  //     return this.texts.find(t => t.key == key)
  //       ? this.texts.find(t => t.key == key)[`text_` + this.$i18n.locale]
  //       : "";
  //   }
  // }
};
</script>  
<style scoped>
.block h2 {
  margin-top: 8rem;
  margin-bottom: 5rem;
  font-weight: bold;
}
.block-item {
  position: relative;
  padding-bottom: 20px;
}
.block-item img {
  max-width: 100%;
}
.block-item .title {
  position: absolute;
  bottom: 35px;
  width: 100%;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
}
.block-item .block-overlay {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.6;
  position: absolute;
}
.block-item.active .block-overlay {
  opacity: 0.4;
}
.block-item .block-line {
  width: 100%;
  height: 13px;
  position: absolute;
  background: #ccc;
  bottom: -10px;
  z-index: 10;
}
.block-item.active .block-line {
  background: #ec6901;
}
.block-item .mouseovered-text {  
  position: absolute;
  color: #fff;
  font-size: 0.9rem;
  height: 100%;
  display: none;
  align-items: center;
  padding: 0 20px;
}
.block-item.active .mouseovered-text {  
  display: flex;
}
.block-item.active .title-a {  
  display: none;
}

.block-item .mouseovered-text .titleover {
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 30px;
}
.block-block {
  margin-top: 100px;
}
.iap-image {
  width: 300px;
  margin-bottom: 50px;
}
.image-100 {
  max-width: 100%;
}
.max-width-text {
  max-width: 50vw;
}
.right-block {
  max-width: 50vw;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-top: 60px;
  padding-top: 60px;
  padding-bottom: 60px;
}
.right-block .call-to-action {
  border: 2px solid #ec6901;
  color: #ec6901;
  text-decoration: none;
}
.blocks{  
  overflow: hidden;
}
</style>
