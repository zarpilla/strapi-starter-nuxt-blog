import en from './lang/en'
import es from './lang/es'

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  env: {
    strapiBaseUri: process.env.API_URL || "http://localhost:1337"
  },

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css",
      }
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js', body: true },
      { src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', body: true },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js', body: true }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    // "uikit/dist/css/uikit.min.css",
    // "uikit/dist/css/uikit.css",    
    'vue-slick-carousel/dist/vue-slick-carousel.css',
    'vue-slick-carousel/dist/vue-slick-carousel-theme.css',
    "@assets/css/main.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    //{ src: "~/plugins/uikit.js", ssr: false }
    { src: '~plugins/vue-slick-carousel.js', ssr: true },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/apollo",
    "@nuxtjs/markdownit",
    "@nuxtjs/axios",
    "nuxt-i18n",
    "nuxt-fontawesome",
    'nuxt-moment'
  ],
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: (process.env.API_URL || "http://localhost:1337") + "/graphql"
      }
    }
  },
  axios: {
    // extra config e.g
    // BaseURL: 'https://link-to-API'
    baseURL: (process.env.API_URL || "http://localhost:1337")
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { },
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    }
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en' // Will be used as catchall locale by default
      },
      {
        code: 'es',
        iso: 'es-ES'
      }],
    defaultLocale: 'es',
    vueI18n: {
      fallbackLocale: 'en',
      messages: { en: en, es: es }
    },
    strategy: 'prefix_except_default',
    seo: true
    // parsePages: false,
    // pages: {
    //   'categories/_id': { 
    //     en: '/category/:id',
    //     es: '/categoria/:id',
    //   },       
    // },
  },
  fontawesome: {
    imports: [
      //import whole set
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ]
  }
};
