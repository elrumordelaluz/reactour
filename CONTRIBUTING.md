# Contributing to Reactour

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to `@reactour` packages. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior.

## I don't want to read this whole thing I just have a question!!!

> **Note:** Please don't file an issue to ask a question. You'll get faster results by using the resources below.

- [Github Discussions](https://github.com/elrumordelaluz/reactour/discussions/)
- [Discord](https://discord.gg/YHv4hSta)

## What should I know before I get started?

### Packages

Since `v2`, Reactour ships separated scoped packages:

- [@reactour/tour](https://github.com/elrumordelaluz/reactour/tree/main/packages/tour) - The main package, which uses the other ones to highlight parts of your application from an array of steps.
- [@reactour/mask](https://github.com/elrumordelaluz/reactour/tree/main/packages/mask) - A customizable Component to highlight certain element or area of the viewport.
- [@reactour/popover](https://github.com/elrumordelaluz/reactour/tree/main/packages/popover) - A customizable Component to attach to an element or position of the viewport to show content.
- [@reactour/utils](https://github.com/elrumordelaluz/reactour/tree/main/packages/utils) - A set of helper functions used by the other packages.
- [@reactour/playground](https://github.com/elrumordelaluz/reactour/tree/main/packages/playground) - The place where all the stuff is visible working.

Nothing prevents us to continue improving this scoped list, so again thanks for your contribution.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check [this list](https://github.com/elrumordelaluz/reactour/issues) as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible. I always better to create a [sandbox](https://codesandbox.io/s/reactour-tour-demo-using-react-router-dom-kujql) with a reduced reproduction of the issue.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before Submitting A Bug Report

- **Check the [discussions](https://github.com/elrumordelaluz/reactour/discussions/)** for a list of common questions and problems.
- **Determine [which package is related](#packages)**.

### Pull Requests

You can open a [new issue](https://github.com/elrumordelaluz/reactour/issues/new) or [discussion](https://github.com/elrumordelaluz/reactour/discussions/new) before make a pull request, in order to have feedback and community support.

### Local development

- Each packages is bootstrapped using [tsdx](https://tsdx.io/).
- To run each package in parallel we use [launchit](https://github.com/elrumordelaluz/launchit).
- Prettier rules:

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "tabWidth": 2,
  "printWidth": 80,
  "semi": false
}
```

Thanks again!
