export function createHtmlModule(html: string, className: string) {
  const content = `<div class="${className}">
  ${html.slice(1, -1)}
</div>`;
  return `export default ${content}`;
}

export function createReactComponent(html: string, className: string) {
  return `export default function() {
  return <div className="${className}" dangerouslySetInnerHTML={{__html: ${html}}}></div>;
}`;
}

export function createVueComponent(html: string, className: string) {
  return `export default {
  render(h) {
    h('div', {
      class: '${className}',
      domProps: {
        innerHTML: ${html}
      }
    });
  }
}`;
}
