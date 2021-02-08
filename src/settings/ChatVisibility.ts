import MathHelper from "../utils/MathHelper";
import Utils from "../utils/Utils";

export default class ChatVisibility {
  static readonly FULL = new ChatVisibility(0, 'options.chat.visibility.full');
  static readonly HIDDEN = new ChatVisibility(2, 'options.chat.visibility.hidden');
  static readonly SYSTEM = new ChatVisibility(1, 'options.chat.visibility.system');

  private static BY_ID: ChatVisibility[] = Object.values(ChatVisibility).sort(Utils.sortIteratable);

  public id: number;
  public key: string;
  private constructor(id: number, key: string) {
    this.id = id;
    this.key = key;
  }

  public getId(): number {
    return this.id;
  }

  public getKey() {
    return this.key;
  }

  public static byId(id: number): ChatVisibility {
    return ChatVisibility.BY_ID[MathHelper.normalizeAngle(id, ChatVisibility.BY_ID.length)];
  }
}