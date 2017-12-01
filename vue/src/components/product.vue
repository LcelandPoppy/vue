<template>
  <div id="product">
      <div class="top">
      <!-- <router-link tag="span" to="/home">返回</router-link> -->
      <span @click="zyclick">返回</span>
      <b>商品详情</b>
    </div>
    <section>
    <router-view></router-view>
    </section>
  </div>
</template>

<script>

export default {
  name: 'product',
  methods:{
    zyclick(){
      history.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
#product {
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
  section{
      margin-top:53px;
  }
}
</style>
