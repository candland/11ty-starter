import pluginRss from '@11ty/eleventy-plugin-rss'
import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import markdownItLib from 'markdown-it'
import xmlFiltersPlugin from 'eleventy-xml-plugin'
import fontAwesomePlugin from '@11ty/font-awesome'

const markdownIt = markdownItLib({
  html: true,
  linkify: true
})

export default function (eleventyConfig) {
  function markdownit(content) {
    if (content) {
      const md = markdownIt.render(content)
      return md
    }
    return null
  }
  eleventyConfig.addFilter('markdownit', markdownit)

  function isPresent(val) {
    return val !== null && val !== '' && val !== 'undefined' && val !== undefined
  }

  eleventyConfig.addFilter('keys', function (value) {
    return Object.keys(value)
  })

  eleventyConfig.addFilter('isoDate', function (date) {
    return date.toISOString()
  })

  eleventyConfig.addFilter('displayDate', function (date) {
    return date.toDateString()
  })

  eleventyConfig.addFilter('prepend', function (value, pre) {
    return `${pre}${value}`
  })

  eleventyConfig.addFilter('firstValue', function (values) {
    return values.find((val) => {
      return val !== null && val !== '' && val !== undefined
    })
  })

  eleventyConfig.addFilter('notBlank', function (values) {
    return values.filter(isPresent)
  })

  eleventyConfig.addFilter('isArray', function (arr, idx) {
    if (arr instanceof Array) {
      return arr[idx]
    }
    return arr
  })

  eleventyConfig.addFilter('reject', function (arr, ...args) {
    return arr.filter((v) => !args.includes(v))
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

  function fullUrl(path, rootUrl) {
    if (path.startsWith('http')) {
      return path
    }
    return prepend(path, rootUrl)
  }
  eleventyConfig.addFilter('fullUrl', fullUrl)

  function prepend(value, pre, div = '') {
    return `${pre || ''}${div}${value}`
  }
  eleventyConfig.addFilter('prepend', prepend)

  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(fontAwesomePlugin)
  eleventyConfig.addPlugin(xmlFiltersPlugin)

  eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339)
  eleventyConfig.addLiquidFilter("absoluteUrl", pluginRss.absoluteUrl)
  eleventyConfig.addLiquidFilter("convertHtmlToAbsoluteUrls", pluginRss.convertHtmlToAbsoluteUrls)

  eleventyConfig.addPassthroughCopy('src/favicon.ico')
  eleventyConfig.addPassthroughCopy({ 'src/_assets/images': 'assets/images' })

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: '<!-- more -->'
  })

  eleventyConfig.setLiquidOptions({
    jsTruthy: true,
  })

  return {
    dir: {
      input: 'src'
    },
    markdownTemplateEngine: 'liquid',
    templateFormats: [
      'html',
      'md',
      'liquid'
    ],
    passthroughFileCopy: true
  }
}
