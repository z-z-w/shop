<template>
  <div class="home">
    <!--轮播图-->
    <div class="banner">
      <div class="mjd-header">
          <router-link class="category_btn" to="/category"></router-link>
        <div class="search_container">
          <i class="van-icon van-icon-search" @click="gotoSearch"></i>
          <input type="text" class="van_search" placeholder="请输入搜索关键词" v-model="searchWord" />
        </div>
        <router-link to="/my" class="goto_login">
          <span class="sign_in" v-if="!userInfo">登陆</span>
          <van-icon name="contact" v-else />
        </router-link>
      </div>
      <van-swipe :autoplay="3000">
        <van-swipe-item>
          <img src="@/assets/images/banner1.jpg"/>
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/banner2.jpg"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--商品列表-->
    <div class="goods-list-wrapper">
      <ul class="goods-list" v-waterfall-lower="loadMore" waterfall-disabled="isWaterfallDisabled"
          waterfall-offset="400">
        <li v-for="(list,index) in lists" :key="index">
          <!--<router-link  :to="{name: 'detail', params: {id: list.id}}">-->
          <!--<router-link :to="{path:'/detail',query: {name: id}}">-->
          <router-link :to="{name:'detail',params:{id:list._id}}">
            <div class="photo">
              <img v-lazy="list.imgList[0].url">
            </div>
            <div class="info">
              <h3 class="title">
                {{list.name}}
              </h3>
              <div class="bot">
                <span class="price">￥{{list.price}}</span>
                <div class="btn-buy"><i class="van-icon van-icon-shopping-cart"></i></div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="loading" v-if="loading">
        <van-loading :type="'spinner'" :color="'black'"></van-loading>
        <span>加载中...</span>
      </div>
    </div>
    <!--<div class="load" v-show="loading"><van-loading type="spinner" color="black" />加载中...</div>-->

  </div>
</template>

<script>
  import Vue from 'vue'
  import url from '../../assets/js/api.js'
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import { Toast } from 'vant';

  import {Card, Loading} from 'vant';

  Vue.component(Card.name, Card);
  Vue.component(Loading.name, Loading);

  import {Waterfall} from 'vant';

  export default {
    data() {
      return {
        lists: null,
        bannerLists: null,
        isWaterfallDisabled: false,
        loading: false,
        nodata: 1,
        pageNum: 0,
        pageSize: 6,
        searchWord: ''
      }
    },
    directives: {
      WaterfallLower: Waterfall('lower')
    },
    computed: {
      ...mapGetters(["userInfo"])
    },
    methods: {
      loadMore() {
        if (this.nodata == 0) return false;
        if (this.loading) return false;
        this.loading = true;

        this.pageNum++

        let that = this;
        setTimeout(function () {
          axios.post(url.productList, {
            pageNum: that.pageNum,
            pageSize: that.pageSize
          }).then(res => {
            if(res.status === 200 && res.data.status === 0) {
              let curLists = res.data.data.list
              if(curLists.length === 0) {
                that.nodata = 0
              }
              if (that.lists) {
                that.lists = that.lists.concat(curLists)
              } else {
                that.lists = curLists
              }
              that.loading = false
            }
          });

        }, 1000)
      },
      async gotoSearch() {
        if (this.searchWord === '') return
        let res = await axios.post(url.search, {
          q: this.searchWord
        })
        if (res.data.status === 0) {
          this.$router.push({name: '/search', params: {list: res.data.data}})
        } else {
          Toast(res.data.msg)
        }
      }
    }
  }
</script>

<style lang="less" scoped="">

  .mjd-header{
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 1rem;
    z-index: 1;
    background-color: #e43130;
    .goto_login{
      position: relative;
      min-width: 0.5rem;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
    }
    .van-icon-contact{
      position: absolute;
      top: 0.05rem;
      left: 0.05rem;
      color: #fff;
      font-size: 0.4rem;
    }
  }
  .category_btn{
    width: 0.4rem;
    height: 0.4rem;
    display: block;
    background: url('../../assets/images/icon1.png') no-repeat;
    background-size: 100% 100%;
  }
  .search_container{
    display: flex;
    align-items: center;
    width: 5rem;
    height: 0.6rem;
    background-color: #ffffff;
    border-radius: 50px;
  }
  .van_search{
    width: 3.5rem;
    font-size: 0.3rem;
    background-color: transparent;
  }
  .van-icon-search{
    box-sizing: border-box;
    width: 1rem;
    height: 0.6rem;
    padding-top: 0.18rem;
    padding-left: 0.35rem;
    font-size: 0.3rem;
  }
  .sign_in{
    display: block;
    width: 1rem;
    color: #fff;
    font-size: 0.4rem;
  }

  .home {
    padding-bottom: 1.8rem;

    .van-swipe {
      padding-top: 1rem;
      height: 3.46rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .goods-list-wrapper {
      .goods-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 2%;

        li {
          width: 49%;
          background: #fff;
          margin: 0.1rem 0;

          .photo {
            img {
              width: 100%;
              height: 100%;
            }
          }

          .info {
            padding: 0.08rem 0.15rem 0.15rem 0.15rem;

            .title {
              font-size: 0.28rem;
              color: #333;
              line-height: 0.38rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            .bot {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 0.1rem 0 0.2rem 0;

              .price {
                font-size: 0.32rem;
                color: #f44;
              }

              .btn-buy {
                width: 0.48rem;
                height: 0.48rem;
                color: #f44;
                background-color: #fff;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                text-align: center;
                font-size: 0.24rem;
                cursor: pointer;
                border: 1px solid #f44;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                float: right;
              }
            }

          }
        }
      }
    }
  }
</style>
