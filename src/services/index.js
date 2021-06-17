import moduleLoader from "@/utils/module-loader";

export default moduleLoader(require.context("./modules", false, /\.js$/));
