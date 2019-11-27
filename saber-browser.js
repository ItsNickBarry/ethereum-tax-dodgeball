export default function (context) {
  let pkg = require('./package.json');

  context.setHead({
    title: 'Ethereum Tax Dodgeball',
    meta: [
      { name: 'author', content: pkg.author },
      { name: 'description', content: pkg.description },
      { name: 'keywords', content: pkg.keywords.join(', ') },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: 'images/favicon.ico' },
    ],
  });
}
