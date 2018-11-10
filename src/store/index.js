import Vue from 'vue'
import Vuex from 'vuex'

import config from '@/store/modules/config'

import { getConfig, saveConfig, getBlogList } from '../assets/ajax'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    config,
  },

  state: {
    blogLists: []
  },

  getters: {

  },

  mutations: {
    setBlogList (state, data) {
      state.blogLists = data
    }
  },

  actions: {
    getBlogList ({commit}) {
      getBlogList().then(res => {
        if (res.code !== 0) {
          return
        }
        commit('setBlogList', res.data)
      })
    }
  }
})

export default store
