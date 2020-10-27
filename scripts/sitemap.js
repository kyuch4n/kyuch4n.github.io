const path = require('path');
const SitemapGenerator = require('sitemap-generator');
const outDir = path.resolve(__dirname, '../build');

// create generator
const generator = SitemapGenerator('https://kyuch4n.github.io/', {
  filepath: path.resolve(outDir, 'sitemap.xml'),
  changeFreq: 'monthly',
  stripQuerystring: false,
});

// register event listeners
generator.on('done', () => {
  // sitemaps created
  console.log('sitemaps created');
});

// start the crawler
generator.start();
