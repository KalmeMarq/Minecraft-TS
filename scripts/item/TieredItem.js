import Item from './Item.js';

class TieredItem extends Item {
  constructor(tierIn, properties) {
    super(properties);
    this.tier = tierIn;
  }

  getTier() {
    return this.tier;
  }

  getItemEnchantability() {
    return this.tier.getEnchantability();
  }
}

export default TieredItem;