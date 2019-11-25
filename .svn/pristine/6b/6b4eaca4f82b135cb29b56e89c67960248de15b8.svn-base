import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Md5 from  'md5'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(ElementUI, { size: 'small' })
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.clear();
  }
  let user = JSON.parse(sessionStorage.getItem('user'));

  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
