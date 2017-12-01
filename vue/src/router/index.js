import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import goods from '@/components/goods'
import know from '@/components/know'
import list from '@/components/list'
import detail from '@/components/detail'
import product from '@/components/product'
import prodetail from '@/components/prodetail'
import section from '@/components/section'
import search from '@/components/search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: home
    },
    {
      path:"/goods",
      component: goods
    },
    {
      path:"/know",
      component: know,
      children:[
      {
        path:"list",
        component: list
      },
      {
        path:"detail",
        component: detail
      },
      {
        path:"*",
       component: list
      }]

    },
    {
      path:"/product",
      component: product,
      children:[
      { 
        path:"prodetail",
        component: prodetail
      }]
     }
     ,
     {
         path:"/section",
         component: section
     },
     {
      path:"/search",
      component:search
     },
    {
    	path:'*',
    	redirect:"/home"
    }
  ]
})
