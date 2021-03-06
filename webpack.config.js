const path = require("path");
const fs = require("fs");
const Webpack = require("webpack");
const Glob = require("glob");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const IconfontPlugin = require('iconfont-plugin-webpack');

const configurator = {
    entries: function () {
        var entries = {
            application: [
                './assets/css/application.scss',
            ],
        }

        Glob.sync("./assets/*/*.*").forEach((entry) => {
            if (entry === './assets/css/application.scss') {
                return
            }

            let key = entry.replace(/(\.\/assets\/(src|js|css|go)\/)|\.(ts|js|s[ac]ss|go)/g, '')
            if (key.startsWith("_") || (/(ts|js|s[ac]ss|go)$/i).test(entry) == false) {
                return
            }

            if (entries[key] == null) {
                entries[key] = [entry]
                return
            }

            entries[key].push(entry)
        })
        return entries
    },

    plugins() {
        var plugins = [
            new CleanObsoleteChunks(),
            new IconfontPlugin({
                src: './assets/svg/',
                family: 'iconfont',
                dest: {
                    font: './assets/icon/[family].[type]',
                    css: './assets/css/_[family].scss'
                },
                watch: {
                    pattern: './svg/**/*.svg',
                    cwd: undefined
                }
            }),
            new MiniCssExtractPlugin({filename: "[name].css"}),
            new CopyWebpackPlugin([{from: "./assets", to: ""}], {
                copyUnmodified: true,
                ignore: ["css/**", "js/**", "src/**"]
            }),
            new Webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
            new ManifestPlugin({fileName: "manifest.json"}),
            new VueLoaderPlugin(),
        ];

        return plugins
    },

    moduleOptions: function () {
        return {
            rules: [
                {
                    test: /\.vue/,
                    loader: "vue-loader"
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {loader: "css-loader", options: {sourceMap: true, url: false}},
                        {loader: "sass-loader", options: {sourceMap: true}}
                    ]
                },
                {test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/},
                {test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/},
                {test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader"},
                {test: /\.go$/, use: "gopherjs-loader"}
            ]
        }
    },

    buildConfig: function () {
        // NOTE: If you are having issues with this not being set "properly", make
        // sure your GO_ENV is set properly as `buffalo build` overrides NODE_ENV
        // with whatever GO_ENV is set to or "development".
        const env = process.env.NODE_ENV || "development";

        var config = {
            mode: env,
            entry: configurator.entries(),
            output: {
                filename: (chunkData) => {
                    return chunkData.chunk.name === 'serviceWorker' ? '../../templates/[name].js': '[name].[contenthash].js';
                },
                path: path.resolve(__dirname, 'public', 'assets'),
                chunkFilename: 'chunk.[id].js',
                publicPath: '../assets/',
            },
            plugins: configurator.plugins(),
            module: configurator.moduleOptions(),
            resolve: {
                alias: {
                    vue$: `${__dirname}/node_modules/vue/dist/vue.esm.js`,
                    router$: `${__dirname}/node_modules/vue-router/dist/vue-router.esm.js`
                },
                extensions: ['.ts', '.js', '.json']
            }
        }

        if (env === "development") {
            config.plugins.push(new LiveReloadPlugin({appendScriptTag: true}))
            return config
        }

        const uglifier = new UglifyJsPlugin({
            uglifyOptions: {
                beautify: true,
                mangle: {keep_fnames: true},
                output: {comments: false},
                compress: {}
            }
        })

        config.optimization = {
            minimizer: [uglifier],
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]vue[\\/]/,
                        chunks: "all",
                    }
                }
            }
        }

        return config
    }
}

module.exports = configurator.buildConfig()
