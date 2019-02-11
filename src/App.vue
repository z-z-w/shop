<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import axios from 'axios';
  import url from './assets/js/api.js'
export default {
  name: 'App',
  async created() {
    let res = await axios.get(url.isLogin)
    if (res.status === 200 && res.data.status === 0) {
      this.login(res.data.data.username)
    }
  },
  methods: {
    ...mapMutations(["login"])
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
