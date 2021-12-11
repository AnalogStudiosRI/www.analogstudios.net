import { greenwoodPluginFontAwesome } from '@analogstudiosri/greenwood-plugin-font-awesome';
import { greenwoodPluginTypeScript } from '@greenwood/plugin-typescript';
import { greenwoodPluginImportCss } from '@greenwood/plugin-import-css';
import { greenwoodPluginPostCss } from '@greenwood/plugin-postcss';
import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';

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
    }
  ]
};