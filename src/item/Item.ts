import Block from "../block/Block";
import IItemProvider from "../util/interfaces/IItemProvider";
import CustomMap from "../util/CustomMap";
import Exception from "../util/exceptions/Exception";
import Food from "./Food";
import ItemGroup from "./ItemGroup";
import Items from "./Items";
import Rarity from "./Rarity";

export default class Item implements IItemProvider {
  public static readonly BY_BLOCK: CustomMap<Block, Item> = new CustomMap();
  protected readonly category: ItemGroup | undefined;
  private readonly rarity: Rarity | undefined;
  private readonly maxStackSize: number;
  private readonly maxDamage: number;
  private readonly isFireResistant: boolean;
  private readonly craftingRemainingItem: Item | undefined;
  private readonly foodProperties: Food | undefined;

  public constructor(properties: ItemProperties) {
    this.category = properties.category;
    this.rarity = properties.rarity;
    this.craftingRemainingItem = properties.craftingRemainingItem;
    this.maxDamage = properties.maxDamage;
    this.maxStackSize = properties.maxStackSize;
    this.foodProperties = properties.foodProperties;
    this.isFireResistant = properties.isFireResistant;
  }

  public asItem(): Item {
    return this;
  }

  public static byBlock(block: Block): Item {
    return Item.BY_BLOCK.getOrDefault(block, Items.AIR) as Item;
  }
} 
export class ItemProperties {
  public maxStackSize: number = 64;
  public maxDamage: number = 0;
  public craftingRemainingItem: Item | undefined;
  public category: ItemGroup | undefined;
  public rarity: Rarity = Rarity.COMMON;
  public foodProperties: Food | undefined;
  public isFireResistant: boolean = false;

  public food(food: Food): ItemProperties {
    this.foodProperties = food;
    return this;
  }

  public stacksTo(stack: number): ItemProperties {
    if (this.maxDamage > 0) {
      throw new Exception("Unable to have damage AND stack.");
    } else {
      this.maxStackSize = stack;
      return this;
    }
  }

  public defaultDurability(durability: number): ItemProperties {
    return this.maxDamage == 0 ? this.durability(durability) : this;
  }

  public durability(durability: number): ItemProperties {
    this.maxDamage = durability;
    this.maxStackSize = 1;
    return this;
  }

  public craftRemainder(item: Item): ItemProperties {
    this.craftingRemainingItem = item;
    return this;
  }

  public tab(group: ItemGroup): ItemProperties {
    this.category = group;
    return this;
  }

  public setRarity(rarity: Rarity): ItemProperties {
    this.rarity = rarity;
    return this;
  }

  public fireResistant(): ItemProperties {
    this.isFireResistant = true;
    return this;
  }
}