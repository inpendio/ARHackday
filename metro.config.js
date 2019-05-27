/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { assetExts /* , sourceExts */ }
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false
        }
      })
    },
    resolver: {
      assetExts: [
        ...assetExts,
        "obj",
        "mtl",
        "JPG",
        "vrx",
        "hdr",
        "gltf",
        "glb",
        "bin",
        "arobject",
        "gif"
      ]
    }
  };
})();

/* const { getDefaultConfig } = require("metro-config");

module.exports = {
  transformer: {
    getTransformOptions: async () => {
      const {
        resolver: { assetExts }
      } = await getDefaultConfig();
      return {
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false
        },
        resolver: {
          assetExts: [
            ...assetExts,
            "obj",
            "mtl",
            "JPG",
            "vrx",
            "hdr",
            "gltf",
            "glb",
            "bin",
            "arobject",
            "gif"
          ]
          sourceExts: [
            ...sourceExts,
            "obj",
            "mtl",
            "JPG",
            "vrx",
            "hdr",
            "gltf",
            "glb",
            "bin",
            "arobject",
            "gif"
          ]
        }
      };
    }
  }
}; */
