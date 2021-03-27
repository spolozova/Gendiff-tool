# Gendiff tool #
**Compares two configuration files and shows a difference.**
-------

[![Actions Status](https://github.com/spolozova/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/spolozova/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/8141639a991a8122e2fb/maintainability)](https://codeclimate.com/github/spolozova/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8141639a991a8122e2fb/test_coverage)](https://codeclimate.com/github/spolozova/frontend-project-lvl2/test_coverage)
[![Node CI](https://github.com/spolozova/frontend-project-lvl2/actions/workflows/node.js.yml/badge.svg)](https://github.com/spolozova/frontend-project-lvl2/actions/workflows/node.js.yml)
### Install
```
$ git clone git@github.com:spolozova/frontend-project-lvl2.git
$ make install
$ npm link
```
### Usage
```
  Usage: gendiff [options] <filepath1> <filepath2>

  Options:
    -V, --version        output the version number
    -h, --help           output usage information
    -f, --format [type]  output format(stylish is default option)
```
**Supported file formats:**
* yaml
* json

**Supported output formats:**
* stylish (default option)
* plain
* json

### Start linting
```
make lint
```
### Start tests
```
make test
```
### Examples of usage:

**1. [json flat files](https://asciinema.org/a/390111)**

**2. [yaml flat files](https://asciinema.org/a/390529)**

**3. [stylish output format](https://asciinema.org/a/403027)**

**4. [plain output format](https://asciinema.org/a/403028)**

**5. [json output format](https://asciinema.org/a/403029)**