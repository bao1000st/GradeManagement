import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/CreateStudentComponent'),
  },
  {
    path: '/view_students',
    name: 'view_students',
    component: () => import('../components/ListStudentComponent'),
  },
  {
    path: '/edit_student/:id',
    name: 'edit_student',
    component: () => import('../components/EditStudentComponent'),
  },
  {
    path: '/create_grade/:id',
    name: 'create_grade',
    component: () => import('../components/CreateGradeComponent'),
  },
  {
    path: '/edit_grade/:id',
    name: 'edit_grade',
    component: () => import('../components/EditGradeComponent'),
  },
  {
    path: '/view_grades',
    name: 'view_grades',
    component: () => import('../components/ListGradeComponent'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
