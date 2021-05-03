import EquipmentSlotType from "../inventory/EquipmentSlotType";
import Items from "../item/Items";
import ItemStack from "../item/ItemStack";
import Registry from "../util/Registry";
import { TextComponent } from "../util/text/TextComponent";
import TextFormatting from "../util/text/TextFormatting";
import Util from "../util/Util";
import EnchantmentType from "./EnchantmentType";

export default abstract class Enchantment {
  private readonly slots: EquipmentSlotType[];
  private readonly rarity: EnchantmentRarity;
  public readonly category: EnchantmentType;
  protected descriptionId: string | undefined;

  public constructor(rarity: EnchantmentRarity, category: EnchantmentType, slots: EquipmentSlotType[]) {
    this.rarity = rarity;
    this.category = category;
    this.slots = slots;
  }

  protected getOrCreateDescriptionId(): string {
    if(this.descriptionId === undefined) {
      this.descriptionId = Util.makeDescriptionId("enchantment", Registry.ENCHANTMENT.getKey(this));
    }
    return this.descriptionId;
  }

  public getDescriptionId(): string {
    return this.getOrCreateDescriptionId();
  }

  public getFullname(level: number): TextComponent {
    let textcomponent = new TextComponent(this.getDescriptionId());

    if(level !== 1 || this.getMaxLevel() !== 1) {
      textcomponent.append(' ').append(new TextComponent("enchantment.level." + level));
    }

    return textcomponent;
  }

  public getRarity(): EnchantmentRarity {
    return this.rarity;
  }

  public getMinLevel(): number {
    return 1;
  }

  public getMaxLevel(): number {
    return 1;
  }

  public getMinCost(cost: number): number {
    return 1 + cost * 10;
  }

  public getMaxCost(cost: number): number {
    return this.getMinCost(cost) + 5;
  }

  public getDamageProtection(): number {
    return 0;
  }

  public getDamageBonus(): number {
    return 0;
  }

  public canEnchant(stack: ItemStack): boolean {
    return this.category.canEnchant(Items.AIR);
  }

  public isTreasureOnly(): boolean {
    return false;
  }

  public isCurse(): boolean {
    return false;
  }

  public isTradeable(): boolean {
    return true;
  }

  public isDiscoverable(): boolean {
    return true;
  }
}
export class EnchantmentRarity {
  public static COMMON = new EnchantmentRarity(10)
  public static UNCOMMON = new EnchantmentRarity(5)
  public static RARE = new EnchantmentRarity(2)
  public static  VERY_RARE = new EnchantmentRarity(1)

  private readonly weight: number;

  private constructor(weight: number) {
    this.weight = weight;
  }

  public getWeight(): number {
    return this.weight;
  }
}