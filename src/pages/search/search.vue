<template>
    <div>
      <VueHeader title="搜索结果"></VueHeader>
      <div class="categories_box">
        <div class="cont" >
          <div class="goods-item">
            <ul>
              <li v-for="item in list" :key="item._id" @click="gotoDetail(item._id)">
                <div class="thumb">
                  <img v-lazy="item.imgList[0].url">
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
  import VueHeader from '@/components/vue-header.vue'

    export default {
      data() {
        return {
          list: this.$route.params.list
        }
      },
      mounted() {
        console.log(this.$route);
      },
      components: {
        VueHeader
      },
      methods: {
        gotoDetail(_id) {
          this.$router.push({name:'detail',params:{id:_id}})
        }
      }
    }
</script>

<style scoped lang="less">
  @import '../../assets/css/base.less';
  .categories_box {
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
            height: 2.3rem;
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
</style>
