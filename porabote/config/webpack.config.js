const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = webpackEnv => {

  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    context: path.join(__dirname, '../'),
    stats: 'errors-only',
    entry: {
      main: './src/index.js'
    },
    //target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    // watch: true,
    // watchOptions: {
    //   ignored: /node_modules([\\]+|\/)+(?!porabote)/
    // },
    output: {
      path: (isEnvProduction) ? path.join(__dirname, '../build') : path.join(__dirname, '../dist'),
      //path: path.join(__dirname, '../build'),
      filename: '[name].[fullhash].bundle.js',
      publicPath: (isEnvProduction) ? `/porabote` : '/',
    },
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.ttf'],
      alias: {
        '@components': path.resolve(__dirname, '../src/components/'),
        '@hocs': path.resolve(__dirname, '../src/hocs/'),
        '@services': path.resolve(__dirname, '../src/services/'),
        '@configs': path.resolve(__dirname, '../src/configs/'),
        '@styles': path.resolve(__dirname, '../src/styles/'),
      }
    },
    snapshot: {
      managedPaths: [
        path.resolve(__dirname, '../node_modules/porabote')
      ]
    },
    module: {
      rules: [
        // {
        //   test: /\.tsx?$/,
        //   loader: 'ts-loader',
        //   exclude: /(node_modules\/[^porabote]|bower_components)/,
        // },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /(node_modules\/[^porabote]|bower_components)/,
          include: [
            // path.resolve(__dirname, 'index.js'),
            path.resolve(__dirname, '../node_modules/porabote'),
            path.resolve(__dirname, '../src')
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-typescript'],
                ['@babel/preset-env',
                  {
                    "targets": {
                      "esmodules": true
                    }
                  }],
                '@babel/preset-react'
              ]
            }
          }
        },
        {
          test: /\.(less|css)$/,
          use: [
            // {
            //   loader: MiniCssExtractPlugin.loader,
            //   options: {
            //     publicPath: path.join(__dirname, "dist"),
            //   },
            // },
            {
              loader: 'style-loader' // creates style nodes from JS strings
            }, {
              loader: 'css-loader' // translates CSS into CommonJS
            }, {
              loader: 'less-loader' // compiles Less to CSS
            }
          ]
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          loader: 'file-loader',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        }
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.BASENAME': JSON.stringify(process.env.DOMAIN),
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
        'process.env.AUTH_URL': JSON.stringify(process.env.AUTH_URL)
      }),
      new HtmlWebpackPlugin({
        title: 'webpack Boilerplate',
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html',
      }),
      // применять изменения только при горячей перезагрузке
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[fullhash].bundle.css'
      }),
      new CleanWebpackPlugin({
        //cleanOnceBeforeBuildPatterns: (isEnvProduction) ? [path.join(__dirname, "dist/**/*")] : 'test',
      }),
      // new ESLintPlugin({
      //   exclude: ['node_modules' ]
      // })
    ],
    //devtool: isEnvProduction ? false : "inline-source-map",
    devServer: {
      stats: 'errors-only',
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, '../dist'),
      //publicPath: '/'
      open: true,
      compress: true,
      hot: isEnvDevelopment,
      allowedHosts: [
        process.env.DOMAIN,
      ],
      https: true,
      host: process.env.DOMAIN,
      cert: process.env.CERT_PATH,
      key: process.env.KEY_PATH,
      writeToDisk: false,
      before: function (app, server, compiler) {
        console.log('Webpack Server is starting...');
      },
      onListening: function (server) {
        const port = server.listeningApp.address().port;
        console.log('Listening on port:', port);
      },
      clientLogLevel: 'debug',
      after: function (app, server, compiler) {
        //console.log(app)
        // do fancy stuff
      },
      // proxy: {
      //   '/userfiles': 'https://thyssen24.ru',
      // },
    },
  }
}