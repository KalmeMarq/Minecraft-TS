import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class PiercingEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.CROSSBOW, slots);
  }

  public getMinCost(cost: number): number {
    return 1 + (cost - 1) * 10;
  }

  public getMaxCost(cost: number): number {
    return 50;
  }

  public getMaxLevel(): number {
    return 4;
  }
}