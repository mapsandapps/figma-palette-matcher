import chroma from 'chroma-js'
import { find, minBy } from 'lodash'
import { ColorListItem, ColorStyle, SelectedColor } from './types'

export const figmaToChroma = (color: RGB): chroma.Color => {
  return chroma(color.r * 255, color.g * 255, color.b * 255)
}

export const figmaToHex = (color: RGB): string => {
  return figmaToChroma(color).hex()
}

export const hexToFigma = (color: string): RGB => {
  const chromaColor = chroma(color)

  return {
    r: chromaColor.get('rgb.r') / 255,
    g: chromaColor.get('rgb.g') / 255,
    b: chromaColor.get('rgb.b') / 255
  }
}

export const getClosestColor = (color: SelectedColor, colorStyles: ColorStyle[], threshold: number | null) : ColorListItem => {
  const colorStylesWithDistance = colorStyles.map(colorStyle => {
    return {
      ...colorStyle,
      distance: getDistance(colorStyle.hex, color.hex)
    }
  })
  const closestColorStyle = minBy(colorStylesWithDistance, 'distance')

  const fullColorInfo: ColorListItem = {
    originalColor: color,
    distance: closestColorStyle.distance
  }

  // closest color might not be that close; don't match if it's far
  if (!threshold || closestColorStyle.distance <= threshold) {
    fullColorInfo.closestColorStyle = closestColorStyle
  }

  return fullColorInfo
}

// TODO: possibly color can be a number or maybe other types
// TODO: possibly use in code.ts:78 (getSelections)
export const getColorInfo = (color: string, id: string): SelectedColor => {
  return {
    id,
    hex: chroma(color).hex('rgb'),
    chroma: chroma(color),
    figma: hexToFigma(color),
    opacity: chroma(color).alpha()
  }
}

export const getDistance = (firstHex: string, secondHex: string): number => {
  return chroma.distance(firstHex, secondHex)
}

export const replaceColor = (selections, color) => {
  const matchedSelection = find(selections, ['id', color.originalColor.id])
  matchedSelection.fillStyleId = color.closestColorStyle.id
}
