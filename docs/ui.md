# PulseCommand: UI

## Declarative builder

```ts
import Button from "pulsecommand/ui/components/Button";
ctx.reply({
  content: "Choose a button:",
  components: [
    Button().label("Click Me!").onClick(ctx => ctx.reply("Clicked")).toJSON()
  ]
});
```

## Modal

```ts
import Modal from "pulsecommand/ui/components/Modal";
ctx.showModal(
  Modal()
    .title("Feedback")
    .addField("text", "Say something...", "PARAGRAPH", true)
    .onSubmit(fields => ctx.reply(fields.text))
    .toJSON()
);
```