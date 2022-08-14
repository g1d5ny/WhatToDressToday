const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    // 1
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    // transformer: {
    //   getTransformOptions: async () => ({
    //     transform: {
    //       experimentalImportSupport: false,
    //       inlineRequires: true,
    //     },
    //   }),
    //   babelTransformerPath: require.resolve("react-native-svg-transformer"),
    // },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();
