import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '../components/home'
import iMessage from '../components/iMessage'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: 'home'},
    {path: '/home', component: home},
    {path: '/iMessage', component: iMessage}
  ],
  linkActiveClass: 'active'
})

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
