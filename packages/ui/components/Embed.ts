export class Embed {
  private data: any = {fields: []};
  title(t: string) { this.data.title = t; return this; }
  description(desc: string) { this.data.description = desc; return this; }
  color(hex: string|number) { this.data.color = hex; return this; }
  addField(name: string, value: string, inline = false) {
    this.data.fields.push({name, value, inline}); return this;
  }
  setFooter(t: string) { this.data.footer = t; return this; }
  setTimestamp(ts?: number) { this.data.timestamp = ts ?? Date.now(); return this; }
  toJSON() { return {...this.data}; }
}
export default () => new Embed();