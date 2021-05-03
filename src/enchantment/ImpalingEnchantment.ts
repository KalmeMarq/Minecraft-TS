import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class ImpalingEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.TRIDENT, slots);
  }

  public getMinCost(cost: number): number {
    return 1 + (cost - 1) * 8;
  }

  public getMaxCost(cost: number): number {
    return this.getMinCost(cost) + 20;
  }

  public getMaxLevel(): number {
    return 5;
  }

  public getDamageBonus(): number {
    return 0;
  }
}