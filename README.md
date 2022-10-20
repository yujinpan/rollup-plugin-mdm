# rollup-plugin-mdm

Import markdown module for rollup & vite.

## Usage

`npm i -D rollup-plugin-mdm`

rollup.config.js

```js
const mdm = require('rollup-plugin-mdm');

module.exports = {
  plugins: [
    mdm()
  ]
}
```

### import as html

- input

```js
export { default as html } from './test.md';
```

- output

```js
import 'github-markdown-css/github-marker-light.css';

var test = `<div class="markdown-body">
<h2>Title</h2>
<p>description…</p>
</div>`;

export { test as html };
```

### import as react

- input

```js
export { default as react } from './test.md?react';
```

- output

```js
import 'github-markdown-css/github-marker-light.css';
import { createElement } from 'react';

function test$1() {
  return createElement(
    'div', 
    { 
      className: 'markdown-body',
      dangerouslySetInnerHTML: {
        __html: `<h2>Title</h2>
<p>description…</p>`
      }
    }
  );
}

export { test$1 as react };
```

### import as vue

- input

```js
export { default as vue } from './test.md?vue';
```

- output

```js
import 'github-markdown-css/github-marker-light.css';

var test = {
  render(h) {
    h('div', {
      class: 'markdown-body',
      domProps: {
        innerHTML: `<h2>Title</h2>
<p>description…</p>`
      }
    });
  }
};

export { test as vue };
```

## Options

Inherit from [markdown-it#Options](https://markdown-it.github.io/markdown-it/#MarkdownIt.new).

- codeTheme

Inherit from [shiki/themes](https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes)

```ts
export type Theme =
  | 'css-variables'
  | 'dark-plus'
  | 'dracula-soft'
  | 'dracula'
  | 'github-dark-dimmed'
  | 'github-dark'
  | 'github-light'
  | 'hc_light'
  | 'light-plus'
  | 'material-darker'
  | 'material-default'
  | 'material-lighter'
  | 'material-ocean'
  | 'material-palenight'
  | 'min-dark'
  | 'min-light'
  | 'monokai'
  | 'nord'
  | 'one-dark-pro'
  | 'poimandres'
  | 'rose-pine-dawn'
  | 'rose-pine-moon'
  | 'rose-pine'
  | 'slack-dark'
  | 'slack-ochin'
  | 'solarized-dark'
  | 'solarized-light'
  | 'vitesse-dark'
  | 'vitesse-light'
```

- className

The container class name, default is `markdown-body` (github css).

- injectStyle

Inject markdown style, default is `'github-markdown-css/github-marker-light.css'`, set false remove it.
