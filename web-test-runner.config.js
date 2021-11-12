const { defaultReporter } = require('@web/test-runner');
const greenwoodPluginImportCss = require('@greenwood/plugin-import-css/src/index');
const { junitReporter } = require('@web/test-runner-junit-reporter');

// create a direct instance of ImportCssResource
const importCssResource = greenwoodPluginImportCss()[0].provider({});

module.exports = {
  files: './src/**/*.spec.js',
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    reportDir: './reports'
  },
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    junitReporter({
      outputPath: './reports/test-results.xml'
    })
  ],
  plugins: [{
    name: 'import-css',
    async transform(context) {
      const url = importCssResource.getBareUrlPath(context.request.url); // need to remove query strings first
      const shouldIntercept = await importCssResource.shouldIntercept(url, context.body, { request: context.headers });

      if (shouldIntercept) {
        const cssResource = await importCssResource.intercept(url, context.body);
        const { body, contentType } = cssResource;

        return {
          body,
          headers: {
            'content-type': contentType
          }
        };
      }
    }
  }]
};