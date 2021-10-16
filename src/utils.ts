import chroma from 'chroma-js'
import { minBy } from 'lodash'

type PaletteItem = {
  id: string,
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

// TODO: types
const drawGrid = (gridEl, colors) => {
  let html = ''
  colors.forEach(color => {
    html += `<div class="color-square" style="background-color: ${color.originalColor};"></div>`
  })
  gridEl.innerHTML = html
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

export const onLaunch = (gridEl) => {
  console.log('onLaunch')
  // TODO: ignore selections with no fill?
  let colors = []
  console.log(figma.currentPage.selection)
  figma.currentPage.selection.map(selection => {
    colors.push({
      originalColor: figmaToChroma(selection.fills[0].color)
    })
  })
  console.log('onLaunch')
  console.log(gridEl)
  drawGrid(gridEl, colors)
}

export const replaceColor = (palette: PaletteItem[], selection: SceneNode, distanceCap: number) => {
  const closestColor = getClosestColor(palette, distanceCap)
  selection.fillStyleId = closestColor.id

  return closestColor.name
}
