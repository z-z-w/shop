<template>
	<div class="orderList">
    <VueHeader title="我的订单"></VueHeader>
		<van-tabs :active="active" @click="getOrderList">
		  <van-tab v-for="index in 4" :title="title[index-1]" :key="index">
        <div v-if="list.length">
          <div class="order_container" v-for="(item, index) in list" :key="index">
            <div class="order_header">
              <span class="order_shop">移动商城</span>
              <span class="order_status">{{ item.orderStatus === 1 ? '待收货' : '已完成' }}</span>
            </div>
            <div class="van-card" v-for="good in item.goods" :key="good.id">
              <div class="van-card__thumb">
                <img v-lazy="good.smpic" class="van-card__img">
              </div>
              <div class="van-card__content">
                <div class="van-card__row">
                  <div class="van-card__title">
                    {{ good.name }}
                  </div>
                </div>
                <div class="van-card__row">
                  <div class="van-card__desc">
                    {{ good.desc }}
                  </div>
                </div>
              </div>
            </div>
            <div class="order_detail">
              <span class="order_count">共{{ item.goods.length }}件商品</span>
              <span class="order_pay_title">实付金额:</span>
              <span class="order_pay">￥{{(item.totalPrice / 100).toFixed(2) }}</span>
            </div>
            <div class="order_bottom">
              <van-button type="danger" size="small" @click="getConfirm(item.orderId)"
                          v-if="item.orderStatus === 1">
                确认送达
              </van-button>
              <van-button type="danger" size="small" @click="buyAgain(item.goods[0].id)"
                          v-else-if="item.orderStatus === 2">
                再次购买
              </van-button>
            </div>
          </div>
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
  import { Dialog } from 'vant';

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
    async getOrderList(index) {
      this.active = typeof index === 'undefined' ? this.active : index
      if(!this.userInfo) {
        this.$router.push('/my')
        return
      }
      if (this.active === 1) {
        this.list = []
        return
      }
      let status = this.active === 0 ? 0 : this.active === 2 ? 1 : 2
      let res = await axios.post(url.getOrderList, {
        _id: this.userInfo._id,
        orderStatus: status
      })
      if (res.data.status === 0) {
        this.list = res.data.data
      }
    },
    getConfirm(id) {
      Dialog.confirm({
        title: '确认送达',
        message: '您确定收到商品了吗?'
      }).then(async () => {
        let res = await axios.post(url.getOrderConfirm, {
          _id: this.userInfo._id,
          orderId: id
        })
        if(res.data.status === 0) {
          this.getOrderList()
        }
      }).catch(() => {
        // on cancel
      });
    },
    buyAgain(id) {
      this.$router.push({name:'detail',params:{id}})
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
  .order_container{
    width: 90%;
    padding: 0.2rem;
    margin: 0.2rem auto;
    font-size: 0.3rem;
    color: #333;
    background-color: #fff;
    border-radius: 5px;
    .order_header{
      padding: 0.2rem;
      overflow: hidden;
    }
    .order_status{
      float: right;
      color: #f44;
    }
    .van-card{
      background-color: #fff;
    }
    .van-card__thumb{
      width: 1.5rem;
      height: 1.5rem;
    }
    .order_detail{
      padding-right: 0.1rem;
      margin-bottom: 0.2rem;
      text-align: right;
      color: #999;
      span{
        vertical-align: middle;
      }
    }
    .order_count{
      margin-right: 0.1rem;
      font-size: 12px;
    }
    .order_pay{
      color: #333;
    }
    .order_bottom{
      padding-top: 0.3rem;
      padding-right: 0.1rem;
      border-top: 1px solid #ccc;
      text-align: right;
    }
  }
}
</style>
