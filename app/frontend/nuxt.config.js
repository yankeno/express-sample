export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Smart Spend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/apexcharts', ssr: false },
    { src: '@/plugins/vuetify', ssr: false },
    { src: '@/plugins/vue-toast-notification', ssr: false },
    { src: '@/plugins/vue-slider-component', ssr: false },
    { src: '~/plugins/vee-validate', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
  ],
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: false,
          user: { url: '/api/auth/user', method: 'get', propertyName: false },
          // user: false,
        },
        tokenRequired: true,
        tokenType: 'bearer',
      },
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://localhost:3000/v1',
    proxy: true,
    credentials: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true,
    },
  },

  proxy: {
    '/api/': {
      target: `${process.env.API_URL}`,
      pathRewrite: { '^/api/': `/${process.env.API_VERSION}/` },
      changeOrigin: true,
    },
  },

  watchers: {
    webpack: {
      ignored: /node_modules/,
      poll: true,
    },
  },

  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
};
