const postcssPresetEnv = require('postcss-preset-env')
const postcssResponsiveType = require('postcss-responsive-type')

module.exports = {
  plugins: [postcssPresetEnv, postcssResponsiveType],
}
