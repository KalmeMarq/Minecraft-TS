import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Item from "../item/Item";
import Items from "../item/Items";
import ItemStack from "../item/ItemStack";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import Enchantments from "./Enchantments";
import EnchantmentType from "./EnchantmentType";


export default class ThornsEnchantment extends Enchantment {
  public constructor(rarity: EnchantmentRarity, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.ARMOR_CHEST, slots);
  }

  public getMinCost(cost: number): number {
    return 10 + 20 * (cost - 1);
  }

  public getMaxCost(cost: number): number {
    return super.getMinCost(cost) + 50;
  }

  public getMaxLevel(): number {
    return 3;
  }

  public canEnchant(stack: ItemStack): boolean {
    return Items.AIR instanceof Item ? true : super.canEnchant(stack);
  }

  public static shouldHit(hit: number): boolean {
    if (hit <= 0) {
      return false;
    } else {
      return Math.random() < 0.15 * hit;
    }
  }

  public static getDamage(damage: number) {
    return damage > 10 ? damage - 10 : 1 + Math.round(Math.random() * 4);
  }
}