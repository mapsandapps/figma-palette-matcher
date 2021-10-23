import Vuex from 'vuex'
import { each } from 'lodash'
import { getClosestColor } from './utils'

const createStore = () => {
  return new Vuex.Store({
    state: {
      colorStyles: [],
      selectedColors: [],
      threshhold: 25
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
