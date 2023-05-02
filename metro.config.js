/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    resolver: {
      sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
      assetExts: ['glb', 'gltf', 'png', 'jpg'],
    },
  },
};
