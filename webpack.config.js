const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const isPackageJsonExists = require('fs').existsSync('./dist/package.json');

module.exports = {
  mode: 'production',


  entry: "./src/index.ts",
  output: {
    filename: "./index.js",
    libraryTarget: 'umd',
    library: 'winui-react'
  },

  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".js", ".ts", ".tsx", ".css"]
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({ patterns: !isPackageJsonExists ? [
        { from: './package.json', to: 'package.json' },
        { from: './src/winui.css', to: 'winui.css' },
        { from: './src/noise.png', to: 'noise.png' },
        { from: './src/fonts', to: 'fonts' },
      ] : [
        { from: './src/winui.css', to: 'winui.css' },
        { from: './src/noise.png', to: 'noise.png' },
        { from: './src/fonts', to: 'fonts' },
      ]})
  ],

  externals: {
    react: 'react'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /\.module\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.module\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
    ],
  }
}
