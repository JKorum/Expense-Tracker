const path = require(`path`)
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

process.env.NODE_ENV = process.env || 'development'

if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
		require('dotenv').config({ path: '.env.development' })
}

module.exports = {
	entry: ['babel-polyfill', './src/app.js'],
	output: {
		path: path.join(__dirname, `public/dist`),
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
		}),
		new webpack.DefinePlugin({
			'process.env.FIRESTORE_API_KEY': JSON.stringify(process.env.FIRESTORE_API_KEY),
			'process.env.FIRESTORE_AUTH_DOMAIN': JSON.stringify(process.env.FIRESTORE_AUTH_DOMAIN),
			'process.env.FIRESTORE_PROJECT_ID': JSON.stringify(process.env.FIRESTORE_PROJECT_ID)
		})
	]

}