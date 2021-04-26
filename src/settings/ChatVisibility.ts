import MathHelper from '../util/MathHelper'
import Util from '../util/Util'

export default class ChatVisibility {
  public static readonly FULL = new ChatVisibility(0, 'options.chat.visibility.full')
  public static readonly HIDDEN = new ChatVisibility(2, 'options.chat.visibility.hidden')
  public static readonly SYSTEM = new ChatVisibility(1, 'options.chat.visibility.system')

  private static readonly BY_ID: ChatVisibility[] = Object.values(ChatVisibility).sort(Util.sortIteratable)

  private id: number
  private key: string
  private constructor (id: number, key: string) {
    this.id = id
    this.key = key
  }

  public getId (): number {
    return this.id
  }

  public getKey (): string {
    return this.key
  }

  public static byId (id: number): ChatVisibility {
    return ChatVisibility.BY_ID[MathHelper.positiveModulo(id, ChatVisibility.BY_ID.length)]
  }
}
