import { greenwoodPluginFontAwesome } from '@analogstudiosri/greenwood-plugin-font-awesome';
import { greenwoodPluginGoogleAnalytics } from '@greenwood/plugin-google-analytics';
import { greenwoodPluginTypeScript } from '@greenwood/plugin-typescript';
import { greenwoodPluginPostCss } from '@greenwood/plugin-postcss';
import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import dynamicImportVariables from '@rollup/plugin-dynamic-import-vars';
import { ResourceInterface } from '@greenwood/cli/src/lib/resource-interface.js';

class ProcessEnvReplaceResource extends ResourceInterface {
  constructor(compilation) {
    super();

    this.compilation = compilation;
  }

  async shouldIntercept(url) {
    return url.pathname.endsWith('redux.mjs');
  }

  async intercept(url, request, response) {
    const body = await response.text();
    const env = process.env.__GWD_COMMAND__ === 'develop' ? 'development' : 'production'; // eslint-disable-line no-underscore-dangle
    const contents = body.replace(/process.env.NODE_ENV/g, `"${env}"`);

    return new Response(contents, {
      headers: new Headers({
        'Content-Type': 'text/javascript'
      })
    });
  }
}

export default {
  optimization: 'inline',
  devServer: {
    proxy: {
      '/api': 'https://www.analogstudios.net'
    }
  },
  polyfills: {
    importAttributes: ['css', 'json']
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
    }, {
      type: 'resource',
      name: 'process-env-replace',
      provider: (compilation) => new ProcessEnvReplaceResource(compilation)
    }
  ]
};