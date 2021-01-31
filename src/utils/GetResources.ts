import { CharacterRenderer } from "../gui/FontRenderer";
import JSONUtils from "./JSONUtils";

export interface IResources {
  languages: {}[];
  texts: any | {
    credits: string[],
    end: string[],
    splashes: string[]
  }
  font: {}
}

export var Resources: IResources = {
  languages: [],
  texts: {
    credits: [],
    end: [],
    splashes: []
  },
  font: {}
};

export let characterRenderers: any = {};
export let addCharacterRenderer = (color: number, char: string) => {
  if(!characterRenderers[color]) {
    characterRenderers[color] = {}
  }
  characterRenderers[color][char] = {
    text: new CharacterRenderer(char, color).create(),
    textShadow: new CharacterRenderer(char, color).createShadow()
  };
}


export let getFontChars: any = {};

export var langNames = ['af_za', 'ar_sa', 'ast_es', 'az_az', 'ba_ru', 'bar', 'be_by', 'bg_bg', 'br_fr', 'brb', 'bs_ba', 'ca_es', 'cs_cz', 'cy_gb', 'da_dk', 'de_at', 'de_ch', 'de_de', 'el_gr', 'en_au', 'en_ca', 'en_gb', 'en_nz', 'en_pt', 'en_ud', 'en_us', 'enp', 'enws', 'eo_uy', 'es_ar', 'es_cl', 'es_ec', 'es_ec', 'es_es', 'es_mx', 'es_uy', 'es_ve', 'esan', 'et_ee', 'eu_es', 'fa_ir', 'fi_fi', 'fil_ph', 'fo_fo', 'fr_ca', 'fr_fr', 'fra_de', 'fy_nl', 'ga_ie', 'gd_gb', 'gl_es', 'got_de', 'gv_im', 'haw_us', 'he_il', 'hi_in', 'hr_hr', 'hu_hu', 'hy_am', 'id_id', 'ig_ng', 'io_en', 'is_is', 'isv', 'it_it', 'ja_jp', 'jbo_en', 'ka_ge', 'kab_kab', 'kk_kz', 'kn_in', 'ko_kr', 'ksh', 'kw_gb', 'la_la', 'lb_lu', 'li_li', 'lol_us', 'lt_lt', 'lv_lv', 'mi_nz', 'mk_mk', 'mn_mn', 'moh_ca', 'ms_my', 'mt_mt', 'nds_de', 'nl_be', 'nl_nl', 'nn_no', 'no_no', 'nuk', 'oc_fr', 'oj_ca', 'ovd', 'pl_pl', 'pt_br', 'pt_pt', 'qya_aa', 'ro_ro', 'ru_ru', 'scn', 'se_no', 'sk_sk', 'sl_si', 'so_so', 'sq_al', 'sr_sp', 'sv_se', 'swg', 'sxu', 'szl', 'ta_in', 'th_th', 'tl_ph', 'tlh_aa', 'tr_tr', 'tt_ru', 'tzl_tzl', 'uk_ua', 'val_es', 'vec_it', 'vi_vn', 'yi_de', 'yo_ng', 'zh_cn', 'zh_tw'];
export let fontImg = new Image(256, 256);
export let mojangstudiosImg = new Image(256, 256);
export let minecraftImg = new Image(256, 256);
export let editionImg = new Image(256, 256);
export let widgetsImg = new Image(256, 256);
export let checkboxImg = new Image(256, 256);
export let accessibilityImg = new Image(256, 256);
export let optionsBackgroundImg = new Image(256, 256);
export let clickSound = new Audio();

export async function getResources() {
  const rootloc = 'resources/assets/minecraft';

  fontImg.src = `./${rootloc}/textures/font/ascii.png`;
  editionImg.src = `./${rootloc}/textures/gui/title/edition.png`;
  minecraftImg.src = `./${rootloc}/textures/gui/title/minecraft.png`;
  mojangstudiosImg.src = `./${rootloc}/textures/gui/title/mojangstudios.png`;
  widgetsImg.src = `./${rootloc}/textures/gui/widgets.png`;
  checkboxImg.src = `./${rootloc}/textures/gui/checkbox.png`;
  accessibilityImg.src = `./${rootloc}/textures/gui/accessibility.png`;
  optionsBackgroundImg.src = `./${rootloc}/textures/gui/options_background.png`;
  clickSound.src = `https://raw.githubusercontent.com/KalmeMarq/Minecraft-JS-Assets/main/assets/sounds/click_stereo.ogg`;



  ['credits', 'end', 'splashes'].forEach(async (name) => {
    const s: string = name;
    await JSONUtils.getTextFile(`https://raw.githubusercontent.com/KalmeMarq/Minecraft-JS-Assets/main/assets/texts/${name}.txt`, (data: any) => data.split(/\r?\n/).forEach((line: any) => Resources.texts[s].push(line)));
  });

  await JSONUtils.getJSONFile(`./${rootloc}/lang/en_us.json`, (data: any) => Resources.languages.push({code: 'en_us', data: data}));
  langNames.forEach(async (name: any) => { if(name !== 'en_us') await JSONUtils.getJSONFile(`https://raw.githubusercontent.com/KalmeMarq/Minecraft-JS-Assets/main/assets/lang/${name}.json`, (data: any) => Resources.languages.push({code: name, data: data}))});
  

  await JSONUtils.getJSONFile(`./${rootloc}/font/font.json`, (data: any) => Resources.font = data);
  getFontChars = Resources.font

  if(Resources.font !== {} && Resources.languages !== [] && Resources.texts.credits !== [] && Resources.texts.splashes !== []) return Resources;
}