module.exports = {
  productionSourceMap: false,
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
