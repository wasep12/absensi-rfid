const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.jsx", // Sesuaikan dengan entry point proyek Anda
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      assetModuleFilename: "assets/[hash][ext][query]",
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|gif|svg|jpeg|webp)$/,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html", // Sesuaikan dengan file HTML Anda
      }),
      new CleanWebpackPlugin(),
    ],
    optimization: isProduction
      ? {
          minimize: true,
          minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
          splitChunks: {
            chunks: "all",
          },
        }
      : {},
    devServer: {
      static: path.resolve(__dirname, "dist"),
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true, // Untuk SPA, agar navigasi tidak memuat ulang halaman.
    },
  };
};
