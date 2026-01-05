import { Command } from "./Command";

export class CommandTree {
  readonly commands: Command[];
  constructor(commands: Command[]) {
    this.commands = commands;
  }
  search(name: string) {
    return this.commands.find(cmd => cmd.name === name);
  }
  flatten(): {name: string, description: string, path: string[]}[] {
    const walk = (cmds: Command[], path: string[]) => cmds.flatMap(cmd => [
      { name: cmd.name, description: cmd.description, path },
      ...walk(cmd.subcommands, [...path, cmd.name])
    ]);
    return walk(this.commands, []);
  }
  toHierarchy() {
    const walk = (cmds: Command[]) =>
      cmds.map(cmd => ({
        name: cmd.name,
        description: cmd.description,
        children: walk(cmd.subcommands)
      }));
    return walk(this.commands);
  }
  toString() {
    return this.flatten().map(cmd =>
      `/${cmd.path.concat(cmd.name).join(" ")} - ${cmd.description}`
    ).join("\n");
  }
}