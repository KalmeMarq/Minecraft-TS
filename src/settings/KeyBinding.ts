export default class Keybinding {
  private keyDescription: string;
  private keyNameDefault: string;
  private keyCategory: string;
  private keyName: string;
  private static KEYBIND_ARRAY = new Map();
  private static HASH = new Map();
  private static CATEGORY_ORDER = new Map([
    ["key.categories.movement", 1],
    ["key.categories.gameplay", 2],
    ["key.categories.inventory", 3],
    ["key.categories.creative", 4],
    ["key.categories.multiplayer", 5],
    ["key.categories.ui", 6],
    ["key.categories.misc", 7]
  ]);
  private static KEYBIND_SET = new Set();

  constructor(description: string, keyname: string, category: string) {
    this.keyDescription = description;
    this.keyName = keyname;
    this.keyNameDefault = this.keyName;
    this.keyCategory = category;
    Keybinding.KEYBIND_ARRAY.set(description, this);
    Keybinding.HASH.set(this.keyName, this);
    Keybinding.KEYBIND_SET.add(category);
  }
}