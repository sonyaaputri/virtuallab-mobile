const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// pastikan .txt dianggap asset yang bisa di-require
config.resolver.assetExts.push('txt');

module.exports = config;
