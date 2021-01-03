window.addEventListener('contextmenu', (e) => { e.preventDefault() }, false);
const root = document.getElementById('root');

/* Configs */
let defaultLang = 'en_us';
let displayLang = 'en_us';
let soundVolume = 0.5;
let guiScale = 3;
let advancedTooltip = false;

/* Get JSON Files Data */
async function getJSONData(url) {
  const res = await fetch(url);
  return await res.json(); 
}

/* Item Registry */
class Item {
  #isStackable;
  #isDamagable;
  #isEnchantable;

  constructor(identifier, name, texture, maxStackSize, maxDamage, itemGroup) {
    this.identifier = identifier;
    this.name = name;
    this.texture = texture;
    this.maxStackSize = maxStackSize;
    this.#isStackable = maxStackSize === 1 ? false : true;
    this.maxDamage = maxDamage;
    this.#isDamagable = maxDamage === -1 ? false : true;
    this.#isEnchantable = false;
  }

  get isStackable() {
    return this.#isStackable;
  }

  get isDamagable() {
    return this.#isDamagable;
  }

  get isEnchantable() {
    return this.#isEnchantable;
  }
}

const RegistryItems = [
  new Item('apple', translateKey('item.apple.name'), 'assets/minecraft/textures/item/apple.png', 64, -1, 'foodstuffs'),
  new Item('arrow', translateKey('item.arrow.name'), 'assets/minecraft/textures/item/arrow.png', 64, -1),
  new Item('bone', translateKey('item.bone.name'), 'assets/minecraft/textures/item/bone.png', 64, -1),
  new Item('book', translateKey('item.book.name'), 'assets/minecraft/textures/item/book.png', 64, -1),
  new Item('bow', translateKey('item.bow.name'), 'assets/minecraft/textures/item/bow.png', 1, 20),
  new Item('bread', translateKey('item.bread.name'), 'assets/minecraft/textures/item/bread.png', 64, -1),
  new Item('brick', translateKey('item.brick.name'), 'assets/minecraft/textures/item/brick.png', 64, -1),
  new Item('bucket', translateKey('item.bucket.name'), 'assets/minecraft/textures/item/bucket.png', 64, -1),
  new Item('diamond_sword', translateKey('item.diamond_sword.name'), 'assets/minecraft/textures/item/diamond_sword.png', 1, 20),
  new Item('diamond', translateKey('item.diamond.name'), 'assets/minecraft/textures/item/diamond.png', 64, -1),
  new Item('dye_brown', translateKey('item.dye_brown.name'), 'assets/minecraft/textures/item/dye_brown.png', 64, -1),
  new Item('feather', translateKey('item.feather.name'), 'assets/minecraft/textures/item/feather.png', 64, -1),
  new Item('flint', translateKey('item.flint.name'), 'assets/minecraft/textures/item/flint.png', 64, -1),
  new Item('gold_ingot', translateKey('item.gold_ingot.name'), 'assets/minecraft/textures/item/gold_ingot.png', 64, -1),
  new Item('golden_apple', translateKey('item.golden_apple.name'), 'assets/minecraft/textures/item/golden_apple.png', 64, -1),
  new Item('golden_sword', translateKey('item.golden_sword.name'), 'assets/minecraft/textures/item/golden_sword.png', 1, 20),
  new Item('iron_door', translateKey('item.iron_door.name'), 'assets/minecraft/textures/item/iron_door.png', 64, -1),
  new Item('iron_ingot', translateKey('item.iron_ingot.name'), 'assets/minecraft/textures/item/iron_ingot.png', 64, -1),
  new Item('iron_sword', translateKey('item.iron_sword.name'), 'assets/minecraft/textures/item/iron_sword.png', 1, 20),
  new Item('leather', translateKey('item.leather.name'), 'assets/minecraft/textures/item/leather.png', 64, -1),
  new Item('paper', translateKey('item.paper.name'), 'assets/minecraft/textures/item/paper.png', 64, -1),
  new Item('shears', translateKey('item.shears.name'), 'assets/minecraft/textures/item/shears.png', 1, 20),
  new Item('stick', translateKey('item.stick.name'), 'assets/minecraft/textures/item/stick.png', 64, -1),
  new Item('snowball', translateKey('item.snowball.name'), 'assets/minecraft/textures/item/snowball.png', 16, -1),
  new Item('string', translateKey('item.string.name'), 'assets/minecraft/textures/item/string.png', 64, -1),
  new Item('sugarcane', translateKey('item.sugarcane.name'), 'assets/minecraft/textures/item/sugarcane.png', 64, -1),
  new Item('wheat', translateKey('item.wheat.name'), 'assets/minecraft/textures/item/wheat.png', 64, -1),
  new Item('cookie', translateKey('item.cookie.name'), 'assets/minecraft/textures/item/cookie.png', 64, -1)
];

/* ... */
class Slot {
  constructor() {}
}

class SelectedItem {
  constructor() {}
}