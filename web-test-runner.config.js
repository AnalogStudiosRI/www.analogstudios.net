import fs from 'fs/promises';
import { defaultReporter } from '@web/test-runner';
import { junitReporter } from '@web/test-runner-junit-reporter';
import tsc from "typescript";

const compilerOptions = ((await import(new URL('./tsconfig.json', import.meta.url), { with: { type: "json" } })).default).compilerOptions;

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
        const contents = await fs.readFile(new URL(`.${url}`, import.meta.url), "utf-8");
        const body = tsc.transpileModule(contents, { compilerOptions }).outputText;

        return {
          body,
          type: 'js'
        };
      }
    }
  }]
};