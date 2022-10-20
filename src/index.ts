import MarkdownIt from 'markdown-it';
import * as shiki from 'shiki';

import type { Options as MarkdownItOptions } from 'markdown-it';
import type { Theme } from 'shiki';

import {
  createHtmlModule,
  createReactComponent,
  createVueComponent,
} from './utils';

export type Options = Omit<MarkdownItOptions, 'html' | 'highlight'> & {
  theme?: Theme;
  className?: string;
  injectStyle?: string;
};

const plugin = (options: Options = {}) => {
  options = {
    theme: 'material-lighter',
    className: 'markdown-body',
    injectStyle: 'github-markdown-css/github-marker-light.css',
    ...options,
  };
  const markdownItPromise = createMarkdownIt(options);

  return {
    name: 'rollup-plugin-md-shiki',
    async transform(code: string, id: string) {
      const raw = await markdownItPromise.then((markdownIt) =>
        markdownIt.render(code).trim(),
      );
      const html = `\`${raw}\``;
      const injectStyleModule = options.injectStyle
        ? `import '${options.injectStyle}'`
        : '';
      let defaultModule = '';

      if (/\.md(\?html)?$/.test(id)) {
        defaultModule = createHtmlModule(html, options.className);
      } else if (/\.md(\?react)$/.test(id)) {
        defaultModule = createReactComponent(html, options.className);
      } else if (/\.md(\?vue)$/.test(id)) {
        defaultModule = createVueComponent(html, options.className);
      }

      if (defaultModule) {
        return {
          code: injectStyleModule + '\n\n' + defaultModule,
        };
      }
    },
  };
};

export default plugin;

export function createMarkdownIt(options: Options) {
  return shiki
    .getHighlighter({
      theme: options.theme,
    })
    .then((highlighter) => {
      return new MarkdownIt({
        linkify: true,
        typographer: true,
        ...options,
        html: true,
        highlight: (code, lang) => {
          return highlighter.codeToHtml(code, { lang });
        },
      });
    });
}
