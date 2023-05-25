import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/view/MainView.vue'
import ManagementView from '@/view/ManagementView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainView',
      component: MainView
    },
    {
      path: '/management',
      name: 'ManagementView',
      component: ManagementView
    }
  ]
})
