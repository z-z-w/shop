<template>
	<div>
		<router-view></router-view>
    <div class="nav_bar">
      <router-link class="router_link" to="/home">
        <i class="van-icon van-icon-wap-home"><!----></i>
        <span>首页</span>
      </router-link>
      <router-link class="router_link" to="/category">
        <i class="van-icon van-icon-hot"><!----></i>
        <span>热卖</span>
      </router-link>
      <router-link class="router_link link_cart" to="/cart">
        <span v-if="selectGoods.length > 0" class="dot">{{ selectGoods.length }}</span>
        <i class="van-icon van-icon-cart"><!----></i>
        <span>购物车</span>
      </router-link>
      <router-link class="router_link" to="/my">
        <i class="van-icon van-icon-contact"><!----></i>
        <span>我的</span>
      </router-link>
    </div>
		<!--<van-tabbar v-model="active">-->
		  <!--<van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>-->
		  <!--<van-tabbar-item to="/category" icon="birthday-privilege">分类</van-tabbar-item>-->
		  <!--<van-tabbar-item to="/cart" icon="cart" :info="cartCount>0?cartCount:''">购物车</van-tabbar-item>-->
		  <!--<van-tabbar-item to="/my" icon="contact" >我的</van-tabbar-item>-->
		<!--</van-tabbar>-->
	</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      active: 0,
    }
  },
  computed:{
  	...mapGetters([
  	  "selectGoods"
    ])
  }
}
</script>

<style scoped>
  .nav_bar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 1.2rem;
    background-color: #fff;
  }
  .router_link{
    width: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.3rem;
    text-align: center;
  }
  .router_link span{
    margin-top: 0.2rem;
  }
  .link_cart{
    position: relative;
  }
  .dot{
    position: absolute;
    top: -0.35rem;
    left: 0.5rem;
    display: block;
    width: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.2rem;
    text-align: center;
    color: #fff;
    background-color: #f44;
    border-radius: 50%;
    z-index: 1;
  }
</style>
