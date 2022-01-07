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
          library: './src/library',
          types: './src/types',
        },
      },
    ],
  ],
};
