import Vue from 'vue';
import Vuex from 'vuex';

import city from './modules/city';
import menu from './modules/menu';

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    modules: {
      city,
      menu
    },
    actions: {
      async nuxtServerInit({ commit }, { req, app }) { // nuxtServerInit 将服务端的一些数据传到客户端
        const {status, data: {province, city, code}} = await app.$axios.get('/city/getPosition');
        commit('city/setPosition', status === 200 && code === 0 ? {province, city} : {province: '', city: ''})
        const {status: status2, data: {result: {menu}, code: code2}} = await app.$axios.get('/home/menu');
        commit('menu/setMenu', status2 === 200 && code2 === 0 ? menu : []);
      }
    }
  });
};

export default store;