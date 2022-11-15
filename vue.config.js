const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/caoff-vote/' : '/'
})
