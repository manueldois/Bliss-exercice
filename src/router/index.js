import Vue from 'vue'
import VueRouter from 'vue-router'
import Loading from '../views/Loading'
import List from '../views/List'
import Share from '../views/Share'
import NoConnectivity from '../views/NoConnectivity'
import store from '../store'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'questions',
    component: List
  },
  {
    path: '/share',
    name: 'share',
    component: Share
  },
  {
    path: '/loading',
    name: 'loading',
    component: Loading
  },
  {
    path: '/no-connectivity',
    name: 'no-connectivity',
    component: NoConnectivity
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})



export default router
