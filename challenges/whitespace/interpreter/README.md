## Description

This project involves an ongoing implementation of a TypeScript interpreter designed for the [Whitespace Interpreter](https://www.codewars.com/kata/52dc4688eca89d0f820004c6/) kata on codewars.com.

**Note**: _This project is currently a work in progress._

The transpiler can be located in the [adjacent folder](https://github.com/aramikuto/whitescape).

## Usage

Run `yarn test` to execute the tests once. For continuous testing while monitoring code changes, use `yarn test --watchAll`. You can find the solution code in the [solution.ts file](./solution.ts)

## Overview

[Whitespace](http://compsoc.dur.ac.uk/whitespace/tutorial.php) is an esoteric programming language that uses only three characters:

`[space]` or `" "` (ASCII 32)  
`[tab]` or `"\t"` (ASCII 9)  
`[line-feed]` or `"\n"` (ASCII 10)
All other characters may be used for comments. The interpreter ignores them.

Whitespace is an imperative, stack-based programming language, including features such as subroutines.

Each command in whitespace begins with an Instruction Modification Parameter (IMP).
