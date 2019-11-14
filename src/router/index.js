import Vue from 'vue'
import VueRouter from 'vue-router'
import Loading from '../views/Loading'
import List from '../views/List'

// import store from '../store'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    component: List
  },
  {
    path: '/loading',
    name: 'loading',
    component: Loading
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log({to, from})
//   next()
// })

export default router
