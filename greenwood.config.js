import { greenwoodPluginFontAwesome } from '@analogstudiosri/greenwood-plugin-font-awesome';
import { greenwoodPluginTypeScript } from '@greenwood/plugin-typescript';
import { greenwoodPluginImportCss } from '@greenwood/plugin-import-css';
import { greenwoodPluginPostCss } from '@greenwood/plugin-postcss';
import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import dynamicImportVariables from '@rollup/plugin-dynamic-import-vars';

import fs from 'fs';
import path from 'path';

const customCopyPlugins = [{
  type: 'copy',
  name: 'plugin-copy-favicon',
  provider: (compilation) => {
    const fileName = 'favicon.ico';
    const { context } = compilation;
    const faviconPath = path.join(context.userWorkspace, fileName);
    const assets = [];

    if (fs.existsSync(faviconPath)) {
      assets.push({
        from: faviconPath,
        to: path.join(context.outputDir, fileName)
      });
    }

    return assets;
  }
}, {
  type: 'copy',
  name: 'plugin-copy-robots', // and sitemap? - https://developers.google.com/search/docs/advanced/robots/create-robots-txt
  provider: (compilation) => {
    const fileName = 'robots.txt';
    const { context } = compilation;
    const robotsPath = path.join(context.userWorkspace, fileName);
    const assets = [];

    if (fs.existsSync(robotsPath)) {
      assets.push({
        from: robotsPath,
        to: path.join(context.outputDir, fileName)
      });
    }

    return assets;
  }
}];

export default {
  mode: 'spa',
  devServer: {
    proxy: {
      '/api': 'https://www.analogstudios.net'
    }
  },
  plugins: [
    greenwoodPluginPostCss(),
    ...greenwoodPluginImportCss(),
    ...greenwoodPluginFontAwesome(),
    ...greenwoodPluginTypeScript(),
    {
      type: 'rollup',
      name: 'rollup-plugin-import-vars',
      provider: () => {
        return [
          dynamicImportVariables.default()
        ];
      }
    }, {
      type: 'rollup',
      name: 'rollup-plugin-analyzer',
      provider: () => {
        return [
          analyze({
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
          visualizer({
            filename: 'reports/stats.html'
          })
        ];
      }
    },
    ...customCopyPlugins
  ]
};