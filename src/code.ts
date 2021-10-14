import chroma from 'chroma-js'
import { cloneDeep } from 'lodash'
import { figmaToChroma, getClosestColor } from './utils'

const DISTANCE_CAP = 25

const colorStyles = figma.getLocalPaintStyles()

let selectionChromaColor: chroma.Color = chroma('#000000')
let palette
let firstSelection
let selectionFigmaColor

try {
  firstSelection = figma.currentPage.selection[0]
  selectionFigmaColor = firstSelection.fills[0].color
} catch(e) {
  throw('Selection does not exist or has no fill')
}

try {
  selectionChromaColor = figmaToChroma(selectionFigmaColor)
} catch (e) {
  throw('Could not parse color')
}

try {
  palette = colorStyles.map(style => {
    // @ts-ignore
    const styleColor = style.paints[0].color
    return {
      name: style.name,
      hex: figmaToChroma(styleColor).hex(),
      chroma: figmaToChroma(styleColor),
      figma: styleColor,
      distance: chroma.distance(selectionChromaColor, figmaToChroma(styleColor))
    }
  })
} catch(e) {
  throw('4e7564c6')
}

const closestColor = getClosestColor(palette, DISTANCE_CAP)
const newFills = cloneDeep(firstSelection.fills)
newFills[0].color = closestColor.figma
firstSelection.fills = newFills

figma.closePlugin('Success! ' + closestColor.name)
