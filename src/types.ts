import chroma from "chroma-js"

export type ColorStyle = {
  id: string,
  name: string,
  hex: string,
  chroma: chroma.Color,
  figma: RGB
}

// from @figma/plugin-typings
export type RGB = {
  readonly r: number
  readonly g: number
  readonly b: number
}
