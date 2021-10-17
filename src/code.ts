import chroma from 'chroma-js'
import { filter } from 'lodash'
import { ColorStyle, RGB } from './types'
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

const getColorStyles = (): Array<ColorStyle> => {
  const colorStyles = filter(figma.getLocalPaintStyles(), (style) => {
    return style.paints[0].type === 'SOLID' && style.paints[0].opacity === 1
  })

  return colorStyles.map(style => {
    // @ts-ignore
    const styleColor: RGB = style.paints[0].color
    const colorStyle: ColorStyle = {
      id: style.id,
      name: style.name,
      hex: figmaToChroma(styleColor).hex(),
      chroma: figmaToChroma(styleColor),
      figma: styleColor
    }
    return colorStyle
  })
}

