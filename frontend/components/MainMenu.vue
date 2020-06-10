<template>
  <div>    
    <pre>{{ items }}</pre>
  </div>
</template>

<script>

export default {
  data() {
    return {
      items: [],
    }
  },
  async fetch() {
    let { data } = await this.$axios.get(`/menus?name=main_${this.$i18n.locale}`);
    console.log('data', data)
    this.items = data[0].items
  },
  fetchOnServer: true
}

</script>  
