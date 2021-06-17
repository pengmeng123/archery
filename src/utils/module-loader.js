import { camelCase } from "lodash";

/**
 * Dynamic module loader
 * @param {string} context
 * @param {regexp} pattern
 */
const moduleLoader = (context, pattern = /\.js$/) =>
  context.keys().reduce((result, fileName) => {
    const moduleName = fileName.replace(/^\.\//g, "").replace(pattern, "");
    return {
      ...result,
      [camelCase(moduleName)]: context(fileName),
    };
  }, {});

export default moduleLoader;
