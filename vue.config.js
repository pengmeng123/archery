module.exports = {
  publicPath: "./",
  devServer: {
    disableHostCheck: true,
    proxy: {
      "^/wxgame": {
        target: "http://192.168.0.102",
        changeOrigin: true,
      },
    },
  },
};
