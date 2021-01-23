import MainMenuScreen from './client/gui/screens/MainMenuScreen.js';
import JSONUtils from './util/JSONUtils.js';

interface Resources {
  languages: {}[],
  texts: {
    end: string[],
    splashes: string[]
  }
}

export var Resources: Resources = {
  languages: [],
  texts: {
    end: [],
    splashes: []
  }
};

var langs: {}[] = [];
var splashes: {}[] = [];

export let widgetsImg = new Image(256, 256);
export let optionsBackgroundImg = new Image(256, 256);

export let currentScreen: any = null;

class Minecraft {
  static getLang() {
    return langs;
  }

  static displayGuiScreen(guiScreenIn: any) {

    if (guiScreenIn == null) {
      guiScreenIn = new MainMenuScreen();
    }
  
    currentScreen = guiScreenIn;
    if (guiScreenIn != null) {
      guiScreenIn.initScreen(window.innerWidth, window.innerHeight);
    }
  }

  static shutdown() {
    window.close();
  }
}


// (async function() {
// console.log(JSON.parse(await (await fetch('https://api.mcsrvstat.us/2/hypixel.net')).text()))
  
// })()

const initialize = async () => {

  async function fetchText(url: string, callback: Function) {
    const req = await fetch(url);
    const data = await req.text();
    callback(data);
  } 

  async function fetchAllData() {
    widgetsImg.src = 'resources/assets/minecraft/textures/gui/widgets.png';
    optionsBackgroundImg.src = 'resources/assets/minecraft/textures/gui/options_background.png';

    // await fetchJSON('./resources/assets/minecraft/lang/en_us.json', (data: any) => langs.push(data));
    // await fetchJSON('./resources/assets/minecraft/lang/pt_pt.json', (data: any) => langs.push(data));
    await fetchText('./resources/assets/minecraft/texts/splashes.txt', (data: any) => data.split(/\r?\n/).forEach((line: any) => splashes.push(line)));

    await JSONUtils.getJSONFile('./resources/assets/minecraft/lang/en_us.json', (data: any) => Resources.languages.push(data));
    await JSONUtils.getJSONFile('./resources/assets/minecraft/lang/es_es.json', (data: any) => Resources.languages.push(data));
    await JSONUtils.getJSONFile('./resources/assets/minecraft/lang/fr_fr.json', (data: any) => Resources.languages.push(data));
    await JSONUtils.getJSONFile('./resources/assets/minecraft/lang/pt_pt.json', (data: any) => Resources.languages.push(data));
    
    await JSONUtils.getTextFile('./resources/assets/minecraft/texts/end.txt', (data: any) => data.split(/\r?\n/).forEach((line: any) => Resources.texts.splashes.push(line)));
    await JSONUtils.getTextFile('./resources/assets/minecraft/texts/splashes.txt', (data: any) => data.split(/\r?\n/).forEach((line: any) => Resources.texts.splashes.push(line)));
  };

  await fetchAllData();
  localStorage.setItem('Resources', JSON.stringify(Resources));

  Minecraft.displayGuiScreen(new MainMenuScreen());
  window.addEventListener('resize', () => Minecraft.displayGuiScreen(currentScreen));
}

window.addEventListener('DOMContentLoaded', () => {
  initialize();
});


export { Minecraft, langs, splashes };