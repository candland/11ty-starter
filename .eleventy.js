const pluginRss = require('@11ty/eleventy-plugin-rss')

module.exports = function (eleventyConfig) {
  // Add a filter using the Config API
  /* eleventyConfig.addFilter( "myFilter", function() {}); */

  eleventyConfig.addNunjucksFilter('keys', function (value) {
    return Object.keys(value)
  })

  eleventyConfig.addNunjucksFilter('isoDate', function (date) {
    return date.toISOString()
  })

  eleventyConfig.addNunjucksFilter('prepend', function (value, pre) {
    return `${pre}${value}`
  })

  eleventyConfig.addNunjucksFilter('firstValue', function (values) {
    return values.find((val) => {
      return val !== null && val !== '' && val !== undefined
    })
  })

	eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addPassthroughCopy('src/favicon.ico')

  // eleventyConfig.addCollection('collections', collection => {
  //   return collection.getFilteredByGlob('_collections/*.md')
  // })

  return {
    dir: {
      input: 'src'
    },
    templateFormats: [
      'html',
      'md',
      'njk'
    ],
    passthroughFileCopy: true
  }
}
