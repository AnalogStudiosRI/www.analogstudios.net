import { defaultReporter } from '@web/test-runner';
import { greenwoodPluginImportCss } from '@greenwood/plugin-import-css/src/index.js';
import { greenwoodPluginTypeScript } from '@greenwood/plugin-typescript/src/index.js';
import { junitReporter } from '@web/test-runner-junit-reporter';
import path from 'path';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';

// create a direct instance of ImportCssResource
const importCssResource = greenwoodPluginImportCss()[0].provider({});

// create a direct instance of TypeScriptResource
const typeScriptResource = greenwoodPluginTypeScript()[0].provider({
  context: {
    projectDirectory: process.cwd()
  }
});

export default {
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
      const customHeaders = {
        request: {
          originalUrl: url,
          ...context.headers
        }
      };
      const shouldIntercept = await importCssResource.shouldIntercept(url, context.body, customHeaders);

      if (shouldIntercept) {
        const cssResource = await importCssResource.intercept(url, context.body, customHeaders);
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