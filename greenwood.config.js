const rollupPluginAnalyzer = require('rollup-plugin-analyzer');
const rollupPluginVisualizer = require('rollup-plugin-visualizer').default;

module.exports = {
  mode: 'spa',
  devServer: {
    proxy: {
      '/api': 'https://www.analogstudios.net'
    }
  },
  plugins: [{
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
  }]
};