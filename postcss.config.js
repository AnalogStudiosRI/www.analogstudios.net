module.exports = {
  plugins: [
    // TODO comment out below for development
    // https://github.com/ProjectEvergreen/greenwood/issues/766
    require('postcss-import'),
    require('postcss-nested')
  ]
};