import { defaultReporter } from '@web/test-runner';
import fs from 'fs/promises';
import { greenwoodPluginTypeScript } from '@greenwood/plugin-typescript';
import { junitReporter } from '@web/test-runner-junit-reporter';

// create a direct instance of TypeScriptResource
const typeScriptResource = greenwoodPluginTypeScript()[0].provider({
  context: {
    projectDirectory: new URL(import.meta.url)
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
  }]
};