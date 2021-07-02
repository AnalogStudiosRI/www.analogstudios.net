# www.analogstudios.net

[![Netlify Status](https://api.netlify.com/api/v1/badges/6758148c-5c38-44d8-b908-ca0a1dad0f7c/deploy-status)](https://app.netlify.com/sites/elastic-blackwell-3aef44/deploys)
[![GitHub release](https://img.shields.io/github/tag/Analog-Studios/www.analogstudios.net.svg)](https://github.com/Analog-Studios/www.analogstudios.net/tags)
![GitHub Actions status](https://github.com/Analog-Studios/www.analogstudios.net/workflows/Master%20Integration/badge.svg)
[![GitHub issues](https://img.shields.io/github/issues-pr-raw/Analog-Studios/www.analogstudios.net.svg)](https://github.com/Analog-Studios/www.analogstudios.net/issues)
[![GitHub license](https://img.shields.io/badge/license-Apache2.0-blue.svg)](https://raw.githubusercontent.com/Analog-Studios/www.analogstudios.net/master/LICENSE.md)


## Overview
Frontend website for [www.analogstudios.net](https://www.analogstudios.net) based on [Greenwood](https://www.analogstudios.net).  It is built using Github Actions and deployed to Netlify.  The backend is (currently) hosted in AWS.


## Contributing

### Prerquisties
You'll need the following installed to run and contribute to this project.

1. [NodeJS LTS](https://nodejs.org/)
1. [Yarn 1.x](https://classic.yarnpkg.com/)

You can confirm by running the following 
```sh
$ node -v
v14.16.0

$ yarn -v
1.12.3
```

Then run `yarn install` to install the project's dependencies.

### Tasks

After installing the above, you can run the following commands:

- `yarn lint` - Lint all files in the project (JS , CSS, naming)
- `yarn start` - starts the locaol development server
- `yarn build` - generate a procuction build

> _See other [supported commands](https://www.greenwoodjs.io/docs/#cli) in Greenwood's CLI documentation._