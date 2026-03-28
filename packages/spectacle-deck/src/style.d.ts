// Typings for CSS modules
declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}
