module.exports = {
  publicPath: "./",
  devServer: {
    disableHostCheck: true,
    proxy: {
      "^/wxgame": {
        target: "http://v3mbke9q0f.52http.tech/maskantactivityapi",
        changeOrigin: true,
      },
    },
  },
};
