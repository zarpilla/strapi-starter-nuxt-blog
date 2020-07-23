<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container-xl">
    
  <a class="navbar-brand" href="/">
    <img src="~/assets/images/logo_iap.png" alt="IAP" />
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>    
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" v-for="item in items" v-bind:key="item.id" v-bind:class="{ 'dropdown': item.items && item.items.length > 0 }">
        <nuxt-link v-if="!item.items || (item.items && item.items.length == 0)" class="nav-link" :to="item.href">{{item.text}}</nuxt-link>
        <a v-if="item.items && item.items.length > 0" class="nav-link dropdown-toggle" v-bind:target="item.same_tab ? '' : '_blank'" href="#" :v-bind:id="'navbarDropdown' + item.id" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{item.text}}
        </a>
        <div v-if="item.items && item.items.length > 0" class="dropdown-menu" v-bind:aria-labelledby="'navbarDropdown' + item.id">
          <a v-for="subitem in item.items" class="dropdown-item" v-bind:href="subitem.href" v-bind:key="subitem.id" v-bind:target="subitem.same_tab ? '' : '_blank'">
            {{ subitem.text }}
          </a>
        </div>
      </li>
      
    </ul>
    <ul class="navbar-nav">
        <li class="nav-item">
            <nuxt-link class="nav-link" :to="localePath('index', 'es')">ES</nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link class="nav-link" :to="localePath('index', 'en')">EN</nuxt-link>
        </li>
        <li class="nav-item">
            <font-awesome-icon icon="search" class="search" @click="viewSearch" />
        </li>
    </ul>
    
    <form class="form-inline my-2 my-lg-0" v-if="searchVisible">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
  </div>
  <!-- <pre>{{ items }}</pre> -->
</nav>
    
  
</template>

<script>

export default {
  data() {
    return {
      items: [],
      searchVisible: false
    }
  },
  async fetch() {
    let { data } = await this.$axios.get(`/menus?name=main_${this.$i18n.locale}`);
    //console.log('data', data)
    this.items = data[0].items
  },
  fetchOnServer: true,
  methods: {
    viewSearch() {
      this.searchVisible = true
    }
  }
}

</script>  
<style scoped>
nav{
  background-color: #fff;
}
.navbar-brand img{
  width: 180px;
}
.navbar-light .navbar-nav .nav-link{
  text-transform: uppercase;
  margin-left: 20px;  
  margin-right: 20px;  
}
.navbar-light .navbar-nav .nav-link:hover{
  /* color:orange; */
  color: #ec6901; 
}
.dropdown-toggle:after {
  display: none;
}
.dropdown-menu{
  box-shadow: 0px 4px 15px -6px rgba(0,0,0,0.75);
  border-radius: 2px;
  border:1px solid rgba(0,0,0,.1);
  left: 20px;
}
.dropdown-item{
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
}
.dropdown-menu a{
  color:rgba(0,0,0,.5);
  text-transform: uppercase;
}
.dropdown-menu a:hover{
  background: none;
  color: #ec6901;
}
</style>
