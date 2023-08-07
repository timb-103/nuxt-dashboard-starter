// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['nuxt-mongodb-auth', 'nuxt-simple-css', 'nuxt-rate-limit'],

  // customize the theme
  nuxtSimpleCSS: {
    accent: '#000',
  },

  // customize rate limits (we'll make it stricter for /register)
  nuxtRateLimit: {
    routes: {
      '/api/mongodb-auth/register': {
        maxRequests: 5,
        intervalSeconds: 10,
      },
    },
  },
})
