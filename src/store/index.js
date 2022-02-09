import { createStore } from 'vuex'

export default createStore({
  devtools: process.env.NODE_ENV !== 'production',
  state: {
    site: { title: '' },
    user: null
  },
  mutations: {
    setSite (state, site) { state.site = site },
    setUser (state, user) { state.user = user },
    setUserDisplayName (state, displayName) { state.user.displayName = displayName }
  }
})
