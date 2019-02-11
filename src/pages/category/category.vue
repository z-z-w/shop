<template>
 	<div class="categories_content">
    <VueHeader title="热卖产品" class="vue_header"></VueHeader>
		<div class="categories_list" ref="menuWrapper">
			<ul>
				<li class="categories_item" v-for="(item,index) in categoryList" :key="item._id"
            @click="onClick(index)" :class="{active: currentIndex === index}">
          {{ item.name }}
        </li>
			</ul>
		</div>
		<div class="categories_box" ref='foodsWarpper'>
			<div class="cont" >
				<div class="goods-item">
          <ul>
            <li v-for="item in category" :key="item._id" @click="gotoDetail(item._id)">
              <div class="thumb">
                <img :src="item.imgList[0].url">
              </div>
              <div class="detail">
                <div class="title">{{item.name}}</div>
                <div class="desc">{{item.desc}}</div>
                <div class="price">￥{{item.price}}</div>
              </div>
            </li>
          </ul>
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
import url from '../../assets/js/api.js'
import axios from 'axios'
import VueHeader from '@/components/vue-header.vue'
	
	export default {
		data() {
			return {
				activeKey: 0,
				categoryList: [],
        category:[],
        id: 1,
        currentIndex: 0
			};
		},
    components: {
      VueHeader
    },
		created() {
		  this.getFirstCategory()
		},
		methods: {
		  async getFirstCategory() {
        let res = await axios.post(url.category, {
          id: 0
        })
        if(res.status === 200 && res.data.status === 0) {
          this.categoryList = res.data.data
          this.id = this.categoryList[0].id
          this.getCategoryGoods()
        }
      },
      async getCategoryGoods() {
        let res = await axios.post(url.goodsList, {
          id: this.id
        })
        if(res.status === 200 && res.data.status === 0) {
          this.category = res.data.data
        }
      },
			onClick(index) {
        this.currentIndex = index;
        this.id = this.categoryList[index].id
        this.getCategoryGoods()
			},
      gotoDetail(_id) {
		    this.$router.push({name:'detail',params:{id:_id}})
      }
		}
	};
</script>

<style scoped lang="less">
@import '../../assets/css/base.less'; 
.categories_content {
	display: -webkit-flex;
	display: flex;
  .vue_header{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
	.categories_list {
    position: fixed;
    top: 46px;
    left: 0;
    right: 5.5rem;
    bottom: 50px;
    overflow: auto;
    width: 2rem;
    &::-webkit-scrollbar {display:none}
    .categories_item{
      height: 1.2rem;
      line-height: 1.2rem;
      color: #333;
      font-size: 0.35rem;
      text-align: center;
      &.active{
        background-color: #fff;
        color: #f44;
      }
    }
	}
	.categories_box {
    position: fixed;
    top: 46px;
    right: 0;
    bottom: 50px;
    width: 5.5rem;
    overflow: auto;
		background: #fff;
    &::-webkit-scrollbar {display:none}
    .cont {
      display: none;
      .goods-item{
        display: block;
        position: relative;
        width: auto;
        margin-bottom: 12px;
        display: flex;
        flex-direction: column;
        li{
          display: flex;
          justify-content: flex-start;
          padding: 0.2rem 0 0.2rem 3%;
          .border-1px();
          .thumb{
            flex: 1;
            width: 1.8rem;
            height: 1.8rem;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .detail{
            flex: 2;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0.1rem;
            font-size: 0.32rem;
            margin-left: 0.2rem;
            .title{
              line-height: 0.38rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .desc{
              line-height: 0.38rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            .price{
              color: #f44;
            }
            .recommend{
              color: #999;
            }
          }
        }

      }
    }
		.cont:first-child {
			display: block;
		}
	}
}
.category_list{
  padding: 0.2rem;
  overflow: hidden;
}
.category_item{
  float: left;
  width: 1.6rem;
  margin-right: 0.1rem;
  margin-bottom: 0.3rem;
  border-bottom: none;
}
.category_item_img{
  width: 1.6rem;
  height: 1.6rem;
}
  .category_item_name{
    display: block;
    width: 0.8rem;
    margin: 0.1rem auto;
    font-size: 0.1rem;
    text-align: center;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
</style>
