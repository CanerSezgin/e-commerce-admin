import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import About from './views/About'
import Admin from './views/Admin'
import Auth from '@/components/auth/Auth'
import Dashboard from '@/views/Admin/Dashboard'
import notFound from '@/views/404';
import {store} from '@/store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '404'
    },
    {
      path: '/404',
      name: 'notFound',
      component: notFound,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: {
        requiresGuest: true
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        },
      ]
    },
  ]
})

// Nav Guards
router.beforeEach((to, from, next) => {
  // Check for requires AUTH guard
  if(to.matched.some(record => record.meta.requiresAuth)){
    // Check if NOT logged in
    if(!store.getters['users/loggedIn']){
      // Go to login page
      next({
        path: '/auth',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
  } 
  
  // Check for requires GUEST guard
  else if(to.matched.some(record => record.meta.requiresGuest)) {
    // Check if logged in 
    if(store.getters['users/loggedIn']){
      next({
        path: '/admin/dashboard',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
} 

else {
  // Proceed to route
  next();
}

})

export default router
