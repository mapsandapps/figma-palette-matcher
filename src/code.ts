import chroma from 'chroma-js'
import { figmaToChroma, replaceColor } from './utils'

const DISTANCE_CAP = 25

figma.showUI(__html__)

figma.ui.onmessage = (msg) => {
  if (msg.type === "match-color") {
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
          id: style.id,
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

    const replacedColorName = replaceColor(palette, firstSelection, DISTANCE_CAP)

    figma.closePlugin('Success! ' + replacedColorName)
  }

  figma.closePlugin()
};
