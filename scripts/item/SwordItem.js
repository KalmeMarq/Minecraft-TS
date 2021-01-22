import TieredItem from './TieredItem.js';

class SwordItem extends TieredItem {
  constructor(tierIn, attackDamageIn, attackSpeedIn, properties) {
    super(tierIn, properties);
    this.attackDamage = attackDamageIn + tierIn.getAttackDamage();
    this.attackSpeed = attackSpeedIn ;
  }

  getAttackDamage() {
    return this.attackDamage;
  }
}

export default SwordItem;