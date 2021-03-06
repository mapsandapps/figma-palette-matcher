import chroma from "chroma-js"

export type ColorListItem = {
  originalColor: SelectedColor
  closestColorStyle?: ColorStyle
  distance: number
}

export type ColorStyle = {
  id: string,
  name: string,
  hex: string,
  chroma: chroma.Color,
  figma: RGB,
  opacity: number
}

export type SelectedColor = {
  id: string,
  hex: string,
  chroma: chroma.Color,
  figma: RGB,
  opacity: number
}

// from @figma/plugin-typings
export type RGB = {
  readonly r: number
  readonly g: number
  readonly b: number
}
