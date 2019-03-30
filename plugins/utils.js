import Vue from 'vue'
import * as Utils from '../utils/index'
import Code from '../utils/code'
let $utils = {
  install (Vue) {
    Vue.prototype.$utils = Utils
  }
}
let $code = {
  install (Vue) {
    Vue.prototype.$code = Code
  }
}
Vue.use($utils)
Vue.use($code)
