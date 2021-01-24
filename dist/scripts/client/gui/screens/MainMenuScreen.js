import ScreenP from './ScreenP.js';
import Button from '../widgets/Button.js';
import WorldSelectionScreen from './WorldSelectionScreen.js';
import MultiplayerScreen from './MultiplayerScreen.js';
import OptionsScreen from './OptionsScreen.js';
import TranslationTextComponent from '../../../util/text/TranslationText.js';
export default class MainMenuScreen extends ScreenP {
    init() {
        let i = 24;
        let j = this.height / 4 + 48;
        this.addButton(new Button(this.width / 2 - 100, j, 200, 20, new TranslationTextComponent("menu.singleplayer").get(), () => {
            this.minecraft.displayGuiScreen(new WorldSelectionScreen(this));
        }));
        this.addButton(new Button(this.width / 2 - 100, j + i * 1, 200, 20, new TranslationTextComponent("menu.multiplayer").get(), () => {
            this.minecraft.displayGuiScreen(new MultiplayerScreen(this));
        }));
        this.addButton(new Button(this.width / 2 - 100, j + i * 2, 200, 20, new TranslationTextComponent("menu.online").get(), () => { }));
        this.addButton(new Button(this.width / 2 - 100, j + 72 + 12, 98, 20, new TranslationTextComponent("menu.options").get(), () => {
            this.minecraft.displayGuiScreen(new OptionsScreen(this));
        }));
        this.addButton(new Button(this.width / 2 + 2, j + 72 + 12, 98, 20, new TranslationTextComponent("menu.quit").get(), () => {
            this.minecraft.shutdown();
        }));
    }
    render() {
    }
}
