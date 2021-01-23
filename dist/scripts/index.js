import MainMenuScreen from './client/gui/screens/MainMenuScreen.js';
import JSONUtils from './util/JSONUtils.js';
export var Resources = {
    languages: [],
    texts: {
        end: [],
        splashes: []
    }
};
var langs = [];
var splashes = [];
export let widgetsImg = new Image(256, 256);
export let optionsBackgroundImg = new Image(256, 256);
export let currentScreen = null;
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
            guiScreenIn.initScreen(window.innerWidth, window.innerHeight);
        }
    }
    static shutdown() {
        window.close();
    }
}
const initialize = async () => {
    async function fetchText(url, callback) {
        const req = await fetch(url);
        const data = await req.text();
        callback(data);
    }
    async function fetchAllData() {
        widgetsImg.src = 'resources/assets/minecraft/textures/gui/widgets.png';
        optionsBackgroundImg.src = 'resources/assets/minecraft/textures/gui/options_background.png';
        await fetchText('./resources/assets/minecraft/texts/splashes.txt', (data) => data.split(/\r?\n/).forEach((line) => splashes.push(line)));
        await JSONUtils.getJSONFile('./resources/assets/minecraft/lang/en_us.json', (data) => Resources.languages.push(data));
        await JSONUtils.getJSONFile('./resources/assets/minecraft/lang/es_es.json', (data) => Resources.languages.push(data));
        await JSONUtils.getJSONFile('./resources/assets/minecraft/lang/fr_fr.json', (data) => Resources.languages.push(data));
        await JSONUtils.getJSONFile('./resources/assets/minecraft/lang/pt_pt.json', (data) => Resources.languages.push(data));
        await JSONUtils.getTextFile('./resources/assets/minecraft/texts/end.txt', (data) => data.split(/\r?\n/).forEach((line) => Resources.texts.splashes.push(line)));
        await JSONUtils.getTextFile('./resources/assets/minecraft/texts/splashes.txt', (data) => data.split(/\r?\n/).forEach((line) => Resources.texts.splashes.push(line)));
    }
    ;
    await fetchAllData();
    localStorage.setItem('Resources', JSON.stringify(Resources));
    Minecraft.displayGuiScreen(new MainMenuScreen());
    window.addEventListener('resize', () => Minecraft.displayGuiScreen(currentScreen));
};
window.addEventListener('DOMContentLoaded', () => {
    initialize();
});
export { Minecraft, langs, splashes };
