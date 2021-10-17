import chroma from 'chroma-js'
import { filter } from 'lodash'
import { ColorStyle, RGB, SelectedColor } from './types'
import { figmaToChroma, figmaToHex } from './utils'

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
  figma.ui.postMessage({
    name: 'colorsFromSelections',
    data: getSelections()
  })
})

figma.on('selectionchange', () => {
  console.log('selection changed')

  figma.ui.postMessage({
    name: 'colorsFromSelections',
    data: getSelections()
  })
})

figma.ui.onmessage = (message) => {
  console.log('message:')
  console.log(message)
  if (message.type === "match-color") {
    let selectionChromaColor: chroma.Color = chroma('#000000')
    let palette
    let firstSelection

    const threshholdBox = document.getElementById("threshhold") as HTMLInputElement
    // const replacedColorName = replaceColor(palette, firstSelection, parseInt(threshholdBox.value) || DISTANCE_CAP)

    // figma.closePlugin('Success! ' + replacedColorName)
  }

  figma.closePlugin()
}

const getColorStyles = (): ColorStyle[] => {
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

const getSelections = (): SelectedColor[] => {
  const selectionsWithFill = filter(figma.currentPage.selection, (selection, i) => {
    // TODO: this possibly should use more than just the first fill
    // TODO: possibly remove ones that already have a color style
    // @ts-ignore
    const color = selection.fills[0].color
    return Boolean(color)
  })

  return selectionsWithFill.map((selection) => {
    // @ts-ignore
    const color = selection.fills[0].color
    return {
      id: selection.id,
      figma: color,
      hex: figmaToHex(color),
      chroma: figmaToChroma(color)
    }
  })
}

