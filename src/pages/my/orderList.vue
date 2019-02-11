<template>
	<div class="orderList">
    <VueHeader title="我的订单"></VueHeader>
		<van-tabs :active="active">
		  <van-tab v-for="index in 4" :title="title[index-1]" :key="index">
		  	<div class="no-data-text">
		  		暂无更多订单 {{ index }}
		  	</div>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
  import VueHeader from '@/components/vue-header.vue'
export default {
  data() {
    return {
      active: 0,
      title:['全部','待支付','待收货','待评价']
    };
  },
  components: {
    VueHeader
  },
  created(){
   this.active=this.$route.params.active
  },
}
</script>

<style lang="less">
.orderList{
	.no-data-text{
		font-size: 0.32rem;
		color: #aaa;
		padding: 10% 0;
		text-align: center;
	}
}
</style>
