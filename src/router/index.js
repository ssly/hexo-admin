import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/components/create'
import Edit from '@/components/EditPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/create',
      name: 'create',
      component: Create,
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
    },
  ]
})
