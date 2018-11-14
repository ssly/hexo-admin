import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/components/article-page'
import Index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/article/:id?',
      component: Create,
    },
  ]
})
