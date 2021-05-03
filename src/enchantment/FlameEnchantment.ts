import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class FlameEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.BOW, slots);
  }

  public getMinCost(cost: number): number {
    return 20;
  }

  public getMaxCost(cost: number): number {
    return 50;
  }

  public getMaxLevel(): number {
    return 1;
  }
}