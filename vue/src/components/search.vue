<template>
<div id="search">
	<div class="top">
		<div class="t">
			<router-link tag="i" to="/home">返回</router-link><span>搜索</span>
		</div>
		<div class="c">
			<input type="text" placeholder="关键字/商品名" class="oinput" id="oinput" @blur="zyblur"/>
		</div>
	</div>
	<div id="list">
		<ul v-if="listl">
		 <li v-for="data in listl" @click="zyclick(data.id)">
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
import router from "@/router"
import axios from "axios"
export default {

  name: 'search',

  data () {
    return {
         listl:[],
         val:''
    }
  },
  // directives:{
  // 	valueaccpet:{
  // 		inserted(el,binging){
  //           el.onblur=function(){
  //           	console.log(el.value);
  //               axios.get(`/market/n2lo7y7m/list/products?expand=shop&select=*,shop.*&orderBy=0&keyword=${el.value}&version=3`).then(res=>{
  //               	console.log(res);
  //               	if(res.data.items.length!=0){
  //               		this.listl=res.data.items;
  //               		console.log(this.listl);
  //               	}
  //               })
  //           }
           
  // 		}
       
  // 	}
  // }
  // 
  methods:{
  	zyclick(id){
       router.push(`/product/prodetail?id=${id}`)
  	},
      zyblur(){
      	this.val=document.getElementById("oinput").value;
     	axios.get(`/market/n2lo7y7m/list/products?expand=shop&select=*,shop.*&orderBy=0&keyword=${this.val}&version=3`).then(res=>{
     	           	console.log(res);

     	           	if(this.val==''){
     	           		this.listl=[];
     	           	}else if(res.data.items.length!=0){
     	           		this.listl=res.data.items;
     	           		console.log(this.listl);
     	           	}
     	           })
      }
     
     


  }
}
</script>

<style lang="scss" scoped>
#search{
	.top{
		width:100%;
		position:fixed;
        left:0;
        top:0;
		.t{
			width:100%;
			height:40px;
			background:#eee;
			i{
				display:inline-block;
				font:12px/40px "";
				margin-left:20px;
			}
			span{
				font:700 16px/40px "";
				display:inline-block;
				width:70%;
				margin-left:20px;
				text-align: center;
			}
		}
		.c{
			height:50px;
			background:#fff;
			padding-bottom:20px;
			.oinput{
				width:90%;
				height:30px;
				border-radius: 5px;
				background:#eee;
				text-align: center;
				margin:20px;
			}
		
		}
	}
	#list{
		margin-top:120px;

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