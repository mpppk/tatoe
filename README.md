# **tatoe**

## Getting Started

予め firebase の admin 用認証ファイルを`tatoe-app-firebase-adminsdk.json`として配置しておく

```sh
$ yarn install
$ yarn global add blitz
$ docker-compose up -d db # Launch PostgreSQL
$ touch .env.local .env.docker.local
$ blitz prisma migrate dev
$ blitz db seed
$ blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to launch tatoe app.

## Tests

Runs your tests using Jest.

```
$ yarn test
```

Blitz comes with a test setup using [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

## Tools included

Blitz comes with a set of tools that corrects and formats your code, facilitating its future maintenance. You can modify their options and even uninstall them.

- **ESLint**: It lints your code: searches for bad practices and tell you about it. You can customize it via the `.eslintrc.js`, and you can install (or even write) plugins to have it the way you like it. It already comes with the [`blitz`](https://github.com/blitz-js/blitz/tree/canary/packages/eslint-config) config, but you can remove it safely. [Learn More](https://eslint.org).
- **Husky**: It adds [githooks](https://git-scm.com/docs/githooks), little pieces of code that get executed when certain Git events are triggerd. For example, `pre-commit` is triggered just before a commit is created. You can see the current hooks inside `.husky/`. If are having problems commiting and pushing, check out ther [troubleshooting](https://typicode.github.io/husky/#/?id=troubleshoot) guide. [Learn More](https://typicode.github.io/husky).
