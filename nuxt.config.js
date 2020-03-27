export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: 'blue',
    height: '5px'
  },
  /*
   ** Global CSS
   */
  css: [
    // SCSS file in the project
    '@/styles/index.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/url.js',
    '~/plugins/vee-validate',
    '~/plugins/v-click-outside'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookiz', parseJSON: false }]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: 'http://localhost:805/api'
    baseURL: 'https://api.getagentreviews.com/api'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['vee-validate/dist/rules'],
    extend (config, ctx) {}
  },
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },
  layoutTransition: {
    name: 'fade',
    mode: 'out-in'
  },
  router: {
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      const findEl = async (hash, x) => {
        return (
          document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => {
              resolve(findEl(hash, ++x || 1))
            }, 100)
          })
        )
      }

      if (to.hash) {
        const el = await findEl(to.hash)
        if ('scrollBehavior' in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
        } else {
          return window.scrollTo(0, el.offsetTop)
        }
      }

      return { x: 0, y: 0 }
    }
  }
}
