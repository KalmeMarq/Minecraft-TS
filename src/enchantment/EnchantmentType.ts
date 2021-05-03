import Item from "../item/Item";

export default abstract class EnchantmentType {
  public static ARMOR = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item;
    }
  }
  public static ARMOR_FEET = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item
    }
  }
  public static ARMOR_LEGS = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item
    }
  }
  public static ARMOR_CHEST = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item
    }
  }
  public static ARMOR_HEAD = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item
    }
  }
  public static WEAPON = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item;
    }
  }
  public static DIGGER = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item;
    }
  }
  public static FISHING_ROD = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item;
    }
  }
  public static TRIDENT = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item;
    }
  }
  public static BREAKABLE = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item;
    }
  }
  public static BOW = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item;
    }
  }
  public static WEARABLE = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item
    }
  }
  public static CROSSBOW = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item;
    }
  }
  public static VANISHABLE = new class extends EnchantmentType {
    public canEnchant(item: Item): boolean {
      return item instanceof Item
    }
  };

  private constructor() {
  }

  public abstract canEnchant(item: Item): boolean;
}