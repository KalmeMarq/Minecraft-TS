import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import Enchantments from "./Enchantments";
import EnchantmentType from "./EnchantmentType";


export default class SilkTouchEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.DIGGER, slots);
  }

  public getMinCost(cost: number): number {
    return 15;
  }

  public getMaxCost(cost: number): number {
    return super.getMinCost(cost) + 50;
  }

  public getMaxLevel(): number {
    return 1;
  }
}