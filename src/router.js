import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Product from './views/Product.vue'
import Order from './views/Order.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/dashboard',
    component: Dashboard
  },  
  {
    path: '/product/:id',
    component: Product,
    props: true
  }, {
    path: '/transaction/product/:id',
    component: Order,
    props: true
  },  {
    path: '/',
    component: Home
  }
]
})


export default router;
