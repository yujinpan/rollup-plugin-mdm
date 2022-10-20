import plugin from './index';
import {
  createHtmlModule,
  createReactComponent,
  createVueComponent,
} from './utils';

const transform = plugin().transform;
const code = `## Title

description...

> reference...`;
const injectStyleModule = `import 'github-markdown-css/github-marker-light.css'`;
const html = `\`<h2>Title</h2>
<p>description…</p>
<blockquote>
<p>reference…</p>
</blockquote>\``;

describe('index', () => {
  it('should transform html', async function () {
    const id = '/test.md';
    const result = await transform(code, id);
    expect(result.code).toBe(
      injectStyleModule + '\n\n' + createHtmlModule(html, 'markdown-body'),
    );
  });

  it('should transform react', async function () {
    const id = '/test.md?react';
    const result = await transform(code, id);
    expect(result.code).toBe(
      injectStyleModule + '\n\n' + createReactComponent(html, 'markdown-body'),
    );
  });

  it('should transform vue', async function () {
    const id = '/test.md?vue';
    const result = await transform(code, id);
    expect(result.code).toBe(
      injectStyleModule + '\n\n' + createVueComponent(html, 'markdown-body'),
    );
  });
});
