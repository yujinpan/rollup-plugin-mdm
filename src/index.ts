import fs from 'fs';
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
  injectStyle?: string | boolean;
};

const plugin = (options: Options = {}) => {
  options = {
    theme: 'material-lighter',
    className: 'markdown-body',
    ...options,
    injectStyle:
      'injectStyle' in options && !options.injectStyle
        ? ''
        : typeof options.injectStyle === 'string'
        ? options.injectStyle
        : 'github-markdown-css/github-marker-light.css',
  };
  const markdownItPromise = createMarkdownIt(options);
  const pattern = /\.md(\?(html|react|vue))?$/;

  return {
    name: 'rollup-plugin-md-shiki',
    async resolveId(id, importer, options) {
      if (pattern.test(id)) {
        const base = id.replace(pattern, '.md');
        const suffix = id.replace(base, '');
        const resolved = await this.resolve(base, importer, {
          ...options,
          skipSelf: true,
        });
        resolved.id += suffix;
        return resolved;
      }
    },
    load(id: string) {
      if (pattern.test(id)) {
        const base = id.replace(pattern, '.md');
        return fs.readFileSync(base).toString();
      }
    },
    async transform(code: string, id: string) {
      if (pattern.test(id)) {
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
