import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  currentArticle: null
})

export const mutations = {
  SET_CURRENT_ARTICLE(state, article) {
    state.currentArticle = article
  }
}
