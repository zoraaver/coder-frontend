const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.[fullhash].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MonacoWebpackPlugin({
      languages: ["json", "javascript", "cpp", "ruby"],
    }),
  ],
  devServer: {
    host: "localhost",
    contentBase: "./build",
    port: 3000,
    historyApiFallback: true,
  },
  devtool: "inline-source-map",
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
