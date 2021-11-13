const greenwoodPluginFontAwesome = require('greenwood-plugin-font-awesome');
const pluginImportCss = require('@greenwood/plugin-import-css');
const pluginPostCss = require('@greenwood/plugin-postcss');
const rollupPluginAnalyzer = require('rollup-plugin-analyzer');
const rollupPluginVisualizer = require('rollup-plugin-visualizer').default;

module.exports = {
  mode: 'spa',
  devServer: {
    proxy: {
      '/api': 'https://www.analogstudios.net'
    }
  },
  plugins: [
    pluginPostCss(),
    ...pluginImportCss(),
    ...greenwoodPluginFontAwesome(),
    {
      type: 'copy',
      name: 'plugin-copy-font-awesome',
      provider: (compilation) => {
        const { outputDir, projectDirectory } = compilation.context;

        return [{
          from: path.join(projectDirectory, 'node_modules/font-awesome/fonts'),
          to: path.join(outputDir, 'fonts')
        }];
      }
    },
    {
      type: 'rollup',
      name: 'rollup-plugin-analyzer',
      provider: () => {
        return [
          rollupPluginAnalyzer({
            summaryOnly: true,
            filter: (module) => {
              return !module.id.endsWith('.html');
            }
          })
        ];
      }
    }, {
      type: 'rollup',
      name: 'rollup-plugin-visualizer',
      provider: () => {
        return [
          rollupPluginVisualizer({
            filename: 'reports/stats.html'
          })
        ];
      }
    }
  ]
};