<template>
  <footer class="footer">
    <div class="container-xl" v-if="texts && texts.length > 0">
      <div class="row">
        <div class="col-md">
          <a class="zbrand" href="/">
            <img class="image-iap" v-bind:src="api_url + img('footer-logo')" alt="" />        
          </a>
          <img class="image-min" v-bind:src="api_url + img('footer-logo-2')" alt="" />
        </div>
        <div class="col-md">
          <h5 v-if="footer2.text">{{footer2.text}}</h5>
          <a class="menu-item" v-for="item in footer2.items" v-bind:key="item.id" v-bind:href="item.href" v-bind:target="item.same_tab ? '' : '_blank'">
            {{ item.text }}
          </a>
        </div>
        <div class="col-md address" v-if="t('address-detail') != ''">
          <h5 v-html="t('address')"></h5>
          <div class="more" v-html="$md.render(t('address-detail'))" />
        </div>
        <div class="col-md" v-if="t('address-detail') != ''">
          <h5 v-html="t('phones')"></h5>
          <div class="more" v-html="$md.render(t('phones-detail'))" />
        </div>
      </div>
      <div class="row second">
        <div class="col-md-3">
          <div class="more" v-html="t('copyright')" />
        </div>
        <div class="col-md-6 policy">
          <a v-for="item in footer1.items" v-bind:key="item.id" v-bind:href="item.href" target="_blank">
            {{ item.text }}
          </a>
        </div>
        <div class="col-md-3 social">
          <a v-for="item in social.items" v-bind:key="item.id" v-bind:href="item.href" target="_blank">
            <font-awesome-icon class="icon" :icon="['fab', item.text]" />
          </a>          
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    images: Array
  },
  data() {
    return {
      //texts: [],
      social: {},
      footer1: {},
      footer2: {},
      api_url: process.env.strapiBaseUri,
    };
  },
  computed: mapGetters({
    texts: 'texts/get'
  }),
  async fetch() {    
    var { data } = await this.$axios.get(`/menus?name=social_${this.$i18n.locale}`);       
    this.social = data[0];
    var { data } = await this.$axios.get(`/menus?name=footer1_${this.$i18n.locale}`);       
    this.footer1 = data[0];
    var { data } = await this.$axios.get(`/menus?name=footer2_${this.$i18n.locale}`);       
    this.footer2 = data[0];    
  },
  fetchOnServer: true,
  methods: {
    t(key) {
      return this.texts.find(t => t.key == key)
        ? this.texts.find(t => t.key == key)[`text_` + this.$i18n.locale]
        : "";
    },
    img(key) {
      return this.images.find((t) => t.key == key)
        ? this.images.find((t) => t.key == key)[`image_` + this.$i18n.locale].url
        : "";
    },
  }
};
</script>  
<style scoped>
.footer {
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: #323639;
  color: #ddd;
  padding-top: 20px;
  font-size: 0.9rem;
}
.navbar-brand img {
  max-width: 100%;
  max-height: 40px;
}
h5 {
  font-size: 1rem;
  font-weight: bold;
}
.second {
  border-top: 1px solid #ddd;
  padding-top: 30px;
  padding-bottom: 30px;
}
.policy a{
color: #ddd;
margin-right: 30px;  
}
.social a{
color: #ddd;
margin-right: 30px;  
font-size: 1.2rem;
}
.image-iap {  
}
.image-min {
  display: block;
  margin-top: 10px;
  margin-bottom: 20px;
}
h5{
color: #ddd;  
}
.menu-item{
  display: block;
  color: #ddd;
}
</style>
