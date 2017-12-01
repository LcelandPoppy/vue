<template>
  <div id="detail" v-if="info" >
  <p>{{info.title}}</p>
  <div v-html='`${info.content}`' id="tu"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'detail',
  data(){
  return {
    info:null
  }
  },
  mounted(){
     console.log(this.$route.query.id);
     axios.get(`/know/${this.$route.query.id}?version=3`).then(res=>{
         console.log(res);
         this.info=res.data;
         // if(this.info){
         //   var odiv=document.getElementById("tu");
         //   odiv.getElementsTagName("img").style.width="100%";
         // }
     })
  }
}
</script>

<style lang="scss" scoped>
#detail {
     #tu{
      width:98%;
      padding:5px;
      p{
        width:100%;
        img{
        width:100%;
      }
      }
      
   }  
 
   
}
</style>
