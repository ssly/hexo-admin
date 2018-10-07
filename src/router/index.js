import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Config from '@/components/Config'
import Edit from '@/components/EditPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:id?',
      name: 'Main',
      component: Main,
    },
    {
      path: '/config',
      name: 'Config',
      component: Config,
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
    },
  ]
})
