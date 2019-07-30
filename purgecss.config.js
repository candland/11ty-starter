module.exports = {
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
