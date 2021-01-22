import { splashes } from '../../../index.js';
import Screen from './Screen.js';
import Button from '../widgets/button.js';
import WorldSelectionScreen from './WorldSelectionScreen.js';
import MultiplayerScreen from './MultiplayerScreen.js';
import OptionsScreen from './OptionsScreen.js';
import GameSettings from '../../GameSettings.js';
import TranslationText from '../../../util/text/TranslationText.js';

export default class MainMenuScreen extends Screen {

  shouldCloseOnEsc() {
    return false;
  }
  
  initCont() {
    let i = 24 * 2.5;
    let j = this.height / 4 + 48 * 2.5;

    this.addButton(new Button(this.width / 2 - 100 * 2.5, j, 200, 20, TranslationText("menu.singleplayer"), () => {
      this.minecraft.displayGuiScreen(new WorldSelectionScreen(this));
    }));
  
    this.addButton(new Button(this.width / 2 - 100 * 2.5, j + i * 1, 200, 20, TranslationText("menu.multiplayer"), () => {
        this.minecraft.displayGuiScreen(new MultiplayerScreen(this));
    }));

    this.addButton(new Button(this.width / 2 - 100 * 2.5, j + i * 2, 200, 20, TranslationText("menu.online"), () => {}));

    this.addButton(new Button(this.width / 2 - 100 * 2.5, j + (72 + 12) * 2.5, 98, 20, TranslationText("menu.options"), () => {
      this.minecraft.displayGuiScreen(new OptionsScreen(this, GameSettings));
    }));

    this.addButton(new Button(this.width / 2 + 2 * 2.5, j + (72 + 12) * 2.5, 98, 20, TranslationText("menu.quit"), () => {
      this.minecraft.shutdown();
    }));
  }

  advancedRender() {
    const splashText = document.createElement('span');

    const getRandomSplashText = () => splashes[~~(Math.random() * (splashes.length - 1))];
    const splashLength = getRandomSplashText().split('').length;

    splashText.innerText = getRandomSplashText();
    const initFontSize = splashLength < 2522 ? (9.8 / splashLength) * 1.5 + 9.8 : 9.8 / splashLength;
    const endFontSize = splashLength < 2522 ? (10 / splashLength) * 1.5 + 10 : 10 / splashLength + 0.2;
    splashText.className = 'splash-texts';
    splashText.style.top = 40 * 2.5 + 'px'
    splashText.style.left = this.width / 2 + 40 * 2.5 + 'px'

    splashText.style.setProperty('--init', initFontSize + "px");
    splashText.style.setProperty('--end', endFontSize + "px");

    document.getElementById('root').appendChild(splashText)
  }
}