import type { Config, ResourcePlugin, Compilation } from '@greenwood/cli';
import { greenwoodPluginGoogleAnalytics } from '@greenwood/plugin-google-analytics';
import { greenwoodPluginPostCss } from '@greenwood/plugin-postcss';
import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import dynamicImportVariables from '@rollup/plugin-dynamic-import-vars';

class ProcessEnvReplaceResource {
  compilation;

  constructor(compilation: Compilation) {
    this.compilation = compilation;
  }

  async shouldIntercept(url) {
    return url.pathname.endsWith('redux.mjs');
  }

  async intercept(url, request, response) {
    const body = await response.text();
    const env = process.env.__GWD_COMMAND__ === 'develop' ? 'development' : 'production';
    const contents = body.replace(/process.env.NODE_ENV/g, `"${env}"`);

    return new Response(contents, {
      headers: new Headers({
        'Content-Type': 'text/javascript'
      })
    });
  }
}

const config: Config = {
  optimization: 'inline',
  useTsc: true,
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
      provider: (compilation: Compilation) => new ProcessEnvReplaceResource(compilation)
    }
  ]
}

export default config;