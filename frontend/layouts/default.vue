<template>
  <div>
    <main-menu />
    <nuxt />
    <main-footer />
  </div>
</template>

<script>
import MainMenu from '~/components/MainMenu'
import MainFooter from '~/components/MainFooter'

export default {
  components: {
    MainMenu, MainFooter
  },
  data() {
    return {
    }
  },    
}

</script>  
