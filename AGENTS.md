# AGENTS.md - 11ty Starter Project Guide

## Project Overview

A starter template for building static websites with 11ty, Esbuild, StimulusJS, and TailwindCSS. The project uses ES modules and pnpm for package management.

## Tech Stack

- **11ty** (v3.1.2) - Static site generator with Liquid templating
- **Esbuild** (v0.27.3) - JavaScript bundler
- **TailwindCSS** (v4.2.0) - Utility-first CSS framework
- **StimulusJS** (v3.2.2) - Modest JavaScript framework
- **Font Awesome** (v1.0.1) - Icon library
- **pnpm** - Package manager

## Project Structure

```
.
├── src/                      # Source files
│   ├── _includes/           # Liquid templates (default.liquid, head.liquid, etc.)
│   ├── _assets/
│   │   ├── js/              # JavaScript entry point (index.js)
│   │   ├── css/             # CSS entry point (main.css)
│   │   ├── images/          # Image assets
│   │   └── fonts/           # Font files
│   ├── _data/               # Site data (site.js)
│   ├── posts/               # Blog posts (Markdown files)
│   └── *.liquid             # Page templates
├── build/                   # Production output directory
├── _site/                   # Development output directory
├── eleventy.config.js       # 11ty configuration and filters
└── package.json             # Dependencies and scripts
```

## Development Workflow

### Setup
```bash
pnpm install
```

### Development Server
```bash
pnpm start
```
Runs three processes in parallel:
- **eleventy** - Dev server with hot reload
- **esbuild** - JS bundler in watch mode
- **tailwind** - CSS compilation in watch mode

### Production Build
```bash
pnpm build
```
Builds to `./build/` directory with minification and source maps.

## Key Files

### eleventy.config.js
- Custom filters (markdownit, isoDate, displayDate, prepend, firstValue, etc.)
- Navigation helpers (prevPost, nextPost)
- Plugins: RSS, navigation, Font Awesome, XML
- Input directory: `src/`
- Template formats: HTML, Markdown, Liquid
- Excerpt separator: `<!-- more -->`

### src/_data/site.js
Global site configuration exported as ES module:
- Site metadata (title, description, url, author)
- Social media handles
- Build-time variables
- Site image and language settings

### src/_assets/js/index.js
Stimulus application entry point. Import and register Stimulus controllers here.

### src/_assets/css/main.css
TailwindCSS entry point. TailwindCSS v4 uses CSS-based configuration.

### src/_includes/
Liquid template partials:
- `default.liquid` - Base layout
- `head.liquid` - HTML head section
- `header.liquid` - Site header
- `footer.liquid` - Site footer
- `post.liquid` - Blog post layout
- `page.liquid` - Page layout

## Common Tasks

### Adding a New Page
Create a `.liquid` or `.md` file in `src/` with front matter:
```liquid
---
layout: page
title: Page Title
---
```

### Adding a Blog Post
Create a `.md` file in `src/posts/` with front matter:
```markdown
---
title: Post Title
date: 2024-01-01
tags: post
---
```

### Adding Stimulus Controllers
1. Create controller in `src/_assets/js/controllers/`
2. Import and register in `src/_assets/js/index.js`:
```javascript
import CartController from './controllers/cart_controller.js'
application.register('cart', CartController)
```

### Adding Custom Filters
Add filters in `eleventy.config.js`:
```javascript
eleventyConfig.addFilter('filterName', function(value) {
  return transformedValue
})
```

### Modifying Site Configuration
Edit `src/_data/site.js` to update site metadata, URLs, social links, etc.

## Build Output

- **Development**: Output to `_site/` directory
- **Production**: Output to `build/` directory with minification
- Assets compiled to `/assets/js/` and `/assets/css/`
- Images copied to `/assets/images/`

## Environment Variables

- `ELEVENTY_ENV` - Set to `development` or `production`
- `NODE_ENV` - Set to `production` for minified builds

## Important Notes

- Uses ES modules (`"type": "module"` in package.json)
- Liquid is the default template engine (with `jsTruthy: true` option)
- Markdown files use Liquid for templating
- TailwindCSS v4 doesn't require a separate config file
- PassthroughCopy configured for favicon and images
