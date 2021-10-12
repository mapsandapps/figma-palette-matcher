import chroma from 'chroma-js'
import { minBy } from 'lodash'

const DISTANCE_CAP = 25

const getClosestColor = (color: chroma.Color, palette) => {
  let closest = minBy(palette, 'distance');

  // closest color might not be that close; don't match if it's far
  if (closest.distance > DISTANCE_CAP) {
    closest = null
    throw('No colors in palette are close to this color')
  }

  return closest
}

const figmaToChroma = (color: {r: number, g: number, b: number}): chroma.Color => {
  return chroma(color.r * 255, color.g * 255, color.b * 255)
}

figma.showUI(__html__)

figma.ui.onmessage = (msg) => {
  if (msg.type === "match-color") {
    const colorStyles = figma.getLocalPaintStyles()

    let selectionChromaColor: chroma.Color = chroma('#000000')
    let palette
    let selectionFigmaColor

    try {
      selectionFigmaColor = figma.currentPage.selection[0].fills[0].color
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
        const styleColor = style.paints[0].color
        return {
          name: style.name,
          hex: figmaToChroma(styleColor).hex(),
          chroma: figmaToChroma(styleColor),
          figma: styleColor,
          distance: chroma.distance(selectionChromaColor, figmaToChroma(styleColor), 'rgb')
        }
      })
    } catch(e) {
      throw('4e7564c6')
    }

    try {
      const closestColor = getClosestColor(selectionChromaColor, palette)
      console.log('closestColor')
      console.log(closestColor)
    } catch(e) {
      throw('862099a4')
    }
  }

  figma.closePlugin()
};
