<template>
<div id="prodetail">
	
    <div id="header">
         	<swipe class="my-swipe" v-if="piclist">
         		<swipe-item><img :src="mainpic"/></swipe-item>
                 <swipe-item v-for="data in piclist"><img :src="data"/></swipe-item>
             </swipe>
             <div class="detail" v-if='datainfo'>
             	<p class="x_title">{{datainfo.data.name}}/<i>{{datainfo.data.unit}}</i><span>{{datainfo.data.sellNum}}人付款</span></p>
             	<p class="price">{{datainfo.data.skus.items[0].price}}元<span>{{datainfo.data.unitPrice}}</span></p>
             	<ul>
             		<li>选择规格</li>
             		<li style="height:60px;">服务:
             			<dl style="float:right;">
             				<dd>杭州地区十点前下单当日...</dd>
             				<dd>上海地区次日到达</dd>
             				<dd>坏果包赔贴心售后</dd>
             				<dd>批发市场直发</dd>
             			</dl>
             		</li>
             	</ul>
             </div>
    </div>
    <div id="detailSay" v-if="descriptionlist">
    	<img src="../assets/shopdetail.png"  class="head"/>
    	<p>{{descriptionlist.description}}</p>
    	<img v-if="list" v-for="data in list":src="data"/>
    </div>
</div>
</template>

<script>
import 'vue-swipe/dist/vue-swipe.css';
import { Swipe, SwipeItem } from 'vue-swipe';
import axios from "axios";
import router from "@/router";
export default {

  name: 'prodetail',

  data () {
    return {
    	descriptionlist:null,
    	piclist:[],
    	datainfo:null,
    	mainpic:null,
    	list:[]
    	
    }
  },
  components:{
  	swipe:Swipe,
  	'swipe-item':SwipeItem
  },
  mounted(){
  	console.log(this.$route.query.id);
  	axios.get(`/product/${this.$route.query.id}?expand=shop&select=*,shop.*&version=3`).then(res=>{                              
     this.datainfo=res;
     this.descriptionlist=res.data;
     this.piclist=res.data.pictureList.split(",");
     this.mainpic=res.data.mainPicture;
     console.log(this.descriptionlist);
     if(res.data.descriptionPicture){
     	this.list=res.data.descriptionPicture.split(",");
     }
     
  	})
 }
}
</script>

<style lang="scss" scoped>

#prodetail{
	width:100%;
	height:100%;
	background:#eee;
	#header{
		background:#fff;
		.my-swipe {
     height: 400px;
     color: #fff;
     font-size: 30px;
     text-align: center;
     img{
        width:100%;
     }
   }
   .detail{
   	.x_title{
   	width:90%;
   	margin:20px;
   	   font:700 18px/30px "";
   	   i{
   	   	 font:700 12px/24px "";
   	   	 color:#666;
   	   }
   	   span{
   	   	   font:14px/24px "";
           float:right;
   	   }
   }
   .price{
   	  width:90%;
   	  margin:20px;
      font:16px/30px "";
      color:red;
      span{
      	margin-left:20px;
      	color:#000;
      	font:12px/24px "";
      }
   }
   ul{
   	width:100%;
   	margin-bottom:10px;
   	li{
   		width:100%;
   		list-style:none;
   		height:40px;
   		font:16px/40px "";
   		border-top:1px solid gray;
   		dl{
   			width:80%;
   			height:40px;
   			display:flex;
   			dd{
   				list-style:square;
   				width:50%;
   				font:12px/24px "";
   				width:100%;
   			}
   		}
   	}
   }
   }
   }
   #detailSay{
        background:#fff;
        width:100%;
        img{
        	width:100%;
        }
        .head{
        	padding-top:20px;
        	width:60%;
        	display:block;
        	margin:auto;
        }
        p{
        	color:#666;
        	width:90%;
        	padding:20px;
        }
   }
}
</style>