import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";

export default class DepthStriderEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.ARMOR_FEET, slots);
  }

  public getMinCost(cost: number): number {
    return cost * 10;
  }

  public getMaxCost(cost: number): number {
    return this.getMinCost(cost) + 15;
  }

  public getMaxLevel() {
    return 3;
  }
}