declare module '*.md' {
  const html: string;
  export default html;
}

declare module '*.md?html' {
  const html: string;
  export default html;
}
