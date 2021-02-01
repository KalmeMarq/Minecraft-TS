export default class ChatVisibility {
  protected static AllValues: { [id: number]: ChatVisibility } = {};

  static readonly FULL = new ChatVisibility(0, 'options.chat.visibility.full');
  static readonly SYSTEM = new ChatVisibility(1, 'options.chat.visibility.system');
  static readonly HIDDEN = new ChatVisibility(2, 'options.chat.visibility.hidden');

  protected constructor(public readonly id: number, public readonly key: string) {
    ChatVisibility.AllValues[id] = this;
  }

  public static byId(id: number): ChatVisibility {
    let ids: number[] = [];
    Object.keys(this.AllValues).forEach((id: any) => ids.push(Number(id)));
    if(id == ids.length) id = 0;
    return this.AllValues[id];
  }
}