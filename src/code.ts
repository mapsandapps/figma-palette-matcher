import chroma from 'chroma-js'
import { minBy } from 'lodash'

const DISTANCE_CAP = 25

const getClosestColor = (color: chroma.Color, palette) => {
  console.log('getClosestColor')
  let closest = minBy(palette, 'distance');

  // closest color might not be that close; don't match if it's far
  if (closest.distance > DISTANCE_CAP) {
    closest = null
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

    const selectionColor = figma.currentPage.selection[0].fills[0].color

    let color: chroma.Color = chroma('#000000')
    try {
      color = figmaToChroma(selectionColor)
    } catch (e) {
      console.warn('Could not parse color', msg.color)
    }

    const palette = colorStyles.map(style => {
      const styleColor = style.paints[0].color
      return {
        name: style.name,
        hex: figmaToChroma(styleColor).hex(),
        chroma: figmaToChroma(styleColor),
        figma: styleColor,
        distance: chroma.distance(color, figmaToChroma(styleColor), 'rgb')
      }
    })

    const closestColor = getClosestColor(color, palette)
    console.log('closestColor')
    console.log(closestColor)
  }

  figma.closePlugin()
};
