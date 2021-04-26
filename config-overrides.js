const { override } = require('customize-cra');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const addCopyPlugin = (config) => {
  config.plugins.push(
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(
            __dirname,
            'node_modules',
            '@zoomus',
            'instantsdk',
            'dist',
            'lib',
          ),
          to: path.resolve(__dirname, 'public', 'lib'),
        }
      ],
    }),
  );
  return config;
};

const addWriteFilePlugin = (config) => {
  config.plugins.push(new WriteFilePlugin());
  config.output.futureEmitAssets = false;
  // https://github.com/gajus/write-file-webpack-plugin/issues/74
  return config;
};

module.exports = override(addCopyPlugin, addWriteFilePlugin);
