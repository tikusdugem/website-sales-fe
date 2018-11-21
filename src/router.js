import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from "@/views/LoginPage.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing page',
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login page",
      component: LoginPage
    }
  ]
})
