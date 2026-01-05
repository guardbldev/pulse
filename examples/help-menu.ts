import { Command } from "../packages/core/Command";
import { CommandTree } from "../packages/core/CommandTree";
import { Pagination } from "../packages/ui/Pagination";

export const commands = [
  /*...import your Command instances here...*/
];

export default new Command({
  name: "help",
  description: "Show all commands",
  async execute(ctx) {
    const tree = new CommandTree(commands);
    const pages = tree.flatten().map(cmd =>
      `**/${cmd.path.concat(cmd.name).join(" ")}**: ${cmd.description}`
    );
    await ctx.reply(Pagination({ pages }));
  }
});