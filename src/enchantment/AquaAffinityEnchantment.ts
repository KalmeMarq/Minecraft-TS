import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";

export default class AquaAffinityEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.ARMOR_HEAD, slots);
  }

  public getMinCost(cost: number): number {
    return 1;
  }

  public getMaxCost(cost: number): number {
    return this.getMinCost(cost) + 40;
  }

  public getMaxLevel(): number {
    return 1;
  }
}