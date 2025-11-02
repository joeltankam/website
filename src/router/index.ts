import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Landing from '../views/Landing.vue'
import Blog from '../views/Blog.vue'
import BlogPost from '../views/BlogPost.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Landing
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/post/:slug',
    name: 'BlogPost',
    component: BlogPost,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router