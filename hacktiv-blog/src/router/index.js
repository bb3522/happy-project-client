import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import FavoritesPage from '../views/FavoritesPage.vue'
import DetailPostPage from '../views/DetailPostPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesPage
    },
    {
      path: '/posts/:postId',
      name: 'post',
      component: DetailPostPage
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if ((to.name === 'register' || to.name === 'login') && isAuthenticated) next({ name: 'home' })
  else if ((to.name === 'favorites') && !isAuthenticated) next({ name: 'home' })
  else next()
})

export default router

