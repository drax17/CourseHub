module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  jsxSingleQuote: false,
  endOfLine: 'lf',
  newLine: 'lf',
  overrides: [
    // override the above settings for specific file types
    {
      files: '*.json',
      options: {
        printWidth: 220,
      },
    },
  ],
};
