import { Command } from "../Command";
export class CommandError extends Error {
  original: Error;
  command: Command<any>;
  constructor(original: Error, command: Command<any>) {
    super(`Command failed (${command.name}): ${original.message}`);
    this.original = original;
    this.command = command;
  }
}