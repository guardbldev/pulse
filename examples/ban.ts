import { Command } from "../packages/core/Command";
import { StringArg } from "../packages/core/Argument";
import { Guard } from "../packages/permissions/Guard";
import Button from "../packages/ui/components/Button";
export default new Command({
  name: "ban",
  description: "Ban a user",
  args: [new StringArg("user", "User id/mention").req()],
  permissions: ["BAN_MEMBERS"],
  async execute(ctx) {
    Guard("BAN_MEMBERS")(ctx);
    const user = ctx.args.user;
    await ctx.reply({
      content: `Banned user: ${user}`,
      components: [
        Button().label("Undo").onClick(async () => {
          await ctx.reply(`Unbanned ${user}`);
        })
      ].map(b=>b.toJSON())
    });
  }
});