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
        state.threshhold = threshhold
      }
    }
  })
}

export default createStore
