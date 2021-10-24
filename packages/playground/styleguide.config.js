const path = require('path')

module.exports = {
  skipComponentsWithoutExample: true,
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json', {
      shouldRemoveUndefinedFromOptional: true
    }
  ).parse,
  styleguideComponents: {
    LogoRenderer: path.join(__dirname, 'src/styleguide/Logo.js'),
  },
  styles: {
    StyleGuide: {
      '@global body': {
        fontFamily: 'Roboto',
      },
    },
  },
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto',
        },
      ],
    },
  },
  theme: {
    fontFamily: {
      base: '"Roboto", sans-serif',
    },
  },
}
