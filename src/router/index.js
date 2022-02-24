import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExamView from '@/views/ExamView.vue'
import ExamItemView from '@/views/ExamItemView.vue'
import UserMeView from '@/views/UserMeView.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior () { return { x: 0, y: 0 } },
  routes: [
    { path: '/auth/register', name: 'register', component: () => import('@/views/AuthRegister.vue') },
    { path: '/auth/login', name: 'login', component: () => import('@/views/AuthLogin.vue') },
    { path: '/site', name: 'site', component: () => import('@/views/SiteView.vue') },
    { path: '/user/me', name: 'dashboard', component: UserMeView },
    { path: '/my-exam', name: 'my exam', component: () => import('@/views/MyExamView.vue') },
    { path: '/exam/:id', component: ExamItemView, children: [
      { path: 'do', name: 'exam do', component: () => import('@/views/ExamDoView.vue') },
      { path: 'edit', name: 'exam edit', component: () => import('@/views/ExamEditView.vue') },
    ] },
    { path: '/exam/new', name: 'exam new', component: () => import('@/views/ExamNew.vue') },
    { path: '/exam', name: 'exam', component: ExamView },
    { path: '/', name: 'home', component: HomeView }
  ]
})

export default router
