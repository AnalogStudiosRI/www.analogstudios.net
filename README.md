# www.analogstudios.net

[![Netlify Status](https://api.netlify.com/api/v1/badges/3fa92afb-5d4d-4e27-a483-7eb64cdbe181/deploy-status)](https://app.netlify.com/sites/practical-fermat-fa2c48/deploys)
[![GitHub release](https://img.shields.io/github/tag/AnalogStudiosRI/www.analogstudios.net.svg)](https://github.com/AnalogStudiosRI/www.analogstudios.net/tags)
![GitHub Actions status](https://github.com/AnalogStudiosRI/www.analogstudios.net/workflows/Main%20Integration/badge.svg)
[![GitHub issues](https://img.shields.io/github/issues-pr-raw/AnalogStudiosRI/www.analogstudios.net.svg)](https://github.com/AnalogStudiosRI/www.analogstudios.net/issues)
[![GitHub license](https://img.shields.io/badge/license-Apache2.0-blue.svg)](https://raw.githubusercontent.com/AnalogStudiosRI/www.analogstudios.net/master/LICENSE.md)

## Overview

Frontend website for [www.analogstudios.net](https://www.analogstudios.net) based on [Greenwood](https://www.greenwoodjs.io). It is built using Github Actions and deployed to Netlify. The backend is (currently) hosted in AWS.

## Contributing

### Setup

You'll need the following installed to run and contribute to this project.

1. [NodeJS LTS](https://nodejs.org/)
1. [Node Version Manager](https://github.com/nvm-sh/nvm)
1. [Yarn 1.x](https://classic.yarnpkg.com/)

You can confirm by running the following

```sh
$ node -v
v14.16.0

$ yarn -v
1.12.3

$ nvm use
Found '/Users/<directory_location>/www.analogstudios.net/.nvmrc' with version <14.17.0>
Now using node v14.17.0 (npm v6.14.13)
```

Then run `yarn install` to install the project's dependencies.

### Tasks

After installing the above, you can run the following commands:

- `yarn lint` - Lint all files in the project (JS , CSS, naming)
- `yarn start` - Starts **Greenwood**'s local development server
- `yarn build` - Runs **Greenwood** to generate a production build
- `yarn storybook:deveop` - Runs [**Storybook**](https://storybook.js.org/) in development mode
- `yarn test:tdd` - Runs unit tests in `watch` mode using [**@web/test-runner**](https://modern-web.dev/docs/test-runner/overview/)

> _See `package.json#scripts` for a full list of available commands._
