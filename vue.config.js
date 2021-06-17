module.exports = {
  publicPath: "./",
  devServer: {
    disableHostCheck: true,
    proxy: {
      "^/qcc": {
        target: "https://www.kezhaozhao.com",
        changeOrigin: true,
      },
    },
  },
};
