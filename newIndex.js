let defaultLang = 'en_us';
let displayLang = 'en_us';

let soundVolume = 0.5;

let guiScale = 3;
let advancedTooltip = false;


async function getJSONData(url) {
  const res = await fetch(url);
  return await res.json(); 
}

class Item {
  #isStackable;
  #isEnchantable;

  constructor(identifier, texture, maxStackSize, maxDamage) {
    this.identifier = identifier;
    this.texture = texture;
    this.maxStackSize = maxStackSize;
    this.#isStackable = maxStackSize === 1 ? false : true;
    this.maxDamage = maxDamage;
  }

  get isStackable() {
    return this.#isStackable;
  }
}

class Slot {
  constructor() {}
}

class SelectedItem {
  constructor() {}
}