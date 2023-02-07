import { defaultReporter } from '@web/test-runner';
import fs from 'fs/promises';
import { greenwoodPluginImportCss } from '@greenwood/plugin-import-css/src/index.js';
import { greenwoodPluginTypeScript } from '@greenwood/plugin-typescript/src/index.js';
import { junitReporter } from '@web/test-runner-junit-reporter';
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
        const response = await typeScriptResource.serve(new URL(`.${url}`, import.meta.url));
        // https://github.com/ProjectEvergreen/greenwood/issues/661
        const body = (await response.text()).replace(/\/\/# sourceMappingURL=module.js.map/, '');

        return {
          body,
          type: 'js'
        };
      }
    }
  }, {
    name: 'import-css',
    async transform(context) {
      const url = new URL(`.${context.request.url}`, import.meta.url);
      const request = new Request(url, { headers: new Headers(context.headers) });
      const shouldIntercept = await importCssResource.shouldIntercept(url, request);

      if (shouldIntercept) {
        const contents = await fs.readFile(url);
        const initResponse = new Response(contents, {
          headers: new Headers(context.headers)
        });
        const response = await importCssResource.intercept(url, request, initResponse.clone());

        return {
          body: await response.text(),
          headers: {
            'content-type': response.headers.get('Content-Type')
          }
        };
      }
    }
  }]
};