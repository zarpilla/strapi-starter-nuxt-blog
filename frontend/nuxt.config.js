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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
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
        href: "https://fonts.googleapis.com/css?family=Staatliches"
      }
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
    "uikit/dist/css/uikit.min.css",
    "uikit/dist/css/uikit.css",
    "@assets/css/main.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/uikit.js", ssr: false }],
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
    "nuxt-i18n"
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
    seo: true
    // parsePages: false,
    // pages: {
    //   'categories/_id': { 
    //     en: '/category/:id',
    //     es: '/categoria/:id',
    //   },       
    // },
  }
};
