# Contributing

## Local Development

To develop for the project, you'll want to follow these steps:

1. Have [NodeJS LTS](https://nodejs.org) installed
1. Clone the repository
1. Run `npm ci`

If developing with Node Version Manager:
  - Windows: [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases)
  - Linux/MacOS: [Node Version Manager](https://github.com/nvm-sh/nvm)

You can confirm by running the following
```sh
$ nvm use
Found '/Users/<directory_location>/www.analogstudios.net/.nvmrc' with version <14.17.0>
Now using node v14.17.0 (npm v6.14.13)
```

### NPM Scripts

The [website](https://www.analogstudios.net/) is currently built by [**Greenwood**](https://www.greenwoodjs.io). In addition to unit tests, you will want to verify any changes by running the website locally.

Below are the development tasks available for working on this project:

- `npm run dev` - Develop for the website locally using the dev server at `localhost:1984` in your browser.
- `npm run build` - Builds the website for production.
- `npm run serve` - Builds the website for production and runs it on a local web0server at `localhost:8000`
- `npm run test:tdd` - Run unit tests in watch mode

## Pull Requests

Pull requests are the best! To best help facilitate contributions to the project, here are some requests:

- We generally prefer an issue be opened first, to help facilitate general discussion outside of the code review process itself and align on the ask and any expectations. However, for typos in docs and minor "chore" like tasks a PR is usually sufficient. When in doubt, open an issue.
- For bugs, please consider reviewing the issue tracker first.
- For branching, we generally follow the convention `<issue-label>/issue-<number>-<issue-title>`, e.g. _bug/issue-12-fixed-bug-with-yada-yada-yada_
- To test the CI build scripts locally, run the scripts referenced above.

### Continuous Integration

This project makes active use of testing tools like [GitHub Actions](https://github.com/features/actions) and [Netlify deploy previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) as part of the workflow. Each time a PR is opened, a sequence of build steps defined _.github/workflows/ci.yml_ are run:

1. Linting: `npm run lint`
1. Running unit tests: `npm run test`
1. Building the Greenwood website: `npm run build`

A preview is also made available within the status checks section of the PR in GitHub and can be used to validate work in a live environment before having to merge.
