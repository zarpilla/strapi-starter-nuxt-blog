<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container-xl">
      <a class="navbar-brand" href="/">
        <img v-bind:src="api_url + img('main-logo')" alt="IAP" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li
            class="nav-item"
            v-for="(item, j) in items"
            v-bind:key="item.id"
            v-bind:class="{ 'dropdown': item.items && item.items.length > 0, 'show': mouseovered == j }"
            @mouseover="mouseOverItem(j)"
            @mouseleave="mouseLeaveItem(j)"
          >
            <nuxt-link
              v-if="!item.items || (item.items && item.items.length == 0)"
              class="nav-link"
              :to="item.href"
            >{{item.text}}</nuxt-link>
            <nuxt-link
              v-if="item.items && item.items.length > 0"
              class="nav-link dropdown-toggle"
              v-bind:target="item.same_tab ? '' : '_blank'"
              :to="item.href"
              :v-bind:id="'navbarDropdown' + item.id"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{item.text}}</nuxt-link>
            <div
              v-if="item.items && item.items.length > 0"
              class="dropdown-menu"
              v-bind:class="{ 'show': mouseovered == j }"
              v-bind:aria-labelledby="'navbarDropdown' + item.id"
            >
              <a
                v-for="subitem in item.items"
                class="dropdown-item"
                v-bind:href="subitem.href"
                v-bind:key="subitem.id"
                v-bind:target="subitem.same_tab ? '' : '_blank'"
              >{{ subitem.text }}</a>
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
          <!-- <li class="nav-item">
            <font-awesome-icon icon="search" class="search" @click="viewSearch" />
          </li>-->
        </ul>

        <!-- <form class="form-inline my-2 my-lg-0" v-if="searchVisible">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>-->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    images: Array,
  },
  data() {
    return {
      items: [],
      searchVisible: false,
      api_url: process.env.strapiBaseUri,
      mouseovered: -1
    };
  },
  async fetch() {
    let { data } = await this.$axios.get(
      `/menus?name=main_${this.$i18n.locale}`
    );
    this.items = data[0].items;
  },
  computed: {
    image_() {
      return `image_` + this.$i18n.locale;
    }    
  },
  fetchOnServer: true,
  methods: {
    viewSearch() {
      this.searchVisible = true;
    },
    img(key) {
      return this.images.find((t) => t.key == key)
        ? this.images.find((t) => t.key == key)[`image_` + this.$i18n.locale]
            .url
        : "";
    },
    mouseOverItem(index) {
      if (window.innerWidth > 780) {
        this.mouseovered = index
      }      
    },
    mouseLeaveItem(item) {
      this.mouseovered = -1
    }
  },
};
</script>  
<style scoped>
nav {
  background-color: #fff;
}
.navbar-brand img {
  width: 180px;
}
.navbar-light .navbar-nav .nav-link {
  text-transform: uppercase;
  margin-left: 20px;
  margin-right: 20px;
}
.navbar-light .navbar-nav .nav-link:hover {
  /* color:orange; */
  color: #ec6901;
}
.dropdown-toggle:after {
  display: none;
}
.dropdown-menu {
  box-shadow: 0px 4px 15px -6px rgba(0, 0, 0, 0.75);
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  left: 20px;
  max-width: calc(100vw - 30px);
}
.dropdown-item {
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  white-space: none;
}
.dropdown-menu a {
  color: rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
}
.dropdown-menu a:hover {
  background: none;
  color: #ec6901;
}
@media (min-width: 768px) {
  .dropdown-item {
    white-space: nowrap;
  }
}
</style>
