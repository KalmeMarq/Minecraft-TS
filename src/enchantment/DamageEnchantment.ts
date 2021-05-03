import IImmutable from "../util/interfaces/IImmutable";
import EquipmentSlotType from "../inventory/EquipmentSlotType"
import Item from "../item/Item";
import Items from "../item/Items";
import ItemStack from "../item/ItemStack"
import Enchantment, { EnchantmentRarity } from "./Enchantment"
import EnchantmentType from "./EnchantmentType"

export default class DamageEnchantment extends Enchantment {
  private static NAMES: IImmutable<string[]> = ["all", "undead", "arthropods"];
  private static MIN_COST: IImmutable<number[]> = [1, 5, 5];
  private static LEVEL_COST: IImmutable<number[]> = [11, 8, 8];
  private static LEVEL_COST_SPAN: IImmutable<number[]> = [20, 20, 20];
  public readonly type: number;

  public constructor(rarity: EnchantmentRarity, type: number, ...slots: EquipmentSlotType[]) {
    super(rarity, EnchantmentType.WEAPON, slots);
    this.type = type;
  }

  public getMinCost(cost: number): number {
    return DamageEnchantment.MIN_COST[this.type] + (cost - 1) * DamageEnchantment.LEVEL_COST[this.type];
  }

  public getMaxCost(cost: number): number {
    return this.getMinCost(cost) + DamageEnchantment.LEVEL_COST_SPAN[this.type];
  }

  public getMaxLevel(): number {
    return 5;
  }

  public getDamageBonus(): number {
    return 1;
  }

  public canEnchant(stack: ItemStack): boolean {
    return Items.AIR instanceof Item ? true : super.canEnchant(stack);
  }
}