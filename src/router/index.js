import Vue from 'vue'
import Router from 'vue-router'
import Console from '@/components/Console'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:cmd',
      name: 'Console',
      component: Console
    },
    {
      path: '/:cmd/:args?',
      name: 'ConsoleWithArgs',
      component: Console,
      props (route) {}
    },
    {
      path: '/',
      redirect: '/whois/--user%2520\'Ole%2520Bittner\''
    }
  ]
})
