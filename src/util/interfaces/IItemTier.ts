
export default interface IItemTier {
   getUses(): number;
   getSpeed(): number;
   getAttackDamageBonus(): number;
   getLevel(): number;
   getEnchantmentValue(): number;
}