import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import Enchantments from "./Enchantments";
import EnchantmentType from "./EnchantmentType";


export default class MultishotEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.CROSSBOW, slots);
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