import { filter } from 'lodash'
import { ColorStyle, RGB, SelectedColor } from './types'
import { figmaToChroma, figmaToHex, replaceColor } from './utils'

figma.showUI(__html__, {
  width: 450,
  height: 450
  // height: Math.round(figma.viewport.bounds.height * 0.8) // FIXME: this was sometimes getting a value 2x the actual?
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
  if (message.name === 'closePlugin') {
    figma.closePlugin(message.data)
  }
  if (message.name === 'replaceColor') {
    replaceColor(figma.currentPage.selection, message.data)
  }
}

const getColorStyles = (): ColorStyle[] => {
  // FIXME: can there be more than one style.paints? presumably so.
  // TODO: what to do if style.paints[n].type !== 'SOLID'?
  const colorStyles = filter(figma.getLocalPaintStyles(), (style) => {
    return style.paints[0].type === 'SOLID'
  })

  return colorStyles.map(style => {
    // @ts-ignore
    const styleColor: RGB = style.paints[0].color
    const colorStyle: ColorStyle = {
      id: style.id,
      name: style.name,
      hex: figmaToChroma(styleColor).hex(),
      chroma: figmaToChroma(styleColor),
      figma: styleColor,
      opacity: style.paints[0].opacity
    }
    return colorStyle
  })
}

const getSelections = (): SelectedColor[] => {
  const selectionsWithFill = filter(figma.currentPage.selection, (selection, i) => {
    // TODO: possibly remove ones that already have a color style
    // @ts-ignore
    if (!selection.fills || selection.fills.length < 1) return

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
      chroma: figmaToChroma(color),
      // @ts-ignore
      opacity: selection.fills[0].opacity
    }
  })
}

