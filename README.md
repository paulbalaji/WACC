# WACC Compiler

WACC Compiler is a compiler for the WACC language.
  - Currently only Front End
  - Back End to be done in the coming weeks

### Todos
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
* [colors]
* [node-dir]
* [spell]
* [underscore]

And of course our compiler itself is available within a private repository on GitLab.

### Installation

You need Gulp installed globally:

```sh
$ npm i -g gulp
```

```sh
$ git clone [git-repo-url] dillinger
$ cd dillinger
$ npm i -d
$ mkdir -p downloads/files/{md,html,pdf}
$ gulp build --prod
$ NODE_ENV=production node app
```

### Plugins

Dillinger is currently extended with the following plugins

* Dropbox
* Github
* Google Drive
* OneDrive

Readmes, how to use them in your own application can be found here:

* [plugins/dropbox/README.md] [PlDb]
* [plugins/github/README.md] [PlGh]
* [plugins/googledrive/README.md] [PlGd]
* [plugins/onedrive/README.md] [PlOd]

### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma start
```




[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [git-repo-url]: <https://gitlab.doc.ic.ac.uk/lab1516_autumn/wacc_33.git>
   [TypeScript]: <http://www.typescriptlang.org/>
   [PEG.js]: <http://pegjs.org/>
   [node.js]: <https://nodejs.org/en/>
   [Python]: <https://www.python.org>
   [colors]: <>
   [node-dir]: <>
   [spell]: <>
   [underscore]: <>



