class ArmorMaterial {
  constructor(name, maxDamageFactor, damageReductionAmountArray, enchantability, soundEvent, toughness, knockbackResistance, repairMaterial) {
    this.name = name;
    this.maxDamageFactor = maxDamageFactor;
    this.damageReductionAmountArray = damageReductionAmountArray;
    this.enchantability = enchantability;
    this.soundEvent = soundEvent;
    this.toughness = toughness;
    this.knockbackResistance = knockbackResistance;
    this.repairMaterial = repairMaterial;
  }

  getDamageReductionAmount() {
    return this.damageReductionAmountArray[1];
  }

  getEnchantability() {
    return this.enchantability;
  }

  getSoundEvent() {
    return this.soundEvent;
  }

  getRepairMaterial() {
    return this.repairMaterial;
  }

  getName() {
    return this.name;
  }

  getToughness() {
    return this.toughness;
  }

  getKnockbackResistance() {
    return this.knockbackResistance;
  }
}

const ArmorMaterials = {
  DIAMOND: new ArmorMaterial("diamond", 33, [2.55, 6, 8, 2.55], 10, 'null', 2, 0, 'diamond')
}

export default ArmorMaterials;