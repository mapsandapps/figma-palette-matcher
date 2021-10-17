import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      colorStyles: [],
      colors: [
        {
          hex: '#000000'
        }
      ],
      threshhold: 25
    },
    getters: {},
    mutations: {
      setColorStyles(state, colors) {
          state.colorStyles = colors
      },
      setColors(state, colors) {
        state.colors = colors
      },
      setThreshhold(state, threshhold) {
        // TODO: if this changes, colors should get recalculated
        state.threshhold = threshhold
      }
    }
  })
}

export default createStore
