declare module "*.module.css" {
  const styles: Readonly<Record<string, string>>;
  export default styles;
}

declare module "*.css" {
  const sheet: CSSStyleSheet;

  export default sheet;
}
