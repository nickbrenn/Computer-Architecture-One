/**
 * LS-8 v2.0 emulator skeleton code
 */

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {
  /**
   * Initialize the CPU
   */
  constructor(ram) {
    this.ram = ram;

    this.reg = new Array(8).fill(0); // General-purpose registers R0-R7

    // Special-purpose registers
    this.PC = 0; // Program Counter
  }

  /**
   * Store value in memory address, useful for program loading
   */
  poke(address, value) {
    this.ram.write(address, value);
  }

  /**
   * Starts the clock ticking on the CPU
   */
  startClock() {
    this.clock = setInterval(() => {
      this.tick();
    }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
  }

  /**
   * Stops the clock
   */
  stopClock() {
    clearInterval(this.clock);
    console.log("stopClock()");
  }

  /**
   * ALU functionality
   *
   * The ALU is responsible for math and comparisons.
   *
   * If you have an instruction that does math, i.e. MUL, the CPU would hand
   * it off to it's internal ALU component to do the actual work.
   *
   * op can be: ADD SUB MUL DIV INC DEC CMP
   */
  alu(op, regA, regB) {
    switch (op) {
      case "MUL":
        // !!! IMPLEMENT ME
        return (regA *= regB);
    }
  }

  /**
   * Advances the CPU one cycle
   */
  tick() {
    // Load the instruction register (IR--can just be a local variable here)
    // from the memory address pointed to by the PC. (I.e. the PC holds the
    // index into memory of the instruction that's about to be executed
    // right now.)

    // !!! IMPLEMENT ME
    const IR = this.ram.read(this.PC);

    // Debugging output
    const IRstring = IR.toString(2);
    // console.log(`${this.PC}: ${IR.toString(2)}`);
    // console.log(`${this.PC}: ${IR}`);

    // Get the two bytes in memory _after_ the PC in case the instruction
    // needs them.

    // !!! IMPLEMENT ME
    const operandA = this.ram.read(this.PC + 1);
    const operandB = this.ram.read(this.PC + 2);

    // Execute the instruction. Perform the actions for the instruction as
    // outlined in the LS-8 spec.
    const LDI = 153,
      PRN = 67,
      MUL = 170,
      CALL = 72,
      ADD = 24,
      HLT = 1;

    // !!! IMPLEMENT ME
    switch (IR) {
      case LDI:
        console.log("In reg " + operandA + " write " + operandB);
        this.reg[operandA] = operandB;
        break;
      case PRN:
        console.log(`Print of reg ${operandA} is ${this.reg[operandA]}`);
        break;
      case MUL:
        console.log(`Multiply ${this.reg[operandA]} by ${this.reg[operandB]}`);
        this.reg[operandA] = this.alu(
          "MUL",
          this.reg[operandA],
          this.reg[operandB]
        );
        console.log(`Reg ${operandA} is now equal to ${this.reg[operandA]}`);
        break;
      case CALL:
        console.log(`Reg ${operandA} is called (${this.reg[operandA]})`);
        break;
      case ADD:
        console.log(`Multiply ${this.reg[operandA]} by 2 and print it`);
        this.reg[operandA] *= 2;
        console.log(`Reg ${operandA} is now equal to ${this.reg[operandA]}`);
        break;
      case HLT:
        this.stopClock();
        break;
      default:
        console.log("Unknown instruction given.");
        this.stopClock();
        break;
    }

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.

    // !!! IMPLEMENT ME
    // const IRstringEnd =
    //   IRstring[IRstring.length - 2] + IRstring[IRstring.length - 1];
    // // console.log("irstring end is this " + IRstringEnd);
    // if (IRstringEnd === "01" || IRstringEnd === "10") {
    //   this.PC += 3;
    // } else if (IRstringEnd === "00" || IRstringEnd === "11") {
    //   this.PC += 2;
    // } else this.PC += 1;

    const instLen = (IR >> 6) + 1;
    this.PC += instLen;
  }
}

module.exports = CPU;
