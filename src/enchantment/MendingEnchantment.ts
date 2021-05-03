import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class MendingEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.BREAKABLE, slots);
  }

  public getMinCost(cost: number): number {
    return cost * 25;
  }

  public getMaxCost(cost: number): number {
    return this.getMinCost(cost) + 50;
  }

  public isTreasureOnly(): boolean {
    return true;
  }

  public getMaxLevel(): number {
    return 1;
  }
}