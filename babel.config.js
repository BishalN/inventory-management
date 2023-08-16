module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      "nativewind/babel",
      "babel-plugin-transform-typescript-metadata",
      "@babel/transform-react-jsx-source",
    ],
  };
};
