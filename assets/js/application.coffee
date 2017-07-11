global.Vue = require 'vue'
global.VueRouter = require 'vue-router'
Vue.use VueRouter
Foo = template: '<div>foo</div>'
Bar = template: '<div>bar</div>'
routes = [
  {
    path: '/'
    component: Vue.extend(require "./pages/top/index")
  }
  {
    path: '/foo'
    component: Foo
  }
  {
    path: '/bar'
    component: Bar
  }
]
router = new VueRouter(routes: routes)
app = new Vue(router: router).$mount('#app')
