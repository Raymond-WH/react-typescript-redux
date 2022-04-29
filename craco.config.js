const path = require('path')
const pxToViewport = require('postcss-px-to-viewport')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
const vw = pxToViewport({
  // 视口宽度，一般就是 375（ 设计稿一般采用二倍稿，宽度为 375 ）
  viewportWidth: 375,
})
module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
      '@scss': path.resolve(__dirname, 'src', 'assets', 'styles'),
    },
    // 配置webpack 的 cdn
    configure: (webpackConfig) => {
      let cdn = {
        js: [],
        css: [],
      }
      whenProd(() => {
        // 如果是生产环境
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM',
          redux: 'Redux',
        }
        cdn = {
          js: [
            'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js',
            'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
            'https://cdn.bootcdn.net/ajax/libs/redux/4.1.0/redux.min.js',
          ],
          css: [],
        }
      })
      // 查找html-webpack-plugin插件
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )
      if (isFound) {
        // 找到了html的插件
        match.userOptions.cdn = cdn
      }
      return webpackConfig
    },
  },
  style: {
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          indent: 'postcss',
          plugins: [vw],
        },
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://geek.itheima.net',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
