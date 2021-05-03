import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Items from "../item/Items";
import ItemStack from "../item/ItemStack";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";

export default class EfficiencyEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.DIGGER, slots);
  }

  public getMinCost(cost: number): number {
    return 1 + 10 * (cost - 1);
  }

  public getMaxCost(cost: number): number {
    return super.getMinCost(cost) + 50;
  }

  public getMaxLevel(): number {
    return 5;
  }

  public canEnchant(stack: ItemStack): boolean {
    return Items.AIR === Items.AIR ? true : super.canEnchant(stack);
  }
}