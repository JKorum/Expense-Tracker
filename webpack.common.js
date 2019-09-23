const path = require(`path`)
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: `./src/app.js`,
	output: {
		path: path.join(__dirname, `public`),
		filename: `bundle.js`
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
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: `css-loader`, options: { sourceMap: true } },
					{ loader: `sass-loader`, options: { sourceMap: true } }					
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `[name].css`,
			chunkFilename: `[id].css`
		})
	]

}