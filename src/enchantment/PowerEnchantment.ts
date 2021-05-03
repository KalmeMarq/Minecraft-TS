import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class PowerEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.BOW, slots);
  }

  public getMinCost(cost: number): number {
    return 1 + (cost - 1) * 10;
  }

  public getMaxCost(cost: number): number {
    return this.getMinCost(cost) + 15;
  }

  public getMaxLevel(): number {
    return 5;
  }
}