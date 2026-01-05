/*
 *
 * PulseCommand: Button UI Component
 * ---------------------------------
 * - Implements fluent builder for Discord UI Button
 * - Handles automatic ID, event binding, JSON output
 *
 * @file Button.ts
 */
type ButtonHandler = (ctx: any) => any|Promise<any>;
let inc = 0;

/*
 *
 * Button class with fluent configuration methods
 * - Unique custom_id for Discord routing
 * - Flexible style, label, event assignment
 *
 */
export class Button {
  private _label: string = "";
  private _id: string;
  private _style: string = "PRIMARY";
  private _onClick?: ButtonHandler;

  constructor() {
    // Generate unique (per-session) identifier for Discord custom ID
    this._id = `pulse-btn-${++inc}-${Math.random().toString(36).slice(2,7)}`;
  }

  /*
   * Set the button's visible label
   */
  label(lbl: string) { this._label = lbl; return this; }

  /*
   * Set style (e.g. "PRIMARY", "DANGER", etc)
   */
  style(s: string) { this._style = s; return this; }

  /*
   * Register a function for the button's click/interaction event
   */
  onClick(fn: ButtonHandler) { this._onClick = fn; return this; }

  /*
   * Internal: access id/handler for registry
   */
  get id() { return this._id; }
  get handler() { return this._onClick; }
  
  /*
   * Convert this button to Discord API structure
   */
  toJSON() {
    return {
      type: "button",
      custom_id: this._id,
      label: this._label,
      style: this._style
    };
  }
}

/*
 * Helper so you can `Button()` without `new`
 */
export default () => new Button();