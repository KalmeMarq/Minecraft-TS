import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class LootBonusEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, type: EnchantmentType, ...slots: EquipmentSlotType[]) {
    super(rarity, type, slots);
  }

  public getMinCost(cost: number): number {
    return 15 + (cost - 1) * 9;
  }

  public getMaxCost(cost: number): number {
    return super.getMinCost(cost) + 50;
  }

  public getMaxLevel(): number {
    return 3;
  }
}