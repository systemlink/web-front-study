window.onload = ->
  Vue = require('vue')
  VueRouter = require('vue-router')
  Validator = require("vue-validator");
  Vue.use VueRouter
  Vue.use Validator
  Top = require('./component/top.vue')
  Proposals = require('./component/proposals.vue')
  Places = require('./component/places.vue')
  routes = [
    {
      path: '/proposals'
      component: Proposals
    }
    {
      path: '/places'
      component: Places
    }
  ]
  router = new VueRouter(
    mode: 'history'
    routes: routes)
  app = new Vue(
    router: router,
    render: (h) -> h(Top)
  ).$mount('#app')
  return
