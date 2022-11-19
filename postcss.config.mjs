// TODO have to include postcss-import manually due to Bootstrap <> postcss-preset-env compat issue
// when using `extendConfig` with the Greenwood PostCSS plugin
// https://github.com/ProjectEvergreen/greenwood/discussions/1002
export default {
  plugins: [
    (await import('postcss-import')).default,
    (await import('postcss-nested')).default
  ]
};