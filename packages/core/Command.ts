/*
 *
 * PulseCommand: Unified Command Definition
 * ----------------------------------------
 * - Defines metadata, argument specs, permission requirements
 * - Contains command logic, modular sub-command tree
 * - Strongly typed, extensible
 *
 * @file Command.ts
 *
 */

import { ArgumentSpec, parseArguments } from "./Argument";
import { Context, ContextOptions } from "./Context";
import { CommandError } from "./errors/CommandError";
import type { AutocompleteOption } from "./Autocomplete";

/*
 *
 * Shape for command execution handler
 * - Context is always passed; return can be sync/async
 *
 */
export type CommandExecute<Args = any> = (ctx: Context<Args>) => unknown | Promise<unknown>;

/*
 *
 * Metadata/config structure for a Command
 * - Introspect allows dynamic help output, dashboards, etc.
 * - Subcommands allow for trees (`/admin ban`, `/tools convert`, etc)
 *
 */
export interface CommandOptions<Args = any> {
  name: string;
  description: string;
  args?: ArgumentSpec[];
  permissions?: string[];
  autocomplete?: AutocompleteOption[];
  subcommands?: Command[];
  execute: CommandExecute<Args>;
  introspect?: (ctx: Context<Args>) => any;
}

/*
 *
 * The Command class
 * - Responsible for argument parsing and context creation
 * - Supports robust error boundaries for UX
 * - Designed for tree composition and runtime introspection
 *
 */
export class Command<Args = any> {
  readonly name: string;
  readonly description: string;
  readonly args: ReadonlyArray<ArgumentSpec>;
  readonly permissions: ReadonlyArray<string>;
  readonly autocomplete: ReadonlyArray<AutocompleteOption>;
  readonly subcommands: ReadonlyArray<Command>;
  readonly execute: CommandExecute<Args>;
  readonly introspect?: (ctx: Context<Args>) => any;

  constructor(opts: CommandOptions<Args>) {
    /*
     *
     * Store all options as deep immutable arrays for composition safety
     *
     */
    this.name = opts.name;
    this.description = opts.description;
    this.args = Object.freeze(opts.args ?? []);
    this.permissions = Object.freeze(opts.permissions ?? []);
    this.autocomplete = Object.freeze(opts.autocomplete ?? []);
    this.subcommands = Object.freeze(opts.subcommands ?? []);
    this.execute = opts.execute;
    this.introspect = opts.introspect;
  }

  /*
   *
   * Runs the command with typed argument parsing and full error boundaries
   * If argSource includes bad data, ValidationError bubbles up as CommandError
   * Returns whatever value the user's handler yields—UI objects, primitives, etc.
   *
   */
  async run(raw: ContextOptions, argSource: any) {
    try {
      /*
       *
       * Argument parsing includes type, default, and validation support
       *
       */
      const args = parseArguments(this.args, argSource);

      /*
       *
       * Builds a new context for every command invocation
       * Session, user, etc. are passed through
       *
       */
      const ctx = new Context({ ...raw, args, command: this });

      /*
       *
       * Execute the user logic; any throw is wrapped for consistent UX boundaries
       *
       */
      return await this.execute(ctx);
    } catch (e) {
      throw new CommandError(e as Error, this);
    }
  }
}