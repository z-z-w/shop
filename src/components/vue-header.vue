<template>
  <div class="container" @mouseleave="hideList">
    <van-nav-bar
      :title= title
      left-arrow
      right-text="···"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <ul class="list" :class="{active: showList}">
      <li class="item" v-for="item in arr" :key="item.name">
        <van-icon :name="item.name"/>
        <span class="item_title" @click.stop="goto(item.url)">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {Dialog} from 'vant'

    export default {
      data() {
        return {
          showList: false,
          arr: [
            {name: "home", url: "/home", title: "首页"},
            {name: "search", url: "/category", title: "分类搜索"},
            {name: "cart", url: "/cart", title: "购物车"},
            {name: "contact", url: "/my", title: "我的商城"}
          ]
        }
      },
      props: {
        title: {
          type: String,
          default: ''
        }
      },
      methods: {
        goto(url) {
          this.$router.push(url)
        },
        onClickLeft() {
          if (this.$route.fullPath === '/pay') {
            Dialog.confirm({
              message: '便宜不等人，请三思而行',
              confirmButtonText: '去意已决',
              cancelButtonText: '我再想想'
            }).then(() => {
              this.$router.go(-1)
            });
          } else {
            this.$router.go(-1)
          }
        },
        onClickRight() {
          this.showList = !this.showList
        },
        hideList() {
          if(this.showList) {
            this.showList = false
          }
        }
      }
    }
</script>

<style scoped>
  .container{
    position: relative;
  }
  .list{
    display: none;
    position: absolute;
    top: 1rem;
    right: 0.2rem;
    padding: 0 0.2rem 0.3rem;
    font-size: .3rem;
    color: #fff;
    background: rgba(0, 0, 0, .9);
    border-radius: 0.1rem;
  }
  .active{
    display: block;
    z-index: 100;
  }
  .list::before{
    position: absolute;
    top: -15px;
    right: 5px;
    border: 0.2rem solid transparent;
    border-bottom: 0.2rem solid rgba(0, 0, 0, .9);
    content: "";
  }
  .item{
    height: 0.8rem;
    line-height: 0.8rem;
  }
  .van-icon{
    vertical-align: middle;
  }
  .item_title{
    display: inline-block;
    width: 1.5rem;
    margin-left: 0.2rem;
    vertical-align: middle;
    border-bottom: 1px solid #eee;
  }
</style>
