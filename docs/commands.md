# PulseCommand: Commands

## Defining commands

```ts
import { Command, StringArg } from "pulsecommand/core";
export default new Command({
  name: "say",
  args: [new StringArg("text").req()],
  async execute(ctx) {
    await ctx.reply(ctx.args.text);
  }
});
```

- Arguments are type-checked, auto-complete supported for slash.

## Subcommands

```ts
import { Command } from "pulsecommand/core";
const ban = new Command(...); const kick = new Command(...);
export default new Command({
  name: "admin",
  subcommands: [ban, kick],
  execute(ctx) { ctx.reply("Admin, use `/ban` or `/kick`"); }
});
```