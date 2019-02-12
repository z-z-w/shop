<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import axios from 'axios';
  import url from './assets/js/api.js'
export default {
  name: 'App',
  computed:{
    ...mapGetters([
      "selectGoods", "userInfo"
    ])
  },
  async created() {
    let res = await axios.get(url.isLogin)
    if (res.status === 200 && res.data.status === 0) {
      this.updateUserInfo(res.data.data)
    }
    if(this.userInfo._id) {
      let res = await axios.post(url.getCart, {
        _id: this.userInfo._id
      })
      if (res.data.status === 0) {
        this.updateGoods(res.data.data)
      }
    }
  },
  methods: {
    ...mapMutations(["updateUserInfo","updateGoods"])
  }
}
</script>

<style lang="less">
@import './assets/css/reset.css';	
@import './assets/css/base.less'; 
#app {
  font-family:'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
.loading{
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.24rem;
	span{
		margin-left: 2%;
		color: #666;
	}
}
</style>
