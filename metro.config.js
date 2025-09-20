const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Workaround para problema do Windows com node:sea
config.resolver = {
  ...config.resolver,
  unstable_enableSyntheticDefaultImports: true,
};

module.exports = config;