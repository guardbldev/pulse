# Pulse: UI

## Declarative builder

```ts
import Button from "pulse/ui/components/Button";
ctx.reply({
  content: "Choose a button:",
  components: [
    Button().label("Click Me!").onClick(ctx => ctx.reply("Clicked")).toJSON()
  ]
});
```

## Modal

```ts
import Modal from "pulse/ui/components/Modal";
ctx.showModal(
  Modal()
    .title("Feedback")
    .addField("text", "Say something...", "PARAGRAPH", true)
    .onSubmit(fields => ctx.reply(fields.text))
    .toJSON()
);
```
