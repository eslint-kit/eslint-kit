export default {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  quoteProps: 'consistent',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
}