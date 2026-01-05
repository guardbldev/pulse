import { Command } from "../packages/core/Command";
import Button from "../packages/ui/components/Button";
export default new Command({
  name: "ping",
  description: "Check latency",
  async execute(ctx) {
    await ctx.reply({
      content: "Pong!",
      components: [
        Button()
          .label("Refresh")
          .onClick(() => ctx.rerun())
      ].map(b=>b.toJSON())
    });
  }
});