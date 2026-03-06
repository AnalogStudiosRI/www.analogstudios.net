import type { Config, RollupPlugin } from '@greenwood/cli';
import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';

const customRollupPlugins: RollupPlugin[] = [
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
  useTsc: true,
  devServer: {
    proxy: {
      '/api': 'https://www.analogstudios.net'
    }
  },
  polyfills: {
    importAttributes: ['css']
  },
  plugins: [
    ...customRollupPlugins
  ]
}

export default config;