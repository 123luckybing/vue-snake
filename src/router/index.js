import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/game',
      name: 'Game',
      component: Game
    }
  ]
})
