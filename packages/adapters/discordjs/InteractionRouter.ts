import { Interaction } from "discord.js";
import { Command } from "../../core/Command";

// A registry to bind UI components with handlers
interface UIRegistry {
  [custom_id: string]: (ctx: any, payload?: any) => any|Promise<any>;
}
export class InteractionRouter {
  registry: UIRegistry = {};
  register(id: string, handler: (ctx: any, payload?: any) => any|Promise<any>) {
    this.registry[id] = handler;
  }
  async route(i: Interaction) {
    if ("customId" in i && this.registry[i.customId]) {
      await this.registry[i.customId]({ interaction: i });
    }
  }
}