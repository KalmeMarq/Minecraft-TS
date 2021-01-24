import GameSettings from './client/GameSettings.js';
import MainMenuScreen from './client/gui/screens/MainMenuScreen.js';
import JSONUtils from './util/JSONUtils.js';

var Resources: any = {
  languages: [],
  texts: {
    end: [],
    splashes: []
  }
};

export let widgetsImg = new Image(256, 256);
export let optionsBackgroundImg = new Image(256, 256);

export let currentScreen: any = null;

class Minecraft {
  static displayGuiScreen(guiScreenIn: any) {

    if (guiScreenIn == null) {
      guiScreenIn = new MainMenuScreen();
    }
  
    currentScreen = guiScreenIn;
    if (guiScreenIn != null) {
      guiScreenIn.initScreen(window.innerWidth / 2.55, window.innerHeight / 2.55);
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

  async function fetchAllData() {
    widgetsImg.src = 'resources/assets/minecraft/textures/gui/widgets.png';
    optionsBackgroundImg.src = 'resources/assets/minecraft/textures/gui/options_background.png';

    await JSONUtils.getJSONFile('./resources/assets/minecraft/lang/en_us.json', (data: any) => Resources.languages.push(data));
    await JSONUtils.getJSONFile('./resources/assets/minecraft/lang/es_es.json', (data: any) => Resources.languages.push(data));
    await JSONUtils.getJSONFile('./resources/assets/minecraft/lang/fr_fr.json', (data: any) => Resources.languages.push(data));
    await JSONUtils.getJSONFile('./resources/assets/minecraft/lang/pt_pt.json', (data: any) => Resources.languages.push(data));
    
    await JSONUtils.getTextFile('./resources/assets/minecraft/texts/end.txt', (data: any) => data.split(/\r?\n/).forEach((line: any) => Resources.texts.splashes.push(line)));
    await JSONUtils.getTextFile('./resources/assets/minecraft/texts/splashes.txt', (data: any) => data.split(/\r?\n/).forEach((line: any) => Resources.texts.splashes.push(line)));
  
    localStorage.setItem('Resources', JSON.stringify(Resources));
    localStorage.setItem('GameSettings', JSON.stringify(GameSettings));
    if(!localStorage.getItem('WorldsList')) localStorage.setItem('WorldsList', JSON.stringify([]))
    if(!localStorage.getItem('ServersList')) localStorage.setItem('ServersList', JSON.stringify([]))
  };

  await fetchAllData();

  setTimeout(() => {
  // if(localStorage.getItem('prevScreen')) {
  //   Minecraft.displayGuiScreen(JSON.parse(localStorage.getItem('prevScreen')!));
  // } else {
    Minecraft.displayGuiScreen(new MainMenuScreen());
  // }
  }, 10)

  window.addEventListener('resize', () => Minecraft.displayGuiScreen(currentScreen));
}

window.addEventListener('DOMContentLoaded', () => {
  initialize();
});


export { Minecraft, Resources };