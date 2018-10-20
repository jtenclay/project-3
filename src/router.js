import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Post from './views/Post.vue'
import Edit from './views/Edit.vue'
import NewPost from './views/NewPost.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/@:user_handle',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/@:user_handle/:post_slug/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/@:user_handle/:post_slug',
      name: 'Post',
      component: Post
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'Signup',
      component: Signup
    }
  ]
})
