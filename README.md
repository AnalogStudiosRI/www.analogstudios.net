# www.analogstudios.net

[![GitHub release](https://img.shields.io/github/tag/AnalogStudiosRI/www.analogstudios.net.svg)](https://github.com/AnalogStudiosRI/www.analogstudios.net/tags)
![GitHub Actions status](https://github.com/AnalogStudiosRI/www.analogstudios.net/workflows/Main%20Integration/badge.svg)
[![GitHub issues](https://img.shields.io/github/issues-pr-raw/AnalogStudiosRI/www.analogstudios.net.svg)](https://github.com/AnalogStudiosRI/www.analogstudios.net/issues)
[![GitHub license](https://img.shields.io/badge/license-Apache2.0-blue.svg)](https://raw.githubusercontent.com/AnalogStudiosRI/www.analogstudios.net/master/LICENSE.md)

## Overview

Frontend website for [www.analogstudiosri.net](https://www.analogstudios.net) based on [Greenwood](https://www.greenwoodjs.io). It is built and deployed using Github Actions to AWS (S3 / Cloudfront / Lambda) using SST. The [backend](https://github.com/AnalogStudiosRI/api) uses and AWS (API Gateway / Lambda) with [Architect](https://arc.codes/).

## Contributing

### Setup

You'll need the latest [NodeJS LTS](https://nodejs.org/) version installed to run and contribute to this project. Or run `nvm use` if using [nvm](https://github.com/nvm-sh/nvm).

You can confirm by running the following:

```sh
$ node -v
24.4.0
```

Then run `npm ci` to install the project's dependencies.

### Tasks

After installing the above, you can run the following key development commands:

- `npm run dev` - Starts **Greenwood**'s local development server
- `npm run story:dev` - Runs [**Storybook**](https://storybook.js.org/) in development mode
- `npm run test:tdd` - Runs unit tests in `watch` mode using [**@web/test-runner**](https://modern-web.dev/docs/test-runner/overview/)
- `npm run lint` - Lint all files in the project (TS / JS , CSS)
- `npm run format` - Format all files

> _See `package.json#scripts` for a full list of available commands._
