<template>
  <div class="block-c" v-bind:class="block.css ? block.css : 'z'">
        <div class="block" v-if="block.__component == 'items-block.items-block'" >
          <h2 class="text-center normal-title">{{ block.title }}</h2>          
        </div>
        <div class="row" v-if="block.__component == 'items-block.items-block'">
          <div v-for="(item, j) in block.items" v-bind:key="item.id" class="col-md">            
            <nuxt-link :to="item.href ? item.href : '/'"
              class="block-item"
              @mouseover="mouseovered2 = j"
              @mouseleave="mouseovered2 = -1"
              v-bind:class="{ 'active' : mouseovered2 == j }"
            >
              <div class="icon-inner">
                <img class="z" v-if="item.image || item.icon" v-bind:src="api_url + ( item.image ? item.image.url : item.icon.url) " alt />
              </div>                
                <h2 class="title title-c rel">{{ item.title }}</h2>
                <p v-if="item.description" class="desc rel">{{ item.description }}</p>
            </nuxt-link>              
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
      api_url: process.env.strapiBaseUri,
      mouseovered2: -1
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
}

.block-c .block-item{
  height: 265px;
  background: #efefef;  
  display: block;
  margin-bottom: 20px;
  position: relative;
}
.block-c .block-item .icon-inner{  
  border:2px solid #ec6901;
  border-radius: 50%;  
  width: 100px;
  height: 100px;
  position: absolute;  
  top:50px;
  left:50px;
}
.block-c .block-item .icon-inner img{
  width: 50px;
  height: 50px;
  margin: 25px;
}
.block-c a.block-item h2.title{
  color:#575757;
  text-align: left;
  margin-left: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 170px;
  padding-left: 30px;
  // position: absolute;  
  // bottom:50px;
  // left:30px;  
}
.block-c a.block-item .desc{
  color:#575757;
  font-size: 1rem;  
  padding-left: 50px;  
}

.block-c a.block-item .rel{
  position: relative;
  bottom: auto;
  margin-top: 20px;  
}
.block-c a.block-item:hover {
  background: #ec6901;
  color:#fff;
  text-decoration: none;
  box-shadow: 0px 4px 15px -6px rgba(0,0,0,0.75);
}
.block-c a.block-item:hover h2.title{
  color:#fff;
}
.block-c a.block-item:hover .desc{
  color:#fff;
}
.block-c .block-item:hover .icon-inner{  
  border-color:#fff;
}
.block-c a.block-item img path{
  stroke: #fff;
}
</style>
