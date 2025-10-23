module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
    plugins: [
      "expo-router/babel",
      // Reanimated HARUS selalu menjadi yang terakhir
      "react-native-reanimated/plugin",
    ],
  };
};