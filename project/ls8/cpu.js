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

    this.branchTable = new Array();

    this.branchTable[153] = (a, b) => this.handle_LDI(a, b);
    this.branchTable[67] = (a, b) => this.handle_PRN(a, b);
    this.branchTable[170] = (a, b) => this.handle_MUL(a, b);
    this.branchTable[72] = (a, b) => this.handle_CALL(a, b);
    this.branchTable[24] = (a, b) => this.handle_ADD(a, b);
    this.branchTable[1] = () => this.handle_HLT();

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
        return (regA *= regB);
    }
  }

  handle_LDI(operandA, operandB) {
    console.log("In reg " + operandA + " write " + operandB);
    this.reg[operandA] = operandB;
  }

  handle_PRN(operandA, operandB) {
    console.log(`Print of reg ${operandA} is ${this.reg[operandA]}`);
  }

  handle_MUL(operandA, operandB) {
    console.log(`Multiply ${this.reg[operandA]} by ${this.reg[operandB]}`);
    this.reg[operandA] = this.alu(
      "MUL",
      this.reg[operandA],
      this.reg[operandB]
    );
    console.log(`Reg ${operandA} is now equal to ${this.reg[operandA]}`);
  }

  handle_CALL(operandA, operandB) {
    console.log(`Reg ${operandA} is called (${this.reg[operandA]})`);
  }

  handle_ADD(operandA, operandB) {
    console.log(`Multiply ${this.reg[operandA]} by 2 and print it`);
    this.reg[operandA] *= 2;
    console.log(`Reg ${operandA} is now equal to ${this.reg[operandA]}`);
  }

  handle_HLT() {
    this.stopClock();
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
    // const IRstring = IR.toString(2);
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

    this.branchTable[IR](operandA, operandB);

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.
    const instLen = (IR >> 6) + 1;
    this.PC += instLen;
  }
}

module.exports = CPU;
