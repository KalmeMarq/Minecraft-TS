import Button from '../widgets/Button.js';
import SettingsScreen from './SettingsScreen.js';
import TranslationText from '../../../util/text/TranslationText.js';
export default class AccessibilitySettingsScreen extends SettingsScreen {
    init() {
        this.addButton(new Button(this.width / 2 - 100 * 2.55, this.height - 27 * 2.55, 200, 20, TranslationText("gui.done"), () => {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }));
    }
    render() {
        this.renderDirtBackground();
    }
}
