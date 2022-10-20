const babel = require('@rollup/plugin-babel');

const rollupPluginMdShiki = require('../../lib/index');

module.exports = {
  input: 'src/main.js',
  output: {
    dir: 'lib',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
    rollupPluginMdShiki({
      injectStyle: true,
    }),
  ],
  external: ['github-markdown-css', 'react'],
};
