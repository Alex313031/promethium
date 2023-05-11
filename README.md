<p align="center">
  <img src="Logo.png" width="256">
</p>

<div align="center">
  <h1>Promethium Browser</h1>

[![Downloads](https://img.shields.io/github/downloads/Alex313031/promethium/total.svg?style=flat-square)](https://github.com/Alex313031/promethium/releases)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fwexond%2Fwexond.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FAlex313031%2Fpromethium?ref=badge_shield)
[![PayPal](https://img.shields.io/badge/PayPal-Donate-brightgreen?style=flat-square)](https://paypal.me/alex313031?country.x=US&locale.x=en_US)
[![Discord](https://discordapp.com/api/guilds/307605794680209409/widget.png?style=shield)](https://discord.gg/P7Vn4VX)

Promethium is a modern web browser, built on top of [Electron](https://www.electronjs.org/) and [React](https://react.dev/), that can also be used as a framework to create a custom web browser.

</div>

# Table of Contents:
- [About](#about)
- [Features](#features)
- [Screenshots](#screenshots)
- [Downloads](#downloads)
- [Development](#development)
  - [Running](#running)
- [Documentation](#documentation)
- [Contributing](#contributing)

# About

[Wexond browser](https://github.com/wexond/browser-base) was a great Electron browser, but the [author](https://github.com/sentialx) archived it, so I decided to make a fork of it!
I have updated many packages, including updating Electron from 13.1.4 to 18.3.15, and updating the adblocker from 1.22.2 to 1.22.7.
I made a new logo and name, and fixed little things here and there.

## Motivation
(From the original author's readme): \
Compiling and editing Chromium directly may be challenging and time consuming, so we decided to build Wexond with modern web technologies. Hence, the development effort and time is greatly reduced. Either way Firefox is based on Web Components and Chrome implements new dialogs in WebUI (which essentially is hosted in WebContents).

# Features

- **Promethium Shield** - Browse the web without any ads and don't let websites to track you. Thanks to the Promethium Shield powered by [Cliqz](https://github.com/cliqz-oss/adblocker), websites can load even 8 times faster!
- **Chromium without Google services and low resources usage** - Since Promethium uses Electron under the hood which is based on only several and the most important Chromium components, it's not bloated with redundant Google tracking services and others.
- **Fast and fluent UI** - The animations are really smooth and their timings are perfectly balanced.
- **Highly customizable new tab page** - Customize almost an every aspect of the new tab page!
- **Customizable browser UI** - Choose whether Promethium should have compact or normal UI.
- **Tab groups** - Easily group tabs, so it's hard to get lost.
- **Scrollable tabs**
- **Partial support for Chrome extensions** - Install some extensions directly from Chrome Web Store\* (see [#110](https://github.com/Alex313031/promethium/issues/110)) (WIP)

## Other basic features

- Downloads popup with currently downloaded items (download manager WebUI page is WIP)
- History manager
- Bookmarks bar & manager
- Settings
- Find in page
- Dark and light theme
- Omnibox with autocomplete algorithm similar to Chromium
- State of the art tab system

### [TODO Roadmap](https://github.com/Alex313031/promethium/blob/master/TODO.txt)

# Screenshot

![image](https://user-images.githubusercontent.com/11065386/81024159-d9388f80-8e72-11ea-85e7-6c30e3b66554.png)

# Downloads
- [Stable and Beta versions](https://github.com/Alex313031/promethium/releases)

# Development

## Running

Before running Promethium, please ensure you have [`Node.js`](https://nodejs.org/en/download/releases) 16.x.x and [`Yarn`](https://classic.yarnpkg.com/en/docs/install) 1.x.x installed on your machine.

### Windows

Make sure you have build tools installed. You can install them by running this command as **administrator**:

```bash
$ npm i -g windows-build-tools
```

```bash
$ npm i -g yarn # Install yarn
$ yarn install # Install needed depedencies.
$ yarn init # Install local npm packages in 'promethium-rpc'.
$ yarn run build # Build Promethium
$ yarn run start # Build and run Promethium
$ yarn run rebuild # Rebuild native modules using Electron headers.
$ yarn run dev # Run Promethium in development mode
```

### More commands

```bash
$ yarn run dist-win # Package Promethium for Windows
$ yarn run dist-linux # Package Promethium for Linux
$ yarn run dist-mac # Package Promethium for MacOS
$ yarn run clean # Clean all node modules and build artifacts
$ yarn run distclean # Same as clean, but also delete the 'out' dir
$ yarn run lint # Runs linter
$ yarn run lint-fix # Runs linter and automatically applies fixes
```

More commands can be found in [`package.json`](package.json).

# Documentation

Guides, Notes, and the API reference are located in [`docs`](docs) directory.

# Contributing

If you have found any bugs or just want to see some new features in Promethium, feel free to open an issue. Every suggestion is very valuable, as they help me improve the browsing experience. Also, please don't hesitate to open a pull request. This is really important to me for the further development of this project.
