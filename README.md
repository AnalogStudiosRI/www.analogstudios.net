# www.analogstudios.net

[![GitHub release](https://img.shields.io/github/tag/AnalogStudiosRI/www.analogstudios.net.svg)](https://github.com/AnalogStudiosRI/www.analogstudios.net/tags)
![GitHub Actions status](https://github.com/AnalogStudiosRI/www.analogstudios.net/workflows/Main%20Integration/badge.svg)
[![GitHub issues](https://img.shields.io/github/issues-pr-raw/AnalogStudiosRI/www.analogstudios.net.svg)](https://github.com/AnalogStudiosRI/www.analogstudios.net/issues)
[![GitHub license](https://img.shields.io/badge/license-Apache2.0-blue.svg)](https://raw.githubusercontent.com/AnalogStudiosRI/www.analogstudios.net/master/LICENSE.md)

## Overview

Frontend website for [www.analogstudios.net](https://www.analogstudios.net) based on [Greenwood](https://www.greenwoodjs.io). It is built and deployed using Github Actions to AWS using S3 and Cloudfront.  (The backend uses and API Gateway and EC2)

## Contributing

### Setup

You'll need the latest [NodeJS LTS](https://nodejs.org/) version installed to run and contribute to this project.  Or run `nvm use` if using [nvm**](https://github.com/nvm-sh/nvm).

You can confirm by running the following

```sh
$ node -v
v18.15.0

% npm -v
8.19.2
```

Then run `npm ci` to install the project's dependencies.

### Tasks

After installing the above, you can run the following commands:

- `npm run lint` - Lint all files in the project (JS , CSS, naming)
- `npm run start` - Starts **Greenwood**'s local development server
- `npm run build` - Runs **Greenwood** to generate a production build
- `npm run story:dev` - Runs [**Storybook**](https://storybook.js.org/) in development mode
- `npm run test:tdd` - Runs unit tests in `watch` mode using [**@web/test-runner**](https://modern-web.dev/docs/test-runner/overview/)

> _See `package.json#scripts` for a full list of available commands._
