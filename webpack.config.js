const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/practice.js',  // 실행 시킬 코드 파일이 맞는 지 확인하기
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  devServer: {
    publicPath: '/public/',
    compress: true,
    port: 9000,
    hot: true,
  },
}
