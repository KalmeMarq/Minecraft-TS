// import I18n from '../language/I18'

import Util from '../util/Util'

export default class KeyBinding {
  private static readonly ALL: Map<string, KeyBinding> = new Map()
  private static readonly MAP: Map<string, KeyBinding> = new Map()
  private static readonly CATEGORIES: Set<string> = new Set()
  private static readonly CATEGORY_SORT_ORDER: Map<string, number> = new Map([
    ['key.categories.movement', 1],
    ['key.categories.gameplay', 2],
    ['key.categories.inventory', 3],
    ['key.categories.creative', 4],
    ['key.categories.multiplayer', 5],
    ['key.categories.ui', 6],
    ['key.categories.misc', 7]
  ])

  private readonly name: string
  private readonly defaultKey: string
  private readonly category: string
  private key: string

  public constructor (name: string, key: string, category: string) {
    this.name = name
    this.key = key
    this.defaultKey = this.key
    this.category = category
    KeyBinding.ALL.set(name, this)
    KeyBinding.MAP.set(this.key, this)
    KeyBinding.CATEGORIES.add(category)
  }

  public isDefault (): boolean {
    return Util.equals(this.key, this.defaultKey)
  }

  public compareTo (compareTo: KeyBinding): number {
    return 0
    // return this.category.equals(p_compareTo_1_.category) ? I18n.format(this.name) === (I18n.format(p_compareTo_1_.name)) ? 0 : 1 : KeyBinding.CATEGORY_SORT_ORDER.get(this.category)! === KeyBinding.CATEGORY_SORT_ORDER.get(p_compareTo_1_.category) ? 0 : 1
  }

  public same (keyB: KeyBinding): boolean {
    return Util.equals(this.key, keyB.key)
  }

  public static resetMapping (): void {
    KeyBinding.MAP.clear()

    for (const keybinding of KeyBinding.ALL.values()) {
      KeyBinding.MAP.set(keybinding.key, keybinding)
    }
  }

  getDefaultKey (): string {
    return this.defaultKey
  }

  getCategory (): string {
    return this.category
  }

  saveString (): string {
    return this.key
  }

  public setKey (code: string): void {
    this.key = code
  }

  public getName (): string {
    return this.name
  }

  public getTranslatedKeyMessage (): string {
    return this.key
  }
}
