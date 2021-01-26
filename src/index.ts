// import JSONUtils from "./util/JSONUtils.js";
// import MainMenuScreen from './client/gui/screens/MainMenuScreen.js';
// import FontRenderer, { CharacterRenderer } from "./client/gui/FontRenderer.js";
// import TextFieldWidget from "./client/gui/widgets/TextFieldWidget.js";

// /* Ticks */
// let ticks = true;
// export const setTicks = (state: boolean) => {
//   ticks = state;
//   return setTimeout(() => ticks = true, 2000)
// }

// let bruh = false;

// /* Fake Game Info */
// let versionID = '1.19.2';
// let versionType = 'release';
// let clientName = 'vanilla';
// let isDemo = false;

// /* Configs */
// export const FPS = 60;
// export let scaleFactor = 3;
// export let font = 'normal 100 7.55px MinecraftRegular';

// /* Canvas Root */
// export const canvas = document.getElementById('root') as HTMLCanvasElement;
// export const ctx = canvas.getContext('2d')!;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// ctx.scale(scaleFactor, scaleFactor);
// ctx.imageSmoothingEnabled = false;

// /* Event Variables */
// export let mouseXM = 0;
// export let mouseYM = 0;
// export let clickXM = -1;
// export let clickYM = -1;
// export let clicked = false;
// export const resetClickXY = () => {
//   clickXM = -1;
//   clickYM = -1;
// }
// export const resetClick = () => {
//   clicked = false;
// }


// export let dblclickXM = -1;
// export let dblclickYM = -1;
// export let keyName = '';
// export let isDragging = false;
// export let keyModifiers = {
//   keyShift: false,
//   keyCtrl: false,
//   keyAlt: false
// }

// /* Resources { lang files, texts { credits, end, splahes } } */
// interface Resources {
//   languages: {}[];
//   texts: {
//     credits: string[],
//     end: string[],
//     splashes: string[]
//   }
// }

// var Resources: Resources = {
//   languages: [],
//   texts: {
//     credits: [],
//     end: [],
//     splashes: []
//   }
// };

// export var langNames = ['af_za', 'ar_sa', 'ast_es', 'az_az', 'ba_ru', 'bar', 'be_by', 'bg_bg', 'br_fr', 'brb', 'bs_ba', 'ca_es', 'cs_cz', 'cy_gb', 'da_dk', 'de_at', 'de_ch', 'de_de', 'el_gr', 'en_au', 'en_ca', 'en_gb', 'en_nz', 'en_pt', 'en_ud', 'en_us', 'enp', 'enws', 'eo_uy', 'es_ar', 'es_cl', 'es_ec', 'es_ec', 'es_es', 'es_mx', 'es_uy', 'es_ve', 'esan', 'et_ee', 'eu_es', 'fa_ir', 'fi_fi', 'fil_ph', 'fo_fo', 'fr_ca', 'fr_fr', 'fra_de', 'fy_nl', 'ga_ie', 'gd_gb', 'gl_es', 'got_de', 'gv_im', 'haw_us', 'he_il', 'hi_in', 'hr_hr', 'hu_hu', 'hy_am', 'id_id', 'ig_ng', 'io_en', 'is_is', 'isv', 'it_it', 'ja_jp', 'jbo_en', 'ka_ge', 'kab_kab', 'kk_kz', 'kn_in', 'ko_kr', 'ksh', 'kw_gb', 'la_la', 'lb_lu', 'li_li', 'lol_us', 'lt_lt', 'lv_lv', 'mi_nz', 'mk_mk', 'mn_mn', 'moh_ca', 'ms_my', 'mt_mt', 'nds_de', 'nl_be', 'nl_nl', 'nn_no', 'no_no', 'nuk', 'oc_fr', 'oj_ca', 'ovd', 'pl_pl', 'pt_br', 'pt_pt', 'qya_aa', 'ro_ro', 'ru_ru', 'scn', 'se_no', 'sk_sk', 'sl_si', 'so_so', 'sq_al', 'sr_sp', 'sv_se', 'swg', 'sxu', 'szl', 'ta_in', 'th_th', 'tl_ph', 'tlh_aa', 'tr_tr', 'tt_ru', 'tzl_tzl', 'uk_ua', 'val_es', 'vec_it', 'vi_vn', 'yi_de', 'yo_ng', 'zh_cn', 'zh_tw'];
// export let fontImg = new Image(256, 256);
// export let mojangstudiosImg = new Image(256, 256);
// export let minecraftImg = new Image(256, 256);
// export let editionImg = new Image(256, 256);
// export let widgetsImg = new Image(256, 256);
// export let optionsBackgroundImg = new Image(256, 256);
// export let clickSound = new Audio();

// /* Characters Registry */
// export let characterRenderers: any = {};
// export let addCharacterRenderer = (color: number, char: string) => {
//   if(!characterRenderers[color]) {
//     characterRenderers[color] = {}
//   }
//   characterRenderers[color][char] = {
//     text: new CharacterRenderer(char, color).create(),
//     textShadow: new CharacterRenderer(char, color).createShadow()
//   };
// }

// /* Minecraft */
// export let currentScreen: any = null;
// class Minecraft {
//   static displayGuiScreen(guiScreenIn: any) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     if (guiScreenIn == null) {
//       guiScreenIn = new MainMenuScreen();
//     }
  
//     currentScreen = guiScreenIn;
//     if (guiScreenIn != null) {
//       guiScreenIn.initScreen(canvas.width / scaleFactor, canvas.height / scaleFactor);
//     }
//   }

//   static shutdown() {
//     window.close();
//   }

//   static crashGame() {
//     var crashList: any = [];
//     crashList.push(crashList);
//     let obj: any = crashList;
//     for (var i = 0; i < obj.length; ++i) {
//       obj = obj[i];
//       i--;
//     }
//   }

//   public static getVersion(): string {
//     return versionID;
//   }

//   public static getVersionType(): string {
//     return versionType;
//   }

//   public static isDemo(): boolean {
//     return isDemo;
//   }

//   public static isModdedClient(): boolean {
//     return "vanilla" !== clientName;
//   }

//   public static getSplashText(): string {
//     const splashes = Resources.texts.splashes;
//     const splashText = document.createElement('span');

//     const date = new Date(),
//           month = date.getMonth(),
//           day = date.getDate();    

//     const getRandomSplashText = () => {
//       return splashes[~~(Math.random() * (splashes.length - 1))]
//     }

//     let randSplash = String(getRandomSplashText());

//     if(month + 1 === 12 && day === 24) {
//       randSplash = 'Merry X-mas!';
//     } else if (month + 1 === 1 && day === 1) {
//       randSplash = 'Happy new year!';
//     } else if(month + 1 === 10 && day === 31) {
//       randSplash = 'OOoooOOOoooo! Spooky!';
//     }

//     return randSplash;
//   }
// }

// const initialize = async () => {
//   async function fetchAllData() {
//     const rootloc = 'dist/resources/assets/minecraft';

//     fontImg.src = `./${rootloc}/textures/font/ascii.png`;
//     editionImg.src = `./${rootloc}/textures/gui/title/edition.png`;
//     minecraftImg.src = `./${rootloc}/textures/gui/title/minecraft.png`;
//     mojangstudiosImg.src = `./${rootloc}/textures/gui/title/mojangstudios.png`;
//     widgetsImg.src = `./${rootloc}/textures/gui/widgets.png`;
//     optionsBackgroundImg.src = `./${rootloc}/textures/gui/options_background.png`;
//     clickSound.src = `./${rootloc}/sounds/click_stereo.ogg`;

//     langNames.forEach(async (name) => await JSONUtils.getJSONFile(`./${rootloc}/lang/${name}.json`, (data: any) => Resources.languages.push({code: name, data: data})));
    
//     await JSONUtils.getTextFile(`./${rootloc}/texts/credits.txt`, (data: any) => data.split(/\r?\n/).forEach((line: any) => Resources.texts.credits.push(line)));
//     await JSONUtils.getTextFile(`./${rootloc}/texts/end.txt`, (data: any) => data.split(/\r?\n/).forEach((line: any) => Resources.texts.end.push(line)));
//     await JSONUtils.getTextFile(`./${rootloc}/texts/splashes.txt`, (data: any) => data.split(/\r?\n/).forEach((line: any) => Resources.texts.splashes.push(line)));
  
//     // localStorage.setItem('GameSettings', JSON.stringify(GameSettings));
//     if(!localStorage.getItem('WorldsList')) localStorage.setItem('WorldsList', JSON.stringify([]))
//     if(!localStorage.getItem('ServersList')) localStorage.setItem('ServersList', JSON.stringify([]))

//     return setTimeout(() => {
//       document.getElementById('loadingScreen')!.style.opacity = '0';
//       setTimeout(() => {
//         document.getElementById('loadingScreen')!.style.display = 'none';
//       }, 400)
//     })
//   };

//   await fetchAllData();

//   console.log(Resources)
  
//   document.title = 'Minecraft JS'
//   function loop() {
//     Minecraft.displayGuiScreen(currentScreen === null ? new MainMenuScreen : currentScreen)
//   }

//   setInterval(() => {
//     if(ticks) {
//       loop();
//     }
//   }, 1000 / FPS)

//   loop();

//   window.addEventListener('resize', (e) => {
//     e.preventDefault()
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     ctx.scale(scaleFactor, scaleFactor);
//     ctx.imageSmoothingEnabled = false;
//     loop()
//   })
// }

// window.addEventListener('DOMContentLoaded', () => {
//   initialize();
// });

// export { Minecraft, Resources };

// window.addEventListener('mousemove', (e) => {
//   mouseXM = e.clientX;
//   mouseYM = e.clientY;
// });

// window.addEventListener('click', (e) => {
//   clickXM = e.clientX;
//   clickYM = e.clientY;
//   clicked = true;
// });

// window.addEventListener('dblclick', (e) => {
//   dblclickXM = e.clientX;
//   dblclickYM = e.clientY;
// });

// window.addEventListener('keydown', (e) => {
//   keyModifiers.keyShift = false;
//   keyModifiers.keyCtrl = false;
//   keyModifiers.keyAlt = false;

//   if(e.ctrlKey) {
//     keyModifiers.keyCtrl = true;
//   }

//   if(e.shiftKey){
//     keyModifiers.keyShift = true;
//   }

//   if(e.altKey) {
//     keyModifiers.keyAlt = true;
//   }

//   if(!(e.key === 'Control' || e.key === 'Shift' || e.key === 'Meta' || e.key === 'Alt' || e.key === 'CapsLock' || e.key === 'Tab')) {
//     keyName = e.key;
//   }
  
//   if(e.key === 'Tab' || e.key === 'F1' || e.key === 'F2'|| e.key === 'F3' || e.key === 'F4' || e.key === 'F5') {
//     e.preventDefault();
//   }
// });

// export const resetKeyInfo = () => {
//   keyName = '';
//   keyModifiers.keyShift = false;
//   keyModifiers.keyCtrl = false;
//   keyModifiers.keyAlt = false;
// }

// window.addEventListener('keyup', (e) => {
//   keyName = '';
//   keyModifiers.keyShift = false;
//   keyModifiers.keyCtrl = false;
// })

// window.addEventListener('contextmenu', (e) => e.preventDefault(), false);

// window.addEventListener('mousedown', (e) => {
//   isDragging = true;
// });

// window.addEventListener('mouseup', (e) => {
//   isDragging = false;
// })