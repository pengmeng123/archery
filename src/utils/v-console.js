const vConsoleInstance = (options = {}) => {
  if (process.env.NODE_ENV === "development") {
    return import(/* webpackChunkName: "vconsole" */ "vconsole").then(
      ({ default: VConsole }) => {
        return new VConsole(options);
      }
    );
  }
  return Promise.resolve();
};

export default vConsoleInstance;
