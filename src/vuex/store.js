import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state={
	selectGoods:[],
  userInfo: null
}

const getters = {
  selectGoods: state => state.selectGoods,
  userInfo: state => state.userInfo
}

const mutations={
	updateGoods( state , data ){
    state.selectGoods = data
  },
  updateUserInfo(state, data) {
	  state.userInfo = data
  }
}

export default new Vuex.Store({
    state,
    getters,
    mutations
});
