/*
 *
 * PulseCommand: Argument System & Parser
 * --------------------------------------
 * Allows declarative arg typing (string, number, user, etc)
 * Includes advanced parsing: choices, validation, default, required
 *
 * @file Argument.ts
 *
 */

import { ValidationError } from "./errors/ValidationError";

/*
 *
 * Supported argument value types
 *
 */
export type ArgumentType =
  | "string"
  | "number"
  | "user"
  | "role"
  | "channel"
  | "boolean";

/*
 *
 * Declarative definition for a single argument
 * - Can be further extended for autocomplete, etc.
 *
 */
export interface ArgumentSpec<T = any> {
  type: ArgumentType;
  name: string;
  description?: string;
  required?: boolean;
  default?: T;
  choices?: T[];
  validate?: (v: T) => void;
}

/*
 *
 * Advanced parser for argument sources
 * - Handles type conversion, default assignment, and custom validation
 * - Throws ValidationError for unified UX handling
 *
 */
export function parseArguments(
  specs: ArgumentSpec[],
  src: Record<string, any>
): Record<string, any> {
  const out: Record<string, any> = {};

  for (const spec of specs) {
    let val = src[spec.name];
    if (val == null) {
      if (spec.default !== undefined) {
        val = spec.default;
      } else if (spec.required) {
        throw new ValidationError("Required", spec.name);
      }
    }
    if (val != null) {
      // Advanced type-specific validation logic
      switch (spec.type) {
        case "number":
          val = Number(val);
          if (isNaN(val)) throw new ValidationError("Not a number", spec.name);
          break;
        case "boolean":
          val = typeof val === "string"
            ? val === "true" || val === "1"
            : !!val;
          break;
        // Extend for user, channel, role ID mapping, if desired
      }
      if (spec.choices && !spec.choices.includes(val))
        throw new ValidationError("Invalid choice", spec.name);
      if (spec.validate) spec.validate(val);
      out[spec.name] = val;
    }
  }
  return out;
}

/*
 *
 * Helper for common argument types (fluent, with defaults)
 *
 */
export class StringArg implements ArgumentSpec<string> {
  type: ArgumentType = "string";
  name: string;
  description?: string;
  required?: boolean;
  default?: string;
  choices?: string[];
  validate?: (v: string) => void;

  constructor(name: string, desc?: string) {
    this.name = name;
    if (desc) this.description = desc;
  }
  /*
   * Mark as required (fluent)
   */
  req() { this.required = true; return this; }
  /*
   * Specify a default value
   */
  withDefault(v: string) { this.default = v; return this; }
  /*
   * Specify allowed choices
   */
  withChoices(...list: string[]) { this.choices = list; return this; }
  /*
   * Custom validation function
   */
  withValidation(fn: (v: string) => void) { this.validate = fn; return this; }
}