export default {
  mode: 'universal',
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
        href:
          'https://fonts.googleapis.com/css?family=Inter:400,500,600&display=swap'
      }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '~/assets/styles/reset.scss',
    '~/assets/styles/base.scss',
    '~/assets/styles/highlight.scss',
    '~/assets/styles/app.scss'
  ],
  styleResources: {
    scss: ['~/assets/styles/tokens.scss']
  },
  plugins: [
    { src: '~/plugins/vue-placeholders', mode: 'client' },
    { src: '~/plugins/vue-observe-visibility', mode: 'client' }
  ],
  buildModules: ['@nuxtjs/eslint-module'],
  modules: [
    '@nuxtjs/svg',
    '@nuxtjs/style-resources',
    [
      'nuxt-ackee',
      {
        server: 'https://nuxt-ackee.herokuapp.com',
        domainId: 'f7ace8af-fb9d-4c87-b00e-0f400f8b87b8'
      }
    ]
  ],
  build: {
    extend(config, ctx) {}
  }
}
