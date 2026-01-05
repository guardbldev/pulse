import { Client, ApplicationCommandDataResolvable } from "discord.js";
import { Command } from "../../core/Command";

export function registerSlashCommands(commands: Command[], client: Client, guildId?: string) {
  const data: ApplicationCommandDataResolvable[] = commands.map(cmd => ({
    name: cmd.name,
    description: cmd.description,
    options: (cmd.args||[]).map(arg => ({
      type: arg.type === "string" ? 3
        : arg.type === "number" ? 4
        : arg.type === "boolean" ? 5
        : arg.type === "user" ? 6
        : arg.type === "channel" ? 7
        : arg.type === "role" ? 8
        : 3,
      name: arg.name,
      description: arg.description || arg.name,
      required: arg.required??false,
      choices: arg.choices?.map((v:any) => ({name: String(v), value: v}))
    }))
  }));
  if (guildId)
    client.application?.commands.set(data, guildId);
  else
    client.application?.commands.set(data);
}