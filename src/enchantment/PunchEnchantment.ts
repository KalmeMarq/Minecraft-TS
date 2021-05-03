import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class PunchEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.BOW, slots);
  }

  public getMinCost(cost: number): number {
    return 12 + (cost - 1) * 20;
  }

  public getMaxCost(cost: number): number {
    return this.getMinCost(cost) + 25;
  }

  public getMaxLevel(): number {
    return 2;
  }
}