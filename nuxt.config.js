import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  mode: 'universal',
  server: {
    port: 3000
  },
  /*
  ** Headers of the page
  */
  head: {
    title: "JumpLiner",
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: "jumplinker短网址可缩短各种网址快速链接分发并拥有强大的流量统计功能为用户提供大数据支持,专业完善的统计报表功能可在线查看让您专注推广提高效率降低成本"
      },
      {name: "keywords", content: "短网址,网址缩短,商用短网址,活码,短地址,微信活码,短链接,短网址生成,推广统计,jumplinker短网址"}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'},
      {rel: 'stylesheet', href: 'https://at.alicdn.com/t/font_1113745_givda82597s.css'},//阿里icon设置
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl',
    '~/assets/style/transition.css',
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/style/comment.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/element.js', ssr: false},//UI框架
    {src: '@/plugins/vuetify'},//UI
    {src: '~/plugins/echarts.js', ssr: false},//可视化数据插件
    {src: '~/plugins/utils.js', ssr: false},//自定义工具箱
    {src: '~/plugins/velocity', ssr: false},
    {src: '~/plugins/touchSupport', ssr: false}
  ],
  router: {
    middleware: ['Auth'],
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
