CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        { from: "icons", to: "icons" },
        { from: "./manifest.json", to: "manifest.json" }
      ])
    ]
  },
  chainWebpack: config => {
    config.optimization.minimizer("terser").tap(args => {
      args[0].terserOptions.compress.drop_console = true;
      return args;
    });
  }
};
