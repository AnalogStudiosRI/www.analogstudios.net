const { defaultReporter } = require('@web/test-runner');
const greenwoodPluginImportCss = require('@greenwood/plugin-import-css/src/index');
const greenwoodPluginTypeScript = require('@greenwood/plugin-typescript');
const { junitReporter } = require('@web/test-runner-junit-reporter');
const path = require('path');
const { puppeteerLauncher } = require('@web/test-runner-puppeteer');

// create a direct instance of ImportCssResource
const importCssResource = greenwoodPluginImportCss()[0].provider({});

// create a direct instance of TypeScriptResource
const typeScriptResource = greenwoodPluginTypeScript()[0].provider({
  context: {
    projectDirectory: process.cwd()
  }
});

module.exports = {
  files: './src/**/*.spec.js',
  nodeResolve: true,
  mimeTypes: {
    '**/*.ts': 'js'
  },
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
  browsers: [
    puppeteerLauncher({
      launchOptions: {
        headless: true,
        devtools: false
      }
    })
  ],
  plugins: [{
    name: 'transpile-typescript',
    async transform(context) {
      const { url } = context.request;

      if (url.endsWith('.ts')) {
        const resource = await typeScriptResource.serve(path.join(process.cwd(), url));
        // https://github.com/ProjectEvergreen/greenwood/issues/661
        const body = resource.body.replace(/\/\/# sourceMappingURL=module.js.map/, '');

        return {
          body,
          type: 'js'
        };
      }
    }
  }, {
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