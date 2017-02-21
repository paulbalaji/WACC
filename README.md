# WACC Compiler

WACC Compiler is a compiler for the WACC language. In addition to the basic specification assigned to us in the first week, we have extended our compiler with numerous features. The end goal of adding these features is to extend WACC to the point where programmers can use the language to write programs that be compiled and directly run on the Raspberry Pi, complete with graphical output.

### No Task Pending

### Complete
- Front End
- Front End Code Review
- Back End
- Back End Code Review
- Compiler Extension
- Final Code Review

### In Development
- Advanced Tetris features
  - Ability to move down
  - Score counter
  - Show upcoming blocks
  - Clearer grid boundaries
  - Generally neater presentation
  - Fancier animations
- JavaScript target
  - General WACC programs
  - Graphical WACC programs

### Current Version
0.6.66

### Features in addition to base specification
- Hex and Binary int literals
- Syntactic sugar for binary operators (+=, -=, *=, /=, etc)
- WACC syntax higlighting for *Sublime Text*
- Semantic error variable suggestions
- Initialise arrays with a run-time length
- Function calls as statements
- WACC header files (.wacch)
- Include .wacch header files
- Structs
- Additional compiler flags
- Standard Library
- Implemented own stack and heap for potential Raspberry Pi programs
- Polling RasPi's GPIO pins with a `gpio` operator
- RasPi graphics (32-bit)
- Tetris

### Tetris
#### Introduction
Our extended compiler can now be made to compile WACC programs for the Raspberry Pi. To show case this, we decided to implement the classic game of Tetris. It is a full WACC implementation, and everything in the ./tetris folder compiles to assembly that can be assembled and run with full 32-bit colour output on the Raspberry Pi.

#### Compilation
To compile Tetris:
```sh
# -barebones flag to indicate program is to be run somewhere C standard library can't be called
./compile -barebones tetris/tetris.wacc tetris/lib/tetrisUtil.wacch tetris/lib/gx.wacch tetris/lib/block.wacch tetris/lib/array.wacch
```

Alternatively, you could navigate into the tetris folder and then run make, as follows:
```sh
# first navigate into the wacc33 project folder
cd tetris
make
```

#### Pi time
Now you have the assembly, you may assemble this using any appropriate assembler of your choice, keeping in mind a Raspberry Pi target. Once you have generated a kernel.img file, you should copy it onto the boot partition of the SD card that your Pi boots from, and behold you should see the game of Tetris.

#### Playing the game
We made a custom controller for the 1st Year summer project (Snake), and that is the same controller we use to play Tetris. This means that you will unfortunately not be able to actually play the game without our custom controller, but have provided GPIO pin numbers so that anyone can easily pick up a breadboard and make their own controller.

#### GPIO pins
- 24 - Move Left
- 27 - Move Right
- 25 - Rotate

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
* [async] - asynchronous JavaScript

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
# Rebuilding just the backend (if changed since previous make)
$ make backend
```

```sh
# Run the local testing suite
# Note: local test suite should fail because we are not outputting to a file and not stdout
$ make test
```

```sh
# makes compiler (if needed) and then compiles input.wacc in the root folder
$ make preview
```

```sh
# Removes all generated files
$ make clean
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
   [async]: <https://github.com/caolan/async>
   [See here.]: <https://nodejs.org/en/download/package-manager/>
