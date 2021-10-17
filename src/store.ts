import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      colorStyles: [],
      colors: [
        {
          hex: '#000000'
        }
      ]
    },
    getters: {},
    mutations: {
      setColorStyles(state, colors) {
          state.colorStyles = colors
      },
      setColors(state, colors) {
        state.colors = colors
      },
    }
  })
}

export default createStore
