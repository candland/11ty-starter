const config = {
  plugins: {
    'tailwindcss': 'tailwind.config.js',
    'postcss-nested': {},
    'autoprefixer': {}
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins['@fullhuman/postcss-purgecss'] = {
    content: ['./build/**/*.html', './build/**/*.svg', './build/**/*.js'],
    extractors: [
      {
        extensions: ['html', 'svg', 'js'],
        extractor: class TailwindExtractor {
          static extract (content) {
            return content.match(/[A-Za-z0-9-_:/]+/g) || []
          }
        }
      }
    ]
  }
}

module.exports = config
