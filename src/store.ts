import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      colors: [
        {
          hex: '#000000'
        }
      ]
    },
    getters: {},
    mutations: {
      setColors(state, colors) {
        state.colors = colors
      }
    }
  })
}

export default createStore
