<template>
	<div class="orderList">
    <VueHeader title="我的订单"></VueHeader>
		<van-tabs :active="active" @click="getOrderList">
		  <van-tab v-for="index in 4" :title="title[index-1]" :key="index">
        <div v-if="list">

        </div>
		  	<div class="no-data-text" v-else>
		  		暂无订单
		  	</div>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
  import VueHeader from '@/components/vue-header.vue'
  import axios from 'axios';
  import url from '../../assets/js/api.js'
  import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      active: 0,
      title:['所有订单','待支付','待收货','已完成'],
      list: []
    };
  },
  components: {
    VueHeader
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  created(){
    this.active = this.$route.params.active || 0
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      if (this.active === 1 || this.active === 3) return
      let status = this.active ? 1 : 0
      let res = await axios.post(url.getOrderList, {
        _id: this.userInfo._id,
        orderStatus: status
      })
      if (res.data.status === 0) {
        this.list = res.data.data
      }
    }
  }
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
