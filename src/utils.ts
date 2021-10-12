import chroma from 'chroma-js'
import { minBy } from 'lodash'

type PaletteItem = {
  name: string,
  hex: string,
  chroma: chroma.Color,
  figma: {
    r: number,
    g: number,
    b: number
  },
  distance: number
}

export const getClosestColor = (palette: PaletteItem[], distanceCap: number) : PaletteItem => {
  console.log(palette)
  let closest = minBy(palette, 'distance');

  // closest color might not be that close; don't match if it's far
  if (closest.distance > distanceCap) {
    closest = null
    throw('No colors in palette are close to this color')
  }

  return closest
}

export const figmaToChroma = (color: {r: number, g: number, b: number}): chroma.Color => {
  return chroma(color.r * 255, color.g * 255, color.b * 255)
}
