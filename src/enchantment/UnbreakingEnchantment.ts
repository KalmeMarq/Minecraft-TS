import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Item from "../item/Item";
import Items from "../item/Items";
import ItemStack from "../item/ItemStack";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class UnbreakingEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.BREAKABLE, slots);
  }

  public getMinCost(cost: number): number {
    return 5 + (cost - 1) * 8;
  }

  public getMaxCost(cost: number): number {
    return super.getMinCost(cost) + 50;
  }

  public getMaxLevel(): number {
    return 3;
  }

  public canEnchant(stack: ItemStack): boolean {
    return false ? true : super.canEnchant(stack);
  }

  public static shouldIgnoreDurabilityDrop(stack: ItemStack, value: number): boolean {
    if(Items.AIR instanceof Item && Math.random() < 0.6) {
      return false;
    } else {
      return Math.round(Math.random() * value + 1) > 0;
    }
  }
}