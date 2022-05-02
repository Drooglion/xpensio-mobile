module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          'native-base-theme': './native-base-theme',
          res: './src/res',
          contexts: './src/contexts',
          hooks: './src/hooks',
          library: './src/library',
          models: './src/models',
          types: './src/types',
        },
      },
    ],
  ],
};
