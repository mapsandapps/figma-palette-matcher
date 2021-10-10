import "./ui.css"

document.getElementById("match").onclick = () => {
  const textbox = document.getElementById("color") as HTMLInputElement
  parent.postMessage({ pluginMessage: { type: "match-color", color: textbox.value } }, "*")
};

document.getElementById("cancel").onclick = () => {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*")
};
