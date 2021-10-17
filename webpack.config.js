const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')
const webpack = require('webpack')

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/ui.ts', // The entry point for your UI code
    code: './src/code.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      // // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      // {
      //   test: /\.(png|jpg|gif|webp|svg|zip)$/,
      //   loader: 'url-loader'
      // },

      {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
      },

      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

  output: {
    clean: true,
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    publicPath: 'dist',
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new webpack.DefinePlugin({
      'global': {} // Fix missing symbol error when running in developer VM
    }),
    new HtmlWebpackPlugin({
      cache: false,
      chunks: ['ui'],
      filename: 'ui.html',
      inject: 'body',
      inlineSource: '.(js)$',
      template: './src/ui.html'
    }),
    new HtmlInlineScriptPlugin([
        /ui.js$/
    ]),
    new VueLoaderPlugin(),
  ],
})
