import chroma from 'chroma-js'

figma.showUI(__html__)

figma.ui.onmessage = (msg) => {
  if (msg.type === "match-color") {
    console.log('figma.getLocalPaintStyles')
    const colorStyles = figma.getLocalPaintStyles()
    console.log(colorStyles)

    console.log('first selection: first fill')
    const rgbArray = figma.currentPage.selection[0].fills[0]
    console.log(rgbArray)

    let color = chroma.hex('#000000').css()
    try {
      color = chroma.hex(msg.color).css()
      console.log(color)
    } catch (e) {
      // TODO: send warning to user
      console.warn('Could not parse color', msg.color)
    }
  }

  figma.closePlugin()
};
