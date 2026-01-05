import { Command } from "./Command";
import { ContextOptions } from "./Context";
export class Executor {
  commands: Map<string, Command>;
  constructor(commands: Command[]) {
    this.commands = new Map(commands.map(cmd => [cmd.name, cmd]));
  }
  getCommand(name: string) {
    return this.commands.get(name);
  }
  async dispatch(name: string, ctxOpts: ContextOptions, args: any) {
    const cmd = this.getCommand(name);
    if (!cmd) throw new Error("Command not found");
    return cmd.run(ctxOpts, args);
  }
}