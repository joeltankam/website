import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
import BlogPost from '../views/BlogPost.vue'
import About from '../views/About.vue'
import Privacy from '../views/Privacy.vue'
import OGImagePreview from '../views/OGImagePreview.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/post/:slug',
    name: 'BlogPost',
    component: BlogPost,
    props: true
  },
  // Only include OG preview route in development
  ...(import.meta.env.DEV ? [{
    path: '/og-preview',
    name: 'OGImagePreview',
    component: OGImagePreview
  }] : [])
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router