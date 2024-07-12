import { greenwoodPluginFontAwesome } from '@analogstudiosri/greenwood-plugin-font-awesome';
import { greenwoodPluginGoogleAnalytics } from '@greenwood/plugin-google-analytics';
import { greenwoodPluginTypeScript } from '@greenwood/plugin-typescript';
import { greenwoodPluginPostCss } from '@greenwood/plugin-postcss';
import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import dynamicImportVariables from '@rollup/plugin-dynamic-import-vars';

export default {
  optimization: 'inline',
  devServer: {
    proxy: {
      '/api': 'https://www.analogstudios.net'
    }
  },
  plugins: [
    greenwoodPluginPostCss(),
    greenwoodPluginFontAwesome(),
    greenwoodPluginTypeScript(),
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
    greenwoodPluginGoogleAnalytics({
      analyticsId: 'UA-69272660-1'
    }),
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
    }
  ]
};