// to help with debugging
export function unbleach(n: string): string {
  if (n) return n.replace(/ /g, "s").replace(/\t/g, "t").replace(/\n/g, "n");
  return "";
}

class ExitRequest {}

export function whitespace(code: string, input?: string): string {
  var output = "",
    stack: any[] = [],
    heap = {};

  const codeLength = code.length;

  const getNextInput = () => {
    while (true) {
      const m = code[codeOffset++];
      if ([" ", "\t", "\n"].includes(m)) {
        return m;
      }
    }
  };

  let codeOffset = 0;
  const execToken = (
    tokenTable: { [key: string]: () => void },
    nameSpace: string,
  ) => {
    let commandBuffer = "";
    while (codeOffset < codeLength) {
      commandBuffer += getNextInput();
      //   console.log(unbleach(commandBuffer))
      if (tokenTable[commandBuffer]) {
        tokenTable[commandBuffer]();
        return;
      }
    }
    throw new Error(
      "Unknown command '" + unbleach(commandBuffer) + "' (" + nameSpace + ")",
    );
  };

  const readInt = () => {
    const signC = getNextInput();
    let res = 0;
    let sign = "+";
    if (signC === "\t") {
      sign = "-";
    } else if (signC !== " ") {
      throw new Error("Invalid number");
    }
    let c = "";
    while (true) {
      c = getNextInput();
      if (c === "\n") {
        break;
      }
      res <<= 1;
      res += c === " " ? 0 : 1;
    }
    return sign === "-" ? -res : res;
  };

  const operations = {
    " ": () => {
      // Stack manipulation
      const operationCommand = {
        " ": () => {
          // Push n onto stack
          const n = readInt();
          stack.push(n);
        },
        "\t ": () => {
          // Duplicate the nth value from the top of the stack and push onto the stack.
          const n = readInt();
          stack.push(stack[stack.length - n - 1]);
        },
        /** Discard the top n values below the top of the stack from the stack. (For n<**0** or */
        "\t\n": () => {
          const n = readInt();
          if (n < 0) {
            stack = stack.slice(-1);
          } else {
            stack = [stack.slice(-1), ...stack.slice(-n, -1).reverse()];
          }
        },
        /** Duplicate the top value on the stack. */
        "\n ": () => {
          stack.push(...stack.slice(-1));
        },
        /** Swap the top two value on the stack. */
        "\n\t": () => {
          const originalTop = stack.pop();
          const originalSecondValue = stack.pop();
          stack.push(originalTop);
          stack.push(originalSecondValue);
        },
        /** Discard the top value on the stack. */
        "\n\n": () => {
          stack.pop();
        },
      };
      execToken(operationCommand, "Stack manipulation");
    },
    "\t ": () => {
      // Arithmetics
    },

    "\t\n": () => {
      // IO
      const operationCommand = {
        "  ": () => {
          // Pop a value off the stack and output it as a character.
          output += String.fromCharCode(stack.pop());
        },
        " \t": () => {
          // Pop a value off the stack and output it as a number.
          output += stack.pop();
        },
        "\t ": () => {
          // Read a character from input, a, Pop a value off the stack, b, then store the ASCII value of a at heap address b.
        },
        "\t\t": () => {
          // Read a number from input, a, Pop a value off the stack, b, then store a at heap address b.
        },
      };
      execToken(operationCommand, "IO");
    },
    "\n": () => {
      // Flow control
      const operationCommand = {
        /** Mark a location in the program with label n. */
        "  ": () => {
          console.log("");
        },
        /** Call a subroutine with the location specified by label n. */
        " \t": () => {
          console.log("CALL SR");
        },
        /** Jump unconditionally to the position specified by label n. */
        " \n": () => {
          console.log("Call 2");
        },
        /** Pop a value off the stack and jump to the label specified by n if the value is zero. */
        "\t ": () => {
          console.log("Call 3");
        },
        "\n\n": () => {
          // Exit
          throw new ExitRequest();
        },
      };
      execToken(operationCommand, "Flow control");
    },
  };
  // while (true) {
  while (true) {
    try {
      execToken(operations, "Root");
    } catch (e) {
      if (e instanceof ExitRequest) {
        break;
      }
      throw e;
    }
  }
  return output;
}
