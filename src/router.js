import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from "@/views/LoginPage.vue"
import HomePage from "@/views/HomePage.vue"
import UsersPage from "@/views/UsersPage.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      redirect: "/login"
    },
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage
    },
    {
      path: "/home",
      name: "HomePage",
      component: HomePage
    },
    {
      path: "/users",
      name: "UsersPage",
      component: UsersPage
    },
    {
      path: "/logout",
      name: "LogoutPage",
      redirect: "/login"
    }
  ]
})
