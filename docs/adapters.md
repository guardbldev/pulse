# PulseCommand: Adapters

## Supported

- discord.js (native binding)
- Planned: discord.py, discord.ts

## Usage

```ts
import { DiscordJSAdapter } from "pulsecommand/adapters/discordjs/Adapter";
const adapter = new DiscordJSAdapter({ client, commands: [ /* ... */ ] });
adapter.bind();
```
- All commands and UI handlers are auto-plugged.


- UI event handling is automatic for all components built via PulseCommand.

