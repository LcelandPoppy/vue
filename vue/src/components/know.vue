<template>
  <div id="know">
  <div class="top">
    <!-- <router-link tag="span" to="/home">返回</router-link> -->
    <span @click="zyclick">返回</span>
    <b>水果知识</b>
  </div>
  <section>
  <router-view></router-view>
  </section>
  </div>
</template>

<script>

export default {
  name: 'know',
  methods:{
    zyclick(){
      history.go(-1);
    }
  } 
  
}
</script>

<style lang="scss" scoped>
#know {
  .top{
     width:100%;
     height:53px;
     background:#eee;
     position:fixed;
     left:0;
     top:0;
     z-index:4;
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
