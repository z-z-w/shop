<template>
	<div class="goods">
    <VueHeader title="商 品"></VueHeader>
		<van-swipe class="goods-swipe" :autoplay="3000">
			<van-swipe-item v-for="(thumb,index) in goods.imgList" :key="index">
				<img :src="thumb.url">
			</van-swipe-item>
		</van-swipe>

		<van-cell-group>
			<van-cell>
				<div class="goods-title"><span>自营</span>{{ goods.name }}</div>
        <div class="goods-desc">{{ goods.desc }}</div>
				<div class="goods-price">￥{{goods.price}}</div>
			</van-cell>
			<van-cell class="goods-express">
				<van-col span="10">运费：免运费</van-col>
				<van-col span="14">剩余：{{ goods.stock }}</van-col>
			</van-cell>
		</van-cell-group>

		<van-cell-group class="goods-cell-group">
			<van-cell value="进入店铺" icon="shop" is-link>
				<template slot="title">
					<span class="van-cell-text">移动商城</span>
					<van-tag type="danger">官方</van-tag>
				</template>
			</van-cell>
			<van-cell title="线下门店" icon="location" is-link />
		</van-cell-group>

		<van-cell-group class="goods-cell-group">
      <van-cell title="商品详情" class="good_detail"/>
      <img v-for="img in goods.imgDetailList" :key="img.uri" :src="img.url">
		</van-cell-group>

		<van-goods-action>
			<van-goods-action-mini-btn icon="chat">
				客服
			</van-goods-action-mini-btn>
			<van-goods-action-mini-btn icon="cart" :info="selectGoods.length>0?selectGoods.length.toString():''" @click="goCart">
				购物车
			</van-goods-action-mini-btn>
			<van-goods-action-big-btn primary @click="onAddcart">
				加入购物车
			</van-goods-action-big-btn>
			<!--<van-goods-action-big-btn primary>
				立即购买
			</van-goods-action-big-btn>-->
		</van-goods-action>

        


		<!--购物弹窗-->
		<van-popup v-model="isShow" position="bottom" transition="popup-slide">
		  <div class="skuBox">
				<div class="skuBox-cont">			
					<div class="skuBox-top">
						<div class="infor">
							<img v-lazy="smpic">
							<p>
								<span class="price">￥{{ count * price }}</span>
								<span class="count">库存：{{total}}个</span>
								<span class="selected">已选：{{count}}个</span>
							</p>
						</div>
						<i class="van-icon van-icon-close" @click="closeBtn"></i>
					</div>
					<div class="skuBox-wrap">
						<div class="title">数量</div>
						<van-stepper v-model="count" :max="total" :disable-input="true"/>
					</div>
				</div>
				<button class="btn" @click="addToCart">加入购物车</button>
			</div>
		</van-popup>
	</div>
</template>

<script>
import axios from 'axios';
import url from '../../assets/js/api.js'
import {mapGetters, mapMutations} from 'vuex'
import VueHeader from '@/components/vue-header.vue'
import {Toast} from 'vant'

	export default {
		data() {
			return {
				nowIndex: 0,
				goods: {},
				id: this.$route.params.id,
				isShow: false,
				total:'',
				smpic:'',
				count:1,
        price: 0
			}
		},
    components: {
      VueHeader
    },
		mounted(){
			this.getDetails();
		},
		computed:{
			...mapGetters([
			  "selectGoods", "userInfo"
      ])
		},
		methods: {
			getDetails() {
				const _this = this;
				axios.post(url.details, {
				  _id: this.id
        }).then(res => {
          if(res.status === 200 && res.data.status === 0) {
            this.goods = res.data.data
            this.price=this.goods.price
            this.total=this.goods.stock
            this.smpic=this.goods.imgList[0].url
          }
        })
			},
			onAddcart() {
				this.isShow = true
				this.count=1
			},
			closeBtn() {
				this.isShow = !this.isShow
			},
			stop(event) {
				event.cancelBubble = true
			},
			//加入购物车
			async addToCart(){
        let res = await axios.post(url.addToCart, {
          _id: this.userInfo._id,
          good: {
            id: this.goods._id,
            name: this.goods.name,
            price: this.goods.price,
            smpic: this.smpic,
            desc: this.goods.desc,
            count: this.count,
            stock: this.goods.stock
          }
        })
        if (res.data.status === 0) {
          this.updateGoods(res.data.data)
          this.isShow=!this.isShow
        }
		    	// let flag = true;
			    // let num = 0;
          //
			    // this.selectGoods.forEach((item, index) => {
			    //   // 通过id值判断购物车是否已经存在商品,如果存在就不添加
          //   if (this.id == item.id) {
			    //     flag = false;
			    //     if(this.count != item.count){
			    //     	 item.count+=this.count
				  //        console.log('不等')
				  //        this.isShow=!this.isShow
				  //        this.upDateCount()
			    //     }
			    //   }
			    // });
          //
          // if(flag){
          // 	this.$store.dispatch( 'addGoods' , {
	        //   	name: this.goods.name,
	        //   	price: this.goods.price,
	        //   	id: this.goods._id,
	        //   	smpic: this.smpic,
          //     desc: this.goods.desc,
	        //   	count: this.count,
	        //   	check: true
	        //   })
          // }
		  },
      //跳转到购物车
      goCart(){
        this.$router.push({path: '/cart'});
      },
      ...mapMutations([
        "updateGoods"
      ])
		}
	};
</script>

<style lang="less">
	.goods {
		padding-bottom: 50px;
		&-swipe {
			img {
				width: 7.5rem;
				height: 7.5rem;
				display: block;
			}
		}
		&-title {
      width: 7rem;
      span{
        display: inline-block;
        width: 0.6rem;
        height: 0.4rem;
        line-height: 0.4rem;
        margin-right: 0.1rem;
        color: #fff;
        font-size: 12px;
        background-color: #f44;
        text-align: center;
        border-radius: 3px;
      }
		}
    &-desc {
      font-size: 12px;
      color: #f44;
    }
		&-price {
			color: #f44;
		}
		&-express {
			color: #999;
			font-size: 12px;
			padding: 5px 15px;
		}
		&-cell-group {
			margin: 15px 0;
      font-size: 0;
      .good_detail{
        color: #f44;
      }
			.van-cell__value {
				color: #999;
			}
      img{
        width: 100%;
        height: 100%;
      }
		}
		.skuBox{
			 position: fixed;
			 left: 0;
			 bottom: 0;
			 width: 100%;
			 background: #fff;
			 font-size: 0.28rem;
			.skuBox-cont {
				padding: 0 5%;
				.skuBox-top{
					display: flex;
			    justify-content:space-between;
			    align-items:flex-start;
			    border-bottom:1px solid  #e5e5e5;
			    padding:0.2rem 0; 
			    i{
			    	font-size: 0.4rem;
			    }
			    .infor{
			    	display: flex;
			    	img{
				    	width:1.5rem;
				    	height:1.5rem;
				    }
				    p{
				    	margin-left: 0.3rem;
				    	display: flex;
				    	justify-content: space-around;
				    	flex-direction: column;
				    	align-items:flex-start;
				    }
			    }
				}
				.skuBox-wrap{
					border-bottom:1px solid  #e5e5e5;
					padding:0.2rem 0; 
					.title{
	        	color: #999;
	        	margin-bottom: 0.2rem;
	        }
	        ul{
	        	li{
	            height: 0.56rem;
	            line-height: 0.56rem;
	            border: 1px solid #CCC;
	            border-radius: 0.05rem;
	            padding: 0 0.5rem;
	            display: inline-block;
	            margin:0 0.1rem 0.15rem 0;
	            &.active{
	            	border: 1px solid #f44;
	            	background: #f44;
	            	color: #fff;
	            }
	        	}
	        }
				}
			}
			.btn {
				width: 100%;
				height: 0.9rem;
				line-height: 0.9rem;
				border-radius: 0;
				padding: 0;
				border: none;
				background: #f44;
				color: #fff;
				font-size: 0.3rem;
			}		
		}
		
	}
	
</style>
