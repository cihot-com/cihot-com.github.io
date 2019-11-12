const { log } = console;

const path = require('path');


module.exports = {
	entry: './entry/file.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'my-first-webpack.bundle.js'
	},
	module: {
		rules: [
			{ test: /\.txt$/, use: 'raw-loader' }
		]
	}
};
