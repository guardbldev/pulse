import { Client, Interaction, Message, ButtonInteraction, SelectMenuInteraction, ModalSubmitInteraction } from "discord.js";
import { Command } from "../../core/Command";
import { Context } from "../../core/Context";

export interface AdapterOptions {
  client: Client;
  commands: Command[];
}
export class DiscordJSAdapter {
  client: Client;
  commands: Map<string, Command>;
  constructor({ client, commands }: AdapterOptions) {
    this.client = client;
    this.commands = new Map(commands.map(c=>[c.name,c]));
  }

  bind() {
    this.client.on("interactionCreate", async (i: Interaction) => {
      // Slash
      if (i.isChatInputCommand()) {
        const cmd = this.commands.get(i.commandName);
        if (cmd) {
          await cmd.run({
            command: cmd,
            source: "slash",
            user: i.user,
            channel: i.channel,
            guild: i.guild,
            reply: opts=>i.reply(opts),
            rerun: ()=>cmd.run({command:cmd,source:"slash",user:i.user,channel:i.channel,guild:i.guild,reply:opts=>i.reply(opts)}, {})
          }, Object.fromEntries(i.options.data.map(o=>[o.name, o.value])));
        }
      }
      // Button
      else if (i.isButton()) {
        // Find the handler by custom_id and trigger
        // Requires registration table for buttons
      } else if (i.isSelectMenu()) {
        // Similar binding for select
      } else if (i.isModalSubmit()) {
        // Modal submit logic
      }
    });
    this.client.on("messageCreate", async (msg: Message) => {
      // Prefix command logic
      if (!msg.content.startsWith("!")) return;
      const [name, ...rest] = msg.content.slice(1).split(/\s+/);
      const cmd = this.commands.get(name);
      if (cmd) {
        await cmd.run({
          command: cmd,
          source: "prefix",
          user: msg.author,
          channel: msg.channel,
          guild: msg.guild,
          reply: opts=>msg.reply(opts.content)
        }, parsePrefixArgs(cmd.args, rest));
      }
    });
  }
}

function parsePrefixArgs(args: any[], tokens: string[]) {
  // Advanced: parse tokens to arg spec types by position or flag
  const out: Record<string, any> = {};
  args.forEach((spec, ix) => {
    out[spec.name] = tokens[ix];
  });
  return out;
}