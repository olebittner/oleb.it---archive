import Vue from 'vue'
import Router from 'vue-router'
import Console from '@/views/Console.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:cmd',
      name: 'Console',
      component: Console
    },
    {
      path: '/:cmd/:args?',
      name: 'ConsoleWithArgs',
      component: Console
    },
    {
      path: '/',
      redirect: '/whois/--user%2520\'Ole%2520Bittner\''
    }

  ]
})
