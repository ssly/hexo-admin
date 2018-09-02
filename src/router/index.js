import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Config from '@/components/Config'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/config',
      name: 'Config',
      component: Config,
    },
  ]
})
