//vue虚拟滚动条，提高页面性能
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import Vue from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'

Vue.component('RecycleScroller', RecycleScroller)
