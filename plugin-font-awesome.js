import { ResourceInterface } from '@greenwood/cli/src/lib/resource-interface.js';
import { getNodeModulesLocationForPackage } from '@greenwood/cli/src/lib/node-modules-utils.js';

class FontAwesomeResource extends ResourceInterface {
  constructor(compilation, options) {
    super(compilation, options);
  }

  async shouldResolve(url) {
    // we only want to resolve relative paths to fontawesome
    // like how it gets referenced in its own CSS
    const { pathname } = url;

    return pathname.indexOf('fonts/fontawesome-webfont') >= 0 && pathname.indexOf('node_modules') < 0;
  }

  async resolve(url) {
    // TODO wuold be nice for Greenwood to return this as a URL too
    const nodeModulesLocation = await getNodeModulesLocationForPackage('font-awesome');

    return new Request(new URL(`.${url.pathname}`, `file://${nodeModulesLocation}/`));
  }
}

const greenwoodPluginFontAwesome = (options = {}) => {
  return [{
    type: 'copy',
    name: 'plugin-font-awesome:copy',
    provider: (compilation) => {
      const { outputDir, projectDirectory } = compilation.context;

      return [{
        from: new URL('./node_modules/font-awesome/fonts/', projectDirectory),
        to: new URL('./fonts/', outputDir)
      }];
    }
  }, {
    type: 'resource',
    name: 'plugin-font-awesome:resource',
    provider: (compilation) => new FontAwesomeResource(compilation, options)
  }];
};

export {
  greenwoodPluginFontAwesome
};