import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class KnockbackEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.WEAPON, slots);
  }

  public getMinCost(cost: number): number {
    return 5 + 20 * (cost - 1);
  }

  public getMaxCost(cost: number): number {
    return super.getMinCost(cost) + 50;
  }

  public getMaxLevel(): number {
    return 2;
  }
}