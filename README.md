# PWNDAO SDK (Beta)

[![CI and Publish](https://github.com/PWNDAO/pwn-sdks/actions/workflows/ci-and-publish.yml/badge.svg)](https://github.com/PWNDAO/pwn-sdks/actions/workflows/ci-and-publish.yml)

> ⚠️ **Beta Notice**: This SDK is currently in beta and under active development. APIs and functionality may change as we continue to improve and expand the capabilities.

## Features

The PWN SDK provides a comprehensive set of tools for interacting with the PWN protocol:

- **Proposal Management**: Create, view, and manage lending proposals with ease
- **Strategy Integration**: Access and implement various lending strategies
- **API Access**: Direct integration with PWN's API for data retrieval and management
- **Web3 Integration**: Seamless connection with web3 wallets and blockchain interactions

## Contributing

We welcome contributions from the community! PWN features an incentive program for contributors:

🏆 **Contributor Incentives Program**
- Active contributors can earn rewards for meaningful contributions
- Opportunities to join the PWN DAO governance
- Recognition in the PWN community

## Support & Feedback

Having questions, feature requests, or found a bug? We're here to help!

- 🐛 **Found a bug?** [Open an issue](https://github.com/PWNDAO/pwn-sdks/issues/new?labels=bug)
- 💡 **Have a feature request?** [Submit it here](https://github.com/PWNDAO/pwn-sdks/issues/new?labels=enhancement)
- ❓ **Questions?** [Start a discussion](https://github.com/PWNDAO/pwn-sdks/discussions/new)

## Packages

This monorepo contains the following packages:

- [@pwndao/core](./packages/core/README.md) - Core functionality and utilities
- [@pwndao/v1-core](./packages/v1-core/README.md) - V1 Core functionality and utilities
- [@pwndao/api](./packages/api/README.md) - Core functionality and utilities
- [@pwndao/v1-sdk-react](./packages/v1-sdk-react/README.md) - React SDK for PWN integration
- [@pwndao/v1-sdk-vue](./packages/v1-sdk-vue/README.md) - Vue SDK for PWN integration

## Run tasks

To build everything run:

```sh
bun install
bunx nx run-many --target build
```

To run example react repository

```sh
bunx nx run example-react-next-app:dev
```

To open web browser with the project graph run:

```sh
bunx nx graph
```

To run any task with Nx use:

```sh
bunx nx <target> <project-name>
```

To create a release:

```sh
export HUSKY=0 # disable pre-commit hooks
bunx nx release --skip-publish # after selecting a version this will automatiac
unset HUSKY
```



