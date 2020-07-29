<template>
  <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel" v-if="data">        
    <ol class="carousel-indicators" v-if="data.length > 1">
      <li
        data-target="#carouselExampleCaptions"
        v-for="(slide, i) in data"
        v-bind:key="slide.id"
        v-bind:data-slide-to="i"
        class="active"
      ></li>
    </ol>
    <div class="carousel-inner">
      <div class="zzz">
        <div
          class="carousel-item"
          v-for="(slide, i) in data"
          v-bind:key="slide.id"
          v-bind:class="{ 'active' : i == 0 }"
        >
          <img v-if="slide.image" v-bind:src="api_url + slide.image.url" class="d-block w-100" alt />
          <div class="carousel-caption zd-none zd-md-block">
            <div class="container-xl">
              <div class="xbreadcrumb" v-if="page && page.parent">
                <nuxt-link :to="page.parent[slug_]">
                  {{ page.parent[title_] }}
                </nuxt-link>
                
                <span class="sep">&gt;</span>
                {{ page[title_] }}
              </div>
              <h1>{{ slide.title }}</h1>
              <a v-if="slide.href" class="call-to-action" v-bind:href="slide.href" v-t="'discover'"></a>
            </div>            
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-follow">
      <div class="container-xl">
        <div class="float-left">{{ social.text }}</div>
        <div class="float-left line"></div>
        <div class="float-left">
          <a v-for="item in social.items" v-bind:key="item.id" v-bind:href="item.href" target="_blank">
            <font-awesome-icon class="icon" :icon="['fab', item.text]" />
          </a>        
        </div>
      </div>      
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    social: Object,
    page: Object
  },
  data() {
    return {
      api_url: process.env.strapiBaseUri
    };
  },
  computed: {
    slug_() {
      return `slug_` + this.$i18n.locale;
    },
    title_() {
      return `title_` + this.$i18n.locale;
    },
  },
};
</script>  
<style scoped>
.carousel-item {
  max-height: 80vh;
}
.carousel-caption {
  width: 100%;
  top: 170px;
  left:0;
  text-align: left;
}
.carousel-caption h1 {
  font-size: 60px;
  font-weight: bold;
  color:#fff;
}
.carousel-indicators {
  justify-content: right;
}
.carousel-indicators li {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 20px;
}
.carousel-caption .call-to-action {
  border: 2px solid #fff;
  padding: 12px 28px;
  text-transform: uppercase;
  color: #fff;
  font-size: 1rem;
  margin-top: 50px;
  display: inline-block;
  text-decoration: none;
}
.carousel-follow {
  position: absolute;
  width: 100%;
  bottom: 30px;
  left: 0;
  text-transform: uppercase;
  color: #fff;
  font-size: 0.8rem;
  width: 100%;
  z-index: 20;
}
.carousel-follow .line{
  width: 100px;
  height: 1px;
  background: #fff;
  vertical-align: 10px;
  margin: 8px 20px 0 20px;
}
.carousel-follow .icon{
  margin-right: 20px;
  color: #fff;
  font-size: 1rem;
}
.xbreadcrumb{
  font-size: 0.9rem;    
}
.xbreadcrumb a{
  color:#fff
}
.sep{
  padding: 0 15px;
}
@media (max-width: 768px) {
  .carousel-caption {
    bottom: auto;
    top:50px;
  }
  .carousel-caption h1{
    font-size: 26px;
  }
  .carousel-caption .call-to-action{
    display: none;
  }
  .carousel-indicators{
    display: none;
  }
}


</style>
