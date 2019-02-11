<template>
  <div class="cart">
    <VueHeader title="购物车"></VueHeader>
  	<!--购物车不为空-->
  	<div class="cart-section" v-if="goods!=0">
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
	        />
	        
	      </van-checkbox>
	      <ul class="steper">
	      	<li v-for="item in goods" ><van-stepper v-model="item.count" /></li>
	      </ul>
	      
	    </van-checkbox-group>
	    <van-submit-bar
	      :price="totalPrice"
	      :disabled="!checkedGoods.length"
	      :button-text="submitBarText"
	      @submit="onSubmit"
	    >
	   <div class="" @click="checkall"><van-checkbox v-model="allChecked" >全选</van-checkbox></div> 
	    </van-submit-bar>
  	</div>
  	<!--购物车为空-->
    <div class="cart-empty" v-else>
    	 <div class="cart-ico">
    	 	 <i class="van-icon van-icon-cart"></i>
    	 </div>
    	 <p class="empty-warm">购物车还是空的</p>
    	 <router-link to="/home">
    	 	 <van-button size="small">去看看</van-button>
    	 </router-link>
    	 
    </div>
  </div>
</template>

<script>
	import store from '@/vuex/store'
  import {mapState} from 'vuex'
  import VueHeader from '@/components/vue-header.vue'

export default {
  store,
  data() {
    return {
      checkedGoods: [],
      goods: [],
      allChecked:false,
      flag:true
    };
  },
  components: {
    VueHeader
  },
  mounted(){
    this.goods=this.selectGoods
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
  },
  computed: {
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
    ...mapState({
      selectGoods: state => state.selectGoods//绑定store.selectGoods到组件，之后可用this.selectGoods获取
   })
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
	  .cart-ico{
	  	.van-icon-cart{
	  		font-size: 0.5rem;
	  		color:#999;
	  	}
	  }
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
