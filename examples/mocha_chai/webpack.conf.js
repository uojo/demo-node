var path = require('path')
module.exports = {
  mode: 'development',
  entry: {
		app: ['./index.test.js']
	},
	output: {
		path: path.resolve('dist'),
		filename: '[name].js',
		chunkFilename: '[name].js' // 设置require.ensure 文件名
	}
}
