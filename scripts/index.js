import MainMenuScreen from './client/gui/screens/MainMenuScreen.js';

const root = document.getElementById('root');
var langs = [];
var splashes = [];

let currentScreen = null;

class Minecraft {
  static getLang() {
    return langs;
  }

  static displayGuiScreen(guiScreenIn) {

    if (guiScreenIn == null) {
      guiScreenIn = new MainMenuScreen();
    }
  
    currentScreen = guiScreenIn;
    if (guiScreenIn != null) {
      guiScreenIn.init(window.innerWidth, window.innerHeight);
    }
  }

  static shutdown() {
    window.close();
  }
}

export { Minecraft, langs, splashes };

window.addEventListener('DOMContentLoaded', function aysnc() {
  (async function() {

    const req = await fetch('./resources/assets/minecraft/lang/en_us.json');
    const req2 = await fetch('./resources/assets/minecraft/lang/pt_pt.json');
    const req1 = await fetch('./resources/assets/minecraft/texts/splashes.txt');
    const data = await req.json();
    const data2 = await req2.json();
    const data1 = await req1.text();

    langs.push(data);
    langs.push(data2);

    data1.split(/\r?\n/).forEach(line => {
      splashes.push(line);
    });
  })();

  function initMinecraft() {

    Minecraft.displayGuiScreen(new MainMenuScreen());
  
    window.addEventListener('resize', () => {
      Minecraft.displayGuiScreen(currentScreen);
    });
  }

  const fetchingData = setInterval(() => {

    if(langs[0] !== undefined) {
      initMinecraft();
      clearInterval(fetchingData);
    }
  })

})
