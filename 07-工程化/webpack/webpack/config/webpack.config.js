const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const productionConfig = require('./webpack.config.prod.js');
const developmentConfig = require('./webpack.config.dev.js');

module.exports = (env) => {
  if (env.production) {
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};
