import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class VanishingCurseEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.VANISHABLE, slots);
  }

  public getMinCost(cost: number): number {
    return 25;
  }

  public getMaxCost(cost: number): number {
    return 50;
  }

  public getMaxLevel(): number {
    return 1;
  }

  public isTreasureOnly(): boolean {
    return true;
  }

  public isCurse(): boolean {
    return true;
  }
}