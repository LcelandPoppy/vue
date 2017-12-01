<template>
  <div id="home">
  <top></top>
      <swipe class="my-swipe" v-if="bannerlist">
        <swipe-item v-for="data in bannerlist"><img :src="data.picture"/></swipe-item>
      </swipe>
      <!-- 小图标 -->
      <div class="icon">
      <ul class="list"><li v-for="data in iconlist" @click="zyclick(data.id)"><img :src="data.picture"/><h4>{{data.name}}</h4></li></ul>
      <img src="http://img.1000mo.cn/2017/11/11/571bbe95-ccd2-45da-a040-14df935efb52.gif" class="activityAdOne-img">
      </div>
      <!-- 水果知识 -->
      <router-link tag="div" to="/know/list" class="language">
           <img src="../assets/langusge.png"/>
          <div class="swiper-container" >
          <!-- //swiper-wrapper 就包裹所有轮播的页面 -->
          <div class="swiper-wrapper">
              <div class="swiper-slide" v-if="wordlist" v-for="data,index in wordlist" v-swipe="index" style="height:20px;">
                {{data.title}}
              </div>    
          </div>
          <!-- //加上下面这个div 就是加上分页器 -->
          <div class="swiper-pagination"></div>
      </div>


      </router-link>






     <!--  <router-link tag="div" to="/know/list" class="language">
          <img src="../assets/langusge.png"/>
      <swipe class="word-swipe" v-if="wordlist" dirction="vertical">
        <swipe-item v-for="data in wordlist">{{data.title}}</swipe-item>
      </swipe>
      </router-link> -->
     <!--  图片 -->
      <div class="pic">
       <img v-for="data in piclist" :src="data.picture" @click="sclick(data.id)"/>
      </div>
     <!--  集市 -->
      <div class="jishi">
           <img src="../assets/jishi.png" class="head"/>
           <ul>
              <li v-for="data in jishilist" @click="idclick(data.id)"><img :src="data.recommendPicture"/></li>
           </ul>
      </div>
      <!-- 人气 -->
      <div class="renqi">
          <img src="../assets/renqi.png" class="top"/>
          <ul>
              <li v-for="data in renqilist" @click="idclick(data.id)"><img :src="data.recommendPicture"/></li>
           </ul>
      </div>
      <!-- 喜欢 -->
      <div class="like">
         <img src="../assets/like.png" class="top"/>
           <ul v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="0"
  infinite-scroll-immediate-check ="false">
             <li v-for="data in likelist"  @click="idclick(data.id)">
             <img :src="data.mainPicture"/>
             <p class="x_title">{{data.name}}<span>{{data.sellNum}}人付款</span></p>
             <h4>[{{data.shop.name}}]</h4>
             <h3>{{data.price}}元/{{data.unit}}<span>{{data.unitPrice}}</span></h3>
             </li>
           </ul>
           <div>{{text}}</div>
      </div>
  </div>
</template>

<script>
import top from "@/components/top"
import 'vue-swipe/dist/vue-swipe.css';
import axios from "axios";
import { Swipe, SwipeItem } from 'vue-swipe';
import router from "@/router";
export default {
  name: 'home',
  data(){
    return {
       bannerlist:[],
       iconlist:[],
       wordlist:[],
       piclist:[],
       jishilist:[],
       renqilist:[],
       likelist:[],
       limit:10,
       offset:10,
       total:60,
       text:"亲！请稍后，一大批水果君赶来..."
    }
  },
  components: {
    'swipe': Swipe,
    'swipe-item': SwipeItem,
    top:top
  },
  mounted(){
    // 轮播
    axios.get("/market/n2lo7y7m/ad/banners?version=3").then(res=>{
     this.bannerlist=res.data.items;
    }),
    // 小图标
    axios.get("/market/n2lo7y7m/categorys?version=3").then(res=>{
     this.iconlist=res.data.items;
    }),
    // 水果知识
    setTimeout(() => {
          axios.get("/know/list?version=3").then(res=>{
           console.log(res.data.items);
           this.wordlist=res.data.items;
          }) 
    }, 2000),
    // 图片
    axios.get("/market/n2lo7y7m/sections?version=3").then(res=>{
     console.log(res);
    this.piclist=res.data.items;
    }),
    // 集市
    axios.get("/market/n2lo7y7m/home/products?type=0&expand=shop&select=*,shop.*&version=3").then(res=>{
     console.log(res);
    this.jishilist=res.data.items;
    }),
    // 人气
    axios.get("/market/n2lo7y7m/home/products?type=1&expand=shop&select=*,shop.*&version=3").then(res=>{
     console.log(res);
    this.renqilist=res.data.items;
    }),
    // 喜欢
    axios.get("/market/n2lo7y7m/guess/products?expand=shop&select=*,shop.*&version=3",{
    params:{
      limit:this.limit,
      offset:this.offset
    }
    }).then(res=>{
     console.log(res.data.items);
     this.likelist=res.data.items;
    })

  },
  methods:{
  idclick(id){ 
    console.log(id);
     router.push(`/product/prodetail?id=${id}`);
    },
    sclick(id){
       console.log(id);
     router.push(`/section?id=${id}`);
     axios.get(`/section/${id}?version=3`).then(res=>{
       this.$store.commit("titlechange",res.data.name);
     });
    },
  zyclick(id){
    // console.log(id);
    router.push(`/goods?id=${id}`);
    axios.get(`/category/${id}?version=3`).then(res=>{
       this.$store.commit("titlechange",res.data.name);
     });
  },
   loadMore(){
      console.log("到底部");

      this.offset=this.offset+10;

      if(this.offset>this.total){
        this.loading = true; //禁用滚动加载功能
        this.text="没有数据了，每天接着逛..."
        return ;
      }

      axios.get("/market/n2lo7y7m/guess/products?expand=shop&select=*,shop.*&version=3",{
    params:{
      limit:this.limit,
      offset:this.offset
    }
    }).then(res=>{
     console.log(res.data.items);
     this.likelist=[...this.likelist,...res.data.items];
    })
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
  img{
     width:100%;
  }
}
.icon{
margin-left:20px;
	.list{
	
  li{
  float:left;
  margin-bottom:10px;
  width:20%;
   list-style:none;
    img{
              width:50%;
              height:50%;
            }
  }
	   
	}
  .activityAdOne-img{
    width:100%;
  }
}

 
.language{
   
  .swiper-container{
    margin-left:20px;
    height:20px;
    .swiper-wrapper{
      height:20px;
    }

  }
  .swiper-slide{
       height:20px;
       margin-left:30px;
       // line-height: 20px;
    }
	width:100%;
	height:50px;
	img{
	   width:10%;
	   float:left;
	   margin-left:20px;

	}
	.word-swipe {
	  width:70%;
	  height:30px;
	  font-size: 14px;
	  text-align: center;
	  margin-top:10px;
}
} 
.pic{
height:200px;
	img{
	  width:33%;
	  float:left;
	}
}
.jishi{
width:100%;
   .head{
      width:60%;
      vertical-align: baseline;
      display:block;
      margin:auto;
   }
   ul{
      li{
        img{
         width:100%;
        }
      }
   }
}
.renqi{
	width:100%;
   .top{
      width:60%;
      vertical-align: baseline;
      margin:auto;
       display:block;
   }
   ul{
      li{
        img{
         width:100%;
        }
      }
   }
}
.like{
	width:100%;
	.top{
	   width:60%;
      vertical-align: baseline;
      margin:auto;
        display:block;
	}
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
	     font:18px/24px "";
	     color:red;
	     span{
	       font:12px/24px "";
	       color:gray;
	     }
	     }
	  }
	}
}
}
</style>
