const pluginRss = require('@11ty/eleventy-plugin-rss')

module.exports = function (eleventyConfig) {
  // Add a filter using the Config API
  /* eleventyConfig.addFilter( "myFilter", function() {}); */

  eleventyConfig.addFilter('keys', function (value) {
    return Object.keys(value)
  })

  eleventyConfig.addFilter('isoDate', function (date) {
    return date.toISOString()
  })

  eleventyConfig.addFilter('prepend', function (value, pre) {
    return `${pre}${value}`
  })

  eleventyConfig.addFilter('firstValue', function (values) {
    return values.find((val) => {
      return val !== null && val !== '' && val !== undefined
    })
  })

  eleventyConfig.addFilter('ordered', function (coll) {
    return coll.sort((a, b) => {
      return b.data.order - a.data.order
    })
  })

  eleventyConfig.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  eleventyConfig.addFilter('prevPost', function (current) {
    const items = this.ctx.collections.post
    let index = items.findIndex((el) => {
      return el.url === current.url
    })
    if (index === 0) {
      index = items.length
    }
    return items[index - 1]
  })

  eleventyConfig.addFilter('nextPost', function (current) {
    const items = this.ctx.collections.post
    let index = items.findIndex((el) => {
      return el.url === current.url
    }) + 1
    if (index === (items.length)) {
      index = 0
    }
    return items[index]
  })

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
