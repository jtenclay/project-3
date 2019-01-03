var path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        neat: path.resolve(__dirname, './node_modules/bourbon-neat/core'),
        styles: path.resolve(__dirname, './src/styles')
      }
    }
  }
}
