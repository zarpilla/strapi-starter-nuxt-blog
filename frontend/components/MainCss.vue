<template>
<style type="text/css">
  {{ css }}
</style>  
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {  
  computed: {    
    css() {
      return (
        this.texts &&
        this.texts.length > 0 &&
        this.texts.find((t) => t.key == "css")[`text_` + this.$i18n.locale]
      );
    },
    ...mapGetters({
      texts: "texts/get",
    }),
  },  
};
</script>  
<style scoped>
</style>
