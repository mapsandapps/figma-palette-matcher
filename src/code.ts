import chroma from 'chroma-js'

figma.showUI(__html__)

figma.ui.onmessage = (msg) => {
  if (msg.type === "match-color") {
    let color = chroma.hex('#000000').css()
    try {
      color = chroma.hex(msg.color).css()
      console.log(color)
    } catch (e) {
      // TODO: send warning to user
      console.warn('Could not parse color', msg.color)
    }

    // const nodes = [];

    // for (let i = 0; i < msg.count; i++) {
    //   const rect = figma.createRectangle();
    //   rect.x = i * 150;
    //   rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
    //   figma.currentPage.appendChild(rect);
    //   nodes.push(rect);
    // }

    // figma.currentPage.selection = nodes;
    // figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin()
};
