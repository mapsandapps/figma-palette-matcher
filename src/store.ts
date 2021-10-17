import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      colorStyles: [],
      selectedColors: [],
      threshhold: 25
    },
    getters: {
      colors(state) {
        // TODO: based on selectedColors()
        return state.selectedColors
      }
    },
    mutations: {
      setColorStyles(state, colors) {
        state.colorStyles = colors
      },
      setSelectedColors(state, colors) {
        state.selectedColors = colors
      },
      setThreshhold(state, threshhold) {
        // TODO: if this changes, colors should get recalculated, e.g. by sending the message 'colorsFromSelections'
        state.threshhold = threshhold
      }
    }
  })
}

export default createStore
