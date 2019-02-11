import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state={
	selectGoods:[],
  isLogin: null
}

const getters = {
  isLogin: state => state.isLogin
}

const mutations={
	add( state , data ){
    state.selectGoods.push( data )
  },
  remove( state , data){
    state.selectGoods.splice(data, 1);
  },
  login(state, data) {
	  state.isLogin = data
  }
}

const actions={
      addGoods( {commit} , data ){
          commit('add',data)
      },
      removeGoods( {commit} , data ){
          commit('remove',data)
      }
        
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
