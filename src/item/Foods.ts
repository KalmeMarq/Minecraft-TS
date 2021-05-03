import Food, { FoodBuilder } from "./Food";

export default class Foods {
  public static readonly APPLE: Food = (new FoodBuilder()).nutrition(4).saturationMod(0.3).build();
  public static readonly BAKED_POTATO: Food = (new FoodBuilder()).nutrition(5).saturationMod(0.6).build();
  public static readonly BEEF: Food = (new FoodBuilder()).nutrition(3).saturationMod(0.3).meat().build();
  public static readonly BEETROOT: Food = (new FoodBuilder()).nutrition(1).saturationMod(0.6).build();
  public static readonly BEETROOT_SOUP: Food = Foods.stew(6);
  public static readonly BREAD: Food = (new FoodBuilder()).nutrition(5).saturationMod(0.6).build();
  public static readonly CARROT: Food = (new FoodBuilder()).nutrition(3).saturationMod(0.6).build();
  public static readonly CHICKEN: Food = (new FoodBuilder()).nutrition(2).saturationMod(0.3).meat().build();
  public static readonly CHORUS_FRUIT: Food = (new FoodBuilder()).nutrition(4).saturationMod(0.3).alwaysEat().build();
  public static readonly COD: Food = (new FoodBuilder()).nutrition(2).saturationMod(0.1).build();
  public static readonly COOKED_BEEF: Food = (new FoodBuilder()).nutrition(8).saturationMod(0.8).meat().build();
  public static readonly COOKED_CHICKEN: Food = (new FoodBuilder()).nutrition(6).saturationMod(0.6).meat().build();
  public static readonly COOKED_COD: Food = (new FoodBuilder()).nutrition(5).saturationMod(0.6).build();
  public static readonly COOKED_MUTTON: Food = (new FoodBuilder()).nutrition(6).saturationMod(0.8).meat().build();
  public static readonly COOKED_PORKCHOP: Food = (new FoodBuilder()).nutrition(8).saturationMod(0.8).meat().build();
  public static readonly COOKED_RABBIT: Food = (new FoodBuilder()).nutrition(5).saturationMod(0.6).meat().build();
  public static readonly COOKED_SALMON: Food = (new FoodBuilder()).nutrition(6).saturationMod(0.8).build();
  public static readonly COOKIE: Food = (new FoodBuilder()).nutrition(2).saturationMod(0.1).build();
  public static readonly DRIED_KELP: Food = (new FoodBuilder()).nutrition(1).saturationMod(0.3).fast().build();
  public static readonly ENCHANTED_GOLDEN_APPLE: Food = (new FoodBuilder()).nutrition(4).saturationMod(1.2).alwaysEat().build();
  public static readonly GOLDEN_APPLE: Food = (new FoodBuilder()).nutrition(4).saturationMod(1.2).alwaysEat().build();
  public static readonly GOLDEN_CARROT: Food = (new FoodBuilder()).nutrition(6).saturationMod(1.2).build();
  public static readonly HONEY_BOTTLE: Food = (new FoodBuilder()).nutrition(6).saturationMod(0.1).build();
  public static readonly MELON_SLICE: Food = (new FoodBuilder()).nutrition(2).saturationMod(0.3).build();
  public static readonly MUSHROOM_STEW: Food = Foods.stew(6);
  public static readonly MUTTON: Food = (new FoodBuilder()).nutrition(2).saturationMod(0.3).meat().build();
  public static readonly POISONOUS_POTATO: Food = (new FoodBuilder()).nutrition(2).saturationMod(0.3).build();
  public static readonly PORKCHOP: Food = (new FoodBuilder()).nutrition(3).saturationMod(0.3).meat().build();
  public static readonly POTATO: Food = (new FoodBuilder()).nutrition(1).saturationMod(0.3).build();
  public static readonly PUFFERFISH: Food = (new FoodBuilder()).nutrition(1).saturationMod(0.1).build();
  public static readonly PUMPKIN_PIE: Food = (new FoodBuilder()).nutrition(8).saturationMod(0.3).build();
  public static readonly RABBIT: Food = (new FoodBuilder()).nutrition(3).saturationMod(0.3).meat().build();
  public static readonly RABBIT_STEW: Food = Foods.stew(10);
  public static readonly ROTTEN_FLESH: Food = (new FoodBuilder()).nutrition(4).saturationMod(0.1).meat().build();
  public static readonly SALMON: Food = (new FoodBuilder()).nutrition(2).saturationMod(0.1).build();
  public static readonly SPIDER_EYE: Food = (new FoodBuilder()).nutrition(2).saturationMod(0.8).build();
  public static readonly SUSPICIOUS_STEW: Food = Foods.stew(6);
  public static readonly SWEET_BERRIES: Food = (new FoodBuilder()).nutrition(2).saturationMod(0.1).build();
  public static readonly TROPICAL_FISH: Food = (new FoodBuilder()).nutrition(1).saturationMod(0.1).build();

  private static stew(nutrition: number): Food {
    return (new FoodBuilder()).nutrition(nutrition).saturationMod(0.6).build();
  }
}