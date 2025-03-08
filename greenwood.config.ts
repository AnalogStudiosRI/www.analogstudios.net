import type { Config, ResourcePlugin, Resource, RollupPlugin } from '@greenwood/cli';
import { greenwoodPluginGoogleAnalytics } from '@greenwood/plugin-google-analytics';
import { greenwoodPluginPostCss } from '@greenwood/plugin-postcss';
import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import * as dynamicImportVariables from '@rollup/plugin-dynamic-import-vars';

class ProcessEnvReplaceResource {
  async shouldIntercept(url: URL) {
    return url.pathname.endsWith('redux.mjs');
  }

  async intercept(url: URL, request: Request, response: Response) {
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

const processEneReplaceResourcePlugin: ResourcePlugin = {
  type: 'resource',
  name: 'process-env-replace',
  provider: (): Resource => new ProcessEnvReplaceResource()
}

const customRollupPlugins: RollupPlugin[] = [
  {
    type: 'rollup',
    name: 'rollup-plugin-import-vars',
    provider: () => {
      return [
        dynamicImportVariables.default
      ];
    }
  },
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
    processEneReplaceResourcePlugin,
    ...customRollupPlugins
  ]
}

export default config;