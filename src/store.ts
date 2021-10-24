import Vuex from 'vuex'
import { each } from 'lodash'
import { getClosestColor } from './utils'

const createStore = () => {
  return new Vuex.Store({
    state: {
      colorStyles: [],
      selectedColors: [],
      threshold: 25
    },
    actions: {
      closePlugin() {
        parent.postMessage({ pluginMessage: { name: 'closePlugin' }}, '*')
      },
      replaceColors({ getters }) {
        each(getters.colors, color => {
          if (color.closestColorStyle) {
            parent.postMessage({ pluginMessage: { name: 'replaceColor', data: color }}, '*')
          }
        })

        // TODO: if no colors have matches, post something instead of success message
        // and/or disable button

        parent.postMessage({ pluginMessage: { name: 'closePlugin', data: 'Success!' }}, '*')
      }
    },
    getters: {
      colors(state) {
        return state.selectedColors.map(color => {
          return getClosestColor(color, state.colorStyles, state.threshold)
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
      setThreshold(state, threshold) {
        state.threshold = threshold
      }
    }
  })
}

export default createStore
