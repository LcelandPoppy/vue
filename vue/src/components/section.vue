<template>
   <div id="section">
     <div class="top">
       <router-link tag="span" to="/home">返回</router-link>
       <b>{{titlechange}}</b>
     </div>
     <div class="lie">
     <ul>
     <li>上市时间</li>
     <li>销量优先</li>
     <li>价格</li>
     </ul>
     </div>
     <div class="list">
     <ul>
      <li v-for="data in guolist" @click="zyclick(data.id)">
              <img :src="data.mainPicture"/>
              <p class="x_title">{{data.name}}<span>{{data.sellNum}}人付款</span></p>
              <h4>[{{data.shop.name}}]</h4>
              <h3>{{data.price}}元/{{data.unit}}<span>{{data.unitPrice}}</span></h3>
              </li>
     </ul>


     </div>
   </div>


</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import router from "@/router";
export default {
  name: 'section',
  data(){
   return {
      guolist:[]
      // title:"水果列表"
   }
  },
  methods:{
    zyclick(id){
      router.push(`/product/prodetail?id=${id}`);
    }
  },
  computed:{
    // ...mapState(["title"])
     titlechange(){
      return this.$store.state.title
    }

  },
  mounted(){
  console.log(this.$route.query.id)
  axios.get(`/market/section/${this.$route.query.id}/products?expand=shop&select=*,shop.*&orderBy=0&version=3`).then(res=>{
     console.log(res);
     this.guolist=res.data.items;
  })
  }
}
</script>

<style lang="scss" scoped>
#section{
	.top{
	 width:100%;
	     position:fixed;
	     left:0;
	     top:0;
	     z-index:4;
	     height:53px;
	     background:#eee;
	     span{
	       font:18px/53px "";
	       margin-left:10px;
	     }
	     b{
	       font:22px/53px "";
	       margin-left:25%;
	     }
	  }
	  
	  .lie{ 
	     
	    ul{
	    width:100%;
	     position:fixed;
	     left:0;
	     top:53px;
	     z-index:4;
	     height:40px;
	     background:#fff;
	       li{
	           float:left;
	           list-style:none;
	           text-align:center;
	           height:40px;
	           width:33%;
	           font:18px/40px "";
	       }
	    }
	  }
	  .list{
	  margin-top:93px;
	  ul{
	  width:100%;
	    li{
	      width:50%;
	      float:left;
	      list-style:none;
	      margin-bottom:10px;
	       img{
	          width:100%;
	          height:200px;
	       }
	       .x_title{
	         font:700 12px/24px "";
	       width:100%;
	       span{
	        color:gray;
	        float:right;
	       }
	       }
	       h4{
	       margin-left:20px;
	       }
	       h3{
	       font:16px/24px "";
	       color:red;
	       span{
	         font:8px/24px "";
	         color:gray;
	         overflow: hidden;
	       }
	       }
	    }
	  }
	  }
}
</style>