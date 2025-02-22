[![npm version](https://img.shields.io/npm/v/@xenorange/yarn-patch-package-update-squash)](https://www.npmjs.com/package/@xenorange/yarn-patch-package-update-squash) [![build status](https://github.com/blutorange/yarn-patch-package-update-squash/actions/workflows/node.js.yml/badge.svg)](https://github.com/blutorange/yarn-patch-package-update-squash/actions)

Similar to `yarn patch --update <package>`, but does not create a patch of patches.
Based on this discussion:

> https://github.com/yarnpkg/berry/issues/3851

In effect, this script behaves like the proposed `yarn patch --update --squash <package>`.

# Usage

Install via

```sh
yarn add --save-dev @xenorange/yarn-patch-package-update-squash
```

Then, instead of `yarn patch --update <package>`, just run

```sh
yarn patch-update-squash <package>
```

And proceed as you would with [yarn patch](https://yarnpkg.com/cli/patch). See
also [yarn's doc on package patching](https://yarnpkg.com/features/patching).

# Release

Check `CHANGELOG.md` and `package.json` for the version. Then:

```sh
yarn npm publish --access public
git tag -a x.y.z
git push origin x.y.z
```

Then create a github release and set version to next snapshot.
