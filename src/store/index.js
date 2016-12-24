import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation.js'
import actions from './actions.js'

Vue.use(Vuex)

const state = {
  loginState: null,
  articles: [],
  articlesTotal: 0,
  currPage: 1,
  articleDetaile: {},
  userInfo: [],
  navList: null,
  socailContact: null,
  temporaryArticle: null
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
