import db from './datastore'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './plugins/andt-design-vue'
import './plugins/vue-lazyload'
import createdInit from './core/createdInit'

import { errorCaptured } from './utils/assist'

Vue.prototype.$db = db
Vue.prototype.$errorCaptured = errorCaptured

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  created () {
    createdInit()
  },
  template: '<App/>'
}).$mount('#app')

const welcome = document.getElementById('welcome')
const welcomeImg = welcome.querySelector('.welcome-img')
// 一秒之后添加fade动画
setTimeout(() => {
  welcomeImg.classList.add('fade')
}, 100)

// 动画运行完成了以后移除元素
welcomeImg.addEventListener('webkitAnimationEnd', () => {
  Vue.nextTick(() => {
    document.body.removeChild(welcome)
  })
})
