// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// This configuration tells Metro how to resolve assets.
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db'
);
config.resolver.assetExts.push(
  // Adds support for `.ttf` files for fonts
  'ttf'
);

module.exports = config;
