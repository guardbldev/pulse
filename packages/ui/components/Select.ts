type SelectHandler = (ctx: any, value: string) => any|Promise<any>;
let selectInc = 0;
export class Select {
  private _label = "";
  private _id: string;
  private _options: {label: string, value: string}[] = [];
  private _onSelect?: SelectHandler;
  constructor() {
    this._id = `pulse-select-${++selectInc}-${Math.random().toString(36).slice(2,6)}`;
  }
  label(lbl: string) { this._label = lbl; return this; }
  addOption(label: string, value: string) {
    this._options.push({label, value}); return this;
  }
  onSelect(fn: SelectHandler) { this._onSelect = fn; return this; }
  get id() { return this._id; }
  get options() { return this._options; }
  get handler() { return this._onSelect; }
  toJSON() {
    return {
      type: "select",
      custom_id: this._id,
      placeholder: this._label,
      options: this._options
    };
  }
}
export default () => new Select();