# WACC Compiler

WACC Compiler is a compiler for the WACC language.
  - Currently only Front End
  - Back End IN PRODUCTION
  - Front End Code Review COMPLETE
### TODO:
 - Write Back End Tests
 - Write Back End
 - Discuss and Implement Cool Extension

### Version
0.0.2

### Tech
Our compiler uses a number of open source projects to work properly:

* [TypeScript] - typed superset of JavaScript that compiles to plain JavaScript
* [node.js] - JavaScript runtime for UNIX terminal
* [Python] - scripting language used for multithreaded tests

Because we are using Node.js, we required some additional node modules:
* [PEG.js] - parser generator for JavaScript
* [colors] - to throw colourful error messages
* [spell] - for suggesting variable or function names where none can be found
* [underscore] - JavaScript library for functional programming helpers

And of course our compiler itself is available within a private repository on GitLab.

### Installation and Usage

#### Installation
First clone the repo as below:

```sh
$ git clone https://gitlab.doc.ic.ac.uk/lab1516_autumn/wacc_33.git
```

Ensure you have Node.js installed before proceeding to usage. [See here.]

#### Usage

```sh
# Make the complete compiler
$ make compiler
```

```sh
# Rebuilding just the frontend (if changed since previous make)
$ make frontend
```

```sh
# Run the local testing suite
$ make test
```

```sh
# the file input.wacc in the root folder
$ make preview
```

```sh
# Removes all generated files
$ make clean
```

```sh
# Removes all generated files and then makes the compiler afresh
$ make rebuild
```

### Development

#### Developers
* Sam Wood
* Jan Matas
* Andrea Janoscikova
* Paul Balaji

#### Contribute

Want to contribute? Too bad! This is a second year group project that only we're meant to contribute to!

However, feel free to donate pizza!



[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [git-repo-url]: <https://gitlab.doc.ic.ac.uk/lab1516_autumn/wacc_33.git>
   [TypeScript]: <http://www.typescriptlang.org/>
   [PEG.js]: <http://pegjs.org/>
   [node.js]: <https://nodejs.org/en/>
   [Python]: <https://www.python.org>
   [colors]: <https://github.com/marak/colors.js/>
   [spell]: <https://github.com/dscape/spell>
   [underscore]: <http://underscorejs.org/>
   [See here.]: <https://nodejs.org/en/download/package-manager/>