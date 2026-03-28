# Changelog

## [1.14.0](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.13.0...spectacle-deck-v1.14.0) (2026-03-28)


### Features

* add export/print modes and command palette to deck ([#57](https://github.com/gpichot/pestacle/issues/57)) ([1c21a2c](https://github.com/gpichot/pestacle/commit/1c21a2c00ee7273bb2d1c26e96cdac2f0ebb92e4))
* add overview mode  ([#55](https://github.com/gpichot/pestacle/issues/55)) ([241009f](https://github.com/gpichot/pestacle/commit/241009f0e6e8305329292e54eec78481d6f4af8e))
* add sticky section title header to slides ([#59](https://github.com/gpichot/pestacle/issues/59)) ([9b6adbd](https://github.com/gpichot/pestacle/commit/9b6adbd9cc4d7f4d92b58d69cf892e4cb11473e9))
* decouple from Spectacle: implement custom deck engine with View Transitions ([#53](https://github.com/gpichot/pestacle/issues/53)) ([b729e2b](https://github.com/gpichot/pestacle/commit/b729e2be8c3927e0ed7d458e048a2be209002841))
* navigate back to slide's final step instead of first step ([#56](https://github.com/gpichot/pestacle/issues/56)) ([937119a](https://github.com/gpichot/pestacle/commit/937119aefaf2b4390c65826a5741cafe6a5200d6))


### Bug Fixes

* deck and example ([ffe9f2d](https://github.com/gpichot/pestacle/commit/ffe9f2d99ce9ae11f62565968a6165ababe78ae9))

## [1.13.0](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.12.1...spectacle-deck-v1.13.0) (2026-03-26)

### Features

- add light theme to vite-plugin-react-deck
  ([#51](https://github.com/gpichot/pestacle/issues/51))
  ([8c20f49](https://github.com/gpichot/pestacle/commit/8c20f4965916817b0b094a0ce8597099f77036ef))

## [1.12.1](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.12.0...spectacle-deck-v1.12.1) (2026-03-25)

### Bug Fixes

- PageUp/PageDown slide navigation
  ([#49](https://github.com/gpichot/pestacle/issues/49))
  ([da86d15](https://github.com/gpichot/pestacle/commit/da86d1501953c60387b1419cf4141f6bc89b7e03))

## [1.12.0](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.11.0...spectacle-deck-v1.12.0) (2026-03-25)

### Features

- add dark theme with modern aesthetic
  ([#46](https://github.com/gpichot/pestacle/issues/46))
  ([15ed79a](https://github.com/gpichot/pestacle/commit/15ed79aae1e1d1badab465b805c5ffd5e88f12dc))
- add remote controller keyboard shortcuts support
  ([#47](https://github.com/gpichot/pestacle/issues/47))
  ([4a7ea24](https://github.com/gpichot/pestacle/commit/4a7ea24e0533d36dc5545a30a33daecf2ff0db12))

## [1.11.0](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.10.1...spectacle-deck-v1.11.0) (2026-03-25)

### Features

- add two-column layout ([#43](https://github.com/gpichot/pestacle/issues/43))
  ([afdfd9b](https://github.com/gpichot/pestacle/commit/afdfd9b29629a6d1fb93e547aed64cb3c677c862))

### Bug Fixes

- padding not applying to background image in FullImageLayout
  ([#44](https://github.com/gpichot/pestacle/issues/44))
  ([7c8b92d](https://github.com/gpichot/pestacle/commit/7c8b92db799a21df9396238d9333c8f966e0b91c))

## [1.10.1](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.10.0...spectacle-deck-v1.10.1) (2026-03-24)

### Bug Fixes

- include repository URL in dist package.json
  ([#41](https://github.com/gpichot/pestacle/issues/41))
  ([155bcd9](https://github.com/gpichot/pestacle/commit/155bcd9333a41c2bd898a0fd25cf1f6b8267c844))

## [1.10.0](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.9.1...spectacle-deck-v1.10.0) (2026-03-24)

### Features

- add Shift+Arrow shortcut to skip all slide steps
  ([#37](https://github.com/gpichot/pestacle/issues/37))
  ([2ec52d9](https://github.com/gpichot/pestacle/commit/2ec52d93b15572aa8a04a11d2027ba1eb17cba64))

## [1.9.1](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.9.0...spectacle-deck-v1.9.1) (2026-03-24)

### Bug Fixes

- update package.json
  ([665d771](https://github.com/gpichot/pestacle/commit/665d7710dbceafa6010e1752c35a22a92428fe1c))

## [1.9.0](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.8.0...spectacle-deck-v1.9.0) (2026-03-24)

### Features

- remove backdrop from FullImageLayout and add padding option
  ([#36](https://github.com/gpichot/pestacle/issues/36))
  ([b40ee93](https://github.com/gpichot/pestacle/commit/b40ee93c479bb6af3f48e55877fa5b803ef5a3f3))

## [1.8.0](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.7.0...spectacle-deck-v1.8.0) (2026-03-24)

### Features

- add slide inclusion with ::include{file=...} directive
  ([#32](https://github.com/gpichot/pestacle/issues/32))
  ([d66812f](https://github.com/gpichot/pestacle/commit/d66812f98815449ce194c7b28659bb0dceb28726))
- **layout:** fit, backgroundColor, and margin props to FullImageLayout
  ([#33](https://github.com/gpichot/pestacle/issues/33))
  ([0d85722](https://github.com/gpichot/pestacle/commit/0d857228d75a1f03dc3406d53381fe513f710dde))

### Bug Fixes

- configure public access for npm package publishing
  ([#35](https://github.com/gpichot/pestacle/issues/35))
  ([7342764](https://github.com/gpichot/pestacle/commit/7342764633645cd117e271d1c60f556ff6219250))

## [1.7.0](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.6.0...spectacle-deck-v1.7.0) (2026-03-23)

### Features

- add static mode to Timeline component
  ([#29](https://github.com/gpichot/pestacle/issues/29))
  ([a308761](https://github.com/gpichot/pestacle/commit/a308761d35801f7fe816745cf2adb2ea378ad1db))

### Bug Fixes

- add minWidth prop to FilePane component
  ([#31](https://github.com/gpichot/pestacle/issues/31))
  ([94a6f9e](https://github.com/gpichot/pestacle/commit/94a6f9e857d8e6c3928bd98e8866deceb3a2a9a6))

## [1.6.0](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.5.0...spectacle-deck-v1.6.0) (2026-03-22)

### Features

- allow FullImageLayout to extract Image from children
  ([#26](https://github.com/gpichot/pestacle/issues/26))
  ([256c5a9](https://github.com/gpichot/pestacle/commit/256c5a962b1f359a1240fcf29203df9c1938cb02))

## [1.5.0](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.4.0...spectacle-deck-v1.5.0) (2026-03-22)

### Features

- add animation components and slide transitions
  ([#21](https://github.com/gpichot/pestacle/issues/21))
  ([5202feb](https://github.com/gpichot/pestacle/commit/5202feb6ca08a819b8d2c2ff480b23a7a61df9e1))

## [1.4.0](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.3.0...spectacle-deck-v1.4.0) (2026-03-22)

### Features

- add Mermaid diagram support and new layout components
  ([#17](https://github.com/gpichot/pestacle/issues/17))
  ([5af728a](https://github.com/gpichot/pestacle/commit/5af728a4c7ddb8998b30d48216fdb0377072cdb9))
- add solarized-light theme and improve theme customization
  ([#15](https://github.com/gpichot/pestacle/issues/15))
  ([9a83239](https://github.com/gpichot/pestacle/commit/9a83239512b05bcb83e3f5fb10deb05ee2875fd0))

## [1.3.0](https://github.com/gpichot/pestacle/compare/spectacle-deck-v1.2.11...spectacle-deck-v1.3.0) (2026-03-22)

### Features

- add more components
  ([5fb76a5](https://github.com/gpichot/pestacle/commit/5fb76a57e8825d7f90c7dbc8f49ddc6094d5dea3))
- add more components
  ([e6ffdb4](https://github.com/gpichot/pestacle/commit/e6ffdb4e47f6b2c4e2749759d380273ca09aa107))
- add more layouts
  ([8924f78](https://github.com/gpichot/pestacle/commit/8924f7883659113f87008f42f9731bde8c5d88a0))
- add theming
  ([8e74768](https://github.com/gpichot/pestacle/commit/8e747682cb3ca27c5f59f98cc1d17a0aac13bcba))
- test
  ([e6aff7f](https://github.com/gpichot/pestacle/commit/e6aff7fd259b05d03a0d2d6e456b15d2d1c04e8e))
- update
  ([d0bd4d3](https://github.com/gpichot/pestacle/commit/d0bd4d33d69b7ecab2cb3e0f61c08b6a174cebc4))

### Bug Fixes

- add fast refresh
  ([f270d3b](https://github.com/gpichot/pestacle/commit/f270d3b5d41eca1d3af2963ed5864ec0e2f4bc96))
- flickering effect ([#11](https://github.com/gpichot/pestacle/issues/11))
  ([500f3a7](https://github.com/gpichot/pestacle/commit/500f3a7ef4b9157e6c4ab9b410cc36256db8cd1b))
- imports
  ([252bfb1](https://github.com/gpichot/pestacle/commit/252bfb101aec5cf7b8f5bb9a34f10001d2081182))
- initial commit
  ([da8da0f](https://github.com/gpichot/pestacle/commit/da8da0f7f698b6915b6963c5107693a6c6fe6e16))
