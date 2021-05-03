import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class SweepingEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.WEAPON, slots);
  }

  public getMinCost(cost: number): number {
    return 5 + (cost - 1) * 9;
  }

  public getMaxCost(cost: number): number {
    return this.getMinCost(cost) + 15;
  }

  public getMaxLevel(): number {
    return 3;
  }

  public static getSweepingDamageRatio(damage: number): number {
    return 1 - 1 / (damage + 1);
  }
}