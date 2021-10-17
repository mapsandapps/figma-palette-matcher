import Vuex from 'vuex'
import { getClosestColor } from './utils'

const createStore = () => {
  return new Vuex.Store({
    state: {
      colorStyles: [],
      selectedColors: [],
      threshhold: 25
    },
    getters: {
      colors(state) {
        return state.selectedColors.map(color => {
          return getClosestColor(color, state.colorStyles, state.threshhold)
        })
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
