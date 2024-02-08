import {
    Configuration as WebpackConfiguration,
    WatchIgnorePlugin,
} from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import path from 'path';

import commonConfig from './webpack.common.config';

interface IConfiguration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: IConfiguration = {
    mode: 'development',
    output: {
        publicPath: '/',
    },
    entry: { ...commonConfig.entry },
    module: {
        rules: [...commonConfig.rules],
    },
    resolve: { ...commonConfig.resolve },
    plugins: [
        ...commonConfig.plugins,
        new WatchIgnorePlugin({
            paths: [path.join(__dirname, 'src/static')],
        }),
    ],
    devtool: 'inline-source-map',
    optimization: {
        usedExports: true,
        concatenateModules: true,
        minimize: true,
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        watchFiles: ['src/**/*'],
        static: [path.join(__dirname, 'src/static')],
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers':
                'X-Requested-With, content-type, Authorization',
        },
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/[A-Za-z0-9_-]+$/,
                    to: '/',
                },
            ],
        },
        allowedHosts: ['localhost'],
        port: 3000,
        open: ['/'],
        hot: true,
    },
};

export default config;
