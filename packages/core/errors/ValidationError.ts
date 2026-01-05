export class ValidationError extends Error {
  argName: string;
  constructor(msg: string, argName: string) {
    super(`Invalid value for "${argName}": ${msg}`);
    this.argName = argName;
  }
}