import 'babel-polyfill';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import gulp from 'gulp';
import env from 'gulp-env';
import gutil from 'gulp-util';
import path from 'path';
import named from 'vinyl-named';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackStream from 'webpack-stream';

/* Env variables */
env('.env');

/* Global variables */
const root_dir = './';
const static_dir = root_dir + 'mtlmurals/static/';
const templates_dirs = root_dir + 'mtlmurals/templates/';
const PROD_ENV = gutil.env.production;
const WEBPACK_DEV_SERVER_PORT = process.env.WEBPACK_DEV_SERVER_PORT ? process.env.WEBPACK_DEV_SERVER_PORT : 8080

/* Directories */
var build_dir = PROD_ENV ? static_dir + 'build' : static_dir + 'build_dev';
var sass_dir = static_dir + 'sass';
var js_dir = static_dir + 'js';


/*
 * Global webpack config
 * ~~~~~~~~~~~~~~~~~~~~~
 */

let extractCSS = new ExtractTextPlugin('css/[name].css', { allChunks: true });
var webpackConfig = {
  output: {
    filename: 'js/[name].js',
  },
  resolve: {
    modulesDirectories: ['node_modules', ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json', 'scss'],
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.scss$/i, loader: extractCSS.extract(['css','sass'], { publicPath: '../'}) },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.txt$/, loader: 'raw-loader' },
      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)([\?]?.*)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(eot|ttf|wav|mp3|otf)([\?]?.*)$/, loader: 'file-loader' },
    ],
  },
  plugins: [
    extractCSS,
    ...(PROD_ENV ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ] : []),
  ],
};


/*
 * Webpack task
 * ~~~~~~~~~~~~
 */

/* Task to build our JS and CSS applications. */
gulp.task('build-webpack-assets', function () {
  return gulp.src([
        js_dir + '/App.js',
        sass_dir + '/App.scss',
      ])
    .pipe(named())
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(build_dir));
});


/*
 * Global tasks
 * ~~~~~~~~~~~~
 */

gulp.task('build', ['build-webpack-assets', ]);


/*
 * Development tasks
 * ~~~~~~~~~~~~~~~~~
 */

gulp.task('webpack-dev-server', function(callback) {
  var devWebpackConfig = Object.create(webpackConfig);
  devWebpackConfig.devtool = 'eval';
  devWebpackConfig.debug = true;
  devWebpackConfig.devServer = { hot: true };
  devWebpackConfig.entry = {
    App: [
      js_dir + '/App.js', sass_dir + '/App.scss',
      'webpack-dev-server/client?http://localhost:' + WEBPACK_DEV_SERVER_PORT,
      'webpack/hot/only-dev-server',
    ],
  };
  devWebpackConfig.module = {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.scss$/i, loaders: ['style', 'css', 'sass', ] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.txt$/, loader: 'raw-loader' },
      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)([\?]?.*)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(eot|ttf|wav|mp3|otf)([\?]?.*)$/, loader: 'file-loader' },
    ],
  };
  devWebpackConfig.output = {
    path: path.resolve(__dirname, static_dir),
    publicPath: 'http://localhost:' + WEBPACK_DEV_SERVER_PORT + '/static/',
    filename: 'js/[name].js'
  };
  devWebpackConfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
  ];

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(devWebpackConfig), {
    contentBase: path.resolve(__dirname, static_dir, '..'),
    publicPath: '/static/',
    hot: true,
    inline: true,
  }).listen(WEBPACK_DEV_SERVER_PORT, 'localhost', function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log(
      '[webpack-dev-server]',
      'http://localhost:' + WEBPACK_DEV_SERVER_PORT + '/webpack-dev-server/');
  });
});
