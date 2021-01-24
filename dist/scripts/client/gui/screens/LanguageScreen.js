import Button from '../widgets/Button.js';
import SettingsScreen from './SettingsScreen.js';
import GameSettings, { saveOptions } from '../../GameSettings.js';
import TranslationTextComponent from '../../../util/text/TranslationText.js';
export default class LanguageScreen extends SettingsScreen {
    constructor() {
        super(...arguments);
        this.warning = `(${new TranslationTextComponent("options.languageWarning").get()})`;
    }
    init() {
        this.setTitle(new TranslationTextComponent('options.language').get());
        this.addButton(new Button(this.width / 2 - (270 / 2), 34, 270, 20, new TranslationTextComponent("English").get(), () => {
            GameSettings.language = 'en_us';
            saveOptions(this.parentScreen);
            this.minecraft.displayGuiScreen(this);
        }));
        this.addButton(new Button(this.width / 2 - (270 / 2), (34 + 22), 270, 20, new TranslationTextComponent("Português").get(), () => {
            GameSettings.language = 'pt_pt';
            saveOptions(this.parentScreen);
            this.minecraft.displayGuiScreen(this);
        }));
        this.addButton(new Button(this.width / 2 - 155, this.height - 38, 150, 20, new TranslationTextComponent("null").get(), () => {
            this.minecraft.displayGuiScreen(this);
        }));
        this.addButton(new Button(this.width / 2 + 5, this.height - 38, 150, 20, new TranslationTextComponent("gui.done").get(), () => {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }));
    }
    render() {
        SettingsScreen.drawCenteredString(this.root, this.title, this.width / 2, 16, 16777215);
        SettingsScreen.drawCenteredString(this.root, this.warning, this.width / 2, this.height - 56, 16777215);
        this.renderDirtBackground();
    }
}
