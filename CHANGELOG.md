# Changelog

## 0.1.3 - 2018-11-26

- Various fixes for BOLT11 payment request parsing (#28, #35, 1489777f6)

- Update npm, build and cordova dependencies

## 0.1.2 - 2018-09-25

- Bug fix: plain HTTP to TLS redirection under nodejs v9.6+ (#10, aef8693ded25a956bc)

- Bug fix: treat socket errors as warnings instead of crashing the process (#23, 56635b8af3fb54)

- Docker: Update to Bitcoin Core v0.16.3 (e718bf8324599)

- Docker: Rename {SPARK,BITCOIND}_OPTS to {SPARK,BITCOIND}_OPT (#18, 4a66cb0b6c24)

- Electron: Rename desktop app executable to `spark-desktop`, to prevent confusion with the `spark-wallet` server daemon
  (https://github.com/shesek/spark-wallet/issues/24#issuecomment-421798958, 9f81f14c9344)

- Improve balance calculation (#26, 8bda5984131fe6)

## 0.1.1 - 2018-08-29

- Android: don't generate release builds

## 0.1.0 - 2018-08-29

Public release! 🎇 🎉 🎈

- Improve reproducibility of `apk`, `snap` and npm package builds
- Bug fix: don't display payments twice

## 0.0.1 - 2018-08-26

First versioned release.
