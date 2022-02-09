import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExamView from '@/views/ExamView.vue'
import ExamItemView from '@/views/ExamItemView.vue'
import UserMeView from '@/views/UserMeView.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior () { return { x: 0, y: 0 } },
  routes: [
    { path: '/auth/register', component: () => import('@/views/AuthRegister.vue') },
    { path: '/auth/login', component: () => import('@/views/AuthLogin.vue') },
    { path: '/site', component: () => import('@/views/SiteView.vue') },
    { path: '/user/me', component: UserMeView },
    { path: '/my-exam/', component: () => import('@/views/MyExamView.vue') },
    { path: '/exam/:id', component: ExamItemView, children: [
      { path: 'do', component: () => import('@/views/ExamDoView.vue') },
      { path: 'edit', component: () => import('@/views/ExamEditView.vue') },
    ] },
    { path: '/exam/new', component: () => import('@/views/ExamNew.vue') },
    { path: '/exam', component: ExamView },
    { path: '/', component: HomeView }
  ]
})

export default router
