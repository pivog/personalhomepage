const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.jsx",  // Entry point as a .jsx file
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx"],  // Resolve .jsx and .js extensions
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // Handle .js and .jsx files
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",  // Use babel-loader for JS/JSX
            options: {
              presets: [
                "@babel/preset-env",  // Transpile modern JS to older versions
                "@babel/preset-react",  // Transpile JSX to JavaScript
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],  // Handle CSS files
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};

