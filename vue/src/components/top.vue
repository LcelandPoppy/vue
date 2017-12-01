<template>
  <div id="top">
  	<div class="t">
  		  <div class="b"></div>
  		  <div class="t"><span>杭州</span><router-link tag="input" type="text" placeholder='关键字/商品' to="/search"></router-link></div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'top'

  
}
</script>

<style lang="scss" scoped>
*{
	margin:0;
	padding:0;
}
#top{
	.t{
		width:100%;
		height:53px;
		background:#e1e1e1;
		position:fixed;
		left:0;
		top:0;
		z-index:2;
		opacity:.7;
		.b{
		     height:53px;
		     background:#fff;
		     opacity:.5;
		}
		.t{
		width:100%;
		   position:absolute;
		   left:0;
		   top:0;
		   span{
		      font:12px/53px "";
		      margin-left:20px;

		   }
		   input{
		   width:70%;
		   height:30px;
		   text-align:center;
		   border-radius:5px;
		   margin-left:20px;
		   border:0;
		   }
		}
	}
}
</style>