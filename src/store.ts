import Vuex from 'vuex'
import { difference, each, filter, find } from 'lodash'
import { getClosestColor } from './utils'

const createStore = () => {
  return new Vuex.Store({
    state: {
      colorStyles: [],
      selectedColors: [],
      selectionsToReplace: [],
      threshold: 25
    },
    actions: {
      closePlugin() {
        parent.postMessage({ pluginMessage: { name: 'closePlugin' }}, '*')
      },
      replaceColors({ getters, state }) {
        each(state.selectionsToReplace, selectionId => {
          const colorToReplace = find(getters.colors, ['originalColor.id', selectionId])
          if (colorToReplace.closestColorStyle) {
            parent.postMessage({ pluginMessage: { name: 'replaceColor', data: colorToReplace }}, '*')
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
      addReplacement(state, selectionId) {
        state.selectionsToReplace.push(selectionId)
      },
      removeReplacement(state, selectionId) {
        state.selectionsToReplace = filter(state.selectionsToReplace, (id) => id !== selectionId)
      },
      setColorStyles(state, colors) {
        state.colorStyles = colors
      },
      setSelectedColors(state, colors) {
        const newColors = difference(colors, state.selectedColors)
        const removedColors = difference(state.selectedColors, colors)
        // add any NEW selections to selectionsToReplace
        each(newColors, color => {
          this.commit("addReplacement", color.id)
        })
        // remove anything that's no longer selected from selectionsToReplace
        each(removedColors, color => {
          this.commit("removeReplacement", color.id)
        })
        state.selectedColors = colors
      },
      setThreshold(state, threshold) {
        state.threshold = threshold
      }
    }
  })
}

export default createStore
