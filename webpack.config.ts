const path = require('path');
const PugPlugin = require('pug-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.js'
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
    resolve: {
        extensions: ['.ts', '.js', '.json', 'scss']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new PugPlugin({
      pretty: true,
    }),
    new HtmlWebpackPlugin({
      template: './static/index.html',
      filename: 'index.html',
      minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
    module: {
        rules: [
          {
            test: /\.ts$/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-typescript", "@babel/preset-env"],
              },
            },
          },
          {
            test: /\.pug$/,
            oneOf: [
              {
                issuer: /\.(js|ts)$/,
                loader: PugPlugin.loader,
                options: {
                  method: 'compile',
                },
              },
              {
                loader: PugPlugin.loader,
              },
            ],
          },
        {
          test: /\.(png|jpg|jpeg|ico)/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/img/[name].[hash:8][ext]'
          }
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
              options: { outputPath: "css/", name: "[name].min.css" },
            },
            "sass-loader",
          ],
        },
        
      ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    compress: true,
    port: 4000,
  },
};