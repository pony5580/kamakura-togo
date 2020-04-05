import colors from 'vuetify/es5/util/colors'
import { createClient } from 'contentful'
import { getConfigForKeys } from './lib/config.js'
const ctfConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN',
])

const cdaClient = createClient({
  space: ctfConfig.CTF_SPACE_ID,
  accessToken: ctfConfig.CTF_CDA_ACCESS_TOKEN,
})

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
    },
    titleTemplate: '%s - KAMAKURA TO-GO',
    title: 'KAMAKURA TO-GO',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '鎌倉地域でテイクアウト対応しているお店のまとめです。',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'KAMAKURA TO-GO',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://kamakura-togo.firebaseapp.com/',
      },
      { hid: 'og:title', property: 'og:title', content: 'KAMAKURA TO-GO' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '鎌倉地域でテイクアウト対応しているお店のまとめです。',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://kamakura-togo.firebaseapp.com/ogp.jpg',
      },
      {
        hid: 'msapplication-TileColoe',
        property: 'msapplication-TileColoe',
        content: '#da532',
      },
      {
        hid: 'theme-coloe',
        property: 'theme-coloe',
        content: '#ffffff',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/sanitize'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['~/lib/api'],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  generate: {
    routes() {
      return cdaClient
        .getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        })
        .then((entries) => {
          return [...entries.items.map((entry) => `/store/${entry.sys.id}`)]
        })
    },
    extractCSS: true,
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    extractCSS: true,
  },
  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: ctfConfig.CTF_BLOG_POST_TYPE_ID,
  },
}
