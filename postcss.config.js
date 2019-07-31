const config = {
  plugins: {
    'tailwindcss': 'tailwind.config.js',
    'autoprefixer': {}
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins['@fullhuman/postcss-purgecss'] = {
    content: ['./src/**/*.html', './src/**/*.svg', './src/**/*.js', './src/**/*.njk'],
    extractors: [
      {
        extensions: ['html', 'svg', 'js', 'njk'],
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
