import Rarity from './Rarity.js';

class Item {
  constructor(properties) {
    this.maxStackSize = properties.maxStackSize
    this.maxDamage = properties.maxDamage
    this.group = properties.group
    this.rarity = properties.rarity
    this.burnable = properties.immuneToFire
  }
  
  getMaxStackSize() {
    return this.maxStackSize
  }

  getMaxDamage() {
    return this.maxDamage
  }

  isDamageable() {
    return this.maxDamage > 0;
  }

  getGroup() {
    return this.group
  }

  isImmuneToFire() {
    return this.burnable;
  }
}

class ItemProperties {
  maxStackSize = 64
  maxDamage = 0
  group
  rarity = Rarity.COMMON
  immuneToFire = false

  constructor() {
    this.maxStackSize
    this.maxDamage
    this.group
    this.rarity
    this.immuneToFire
  }

  setMaxStackSize(maxStackSizeIn) {
    this.maxStackSize = maxStackSizeIn
    return this
  }

  setMaxDamage(maxDamageIn) {
    this.maxDamage = maxDamageIn
    this.maxStackSize = 1
    return this
  }

  setGroup(groupIn) {
    this.group = groupIn
    return this
  }

  setRarity(rarityIn) {
    this.rarity = rarityIn
    return this
  }

  setIsImmuneToFire() {
    this.immuneToFire = true;
    return this
  }
}

export default Item;
export {
  ItemProperties
}