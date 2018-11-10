/**
 * 配置相关的 store
 */
import { getConfig, saveConfig } from '@/assets/ajax'

const state = {
  hexo: {
    source: '',
    categories: '',
    tags: '',
  },
}

const getters = {
  hexoObject: ({ hexo }) => {
    return hexo
  }
}

const mutations = {
  getConfig (state, data) {
    state.hexo.source = data.hexo.source
    state.hexo.categories = data.hexo.categories
    state.hexo.tags = data.hexo.tags
  },
}

const actions = {
  getConfig ({ commit }) {
    return getConfig().then(data => {
      commit('getConfig', data)
      return true
    })
  },

  saveConfig ({ dispatch }, data) {
    return saveConfig(data).then(res => {
      if (res.code !== 0) {
        return false
      }
      dispatch('getConfig')
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
