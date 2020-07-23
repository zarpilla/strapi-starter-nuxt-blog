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
        <div class="col-md-9">
          <div class="form">
            <div class="form-group">
              <div class="row more-form">
                <div class="col-md">
                  <input type="text" class="form-control" placeholder="Enter Field 1" />
                </div>
                <div class="col-md">
                  <input type="text" class="form-control" placeholder="Enter Field 1" />
                </div>
                <div class="col-md">
                  <input type="text" class="form-control" placeholder="Enter Field 1" />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row more-form">
                <div class="col-md">
                  <input type="text" class="form-control" placeholder="Enter Field 1" />
                </div>
                <div class="col-md">
                  <input type="text" class="form-control" placeholder="Enter Field 1" />
                </div>
                <div class="col-md">
                  <input type="text" class="form-control" placeholder="Enter Field 1" />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row more-form">
                <div class="col-md-8">
                  <input type="text" class="form-control" placeholder="Enter Field 1" />
                </div>
                <div class="col-md">
                  <button type="submit" class="button">Send Message</button>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row more-form">
                <div class="col-md-5">
                  <input type="checkbox" class="checkbox" />
                  <label class="checkbox-label" for="checkbox1">
                    He leido y acepto las
                    <a class="conditions" href="/">condiciones de uso</a>
                  </label>
                </div>
                <div class="col-md">
                  <input type="checkbox" class="checkbox" />
                  <label
                    class="checkbox-label"
                    for="checkbox2"
                  >Marque esta casilla si desea que le contactemos por via telefónica</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="info">
            <font-awesome-icon class="icon" icon="map-marker-alt" />
            <div class="info-text" v-html="$md.render(t('contact-address'))"></div>
            <div class="info-phone">
              <font-awesome-icon class="icon" icon="phone-alt" />
              <div class="info-phone-num" v-html="$md.render(t('contact-phone'))">
            </div>
            </div>
          </div>
        </div>
        <div class="col-md-9 hidden-xs">
          <div class="color-bar"></div>
        </div>
        <div class="col-md-3 hidden-xs">
          <div class="color-bar active"></div>
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
.form {
  background: #efefef;
  padding: 30px;
  margin-bottom: 30px;
}
.form-control {
  border: 0;
  border-radius: 0;
  margin-bottom: 30px;
}
.form-group {
  margin-bottom: 0px;
}
.button {
  border: 0;
  border-radius: 0;
  background-color: #ec6901;
  padding: 0.45rem 3rem;
  text-transform: uppercase;
  color: #fff;
  font-size: 1rem;
}
.checkbox-label {
  color: #aaa;
}
.info {
  background: #ec6901;
  color: #fff;
  padding: 30px;
  box-shadow: 0px 4px 15px -6px rgba(0,0,0,0.75);
}
.checkbox-label a {
  color: #ec6901;
}
.info .icon{
  font-size: 30px;
}
.info-text{
  margin: 20px 0 40px;
}
.info-phone-num{
  font-size: 1.3rem;
  font-weight: bold;
  display: inline-block;
  margin-left: 20px;
}
.color-bar{
  background: #efefef;
  height: 3px;
  width: 100%;
}
.color-bar.active{
  background: #ec6901;
}
</style>
