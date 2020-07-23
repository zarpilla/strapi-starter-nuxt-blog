<template>
  <div>
    <div class="block" v-if="block" v-bind:class="block.css ? block.css : 'z'">
      <h2 class="text-center normal-title">{{ block.title }}</h2>
      <p
        v-if="block.description"
        class="ztext-center description normal-text"
        v-html="$md.render(block.description)"
      ></p>
    </div>

    <slick-carousel
      class="container-xl"
      v-if="block.items && block.items.length > 0"
      v-bind="settings"
    >
      <div v-for="item in block.items" v-bind:key="item.id" class="wrapper-image zcol-md-4">
        <h2 class="title title-a text-center">{{ item.title }}</h2>
        <div class="mouseovered-text text-center animate__animated animate__fadeIn">
          
          <div class="mouseovered-content">
            <h2 class="title titleover text-center">{{ item.title }}</h2>
            <div class="text text-center">{{ item.description }}</div>
          </div>
          <div class="overlay"></div>
        </div>
        <div class="overlay-0"></div>
        <img v-if="item.image" v-bind:src="api_url + item.image.url" />
      </div>
    </slick-carousel>
  </div>
</template>

<script>
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  props: {
    block: Object,
  },
  data() {
    return {
      api_url: process.env.strapiBaseUri,
      settings: {
        dots: true,
        dotsClass: "slick-dots custom-dot-class",
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arows: true,
      },
    };
  },
  mounted() {},
};
</script>  
<style scoped>
.block h2 {
  margin-bottom: 3rem;
  font-weight: bold;
}
.block .description {
  margin-bottom: 3rem;
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
  color: #ffffff;
  font-size: 0.9rem;
  height: 100%;
  display: none;
  align-items: center;
  padding: 0 20px;
}

.active .mouseovered-text {
  display: flex;
}
.active .title-a {
  display: none;
}

.block-item .mouseovered-text .titleover {
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 30px;
}
.wrapper-image {
  padding: 0 20px;
  position: relative;
}
.slick-slide img {
  max-width: 100%;
}
.wrapper-image h2.title {
  position: absolute;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
  width: calc(100% - 40px);
  top: calc(50% + 0.6rem);
  z-index: 10;
}
.wrapper-image:hover h2.title {
  display: none;
}
.wrapper-image .mouseovered-text h2.title {
  position: relative;
  display: block;
  top: auto;
  width: calc(100% - 40px);
  text-align: center;
  margin-top: 50px;
}
.wrapper-image:hover h2.title {
  position: relative;
  width: 100%;
}
.wrapper-image .mouseovered-text {
  display: none;
  position: absolute;
  width: calc(100% - 40px);
  height: 100%;
  color: #fff;
  font-size: 0.9rem;
  top: 0px;
}
.wrapper-image .mouseovered-text .overlay{
 position: absolute; 
 width: 100%;
  height: 100%;
  top: 0px;
  left:0;
  background: #ec6901;
  opacity: 0.8;
  z-index: 5;
}

.wrapper-image .overlay-0{
  position: absolute; 
 width: calc(100% - 40px);
  height: 100%;
  top: 0px;
  left:20px;
  background: #000;
  opacity: 0.6;
  z-index: 5;
}
.wrapper-image:hover .overlay-0{
  display: none;
}

.wrapper-image:hover .mouseovered-text {
  display: flex;
}
.wrapper-image .mouseovered-text .text {
  padding: 0 40px;
}
.mouseovered-content{
  z-index: 10;
}
</style>
<style>
.slick-prev:before,
.slick-next:before {
  color: #ec6901;
  font-size: 40px;
}
.slick-prev,
.slick-next {
  width: 40px;
  height: 40px;
  z-index: 100;
}
.slick-prev {
  left: -18px;
}
.slick-next {
  right: -18px;
}
.slick-dots {
  bottom: 15px;
  left: 0;
}
.slick-slider {
  padding-bottom: 40px;
}
.slick-dots li {
  width: 100px;
  height: 5px;
  background: #ccc;
  margin-right: 10px;
  margin-left: 10px;
}
.slick-dots li.slick-active {
  background: #ec6901;
}
.slick-dots li button:before {
  display: none;
}
</style>
