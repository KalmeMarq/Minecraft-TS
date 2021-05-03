import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class LoyaltyEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.TRIDENT, slots);
  }

  public getMinCost(cost: number): number {
    return 5 + cost * 7;
  }

  public getMaxCost(cost: number): number {
    return 50;
  }

  public getMaxLevel(): number {
    return 3;
  }
}