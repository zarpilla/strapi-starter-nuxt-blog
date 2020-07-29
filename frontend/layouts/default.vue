<template>
  <div>
    <main-css />
    <main-menu :images="images" />
    <nuxt />
    <main-footer :images="images" />    
  </div>
</template>

<script>
import MainMenu from '~/components/MainMenu'
import MainCss from '~/components/MainCss'
import MainFooter from '~/components/MainFooter'


export default {
  components: {
    MainMenu, MainFooter, MainCss
  },
  data() {
    return {
      images: []
    }
  },
  
  async fetch() {
    var { data } = await this.$axios.get(`/images`);    
    this.images = data

    var { data } = await this.$axios.get(`/texts`);    
    this.$store.commit('texts/set', { data })

  },
  fetchOnServer: true,
}

</script>  
