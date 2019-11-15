import Vue from 'vue'
import VueRouter from 'vue-router'
import Loading from '../views/Loading'
import Questions from '../views/Questions'
import Question from '../views/Question'
import Share from '../views/Share'
import NoConnectivity from '../views/NoConnectivity'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/questions'
  },
  {
    path: '/questions',
    name: 'questions',
    component: Questions
  },
  {
    path: '/questions/:id',
    name: 'question',
    component: Question,
    props: true
  },
  {
    path: '/share',
    name: 'share',
    component: Share,
    props: (route) => ({ content_url: route.query.content_url, type: route.query.type })
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
