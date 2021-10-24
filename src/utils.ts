import chroma from 'chroma-js'
import { find, minBy } from 'lodash'
import { ColorListItem, ColorStyle, LightDarkEnum, SelectedColor } from './types'

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

export const getClosestColor = (color: SelectedColor, colorStyles: ColorStyle[], threshhold: number) : ColorListItem => {
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
  if (closestColorStyle.distance <= threshhold) {
    fullColorInfo.closestColorStyle = closestColorStyle
  }

  return fullColorInfo
}

export const getDistance = (firstHex: string, secondHex: string): number => {
  return chroma.distance(firstHex, secondHex)
}

export const getLightVsDark = (hex: string): LightDarkEnum => {
  return chroma(hex).get('lab.l') < 70 ? LightDarkEnum.Dark : LightDarkEnum.Light
}

export const replaceColor = (selections, color) => {
  const matchedSelection = find(selections, ['id', color.originalColor.id])
  matchedSelection.fillStyleId = color.closestColorStyle.id
}
