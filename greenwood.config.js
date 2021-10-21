const path = require('path');
const pluginImportCss = require('@greenwood/plugin-import-css');
const pluginPostCss = require('@greenwood/plugin-postcss');
const rollupPluginAnalyzer = require('rollup-plugin-analyzer');
const rollupPluginVisualizer = require('rollup-plugin-visualizer').default;
const { ResourceInterface } = require('@greenwood/cli/src/lib/resource-interface');
const { getNodeModulesLocationForPackage } = require('@greenwood/cli/src/lib/node-modules-utils');

class FontAwesomeResource extends ResourceInterface {
  async shouldResolve(url) {
    const isFontAweome = url.indexOf('fonts/fontawesome-webfont') > 0;

    return Promise.resolve(isFontAweome);
  }

  async resolve(url) {
    const nodeModulesLocation = getNodeModulesLocationForPackage('font-awesome');
    const barePath = this.getBareUrlPath(url);

    return Promise.resolve(path.join(nodeModulesLocation, barePath));
  }
}

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
    ...[{
      type: 'copy',
      name: 'plugin-copy-font-awesome',
      provider: (compilation) => {
        const { outputDir, projectDirectory } = compilation.context;

        return [{
          // can only copy a directory to a directory
          from: path.join(projectDirectory, 'node_modules/font-awesome/fonts'),
          to: path.join(outputDir, 'fonts')
        }];
      }
    }, {
      type: 'resource',
      name: 'plugin-resource-font-awesome',
      provider: (compilation, options) => new FontAwesomeResource(compilation, options)
    }],
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