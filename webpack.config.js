const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: {
		app: [
			'./src/static/index.js'
		]
	},

	output: {
		path: path.resolve(__dirname + '/dist'),
		filename: '[name].js',
	},

	module: {
		rules: [
			{
				test:    /\.html$/,
				exclude: /node_modules/,
				loader:  'file-loader?name=[name].[ext]',
			},
			{
				test: /\.css$/,
				loaders: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(sass|scss)$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}, {
					loader: "sass-loader" // compiles Sass to CSS
				}]

			},
      {
        test:    /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use:[
          { loader: 'elm-hot-webpack-loader' },
          { loader:  'elm-webpack-loader',
            options: {
              pathToElm: '/home/dtrckd/.nvm/versions/node/v10.17.0/bin/elm',
              files: [
                path.resolve(__dirname, "src/elm/Main.elm"),
              ],
              debug: false
            },
          },
        ],
      },
    ],

    noParse: /\.elm$/,
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/static/assets', to: 'static' },
      { from: 'data', to: 'data' }
    ],
      { ignore: ['*.swp'] }
    )
  ],

	devServer: {
		inline: true,
		stats: { colors: true },
		proxy: [ // allows redirect of requests to webpack-dev-server to another destination
			{
				context: ['/', '/sku'],  // can have multiple
				target: 'http://localhost:3000', // server and port to redirect to
				secure: false,
			},
		],


	},
};
