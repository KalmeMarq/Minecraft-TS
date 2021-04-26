import KeyBinding from './KeyBinding'

export default class ToggleableKeyBinding extends KeyBinding {
  private readonly needsToggle: any

  public constructor (name: string, key: string, category: string, getB: () => boolean) {
    super(name, key, category)
    this.needsToggle = getB
  }
}
