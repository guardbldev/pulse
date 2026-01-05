type ModalSubmit = (fields: Record<string, any>, ctx: any) => any|Promise<any>;
let modalInc = 0;
export class Modal {
  private _title = "";
  private _id: string;
  private _fields: {id: string, label: string, style?: string, required?: boolean}[] = [];
  private _onSubmit?: ModalSubmit;
  constructor() {
    this._id = `pulse-modal-${++modalInc}-${Math.random().toString(36).slice(2,7)}`;
  }
  title(s: string) { this._title = s; return this; }
  addField(id: string, label: string, style = "SHORT", required = false) {
    this._fields.push({id, label, style, required}); return this;
  }
  onSubmit(fn: ModalSubmit) { this._onSubmit = fn; return this; }
  get id() { return this._id; }
  get fields() { return this._fields; }
  get handler() { return this._onSubmit; }
  toJSON() {
    return {
      type: "modal",
      custom_id: this._id,
      title: this._title,
      fields: this._fields
    };
  }
}
export default () => new Modal();