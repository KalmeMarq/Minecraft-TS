import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Enchantment, { EnchantmentRarity } from "./Enchantment";
import EnchantmentType from "./EnchantmentType";


export default class ProtectionEnchantment extends Enchantment {
  public readonly type: ProtectionEnchantmentType;

  public constructor(rarity: EnchantmentRarity, type: ProtectionEnchantmentType, ...slots: EquipmentSlotType[]) {
    super(rarity, type == ProtectionEnchantmentType.FALL ? EnchantmentType.ARMOR_FEET : EnchantmentType.ARMOR, slots);
    this.type = type;
  }

  public getMinCost(cost: number): number {
    return this.type.getMinCost() + (cost - 1) * this.type.getLevelCost();
  }

  public getMaxCost(cost: number): number {
    return this.getMinCost(cost) + this.type.getLevelCost();
  }

  public getMaxLevel(): number {
    return 4;
  }

  public getDamageProtection(): number {
    return 0;
  }
}

export class ProtectionEnchantmentType {
  public static ALL = new ProtectionEnchantmentType("all", 1, 11)
  public static FIRE = new ProtectionEnchantmentType("fire", 10, 8)
  public static FALL = new ProtectionEnchantmentType("fall", 5, 6)
  public static EXPLOSION = new ProtectionEnchantmentType("explosion", 5, 8)
  public static PROJECTILE = new ProtectionEnchantmentType("projectile", 3, 6)

  private readonly name: string;
  private readonly minCost: number;
  private readonly levelCost: number;

  private constructor(name: string, minCost: number, levelCost: number) {
    this.name = name;
    this.minCost = minCost;
    this.levelCost = levelCost;
  }

  public getMinCost(): number {
    return this.minCost;
  }

  public getLevelCost(): number {
    return this.levelCost;
  }
}