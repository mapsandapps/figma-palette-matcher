# Palette Matcher

Figma plugin to convert a color to the nearest color in your color styles

The main plugin code is in `src/code.ts`. The HTML for the UI is in
`src/ui.html`, while the embedded JavaScript is in `src/ui.ts`.

These are compiled to files in `dist/`, which are what Figma will use to run
your plugin.

To build:

    $ npm install
    $ npm run build

For dev:

    $ npm install
    $ npm run dev

Use the Figma desktop app and [import the plugin via the plugins menu](https://www.figma.com/plugin-docs/setup/).


## Credits

* [chroma-js](https://vis4.net/chromajs/): color calculations
* [undraw.co](https://undraw.co/): illustrations
