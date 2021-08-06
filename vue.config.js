// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.optimization.minimize(true); // 开启压缩js代码
    config.optimization.splitChunks({
      // 开启代码分割
      chunks: "all",
    });
    // config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);
    if (process.env.NODE_ENV === "production") {
      config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
    }
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      "^/wxgame": {
        // target: "http://v3mbke9q0f.52http.tech/maskantactivityapi",
        // target: "http://7vrg3p9rc7.52http.tech/maskantactivityapi",
        // target: "http://vz3shuqz9q.cdhttp.cn/maskantactivityapi",
        target: "http://pchl8ygh.dongtaiyuming.net",
        // target: "http://openapi.t.17usoft.net/maskantactivityapi",
        changeOrigin: true,
      },
    },
  },
};
