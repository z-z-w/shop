<template>
  <div class="cart">
    <VueHeader title="购物车"></VueHeader>
  	<!--购物车不为空-->
    <div class="cart-empty" v-if="!userInfo">
      <div class="cart-ico">
        <img src="../../assets/images/cart.png" alt="购物车">
      </div>
      <p class="empty-warm">登录后可同步购物车中商品</p>
      <router-link to="/my">
        <van-button size="normal" type="danger">登陆</van-button>
      </router-link>
    </div>
  	<div class="cart-section" v-else-if="goods!=0">
      <van-cell-group>
        <van-cell :value="editText" @click="onEdit"/>
      </van-cell-group>
	  		<van-checkbox-group class="card-goods" v-model="checkedGoods" >
          <van-checkbox
            class="card-goods__item"
            v-for="item in goods"
            :key="item.id"
            :name="item.id"
          >
	        <van-card
	          :title="item.name"
	          :price="parseInt(item.price)"
	          :thumb="item.smpic"
            :desc="item.desc"
	        />
	        
	      </van-checkbox>
	      <ul class="steper">
	      	<li v-for="(item,index) in goods" :key="item.id">
            <van-button type="danger" size="small" v-if="isEdit" @click="deleteGood(index)">删除</van-button>
            <van-stepper v-model="item.count" :max="item.stock" v-if="isEdit"
                         :disable-input="true"/>
            <span v-else>x{{ item.count }}</span>
          </li>
	      </ul>
	      
	    </van-checkbox-group>
	    <van-submit-bar
	      :price="totalPrice"
	      :disabled="!checkedGoods.length"
	      :button-text="submitBarText"
	      @submit="onSubmit"
        v-if="!isEdit"
	    >
	   <div class="" @click="checkall"><van-checkbox v-model="allChecked" >全选</van-checkbox></div> 
	    </van-submit-bar>
  	</div>
  	<!--购物车为空-->
    <div class="cart-empty" v-else>
    	 <div class="cart-ico">
         <img src="../../assets/images/cart.png" alt="购物车">
    	 </div>
    	 <p class="empty-warm">购物车空空如也，去逛逛吧~</p>
    	 <router-link to="/home">
    	 	 <van-button size="normal" type="danger">去逛逛</van-button>
    	 </router-link>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import VueHeader from '@/components/vue-header.vue'
  import { Dialog } from 'vant'
  import axios from 'axios';
  import url from '../../assets/js/api.js'

export default {
  data() {
    return {
      checkedGoods: [],
      allChecked:false,
      isEdit: false
    };
  },
  components: {
    VueHeader
  },
  computed: {
    editText() {
      return this.isEdit ? '确定' : '编辑商品'
    },
    submitBarText() {
      const count = this.checkedGoods.length;
      return '结算' + (count ? `(${count})` : '');
    },
    totalPrice() {
      //有出现则累加，没有则为0
      return this.goods.reduce(
        (total, item) =>
          total + (this.checkedGoods.indexOf(item.id) !== -1 ? parseInt(item.price*100)*item.count : 0)
        , 0);
    },
    goods(){
      return this.selectGoods
    },
    ...mapGetters([
      "selectGoods", "userInfo"
    ])
  },
  methods: {
    //全选返选
    checkall(){
    	let arr=[]
			if(this.allChecked){
					 this.selectGoods.forEach((item, index) => {	  
			       arr.push(this.selectGoods[index].id)
			    });
			    this.checkedGoods=arr
      }else{
      	this.checkedGoods=[]
      }
		},
		//跳到结算页
    onSubmit(){
    	let payGoods = [];
      this.selectGoods.forEach((item, index) => {
        for(let i=0;i<this.checkedGoods.length;i++){
          if (this.checkedGoods[i]== this.selectGoods[index].id) {
            payGoods.push(this.selectGoods[index]);
          }
        }
      });
      this.$router.push({name: '/pay', params:{list: payGoods}});
    },
    async onEdit() {
      if (this.isEdit) {
        let res = await axios.post(url.updateCart, {
          _id: this.userInfo._id,
          cartList: this.goods
        })
        if (res.data.status === 0) {
          this.goods = res.data.data
        }
      }
      this.isEdit = !this.isEdit
    },
    deleteGood(index) {
      Dialog.confirm({
        title: '删除商品',
        message: '是否确认删除该商品?'
      }).then(() => {
        this.goods.splice(index, 1)
      });
    }
  },
  watch:{
    //监听单选框，选择状态
    checkedGoods(e,old){
      if (this.goods.length == e.length) {
        this.allChecked=true
      } else {
        this.allChecked=false
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cart{
		.cart-section{
			.card-goods {
		  background-color: #fff;
		  position: relative;
		  &__item {
		    position: relative;
		     padding: 10px 0 10px 2%;
		     border-bottom: 1px solid #e5e5e5;
		
		    .van-checkbox__input {
		      top: 50%;
		      left: 15px;
		      margin-top: -10px;
		      position: absolute;
		    }
		    .van-checkbox__label {
		      margin: 0;
		      width: 100%;
		      padding-left: 35px;
		      box-sizing: border-box;
		      .van-card{
		      	background: #fff;
		      }
		    }
		    .van-card__price {
		      color: #f44;
		    }
		    
		    
		  }
		  
			.steper{
				  position: absolute;
					top: 0;
					right: 4%;
				li{
					height: 100px;
					padding-bottom: 20px;
					display: flex;
					align-items: flex-end;
				}
        span{
          font-size: 0.3rem;
        }
			}
		}
		.van-submit-bar{
			.van-checkbox{
		    	font-size: 0.26rem;
		    	padding-left: 0.15rem;
		    }
		}
	}
	.cart-empty{
	  padding: 1.5rem 5%;
	  text-align: center;
	  .empty-warm{
	  	font-size: 0.32rem;
	    margin-top: 0.3rem;
	    color: #999;
	  }
	}
}
.van-icon-ellipsis:before {
  content: "\F04C";
}



</style>
