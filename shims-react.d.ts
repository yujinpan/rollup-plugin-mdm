declare module '*.md?react' {
  import type React from 'react';

  const component: () => React.DOMElement<any, any>;
  export default component;
}
