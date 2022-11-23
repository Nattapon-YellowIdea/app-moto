import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/register',
    name: 'Register Page',
    component: () => import('../views/register/Form.vue')
  },
  {
    path: '/register/success',
    name: 'Register Success Page',
    component: () => import('../views/register/Success.vue')
  },
  {
    path: '/form-3',
    name: 'Register form 3',
    component: () => import('../views/form/form3.vue')
  },
  {
    path: '/form-3-success',
    name: 'Register form 3 Success',
    component: () => import('../views/form/form3-success.vue')
  },
  {
    path: '/form-2',
    name: 'Register form 2',
    component: () => import('../views/form/form2.vue')
  },
  {
    path: '/form-2-success',
    name: 'Register form 2 Success',
    component: () => import('../views/form/form2-success.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
