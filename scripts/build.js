'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
    throw err;
});

const path = require('path');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');

function build() {

    console.log('Compile start...');
    
    const config = configFactory('production');
    const compiler = webpack(config);


    console.log('Compile starting...');

    return new Promise((resolve, reject) => {

        compiler.run((err, stats) => {
            console.log(err);
            // console.log(stats.toString({
            //     chunks: false,  // Makes the build much quieter
            //     colors: true    // Shows colors in the console
            // }));
            if (stats !== undefined && stats.hasErrors()) {

                console.log(stats.toString({
                    chunks: false,  // Makes the build much quieter
                    colors: true    // Shows colors in the console
                }));

                return reject(stats.compilation.errors)
            }
            if (err) {
                return reject(err)
            }

            ['SIGINT', 'SIGTERM'].forEach(function (sig) {
                process.on(sig, function () {
                    devServer.close();
                    process.exit();
                });
            });

            // compiler.close((closeErr) => {
            //     if(closeErr) {
            //         reject(closeErr)
            //     }
            // });

        })

        return resolve('ok');
    })

}


let buildPromise = build()

buildPromise.then(res => {
    console.log('Compiling successfull!');
})

buildPromise.then(null, err => {
  console.log('Compiling error');

})