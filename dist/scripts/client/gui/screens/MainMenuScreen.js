import ScreenP from './ScreenP.js';
import Button from '../widgets/Button.js';
import WorldSelectionScreen from './WorldSelectionScreen.js';
import MultiplayerScreen from './MultiplayerScreen.js';
import OptionsScreen from './OptionsScreen.js';
import GameSettings from '../../GameSettings.js';
import Splashes from '../../util/Splashes.js';
import TranslationText from '../../../util/text/TranslationText.js';
export default class MainMenuScreen extends ScreenP {
    init() {
        let i = 24 * 2.55;
        let j = this.height / 4 + 48 * 2.55;
        this.addButton(new Button(this.width / 2 - 100 * 2.55, j, 200, 20, TranslationText("menu.singleplayer"), () => {
            this.minecraft.displayGuiScreen(new WorldSelectionScreen(this));
        }));
        this.addButton(new Button(this.width / 2 - 100 * 2.55, j + i * 1, 200, 20, TranslationText("menu.multiplayer"), () => {
            this.minecraft.displayGuiScreen(new MultiplayerScreen(this));
        }));
        this.addButton(new Button(this.width / 2 - 100 * 2.55, j + i * 2, 200, 20, TranslationText("menu.online"), () => { }));
        this.addButton(new Button(this.width / 2 - 100 * 2.55, j + (72 + 12) * 2.55, 98, 20, TranslationText("menu.options"), () => {
            this.minecraft.displayGuiScreen(new OptionsScreen(this, GameSettings));
        }));
        this.addButton(new Button(this.width / 2 + 2 * 2.55, j + (72 + 12) * 2.55, 98, 20, TranslationText("menu.quit"), () => {
            this.minecraft.shutdown();
        }));
    }
    render() {
        Splashes.getSplashText(this.root, this.width, this.height);
    }
}
