import Vuex from 'vuex'
import { difference, each, filter, find, map } from 'lodash'
import { getClosestColor } from './utils'
import { ColorStyle } from './types'

const createStore = () => {
  return new Vuex.Store({
    state: {
      colorStyles: [],
      selectedColors: [],
      selectionsToReplace: [], // TODO: perhaps rename plannedReplacements
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
        // remove any planned replacements that were removed from selection and add any new selections to planned replacements
        this.commit("updatePlannedReplacements", {
          oldSelections: state.selectedColors,
          newSelections: colors
        })

        state.selectedColors = colors
      },
      setThreshold(state, threshold) {
        state.threshold = threshold
      },
      updatePlannedReplacements(state, { oldSelections, newSelections }) {
        // gets called when selections change

        const oldIDs = map(oldSelections, 'id')
        const newIDs = map(newSelections, 'id')

        const addedColors: ColorStyle[] = difference(newIDs, oldIDs)
        const removedColors: ColorStyle[] = difference(oldIDs, newIDs)

        // add any NEW selections to selectionsToReplace
        each(addedColors, id => {
          this.commit("addReplacement", id)
        })

        // remove anything that's no longer selected from selectionsToReplace
        each(removedColors, id => {
          this.commit("removeReplacement", id)
        })
        // TODO: i don't think a selection should be in selectionsToReplace if there's no match
        // TODO: make sure it gets removed if threshold changes, not just when de/selecting
      }
    }
  })
}

export default createStore
