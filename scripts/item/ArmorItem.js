import Item from './Item.js';

class ArmorItem extends Item {
  constructor(materialIn, slotIn, properties) {
    super(properties)
    this.material = materialIn
    this.slot = slotIn

    this.damageReduceAmount = materialIn.getDamageReductionAmount();
    this.toughness = materialIn.getToughness();
    this.knockbackResistance = materialIn.getKnockbackResistance();
  }

  getArmorMaterial() {
    return this.material;
 }

  getDamageReduceAmount() {
    return this.damageReduceAmount;
  }

  getToughness() {
    return this.toughness;
  }
}

export default ArmorItem;