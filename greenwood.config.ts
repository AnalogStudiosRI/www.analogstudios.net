import { greenwoodPluginCssModules } from "@greenwood/plugin-css-modules";
import { greenwoodPluginImportJsx } from "@greenwood/plugin-import-jsx";
import { greenwoodPluginAdapterAws } from "@greenwood/plugin-adapter-aws";
import analyze from "rollup-plugin-analyzer";
import { visualizer } from "rollup-plugin-visualizer";
import type { Config, RollupPlugin } from "@greenwood/cli";

// TODO: are these still working?
const customRollupPlugins: RollupPlugin[] = [
  {
    type: "rollup",
    name: "rollup-plugin-analyzer",
    provider: () => {
      return [
        analyze({
          summaryOnly: true,
          filter: (module) => {
            return !module.id.endsWith(".html");
          },
        }),
      ];
    },
  },
  {
    type: "rollup",
    name: "rollup-plugin-visualizer",
    provider: () => {
      return [
        visualizer({
          filename: "reports/stats.html",
        }),
      ];
    },
  },
];

const config: Config = {
  devServer: {
    proxy: {
      "/api": "https://www.analogstudios.net",
    },
  },
  prerender: true,
  polyfills: {
    importAttributes: ["css"],
  },
  plugins: [
    greenwoodPluginCssModules(),
    greenwoodPluginImportJsx(),
    greenwoodPluginAdapterAws(),
    ...customRollupPlugins,
  ],
};

export default config;
