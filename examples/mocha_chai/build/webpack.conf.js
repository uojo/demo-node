var path = require('path')
module.exports = {
  mode: 'development',
  entry: {
		app: [path.resolve(__dirname,'../test/index.test.js')]
	},
	output: {
		path: path.resolve(__dirname,'../dist'),
		filename: '[name].js',
		chunkFilename: '[name].js' // 设置require.ensure 文件名
	}
}
