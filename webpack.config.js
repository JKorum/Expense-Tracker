const path = require(`path`)

module.exports = {
	entry: `./src/app.js`,
	output: {
		path: path.join(__dirname, `public`),
		filename: `bundle.js`
	},
	mode: `development`,
	devtool: `cheap-module-eval-source-map`,
	devServer: {
		contentBase: path.join(__dirname, `public`),
		compress: true,
		port: 3001,
		historyApiFallback: true
	},
	module: {
		rules: [
			{ 				 
				test: /\.js$/, 
				exclude: /node_modules|bower_components/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [`@babel/preset-env`, `@babel/preset-react`]
					}
				} 
			},
			{
				test: /\.s?css$/,
				use: [`style-loader`, `css-loader`, `sass-loader`]
			}

		]
	}	
}