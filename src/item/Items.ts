import Block from "../block/Block";
import Blocks from "../block/Blocks";
import ResourceLocation from "../resources/ResourceLocation";
import Registry from "../util/Registry";
import { AirItem } from "./AirItem";
import { BlockItem } from "./BlockItem";
import Foods from "./Foods";
import Item, { ItemProperties } from "./Item";
import ItemGroup from "./ItemGroup";
import Rarity from "./Rarity";

export default class Items {
  public static readonly AIR: Item = Items.registerBlockAndItem(Blocks.AIR, new AirItem(Blocks.AIR));
  public static readonly SCUTE: Item = Items.registerItem("scute", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly APPLE: Item = Items.registerItem("apple", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.APPLE)));
  public static readonly COAL: Item = Items.registerItem("coal", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly CHARCOAL: Item = Items.registerItem("charcoal", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly DIAMOND: Item = Items.registerItem("diamond", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly IRON_INGOT: Item = Items.registerItem("iron_ingot", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly GOLD_INGOT: Item = Items.registerItem("gold_ingot", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly NETHERITE_INGOT: Item = Items.registerItem("netherite_ingot", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS).fireResistant()));
  public static readonly NETHERITE_SCRAP: Item = Items.registerItem("netherite_scrap", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS).fireResistant()));
  public static readonly STICK: Item = Items.registerItem("stick", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly BOWL: Item = Items.registerItem("bowl", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly FEATHER: Item = Items.registerItem("feather", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly GUNPOWDER: Item = Items.registerItem("gunpowder", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly WHEAT: Item = Items.registerItem("wheat", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly BREAD: Item = Items.registerItem("bread", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.BREAD)));
  public static readonly FLINT: Item = Items.registerItem("flint", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly PORKCHOP: Item = Items.registerItem("porkchop", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.PORKCHOP)));
  public static readonly COOKED_PORKCHOP: Item = Items.registerItem("cooked_porkchop", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.COOKED_PORKCHOP)));
  public static readonly GOLDEN_APPLE: Item = Items.registerItem("golden_apple", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).setRarity(Rarity.RARE).food(Foods.GOLDEN_APPLE)));
  public static readonly LEATHER: Item = Items.registerItem("leather", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly BRICK: Item = Items.registerItem("brick", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly CLAY_BALL: Item = Items.registerItem("clay_ball", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly PAPER: Item = Items.registerItem("paper", new Item((new ItemProperties()).tab(ItemGroup.TAB_MISC)));
  public static readonly SLIME_BALL: Item = Items.registerItem("slime_ball", new Item((new ItemProperties()).tab(ItemGroup.TAB_MISC)));
  public static readonly CLOCK: Item = Items.registerItem("clock", new Item((new ItemProperties()).tab(ItemGroup.TAB_TOOLS)));
  public static readonly GLOWSTONE_DUST: Item = Items.registerItem("glowstone_dust", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly COD: Item = Items.registerItem("cod", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.COD)));
  public static readonly SALMON: Item = Items.registerItem("salmon", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.SALMON)));
  public static readonly TROPICAL_FISH: Item = Items.registerItem("tropical_fish", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.TROPICAL_FISH)));
  public static readonly PUFFERFISH: Item = Items.registerItem("pufferfish", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.PUFFERFISH)));
  public static readonly COOKED_COD: Item = Items.registerItem("cooked_cod", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.COOKED_COD)));
  public static readonly COOKED_SALMON: Item = Items.registerItem("cooked_salmon", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.COOKED_SALMON)));
  public static readonly INK_SAC: Item = Items.registerItem("ink_sac", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly LAPIS_LAZULI: Item = Items.registerItem("lapis_lazuli", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly BONE: Item = Items.registerItem("bone", new Item((new ItemProperties()).tab(ItemGroup.TAB_MISC)));
  public static readonly SUGAR: Item = Items.registerItem("sugar", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly COOKIE: Item = Items.registerItem("cookie", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.COOKIE)));
  public static readonly MELON_SLICE: Item = Items.registerItem("melon_slice", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.MELON_SLICE)));
  public static readonly DRIED_KELP: Item = Items.registerItem("dried_kelp", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.DRIED_KELP)));
  public static readonly BEEF: Item = Items.registerItem("beef", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.BEEF)));
  public static readonly COOKED_BEEF: Item = Items.registerItem("cooked_beef", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.COOKED_BEEF)));
  public static readonly CHICKEN: Item = Items.registerItem("chicken", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.CHICKEN)));
  public static readonly COOKED_CHICKEN: Item = Items.registerItem("cooked_chicken", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.COOKED_CHICKEN)));
  public static readonly ROTTEN_FLESH: Item = Items.registerItem("rotten_flesh", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.ROTTEN_FLESH)));
  public static readonly BLAZE_ROD: Item = Items.registerItem("blaze_rod", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly GHAST_TEAR: Item = Items.registerItem("ghast_tear", new Item((new ItemProperties()).tab(ItemGroup.TAB_BREWING)));
  public static readonly GOLD_NUGGET: Item = Items.registerItem("gold_nugget", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly SPIDER_EYE: Item = Items.registerItem("spider_eye", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.SPIDER_EYE)));
  public static readonly BLAZE_POWDER: Item = Items.registerItem("blaze_powder", new Item((new ItemProperties()).tab(ItemGroup.TAB_BREWING)));
  public static readonly MAGMA_CREAM: Item = Items.registerItem("magma_cream", new Item((new ItemProperties()).tab(ItemGroup.TAB_BREWING)));
  public static readonly GLISTERING_MELON_SLICE: Item = Items.registerItem("glistering_melon_slice", new Item((new ItemProperties()).tab(ItemGroup.TAB_BREWING)));
  public static readonly EMERALD: Item = Items.registerItem("emerald", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly BAKED_POTATO: Item = Items.registerItem("baked_potato", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.BAKED_POTATO)));
  public static readonly POISONOUS_POTATO: Item = Items.registerItem("poisonous_potato", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.POISONOUS_POTATO)));
  public static readonly GOLDEN_CARROT: Item = Items.registerItem("golden_carrot", new Item((new ItemProperties()).tab(ItemGroup.TAB_BREWING).food(Foods.GOLDEN_CARROT)));
  public static readonly PUMPKIN_PIE: Item = Items.registerItem("pumpkin_pie", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.PUMPKIN_PIE)));
  public static readonly NETHER_BRICK: Item = Items.registerItem("nether_brick", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly QUARTZ: Item = Items.registerItem("quartz", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly PRISMARINE_SHARD: Item = Items.registerItem("prismarine_shard", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly PRISMARINE_CRYSTALS: Item = Items.registerItem("prismarine_crystals", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly RABBIT: Item = Items.registerItem("rabbit", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.RABBIT)));
  public static readonly COOKED_RABBIT: Item = Items.registerItem("cooked_rabbit", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.COOKED_RABBIT)));
  public static readonly RABBIT_FOOT: Item = Items.registerItem("rabbit_foot", new Item((new ItemProperties()).tab(ItemGroup.TAB_BREWING)));
  public static readonly RABBIT_HIDE: Item = Items.registerItem("rabbit_hide", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly MUTTON: Item = Items.registerItem("mutton", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.MUTTON)));
  public static readonly COOKED_MUTTON: Item = Items.registerItem("cooked_mutton", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.COOKED_MUTTON)));
  public static readonly POPPED_CHORUS_FRUIT: Item = Items.registerItem("popped_chorus_fruit", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly BEETROOT: Item = Items.registerItem("beetroot", new Item((new ItemProperties()).tab(ItemGroup.TAB_FOOD).food(Foods.BEETROOT)));
  public static readonly DRAGON_BREATH: Item = Items.registerItem("dragon_breath", new Item((new ItemProperties()).tab(ItemGroup.TAB_BREWING).setRarity(Rarity.UNCOMMON)));
  public static readonly TOTEM_OF_UNDYING: Item = Items.registerItem("totem_of_undying", new Item((new ItemProperties()).stacksTo(1).tab(ItemGroup.TAB_COMBAT).setRarity(Rarity.UNCOMMON)));
  public static readonly SHULKER_SHELL: Item = Items.registerItem("shulker_shell", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly IRON_NUGGET: Item = Items.registerItem("iron_nugget", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly PHANTOM_MEMBRANE: Item = Items.registerItem("phantom_membrane", new Item((new ItemProperties()).tab(ItemGroup.TAB_BREWING)));
  public static readonly NAUTILUS_SHELL: Item = Items.registerItem("nautilus_shell", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));
  public static readonly HEART_OF_THE_SEA: Item = Items.registerItem("heart_of_the_sea", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS).setRarity(Rarity.UNCOMMON)));
  public static readonly HONEYCOMB: Item = Items.registerItem("honeycomb", new Item((new ItemProperties()).tab(ItemGroup.TAB_MATERIALS)));

  private static registerBlock(block: Block): Item {
    return Items.registerBlockItem(new BlockItem(block));
  }

  private static registerBlockAndGroup(p_221542_0_: Block , group: ItemGroup): Item {
    return Items.registerBlockItem(new BlockItem(p_221542_0_));
  }

  private static registerBlockItem(p_221543_0_: BlockItem): Item {
    return Items.registerBlockAndItem(p_221543_0_.getBlock(), p_221543_0_);
  }

  protected static registerBlockAndItem(p_221546_0_: Block , p_221546_1_: Item): Item {
    return Items.registerItemWithLocation(Registry.BLOCK.getKey(p_221546_0_), p_221546_1_);
  }

  private static registerItem(path: string, p_221547_1_: Item): Item {
    return Items.registerItemWithLocation(new ResourceLocation(path), p_221547_1_);
  }

  private static registerItemWithLocation(location: ResourceLocation, item: Item): Item {
    if(item instanceof BlockItem) {
      (item as BlockItem).registerBlocks(Item.BY_BLOCK, item);
    }
    return Registry._register(Registry.ITEM, location, item);
  }
} 