import chroma from 'chroma-js'
import { filter } from 'lodash'
import { figmaToChroma, replaceColor } from './utils'

const DISTANCE_CAP = 25

figma.showUI(__html__, {
  width: 450,
  height: Math.round(figma.viewport.bounds.height * 0.8)
})

figma.on('run', () => {
  figma.ui.postMessage({
    name: 'colorsFromLocalStyles',
    data: getColorStyles()
})

})

figma.on('selectionchange', () => {
  console.log('selection changed')
})

figma.ui.onmessage = (message) => {
  console.log('message:')
  console.log(message)
  if (message.type === "match-color") {
    let selectionChromaColor: chroma.Color = chroma('#000000')
    let palette
    let firstSelection
    let selectionFigmaColor

    try {
      firstSelection = figma.currentPage.selection[0]
      // @ts-ignore // TODO:
      console.log(firstSelection.fillStyleId)
      // @ts-ignore // TODO:
      selectionFigmaColor = firstSelection.fills[0].color
    } catch(e) {
      throw('Selection does not exist or has no fill')
    }

    try {
      selectionChromaColor = figmaToChroma(selectionFigmaColor)
    } catch (e) {
      throw('Could not parse color')
    }

    const threshholdBox = document.getElementById("threshhold") as HTMLInputElement
    const replacedColorName = replaceColor(palette, firstSelection, parseInt(threshholdBox.value) || DISTANCE_CAP)

    figma.closePlugin('Success! ' + replacedColorName)
  }

  figma.closePlugin()
}

const getColorStyles = () => {
  const colorStyles = filter(figma.getLocalPaintStyles(), (style) => {
    // TODO: possibly should also check that opacity is 100%?
    return style.paints[0].type === 'SOLID'
  })

  return colorStyles.map(style => {
    const styleColor = style.paints[0].color
    return {
      id: style.id,
      name: style.name,
      hex: figmaToChroma(styleColor).hex(),
      chroma: figmaToChroma(styleColor),
      figma: styleColor
    }
  })
}

