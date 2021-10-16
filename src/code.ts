import chroma from 'chroma-js'
import { figmaToChroma, onLaunch, replaceColor } from './utils'

const DISTANCE_CAP = 25

figma.showUI(__html__, {
  width: 450,
  height: Math.round(figma.viewport.bounds.height * 0.8)
})

// figma.on('run', () => {
//   console.log('run')
//   onLaunch()
// })

figma.on('selectionchange', () => {
  console.log('selection changed')
})

figma.ui.onmessage = (message) => {
  console.log('message:')
  console.log(message)
  if (message.type === "match-color") {
    const colorStyles = figma.getLocalPaintStyles()
    console.log(colorStyles)

    let selectionChromaColor: chroma.Color = chroma('#000000')
    let palette
    let firstSelection
    let selectionFigmaColor

    try {
      firstSelection = figma.currentPage.selection[0]
      console.log(firstSelection.fillStyleId)
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

    const threshholdBox = document.getElementById("threshhold") as HTMLInputElement
    const replacedColorName = replaceColor(palette, firstSelection, parseInt(threshholdBox.value) || DISTANCE_CAP)

    figma.closePlugin('Success! ' + replacedColorName)
  }

  figma.closePlugin()
};
