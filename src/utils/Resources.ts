import IMCResources from "../interfaces/IResources.js";
import { Resources } from "./GetResources.js";
import JSONUtils from "./JSONUtils.js";

/* Minecraft Resources Storage */
export var MCResources: IMCResources = {} 
export var MCUI: any = {}

/* Get Resource */
export function getResourceLocation(type: string, src: string) {
  switch(type) {
    case 'textures':
      return MCResources['assets/minecraft/textures/' + src + '.png'];
    case 'sounds':
      return MCResources['assets/minecraft/sounds/' + src + '.ogg'].cloneNode();
    case 'texts':
      return MCResources['assets/minecraft/texts/' + src + '.txt']
    case 'fonts':
      return MCResources['assets/minecraft/font/' + src + '.json']
    case 'langs':
      return MCResources['assets/minecraft/lang/' + src + '.json']
    default:
      return false
  }
}

export async function getAllResources() {
  [/* 'item/acacia_boat', 'item/acacia_door', 'item/acacia_sign', 'item/apple', 'item/armor_stand', 'item/arrow', 'item/baked_potato', 'item/bamboo', 'item/barrier', 'item/beef', 'item/beetroot',
   'item/beetroot_seeds', 'item/beetroot_soup', 'item/bell', 'item/birch_boat', 'item/birch_door', 'item/birch_sign', 'item/black_dye', 'item/blaze_powder', 'item/blaze_rod', 'item/blue_dye',
   'item/bone', 'item/bone_meal', 'item/book', 'item/bow', 'item/bowl', 'item/bow_pulling_0', 'item/bow_pulling_1', 'item/bow_pulling_2', 'item/bread', 'item/brewing_stand', 'item/brick', 'item/broken_elytra',
   'item/brown_dye', 'item/bucket', 'item/cake', 'item/campfire', 'item/carrot', 'item/carrot_on_a_stick', 'item/cauldron', 'item/chain', 'item/chainmail_boots', 'item/chainmail_chestplate',
   'item/chainmail_helmet', 'item/chainmail_leggings', 'item/charcoal', 'item/chest_minecart', 'item/chicken', 'item/chorus_fruit', 'item/clay_ball', 'item/clock', 'item/coal', 'item/cocoa_beans',
   'item/cod', 'item/cod_bucket', 'item/command_block_minecart', 'item/comparator', 'item/compass', 'item/cooked_beef', 'item/cooked_chicken', 'item/cooked_cod', 'item/cooked_mutton', 'item/cooked_porkchop',
   'item/cooked_rabbit', 'item/cooked_salmon', 'item/cookie', 'item/creeper_banner_pattern', 'item/crimson_door', 'item/crimson_sign', 'item/crossbow_arrow', 'item/crossbow_firework',
   'item/crossbow_pulling_0', 'item/crossbow_pulling_1', 'item/crossbow_pulling_2', 'item/crossbow_standby', 'item/cyan_dye', 'item/dark_oak_boat', 'item/dark_oak_door', 'item/dark_oak_sign',
   'item/diamond', 'item/diamond_axe', 'item/diamond_boots', 'item/diamond_chestplate', 'item/diamond_helmet', 'item/diamond_hoe', 'item/diamond_horse_armor', 'item/diamond_leggings',
   'item/diamond_pickaxe', 'item/diamond_shovel', 'item/diamond_sword', 'item/dragon_breath', 'item/dried_kelp', 'item/egg', 'item/elytra', 'item/emerald', 'item/empty_armor_slot_boots',
   'item/empty_armor_slot_chestplate', 'item/empty_armor_slot_helmet', 'item/empty_armor_slot_leggings', 'item/empty_armor_slot_shield', 'item/enchanted_book',
   'item/ender_eye', 'item/ender_pearl', 'item/end_crystal', 'item/experience_bottle', 'item/feather', 'item/fermented_spider_eye', 'item/filled_map', 'item/filled_map_markings', 'item/firework_rocket',
   'item/firework_star', 'item/firework_star_overlay', 'item/fire_charge', 'item/fishing_rod', 'item/fishing_rod_cast', 'item/flint', 'item/flint_and_steel', 'item/flower_banner_pattern',
   'item/flower_pot', 'item/furnace_minecart', 'item/ghast_tear', 'item/glass_bottle', 'item/glistering_melon_slice', 'item/globe_banner_pattern', 'item/glowstone_dust', 'item/golden_apple',
   'item/golden_axe', 'item/golden_boots', 'item/golden_carrot', 'item/golden_chestplate', 'item/golden_helmet', 'item/golden_hoe', 'item/golden_horse_armor', 'item/golden_leggings',
   'item/golden_pickaxe', 'item/golden_shovel', 'item/golden_sword', 'item/gold_ingot', 'item/gold_nugget', 'item/gray_dye', 'item/green_dye', 'item/gunpowder', 'item/heart_of_the_sea', 'item/honeycomb',
   'item/honey_bottle', 'item/hopper', 'item/hopper_minecart', 'item/ink_sac', 'item/iron_axe', 'item/iron_boots', 'item/iron_chestplate', 'item/iron_door', 'item/iron_helmet', 'item/iron_hoe',
   'item/iron_horse_armor', 'item/iron_ingot', 'item/iron_leggings', 'item/iron_nugget', 'item/iron_pickaxe', 'item/iron_shovel', 'item/iron_sword', 'item/item_frame', 'item/jungle_boat', 'item/jungle_door',
   'item/jungle_sign', 'item/kelp', 'item/knowledge_book', 'item/lantern', 'item/lapis_lazuli', 'item/lava_bucket', 'item/lead', 'item/leather', 'item/leather_boots', 'item/leather_boots_overlay',
   'item/leather_chestplate', 'item/leather_chestplate_overlay', 'item/leather_helmet', 'item/leather_helmet_overlay', 'item/leather_horse_armor', 'item/leather_leggings',
   'item/leather_leggings_overlay', 'item/light_blue_dye', 'item/light_gray_dye', 'item/lime_dye', 'item/lingering_potion', 'item/magenta_dye', 'item/magma_cream', 'item/map', 'item/melon_seeds',
   'item/melon_slice', 'item/milk_bucket', 'item/minecart', 'item/mojang_banner_pattern', 'item/mushroom_stew', 'item/music_disc_11', 'item/music_disc_13', 'item/music_disc_blocks', 'item/music_disc_cat',
   'item/music_disc_chirp', 'item/music_disc_far', 'item/music_disc_mall', 'item/music_disc_mellohi', 'item/music_disc_pigstep', 'item/music_disc_stal', 'item/music_disc_strad', 'item/music_disc_wait',
   'item/music_disc_ward', 'item/mutton', 'item/name_tag', 'item/nautilus_shell', 'item/netherite_axe', 'item/netherite_boots', 'item/netherite_chestplate', 'item/netherite_helmet', 'item/netherite_hoe',
   'item/netherite_ingot', 'item/netherite_leggings', 'item/netherite_pickaxe', 'item/netherite_scrap', 'item/netherite_shovel', 'item/netherite_sword', 'item/nether_brick', 'item/nether_sprouts',
   'item/nether_star', 'item/nether_wart', 'item/oak_boat', 'item/oak_door', 'item/oak_sign', 'item/orange_dye', 'item/painting', 'item/paper', 'item/phantom_membrane', 'item/piglin_banner_pattern', 'item/pink_dye',
   'item/poisonous_potato', 'item/popped_chorus_fruit', 'item/porkchop', 'item/potato', 'item/potion', 'item/potion_overlay', 'item/prismarine_crystals', 'item/prismarine_shard', 'item/pufferfish',
   'item/pufferfish_bucket', 'item/pumpkin_pie', 'item/pumpkin_seeds', 'item/purple_dye', 'item/quartz', 'item/rabbit', 'item/rabbit_foot', 'item/rabbit_hide', 'item/rabbit_stew', 'item/redstone', 'item/red_dye',
   'item/repeater', 'item/rotten_flesh', 'item/ruby', 'item/saddle', 'item/salmon', 'item/salmon_bucket', 'item/scute', 'item/seagrass', 'item/sea_pickle', 'item/shears', 'item/shulker_shell', 'item/skull_banner_pattern',
   'item/slime_ball', 'item/snowball', 'item/soul_campfire', 'item/soul_lantern', 'item/spawn_egg', 'item/spawn_egg_overlay', 'item/spectral_arrow', 'item/spider_eye', 'item/splash_potion', 'item/spruce_boat',
   'item/spruce_door', 'item/spruce_sign', 'item/stick', 'item/stone_axe', 'item/stone_hoe', 'item/stone_pickaxe', 'item/stone_shovel', 'item/stone_sword', 'item/string', 'item/structure_void', 'item/sugar',
   'item/sugar_cane', 'item/suspicious_stew', 'item/sweet_berries', 'item/tipped_arrow_base', 'item/tipped_arrow_head', 'item/tnt_minecart', 'item/totem_of_undying', 'item/trident', 'item/tropical_fish',
   'item/tropical_fish_bucket', 'item/turtle_egg', 'item/turtle_helmet', 'item/warped_door', 'item/warped_fungus_on_a_stick', 'item/warped_sign', 'item/water_bucket', 'item/wheat', 'item/wheat_seeds', 'item/white_dye',
   'item/wooden_axe', 'item/wooden_hoe', 'item/wooden_pickaxe', 'item/wooden_shovel', 'item/wooden_sword', 'item/writable_book', 'item/written_book',  */'item/yellow_dye', 'font/ascii','gui/title/edition',
   'gui/title/minecraft', 'gui/title/mojangstudios', 'gui/checkbox', 'gui/accessibility', 'gui/icons', 'gui/options_background', 'gui/widgets'].forEach(async (file: any) => {
    
    if(!MCResources['assets/minecraft/textures/' + file + '.png']) {
      var myImage = new Image();

      var myRequest = new Request('./resources/assets/minecraft/textures/' + file + '.png');
      
      fetch(myRequest)
      .then(response => response.blob())
      .then(function(myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
  
        MCResources['assets/minecraft/textures/' + file + '.png'] = myImage;
        console.log('assets/minecraft/textures/' + file + '.png');
      });
    }
  });

  try {
    await JSONUtils.getJSONFile('src/ui/_ui_defs.json', ((data: any) => {
      data.ui_defs.forEach(async (file: any) => {
        await JSONUtils.getJSONFile('src/' + file, ((dataa: any) => {
          if(!MCUI[dataa.namespace]) {
            MCUI[dataa.namespace] = dataa;
          }
        }));
      });
    }));
  } catch {
    await JSONUtils.getJSONFile('./src/ui/main_menu_screen.json', ((dataa: any) => {
      if(!MCUI[dataa.namespace]) {
        MCUI[dataa.namespace] = dataa;
      }
    }));

    await JSONUtils.getJSONFile('./src/ui/test_screen.json', ((dataa: any) => {
      if(!MCUI[dataa.namespace]) {
        MCUI[dataa.namespace] = dataa;
      }
    }));
  }

  console.log(MCUI);
   
  [/* 'af_za', 'ar_sa', 'ast_es', 'az_az', 'ba_ru', 'bar', 'be_by', 'bg_bg', 'br_fr', 'brb', 'bs_ba', 'ca_es', 'cs_cz', 'cy_gb',
   'da_dk', 'de_at', 'de_ch', 'de_de', 'el_gr', 'en_au', 'en_ca', 'en_gb', 'en_nz', 'en_pt', 'en_ud',  */'en_us'/* , 'enp', 'enws',
   'eo_uy', 'es_ar', 'es_cl', 'es_ec', 'es_ec', 'es_es', 'es_mx', 'es_uy', 'es_ve', 'esan', 'et_ee', 'eu_es', 'fa_ir', 'fi_fi',
   'fil_ph', 'fo_fo', 'fr_ca', 'fr_fr', 'fra_de', 'fy_nl', 'ga_ie', 'gd_gb', 'gl_es', 'got_de', 'gv_im', 'haw_us', 'he_il',
   'hi_in', 'hr_hr', 'hu_hu', 'hy_am', 'id_id', 'ig_ng', 'io_en', 'is_is', 'isv', 'it_it', 'ja_jp', 'jbo_en', 'ka_ge', 'kab_kab',
   'kk_kz', 'kn_in', 'ko_kr', 'ksh', 'kw_gb', 'la_la', 'lb_lu', 'li_li', 'lol_us', 'lt_lt', 'lv_lv', 'mi_nz', 'mk_mk', 'mn_mn',
   'moh_ca', 'ms_my', 'mt_mt', 'nds_de', 'nl_be', 'nl_nl', 'nn_no', 'no_no', 'nuk', 'oc_fr', 'oj_ca', 'ovd', 'pl_pl', 'pt_br',
   'pt_pt', 'qya_aa', 'ro_ro', 'ru_ru', 'scn', 'se_no', 'sk_sk', 'sl_si', 'so_so', 'sq_al', 'sr_sp', 'sv_se', 'swg', 'sxu',
   'szl', 'ta_in', 'th_th', 'tl_ph', 'tlh_aa', 'tr_tr', 'tt_ru', 'tzl_tzl', 'uk_ua', 'val_es', 'vec_it', 'vi_vn', 'yi_de', 'yo_ng',
   'zh_cn', 'zh_tw' */].forEach(async (file: any) => {

    if(!MCResources['assets/minecraft/lang/' + file + '.json']) {
      async function tryToGetData() {
        let data = null;
        let trys = 0;
        while (data == null) {
          data = await (await fetch('./resources/assets/minecraft/lang/' + file + '.json')).json();
          if ((trys++) == 69420)
            break; 
        }
        if (data == null)
          throw new Error("Unable to fetch data.");
        return data;
      }
  
      MCResources['assets/minecraft/lang/' + file + '.json'] = await tryToGetData();
      console.log('assets/minecraft/lang/' + file + '.json');
    }
  });

  ['credits', 'end', 'splashes'].forEach(async(file: any) => {
    if(!MCResources['assets/minecraft/texts/' + file + '.txt']) {
      await JSONUtils.getTextFile('./resources/assets/minecraft/texts/' + file + '.txt', (data: any) => {
        MCResources['assets/minecraft/texts/' + file + '.txt'] = [];
        data.split(/\r?\n/).forEach((line: any) => MCResources['assets/minecraft/texts/' + file + '.txt'].push(line));
        console.log('assets/minecraft/texts/' + file + '.txt');
      })
    }
  });

  ['click_stereo'].forEach(async(file: any) => {
    if(!MCResources['assets/minecraft/sounds/' + file + '.ogg']) {
      let audio = new Audio('./resources/assets/minecraft/sounds/' + file + '.ogg')
      MCResources['assets/minecraft/sounds/' + file + '.ogg'] = audio;
      console.log('assets/minecraft/sounds/' + file + '.ogg');
    }
  });

  await JSONUtils.getJSONFile(`./resources/assets/minecraft/font/font.json`, (data: any) => MCResources['assets/minecraft/font/font.json'] = data);
  
  let i = (!MCResources['assets/minecraft/font/font.json'])
  while(i) {
    if(!i) {
      return MCResources
      break;
    }
  }
}