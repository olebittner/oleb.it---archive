import Vue from 'vue'
import Router from 'vue-router'
import Console from '@/views/Console.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/imprint',
      redirect: '/cat/imprint_final_2_newfinal_final_version.txt'
    },
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
