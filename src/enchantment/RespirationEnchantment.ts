import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class RespirationEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.ARMOR_HEAD, slots);
  }

  public getMinCost(cost: number): number {
    return 10 * cost;
  }

  public getMaxCost(cost: number): number {
    return this.getMinCost(cost) + 30;
  }

  public getMaxLevel(): number {
    return 3;
  }
}