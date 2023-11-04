// Typings for .module.scss
declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}
