/*
 *
 * PulseCommand: Command Context
 * -----------------------------
 * Contains all context needed to execute commands ("ctx" everywhere)
 * Abstracts over invocation method (slash, prefix, UI, etc)
 * Provides argument access, reply/UX hooks, session & permissions
 *
 * @file Context.ts
 *
 */

import type { Command } from "./Command";

/*
 *
 * Describes where a command was invoked
 * - Used for contextual behavior (e.g. run command differently for prefix vs button)
 *
 */
export type InvocationSource = "slash" | "prefix" | "button" | "modal" | "select";

/*
 *
 * All data injected into a Context on invocation
 *
 */
export interface ContextOptions<Args = any> {
  command: Command<Args>;
  source: InvocationSource;
  user: any;
  channel?: any;
  guild?: any;
  args: Args;
  session?: any;
  reply: (obj: any) => Promise<any>|any;
  rerun?: () => Promise<any>;
  showModal?: (modal: any) => void;
  ephemeral?: boolean;
}

/*
 *
 * Context class – "ctx" for every handler
 * - Encapsulates all user state, permissions, args, and invocation details
 * - Used to reply, rerun, present modals, manage UI state, etc.
 *
 * All helpers use type guards to encourage type-safe routing in commands
 *
 */
export class Context<Args = any> {
  readonly command: Command<Args>;
  readonly source: InvocationSource;
  readonly user: any;
  readonly channel: any;
  readonly guild: any;
  readonly args: Args;
  readonly session: any;
  readonly ephemeral: boolean;
  readonly reply: (obj: any) => Promise<any>|any;
  readonly rerun: () => Promise<any>;
  readonly showModal?: (modal: any) => void;

  constructor(opts: ContextOptions<Args>) {
    /*
     *
     * “Freeze” reference surface for mutation safety (stateless core)
     *
     */
    this.command = opts.command;
    this.source = opts.source;
    this.user = opts.user;
    this.channel = opts.channel;
    this.guild = opts.guild;
    this.args = opts.args;
    this.session = opts.session ?? {};
    this.ephemeral = opts.ephemeral ?? false;
    this.reply = opts.reply;
    this.rerun = opts.rerun ?? (()=>{});
    this.showModal = opts.showModal;
  }

  /*
   *
   * Type guard for UI origin ("button" press)
   *
   */
  isButton() { return this.source === "button"; }

  /*
   * Type guard for slash invocation (slash or context menu)
   */
  isSlash() { return this.source === "slash"; }

  /*
   * Type guard for classic message prefix invocation (!cmd)
   */
  isPrefix() { return this.source === "prefix"; }

  /*
   * Type guard for modal form submit
   */
  isModal() { return this.source === "modal"; }

  /*
   * Type guard for select menu
   */
  isSelect() { return this.source === "select"; }
}