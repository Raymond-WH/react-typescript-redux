const path = require('path')
const pxToViewport = require('postcss-px-to-viewport')
const vw = pxToViewport({
  // 视口宽度，一般就是 375（ 设计稿一般采用二倍稿，宽度为 375 ）
  viewportWidth: 375
})
module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
      '@scss': path.resolve(__dirname, 'src', 'assets', 'styles')
    }
  },
  style: {
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          indent: 'postcss',
          plugins: [vw]
        }
      }
    }
  }
}
