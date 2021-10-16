import "./ui.css"
import { onLaunch } from './utils'

const getGrid = () => {
  const gridEl = document.getElementById("grid")
  console.log('getGrid')
  console.log(gridEl)
  onLaunch(gridEl)
}

document.addEventListener("load", () => getGrid())

document.getElementById("match").onclick = () => {
  const textbox = document.getElementById("color") as HTMLInputElement
  parent.postMessage({ pluginMessage: { type: "match-color", color: textbox.value } }, "*")
}

document.getElementById("cancel").onclick = () => {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*")
}
