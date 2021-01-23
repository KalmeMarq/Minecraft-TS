import Button from '../widgets/Button.js';
import SettingsScreen from './SettingsScreen.js';
import TranslationText from '../../../util/text/TranslationText.js';
import drawCenteredString from '../../../util/text/drawCenteredString.js';
import GameSettings from '../../GameSettings.js';
export default class LanguageScreen extends SettingsScreen {
    init() {
        this.addButton(new Button(this.width / 2 - (270 / 2) * 2.55, 34 * 2.55, 270, 20, TranslationText("English"), () => {
            GameSettings.language = 'en_us';
            this.minecraft.displayGuiScreen(this);
        }));
        this.addButton(new Button(this.width / 2 - (270 / 2) * 2.55, (34 + 22) * 2.55, 270, 20, TranslationText("Português"), () => {
            GameSettings.language = 'pt_pt';
            this.minecraft.displayGuiScreen(this);
        }));
        this.addButton(new Button(this.width / 2 - 155 * 2.55, this.height - 38 * 2.55, 150, 20, TranslationText("null"), () => {
            this.minecraft.displayGuiScreen(this);
        }));
        this.addButton(new Button(this.width / 2 + 5 * 2.55, this.height - 38 * 2.55, 150, 20, TranslationText("gui.done"), () => {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }));
    }
    render() {
        let field_243292_c = `(${TranslationText("options.languageWarning")})`;
        let title = TranslationText("options.language");
        drawCenteredString(document.getElementById('root'), title, this.width / 2, 16, 'white');
        drawCenteredString(document.getElementById('root'), field_243292_c, this.width / 2, this.height - 56 * 2.55, 'white');
        this.renderDirtBackground();
    }
}
