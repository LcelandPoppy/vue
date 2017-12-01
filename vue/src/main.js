// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from "./store"
Vue.use(MintUI)

Vue.config.productionTip = false

Vue.directive("swipe",{
 inserted(el,binding,vnode){
   console.log(vnode.context.wordlist);
   if(binding.value==vnode.context.wordlist.length-1){
     console.log("所有的dom 都创建完了，做swiper初始化");

     var swiper = new Swiper('.swiper-container',{
     	   direction:"vertical",
           // pagination: '.swiper-pagination', //初始化 分页器
           // paginationClickable: true, //分页器可以点击
           loop: true,
           autoplay:true,
           speed:3000
       });
   }
 }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
