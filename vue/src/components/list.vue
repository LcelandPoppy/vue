<template>
  <div id="list">
  <ul  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="0"
  infinite-scroll-immediate-check ="false">
  <li v-for="data in lanlist" @click="zyclick(data.id)">
     <p>{{data.title}}</p>
  <img :src="data.picture"/>
  </li>
  </ul>
  <div>{{text}}</div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {
  name: 'list',
  data(){
    return {
     lanlist:[],
     limit:10,
     text:"请耐心等候",
     offset:10,
     total:57
    }
  },
 mounted(){
  axios.get("/know/list?version=3",{
   limit:this.limit,
   offset:this.offset
  }).then(res=>{
  console.log(res);
  this.lanlist=res.data.items;
  })
 },
 methods:{
 zyclick(id){
    router.push(`/know/detail?id=${id}`);
 },
   loadMore(){
      console.log("到底部");

      this.offset=this.offset+10;

      if(this.offset>this.total){
        this.loading = true; //禁用滚动加载功能
        this.text="没有数据了，每天接着逛..."
        return ;
      }

      axios.get("/know/list?version=3",{
         limit:this.limit,
         offset:this.offset
        }).then(res=>{
        console.log(res);
        this.lanlist=[...this.lanlist,...res.data.items];
        })
    }
  
  
 }
}
</script>

<style lang="scss" scoped>
#list {
width:100%;
   ul{
   width:100%;
    li{
    margin-top:20px;
    p{
      margin-left:20px;
      font:700 14px/18px "";
    }
      img{
      width:90%;
      margin:20px;
      }
    }
   }
  
}
</style>
