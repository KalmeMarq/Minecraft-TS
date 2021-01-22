import Item, { ItemProperties } from './Item.js';
import ArmorItem from './ArmorItem.js';
import ArmorMaterials from './ArmorMaterial.js';
import MusicDiscItem from './MusicDiscItem.js';
import SwordItem from './SwordItem.js';
import DyeItem from './DyeItem.js';
import Rarity from './Rarity.js';
import BlockItem from './BlockItem.js';
import ItemTiers from './ItemTier.js';
import ItemGroup from './ItemGroup.js';

let registryItems = []

function register(id, item) {
  // const key = `item.${id.match(/[^:]*/i)}.${id.substr(id.indexOf(":") + 1)}`
  let key;
  
  if(item instanceof BlockItem) {
    key = `block.minecraft.${id}`;
  } else {
    key = `item.minecraft.${id}`
  }

  registryItems.push({ identifier: id, translateKey: key, properties: item })
  return { identifier: id, translateKey: key, properties: item }
}

const Items = {
  AIR: register("air", new Item((new ItemProperties()).setGroup(ItemGroup.NONE))),

  STICK: register("stick", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  BOWL: register("bowl", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  MUSHROOM_STEW: register("mushroom_stew", new Item((new ItemProperties()).setMaxStackSize(1).setGroup(ItemGroup.FOOD))),
  STRING: register("string", new Item((new ItemProperties()).setGroup(ItemGroup.MISC))),
  FEATHER: register("feather", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  GUNPOWDER: register("gunpowder", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  WHEAT_SEEDS: register("wheat_seeds", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  WHEAT: register("wheat", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  BREAD: register("bread", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  DIAMOND: register('diamond', new Item((new ItemProperties()).setGroup(ItemGroup.MISC))),
  SNOWBALL: register('snowball', new Item((new ItemProperties()).setMaxStackSize(16).setGroup(ItemGroup.MISC))),
  MUSIC_DISC_13: register('music_disc_13', new MusicDiscItem('null', (new ItemProperties()).setMaxStackSize(1).setGroup(ItemGroup.MISC).setRarity(Rarity.RARE))),
  DIAMOND_LEGGINGS:  register('diamond_leggings', new ArmorItem(ArmorMaterials.DIAMOND, 'legs', (new ItemProperties()).setGroup(ItemGroup.COMBAT))),
  WOODEN_SWORD: register('wooden_sword', new SwordItem(ItemTiers.WOOD, 3, -2.4, (new ItemProperties()).setGroup(ItemGroup.COMBAT))),
  EGG: register("egg", new Item((new ItemProperties()).setMaxStackSize(16).setGroup(ItemGroup.MATERIALS))),
  COMPASS: register("compass", new Item((new ItemProperties()).setGroup(ItemGroup.TOOLS))),
  FISHING_ROD: register("fishing_rod", new Item((new ItemProperties()).setMaxDamage(64).setGroup(ItemGroup.TOOLS))),
  CLOCK: register("clock", new Item((new ItemProperties()).setGroup(ItemGroup.TOOLS))),
  GLOWSTONE_DUST: register("glowstone_dust", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  COD: register("cod", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  SALMON: register("salmon", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  TROPICAL_FISH: register("tropical_fish", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  PUFFERFISH: register("pufferfish", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  COOKED_COD: register("cooked_cod", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  COOKED_SALMON: register("cooked_salmon", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  INK_SAC: register("ink_sac", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  COCOA_BEANS: register("cocoa_beans", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  LAPIS_LAZULI: register("lapis_lazuli", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  WHITE_DYE: register("white_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  ORANGE_DYE: register("orange_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  MAGENTA_DYE: register("magenta_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  LIGHT_BLUE_DYE: register("light_blue_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  YELLOW_DYE: register("yellow_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  LIME_DYE: register("lime_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  PINK_DYE: register("pink_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  GRAY_DYE: register("gray_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  LIGHT_GRAY_DYE: register("light_gray_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  CYAN_DYE: register("cyan_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  PURPLE_DYE: register("purple_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  BLUE_DYE: register("blue_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  BROWN_DYE: register("brown_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  GREEN_DYE: register("green_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  RED_DYE: register("red_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  BLACK_DYE: register("black_dye", new DyeItem((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  BONE_MEAL: register("bone_meal", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  BONE: register("bone", new Item((new ItemProperties()).setGroup(ItemGroup.MISC))),
  SUGAR: register("sugar", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  COOKIE: register("cookie", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  SHEARS: register("shears", new Item((new ItemProperties()).setMaxDamage(238).setGroup(ItemGroup.TOOLS))),
  MELON_SLICE: register("melon_slice", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  DRIED_KELP: register("dried_kelp", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  PUMPKIN_SEEDS: register("pumpkin_seeds", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  MELON_SEEDS: register("melon_seeds", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  BEEF: register("beef", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  COOKED_BEEF: register("cooked_beef", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  CHICKEN: register("chicken", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  COOKED_CHICKEN: register("cooked_chicken", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  ROTTEN_FLESH: register("rotten_flesh", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  ENDER_PEARL: register("ender_pearl", new Item((new ItemProperties()).setMaxStackSize(16).setGroup(ItemGroup.MISC))),
  BLAZE_ROD: register("blaze_rod", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  GHAST_TEAR: register("ghast_tear", new Item((new ItemProperties()).setGroup(ItemGroup.BREWING))),
  GOLD_NUGGET: register("gold_nugget", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  NETHER_WART: register("nether_wart", new Item((new ItemProperties()).setGroup(ItemGroup.MATERIALS))),
  POTION: register("potion", new Item((new ItemProperties()).setMaxStackSize(1).setGroup(ItemGroup.BREWING))),
  GLASS_BOTTLE: register("glass_bottle", new Item((new ItemProperties()).setGroup(ItemGroup.BREWING))),
  SPIDER_EYE: register("spider_eye", new Item((new ItemProperties()).setGroup(ItemGroup.FOOD))),
  FERMENTED_SPIDER_EYE: register("fermented_spider_eye", new Item((new ItemProperties()).setGroup(ItemGroup.BREWING))),
  BLAZE_POWDER: register("blaze_powder", new Item((new ItemProperties()).setGroup(ItemGroup.BREWING))),
  MAGMA_CREAM: register("magma_cream", new Item((new ItemProperties()).setGroup(ItemGroup.BREWING))),
  CAKE: register("cake", new BlockItem((new ItemProperties()).setMaxStackSize(1).setGroup(ItemGroup.FOOD)))
}

export default Items;
export {
  registryItems
}