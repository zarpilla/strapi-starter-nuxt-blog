<template>
  <div>    
    <li v-for="category in categories" v-bind:key="category.id">
      <router-link class="uk-modal-close" :to="localePath({ name: 'categories-id', params: { id: category[slugField] }})" tag="a">{{ category[nameField] }}
      </router-link>
    </li>
  </div>
</template>

<script>

export default {
  data() {
    return {
      categories: [],
    }
  },
  async fetch() {
    let { data } = await this.$axios.get("/categories");
    this.categories = data
  },
  fetchOnServer: true,
  computed: {
    nameField() {
      return `name_` + this.$i18n.locale
    },
    slugField() {
      return `slug_` + this.$i18n.locale
    }
  }

}

</script>  
