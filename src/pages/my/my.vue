<template>
  <div class="user">
    <!--<img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">-->
    <template v-if="isLogin">
      <VueHeader title="我的商城"></VueHeader>
      <div class="user-top">
        <div class="photo">
          <img src="../../assets/images/avatar.png">
        </div>
        <div class="base-info">
          <p>欢迎您，{{ isLogin }}</p>
          <p>
            <van-icon name="contact"/>
            <span @click="onLogout">退出登陆</span>
          </p>
        </div>
      </div>
      <van-row class="user-links">
        <van-col span="6">
          <router-link  :to="{name:'/orderList',params: {active: 1}}">
            <van-icon name="pending-payment" />
            待支付
          </router-link>
        </van-col>
        <van-col span="6">
          <van-icon name="pending-orders" />
          <router-link :to="{name:'/orderList',params: {active: 2}}">
            待收货
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link :to="{name:'/orderList',params: {active: 3}}">
            <van-icon name="pending-evaluate" />
            待评价
          </router-link>
        </van-col>
        <van-col span="6">
          <van-icon name="logistics" />
          退换货
        </van-col>
      </van-row>

      <van-cell-group class="user-group">
        <router-link to="/orderList">
          <van-cell icon="records" title="全部订单" is-link />
        </router-link>
      </van-cell-group>

      <van-cell-group>
        <van-cell icon="exchange" title="我的积分" is-link />
        <van-cell icon="gold-coin" title="我的优惠券" is-link />
        <van-cell icon="gift" title="我收到的礼物" is-link />
      </van-cell-group>
    </template>
    <template v-else>
      <VueHeader title="登 陆"></VueHeader>
      <van-cell-group class="sign_input_container">
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('question')"
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />

        <van-button round type="danger" :disabled="disabled" @click="onLogin">
          登 陆
        </van-button>

        <van-button plain type="danger" class="sign_up" :disabled="disabled" @click="onSignUp">注 册</van-button>
      </van-cell-group>
    </template>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import axios from 'axios';
  import url from '../../assets/js/api.js'
  import { Toast } from 'vant'
  import VueHeader from '@/components/vue-header.vue'


export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    VueHeader
  },
  computed: {
    disabled() {
      return this.username === '' || this.password === ''
    },
    ...mapGetters(['isLogin'])
  },
  methods: {
    async onLogin() {
      let res = await axios.post(url.login, {
        username: this.username,
        password: this.password
      })
      if (res.status === 200 && res.data.status === 0) {
        this.login(res.data.data.username)
      } else {
        Toast(res.data.msg);
      }
    },
    async onSignUp() {
      let res = await axios.post(url.signUp, {
        username: this.username,
        password: this.password
      })
      if (res.status === 200 && res.data.status === 0) {
        this.login(res.data.data.username)
      } else {
        Toast(res.data.msg);
      }
    },
    async onLogout() {
      let res = await axios.get(url.logout)
      if (res.status === 200 && res.data.status === 0) {
        this.login(null)
      }
    },
    ...mapMutations(["login"])
  }
};
</script>

<style lang="less" scoped>
.user {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 1.2rem;
  background-color: #fff;
  &-poster {
    width: 7.5rem;
    height: 4rem;
    display: block;
  }
  &-group {
    margin-bottom: .3rem;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
      margin-bottom: 0.12rem;
    }
  }
  &-top{
  	width: 100%;
  	height: 3rem;
    background: linear-gradient(90deg,#eb3c3c,#ff7459);
  	display: flex;
  	align-items: center;
  	font-size: 0.38rem;
  	color: #fff;
  	.photo{
	    margin-left: 5%;
	    width: 1.6rem;
	    height: 1.6rem;
	    border-radius: 50%;
	    background:#E5E5E5;
	    background-size:100%;
	    img{
	    	width: 100%;
	    	height: 100%;
	    }
  	}
  	.base-info{
  		margin-left: 5%;
  		line-height: 0.55rem;
      p{
        margin-top: 0.2rem;
      }
  		span{
        display: inline-block;
        width: 1.5rem;
        height: 0.5rem;
        line-height: 0.5rem;
  			font-size: 0.28rem;
        text-decoration: underline;
  		}
      .van-icon{
        position: relative;
        top: 0.04rem;
        margin-right: 0.1rem;
      }
  	}
  }
}
  .login_header{
    position: relative;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.4rem;
    text-align: center;
    font-weight: normal;
  }
  .van-icon-arrow-left{
    position: absolute;
    width: 1rem;
    height: 1rem;
    left: 0.1rem;
    top: 0.35rem;
    font-size: 0.3rem;
    font-weight: bold;
  }
  .sign_input_container{
    padding: 0.5rem 0.2rem;
  }
  .van-button{
    width: 6rem;
    margin-left: 0.5rem;
    border-radius: 1rem;
    font-size: 0.4rem;
  }
  .van-button::before{
    background-color: #fff;
  }
  .van-button--disabled{
    color: #fff;
    background-image: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba);
  }

</style>
