import chroma from 'chroma-js'
import { minBy } from 'lodash'
import { ColorListItem, ColorStyle, SelectedColor } from './types'

export const figmaToChroma = (color: RGB): chroma.Color => {
  return chroma(color.r * 255, color.g * 255, color.b * 255)
}

export const figmaToHex = (color: RGB): string => {
  return figmaToChroma(color).hex()
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

// export const replaceColor = (palette: PaletteItem[], selection: SceneNode, distanceCap: number) => {
//   const closestColor = getClosestColor(palette, distanceCap)
//   // @ts-ignore // TODO:
//   selection.fillStyleId = closestColor.id

//   return closestColor.name
// }
