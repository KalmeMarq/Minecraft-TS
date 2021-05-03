import IItemTier from "../util/interfaces/IItemTier";
import Items from "./Items";

export default class ItemTier implements IItemTier {
  public static WOOD = new ItemTier(0, 59, 2.0, 0.0, 15)
  public static STONE = new ItemTier(1, 131, 4.0, 1.0, 5)
  public static IRON = new ItemTier(2, 250, 6.0, 2.0, 14)
  public static DIAMOND = new ItemTier(3, 1561, 8.0, 3.0, 10)
  public static GOLD = new ItemTier(0, 32, 12.0, 0.0, 22)
  public static NETHERITE = new ItemTier(4, 2031, 9.0, 4.0, 15)

  private readonly level: number;
  private readonly uses: number;
  private readonly speed: number;
  private readonly damage: number;
  private readonly enchantmentValue: number;

  private constructor(level: number, uses: number, speed: number, damage: number, enchantValue: number) {
    this.level = level;
    this.uses = uses;
    this.speed = speed;
    this.damage = damage;
    this.enchantmentValue = enchantValue;
  }

  public getUses(): number {
    return this.uses;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public getAttackDamageBonus(): number {
    return this.damage;
  }

  public getLevel(): number {
    return this.level;
  }

  public getEnchantmentValue(): number {
    return this.enchantmentValue;
  }
}