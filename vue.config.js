module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    const imagesRule = config.module.rule("images");
    imagesRule
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 6144 }));
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
