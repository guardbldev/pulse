import { Command } from "../packages/core/Command";
import Button from "../packages/ui/components/Button";
import Modal from "../packages/ui/components/Modal";
export default new Command({
  name: "feedback",
  description: "Send feedback",
  async execute(ctx) {
    await ctx.reply(
      Button()
        .label("Open Form")
        .onClick(() => ctx.showModal?.(
          Modal()
            .title("Feedback")
            .addField("comment", "Your Feedback", "PARAGRAPH", true)
            .onSubmit((fields) => ctx.reply(`Thanks: ${fields.comment}`))
            .toJSON()
        )).toJSON()
    );
  }
});